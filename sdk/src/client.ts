/**
 * Streamora SDK Client
 * Provides interface for interacting with streaming payment contracts
 */

import { ClientConfig, Stream, StreamInfo, StreamCreationParams, WithdrawalParams, Network } from "./types";
import {
  calculateVestedAmount,
  calculateWithdrawable,
  isValidAddress,
  toSmallestUnit,
  fromSmallestUnit,
} from "./utils";

export class StreamoraClient {
  private config: ClientConfig;

  constructor(config: ClientConfig) {
    if (!isValidAddress(config.signerPublicKey)) {
      throw new Error("Invalid signer public key");
    }

    this.config = config;
  }

  /**
   * Get the current network configuration
   */
  getNetwork(): Network {
    return this.config.network;
  }

  /**
   * Get the contract ID being used
   */
  getContractId(): string {
    return this.config.contractId;
  }

  /**
   * Calculate vested amount for a stream at current time
   */
  async getVestedAmount(stream: Stream): Promise<bigint> {
    const currentTime = Math.floor(Date.now() / 1000);
    return calculateVestedAmount(stream.amount, stream.startTime, stream.endTime, currentTime);
  }

  /**
   * Calculate withdrawable amount (vested - already withdrawn)
   */
  async getWithdrawableAmount(stream: Stream): Promise<bigint> {
    const vestedAmount = await this.getVestedAmount(stream);
    return calculateWithdrawable(vestedAmount, stream.withdrawn);
  }

  /**
   * Get full stream information with calculated amounts
   */
  async getStreamInfo(stream: Stream): Promise<StreamInfo> {
    const currentTime = Math.floor(Date.now() / 1000);
    const vestedAmount = calculateVestedAmount(stream.amount, stream.startTime, stream.endTime, currentTime);
    const withdrawableAmount = calculateWithdrawable(vestedAmount, stream.withdrawn);

    return {
      stream,
      vestedAmount,
      withdrawableAmount,
      currentTime,
    };
  }

  /**
   * Prepare stream creation transaction
   * Note: Returns unsigned transaction data; caller must sign and submit
   */
  async prepareCreateStream(params: StreamCreationParams): Promise<{
    recipients: Array<{ address: string; shares: number }>;
    tokenAddress: string;
    amount: bigint;
    startTime: number;
    endTime: number;
  }> {
    // Validate recipients
    if (!params.recipients || params.recipients.length === 0) {
      throw new Error("At least one recipient required");
    }

    let totalShares = 0;
    for (const recipient of params.recipients) {
      if (!isValidAddress(recipient.address)) {
        throw new Error(`Invalid recipient address: ${recipient.address}`);
      }
      if (recipient.shares <= 0 || recipient.shares > 100) {
        throw new Error("Each recipient share must be 1-100");
      }
      totalShares += recipient.shares;
    }

    if (totalShares !== 100) {
      throw new Error(`Recipient shares must sum to 100 (got ${totalShares})`);
    }

    if (!isValidAddress(params.tokenAddress)) {
      throw new Error("Invalid token address");
    }

    if (params.amount <= 0n) {
      throw new Error("Amount must be positive");
    }

    if (params.startTime >= params.endTime) {
      throw new Error("Start time must be before end time");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (params.startTime < currentTime) {
      throw new Error("Start time cannot be in the past");
    }

    return {
      recipients: params.recipients,
      tokenAddress: params.tokenAddress,
      amount: params.amount,
      startTime: params.startTime,
      endTime: params.endTime,
    };
  }

  /**
   * Prepare withdrawal transaction
   */
  async prepareWithdraw(stream: Stream, params: WithdrawalParams): Promise<{
    streamId: string;
    amount: bigint;
  }> {
    if (params.amount <= 0n) {
      throw new Error("Withdrawal amount must be positive");
    }

    const withdrawable = await this.getWithdrawableAmount(stream);
    if (params.amount > withdrawable) {
      throw new Error(`Withdrawal amount exceeds withdrawable balance (${withdrawable})`);
    }

    return {
      streamId: params.streamId,
      amount: params.amount,
    };
  }

  /**
   * Validate stream addresses and amounts
   */
  validateStreamParams(params: StreamCreationParams): { valid: boolean; error?: string } {
    if (!params.recipients || params.recipients.length === 0) {
      return { valid: false, error: "At least one recipient required" };
    }

    let totalShares = 0;
    for (const recipient of params.recipients) {
      if (!isValidAddress(recipient.address)) {
        return { valid: false, error: `Invalid recipient address: ${recipient.address}` };
      }
      if (recipient.shares <= 0 || recipient.shares > 100) {
        return { valid: false, error: "Each recipient share must be 1-100" };
      }
      totalShares += recipient.shares;
    }

    if (totalShares !== 100) {
      return { valid: false, error: `Recipient shares must sum to 100 (got ${totalShares})` };
    }

    if (!isValidAddress(params.tokenAddress)) {
      return { valid: false, error: "Invalid token address" };
    }

    if (params.amount <= 0n) {
      return { valid: false, error: "Amount must be positive" };
    }

    if (params.startTime >= params.endTime) {
      return { valid: false, error: "Start time must be before end time" };
    }

    return { valid: true };
  }
}

export default StreamoraClient;
