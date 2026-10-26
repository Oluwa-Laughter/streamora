/**
 * Core types for Streamora streaming payments
 */

export interface Recipient {
  address: string;
  shares: number; // Percentage 1-100
}

export interface Stream {
  id: string;
  payer: string;
  recipients: Recipient[];
  token: string;
  amount: bigint;
  startTime: number;
  endTime: number;
  withdrawn: bigint;
  isCancelled: boolean;
}

export interface StreamCreationParams {
  recipients: Recipient[];
  tokenAddress: string;
  amount: bigint;
  startTime: number;
  endTime: number;
}

export interface WithdrawalParams {
  streamId: string;
  amount: bigint;
}

export interface StreamInfo {
  stream: Stream;
  vestedAmount: bigint;
  withdrawableAmount: bigint;
  currentTime: number;
}

export interface TransactionResult {
  hash: string;
  success: boolean;
  error?: string;
  confirmations?: number;
}

export enum Network {
  TESTNET = "testnet",
  PUBLIC = "public",
  STANDALONE = "standalone",
}

export interface ClientConfig {
  network: Network;
  rpcUrl?: string;
  contractId: string;
  signerPublicKey: string;
}
