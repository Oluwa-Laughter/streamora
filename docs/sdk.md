# SDK (`@streamora/sdk`)

TypeScript client for the Streamora contract. It never holds keys: it builds and simulates a transaction, a wallet signs it, and you submit the signed XDR.

All token amounts are `bigint` in the token's smallest unit. Use `parseUnits` / `formatUnits` to convert from/to decimal strings (no floating point).

```ts
import { StreamoraClient, parseUnits } from "@streamora/sdk";

const client = new StreamoraClient({
  network: "testnet",
  contractId: "CABJ22MJTXMZHACHV25MFD6ECVRQ3NRUJ2HYB2B4LVP3PQ6R2N72RN3K",
});

// 1. Prepare (validates, simulates, attaches fees + auth)
const prepared = await client.prepareCreateStream({
  payer,                                   // G... address that will sign
  recipients: [{ address: bob, shares: 100 }],
  token,                                   // token contract id (C...)
  amount: parseUnits("10", 7),
  startTime: now + 60,
  endTime: now + 86_400,
});

// 2. Sign with a wallet (Freighter shown)
const { signedTxXdr } = await signTransaction(prepared.xdr, { networkPassphrase: prepared.networkPassphrase });

// 3. Submit and wait for a final result
const result = await client.submit(signedTxXdr);
if (result.status === "SUCCESS") console.log("stream id", result.returnValue);
```

## API

| Method | Description |
|---|---|
| `new StreamoraClient({ network, contractId, rpcUrl? })` | `network`: `"testnet" \| "public" \| "standalone"` |
| `getStream(id)` | Reads a stream via simulation |
| `getWithdrawable(id, who)` | On-chain withdrawable amount for a recipient |
| `StreamoraClient.withdrawableAt(stream, who, now)` | Local computation mirroring the contract (for live UI) |
| `prepareCreateStream(params)` | Returns `{ xdr, networkPassphrase }` |
| `prepareWithdraw(id, who, amount)` | Returns `{ xdr, networkPassphrase }` |
| `prepareCancel(id, payer)` | Returns `{ xdr, networkPassphrase }` |
| `submit(signedXdr)` | Sends and polls until `SUCCESS`/`FAILED` |

Helpers: `parseUnits`, `formatUnits`, `calculateVestedAmount`, `calculateWithdrawable`, `recipientEntitlement`, `validateCreateParams`, `isValidAddress`, `isValidContractId`, `formatDate`, `formatDuration`.

## Errors

Failures throw `StreamoraError`. Contract errors carry a `code` and a readable message (`CONTRACT_ERRORS`), e.g. `6` "Nothing is available to withdraw yet". RPC outages are reported as "RPC service is unavailable".

## Tests

`npm test -w sdk` runs unit tests (math, units, validation, errors). The create → withdraw → cancel flow was also exercised manually against the deployed testnet contract.
