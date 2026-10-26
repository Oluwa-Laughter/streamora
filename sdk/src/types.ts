export type NetworkName = "testnet" | "public" | "standalone";

export interface NetworkConfig {
  rpcUrl: string;
  passphrase: string;
}

export const NETWORKS: Record<NetworkName, NetworkConfig> = {
  testnet: {
    rpcUrl: "https://soroban-testnet.stellar.org",
    passphrase: "Test SDF Network ; September 2015",
  },
  public: {
    rpcUrl: "https://mainnet.sorobanrpc.com",
    passphrase: "Public Global Stellar Network ; September 2015",
  },
  standalone: {
    rpcUrl: "http://localhost:8000/soroban/rpc",
    passphrase: "Standalone Network ; February 2017",
  },
};

export interface ClientConfig {
  network: NetworkName;
  contractId: string;
  rpcUrl?: string;
}

export interface RecipientInput {
  address: string;
  /** Whole-number percentage, 1..100. All shares must sum to 100. */
  shares: number;
}

export interface Recipient extends RecipientInput {
  withdrawn: bigint;
}

export interface Stream {
  id: bigint;
  payer: string;
  recipients: Recipient[];
  token: string;
  amount: bigint;
  /** Unix seconds */
  startTime: number;
  endTime: number;
  cancelledAt: number | null;
}

export interface CreateStreamParams {
  payer: string;
  recipients: RecipientInput[];
  token: string;
  /** In the token's smallest unit */
  amount: bigint;
  startTime: number;
  endTime: number;
}

/** An unsigned, simulated transaction. Sign `xdr` with a wallet, then pass the result to `submit`. */
export interface PreparedTransaction {
  xdr: string;
  networkPassphrase: string;
}

export type TxStatus = "SUCCESS" | "FAILED";

export interface TxResult {
  hash: string;
  status: TxStatus;
  returnValue?: unknown;
  error?: string;
}
