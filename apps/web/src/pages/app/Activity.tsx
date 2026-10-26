import { useEffect, useState } from "react";
import { TransactionHistory, formatTransactionType, getTransactionStatusColor } from "@streamora/sdk";

interface Transaction {
  id: string;
  type: string;
  streamId: string;
  amount: bigint;
  timestamp: number;
  status: string;
  hash?: string;
  error?: string;
}

export default function Activity() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const history = new TransactionHistory();
    setTransactions(history.getRecent(50));
  }, []);

  const formatAmount = (amount: bigint) => {
    return (Number(amount) / 10000000).toFixed(2);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="section-container py-20">
      <h1 className="text-5xl font-bold mb-12">Transaction Activity</h1>

      {transactions.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No activity yet</p>
          <p className="text-gray-600">
            Your transaction history will appear here once you create or withdraw from streams.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">{formatTransactionType(tx.type)}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tx.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Stream: {tx.streamId}</p>
                  {tx.hash && (
                    <p className="text-gray-500 text-xs font-mono mt-1">Hash: {tx.hash.slice(0, 16)}...</p>
                  )}
                  {tx.error && <p className="text-red-600 text-sm mt-1">Error: {tx.error}</p>}
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-teal-600">{formatAmount(tx.amount)}</p>
                  <p className="text-sm text-gray-500">{formatTime(tx.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 card bg-blue-50 border-blue-200">
        <h2 className="text-xl font-bold mb-3">💡 About Transaction History</h2>
        <p className="text-gray-600 text-sm">
          Transaction history is stored locally in your browser. Clear your browser data or cookies to reset this
          history.
        </p>
      </div>
    </div>
  );
}
