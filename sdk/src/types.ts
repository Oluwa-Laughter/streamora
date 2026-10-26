/**
 * Core types for Streamora streaming payments
 */

export interface Stream {
  id: string;
  payer: string;
  recipient: string;
  token: string;
  amount: bigint;
  startTime: number;
  endTime: number;
  withdrawn: bigint;
  isCancelled: boolean;
}

export interface StreamCreationParams {
  recipientAddress: string;
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
