/**
 * Transaction history and tracking utilities
 */

export enum TransactionType {
  CREATE_STREAM = "create_stream",
  WITHDRAW = "withdraw",
  CANCEL_STREAM = "cancel_stream",
}

export interface TransactionRecord {
  id: string;
  type: TransactionType;
  streamId: string;
  amount: bigint;
  timestamp: number;
  status: "pending" | "confirmed" | "failed";
  hash?: string;
  error?: string;
}

export class TransactionHistory {
  private storageKey = "streamora_transactions";

  /**
   * Add a new transaction record
   */
  add(record: TransactionRecord): void {
    try {
      const history = this.getAll();
      history.push(record);
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save transaction history:", error);
    }
  }

  /**
   * Get all transaction records
   */
  getAll(): TransactionRecord[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load transaction history:", error);
      return [];
    }
  }

  /**
   * Get transactions for a specific stream
   */
  getForStream(streamId: string): TransactionRecord[] {
    return this.getAll().filter((tx) => tx.streamId === streamId);
  }

  /**
   * Get recent transactions
   */
  getRecent(limit: number = 10): TransactionRecord[] {
    return this.getAll().slice(-limit).reverse();
  }

  /**
   * Update transaction status
   */
  updateStatus(id: string, status: "confirmed" | "failed", hash?: string, error?: string): void {
    try {
      const history = this.getAll();
      const tx = history.find((t) => t.id === id);
      if (tx) {
        tx.status = status;
        if (hash) tx.hash = hash;
        if (error) tx.error = error;
        localStorage.setItem(this.storageKey, JSON.stringify(history));
      }
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  }

  /**
   * Clear all transaction history
   */
  clear(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error("Failed to clear transaction history:", error);
    }
  }
}

export function formatTransactionType(type: TransactionType): string {
  switch (type) {
    case TransactionType.CREATE_STREAM:
      return "Created Stream";
    case TransactionType.WITHDRAW:
      return "Withdrew Funds";
    case TransactionType.CANCEL_STREAM:
      return "Cancelled Stream";
  }
}

export function getTransactionStatusColor(status: string): string {
  switch (status) {
    case "confirmed":
      return "text-green-600";
    case "failed":
      return "text-red-600";
    case "pending":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
}
