import {
  Account,
  Contract,
  TransactionBuilder,
  BASE_FEE,
  nativeToScVal,
  scValToNative,
  rpc,
  xdr,
} from "@stellar/stellar-sdk";
import {
  ClientConfig,
  CreateStreamParams,
  NETWORKS,
  PreparedTransaction,
  Stream,
  TxResult,
} from "./types.js";
import { parseError, StreamoraError } from "./errors.js";
import {
  calculateVestedAmount,
  calculateWithdrawable,
  isValidContractId,
  recipientEntitlement,
  validateCreateParams,
} from "./utils.js";

// Valid placeholder source for read-only simulations; nothing is signed or sent.
export const READ_SOURCE = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF";

const addr = (a: string) => nativeToScVal(a, { type: "address" });
const u64 = (n: bigint | number) => nativeToScVal(BigInt(n), { type: "u64" });
const i128 = (n: bigint) => nativeToScVal(n, { type: "i128" });

/**
 * Prepares, simulates and submits Streamora contract calls.
 * The client never holds keys: `prepare*` returns an unsigned XDR for a wallet to sign,
 * and `submit` sends the signed XDR.
 */
export class StreamoraClient {
  readonly server: rpc.Server;
  readonly networkPassphrase: string;
  readonly contractId: string;
  private readonly contract: Contract;

  constructor(config: ClientConfig) {
    if (!isValidContractId(config.contractId)) throw new StreamoraError("Invalid contract id");
    const net = NETWORKS[config.network];
    this.networkPassphrase = net.passphrase;
    this.contractId = config.contractId;
    const url = config.rpcUrl ?? net.rpcUrl;
    this.server = new rpc.Server(url, { allowHttp: url.startsWith("http://") });
    this.contract = new Contract(config.contractId);
  }

  private async simulateRead(method: string, ...args: xdr.ScVal[]): Promise<unknown> {
    try {
      const tx = new TransactionBuilder(new Account(READ_SOURCE, "0"), {
        fee: BASE_FEE,
        networkPassphrase: this.networkPassphrase,
      })
        .addOperation(this.contract.call(method, ...args))
        .setTimeout(30)
        .build();
      const sim = await this.server.simulateTransaction(tx);
      if (rpc.Api.isSimulationError(sim)) throw new Error(sim.error);
      const retval = (sim as rpc.Api.SimulateTransactionSuccessResponse).result?.retval;
      return retval === undefined ? undefined : scValToNative(retval);
    } catch (e) {
      throw parseError(e);
    }
  }

  private async prepare(source: string, method: string, ...args: xdr.ScVal[]): Promise<PreparedTransaction> {
    try {
      const account = await this.server.getAccount(source);
      const tx = new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase: this.networkPassphrase })
        .addOperation(this.contract.call(method, ...args))
        .setTimeout(120)
        .build();
      // Simulates, then attaches resource fees and auth entries.
      const prepared = await this.server.prepareTransaction(tx);
      return { xdr: prepared.toXDR(), networkPassphrase: this.networkPassphrase };
    } catch (e) {
      throw parseError(e);
    }
  }

  async getStream(id: bigint | number): Promise<Stream> {
    const raw = (await this.simulateRead("get_stream", u64(id))) as any;
    return {
      id: BigInt(id),
      payer: raw.payer,
      token: raw.token,
      amount: BigInt(raw.amount),
      startTime: Number(raw.start_time),
      endTime: Number(raw.end_time),
      cancelledAt: raw.cancelled_at == null ? null : Number(raw.cancelled_at),
      recipients: raw.recipients.map((r: any) => ({
        address: r.address,
        shares: Number(r.shares),
        withdrawn: BigInt(r.withdrawn),
      })),
    };
  }

  /** On-chain withdrawable amount for `who` at the current ledger time. */
  async getWithdrawable(id: bigint | number, who: string): Promise<bigint> {
    return BigInt((await this.simulateRead("get_withdrawable", u64(id), addr(who))) as bigint);
  }

  /** Local computation that mirrors the contract; useful for live UI ticking. */
  static withdrawableAt(stream: Stream, who: string, now: number): bigint {
    const r = stream.recipients.find((x) => x.address === who);
    if (!r) return 0n;
    const t = stream.cancelledAt !== null ? Math.min(now, stream.cancelledAt) : now;
    const vested = calculateVestedAmount(stream.amount, stream.startTime, stream.endTime, t);
    return calculateWithdrawable(recipientEntitlement(vested, r.shares), r.withdrawn);
  }

  prepareCreateStream(p: CreateStreamParams): Promise<PreparedTransaction> {
    const err = validateCreateParams(p);
    if (err) throw new StreamoraError(err);
    const recipients = xdr.ScVal.scvVec(
      p.recipients.map((r) =>
        xdr.ScVal.scvVec([addr(r.address), nativeToScVal(r.shares, { type: "u32" })])
      )
    );
    return this.prepare(
      p.payer,
      "create_stream",
      addr(p.payer),
      recipients,
      addr(p.token),
      i128(p.amount),
      u64(p.startTime),
      u64(p.endTime)
    );
  }

  prepareWithdraw(id: bigint | number, who: string, amount: bigint): Promise<PreparedTransaction> {
    if (amount <= 0n) throw new StreamoraError("Amount must be greater than zero");
    return this.prepare(who, "withdraw", u64(id), addr(who), i128(amount));
  }

  prepareCancel(id: bigint | number, payer: string): Promise<PreparedTransaction> {
    return this.prepare(payer, "cancel_stream", u64(id));
  }

  /** Submits a wallet-signed XDR and waits for a final result. */
  async submit(signedXdr: string, timeoutMs = 60_000): Promise<TxResult> {
    try {
      const tx = TransactionBuilder.fromXDR(signedXdr, this.networkPassphrase);
      const sent = await this.server.sendTransaction(tx);
      if (sent.status === "ERROR" || sent.status === "TRY_AGAIN_LATER") {
        return { hash: sent.hash, status: "FAILED", error: `Network rejected the transaction (${sent.status})` };
      }
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const res = await this.server.getTransaction(sent.hash);
        if (res.status === rpc.Api.GetTransactionStatus.SUCCESS) {
          return {
            hash: sent.hash,
            status: "SUCCESS",
            returnValue: res.returnValue ? scValToNative(res.returnValue) : undefined,
          };
        }
        if (res.status === rpc.Api.GetTransactionStatus.FAILED) {
          return { hash: sent.hash, status: "FAILED", error: "Transaction failed on-chain" };
        }
        await new Promise((r) => setTimeout(r, 1500));
      }
      throw new StreamoraError(`Timed out waiting for confirmation. Check hash ${sent.hash} on an explorer.`);
    } catch (e) {
      throw parseError(e);
    }
  }
}

