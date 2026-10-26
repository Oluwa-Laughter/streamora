import { useState } from "react";
import { useWallet } from "../../hooks/useWallet";

export default function CreateStream() {
  const { isConnected } = useWallet();
  const [formData, setFormData] = useState({
    tokenAddress: "",
    amount: "",
    duration: "2592000",
    recipients: [{ address: "", shares: 100 }],
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRecipientChange = (index: number, field: string, value: string) => {
    const newRecipients = [...formData.recipients];
    newRecipients[index] = {
      ...newRecipients[index],
      [field]: field === "shares" ? parseInt(value) : value,
    };
    setFormData((prev) => ({
      ...prev,
      recipients: newRecipients,
    }));
  };

  const addRecipient = () => {
    setFormData((prev) => ({
      ...prev,
      recipients: [...prev.recipients, { address: "", shares: 0 }],
    }));
  };

  const removeRecipient = (index: number) => {
    if (formData.recipients.length > 1) {
      setFormData((prev) => ({
        ...prev,
        recipients: prev.recipients.filter((_, i) => i !== index),
      }));
    }
  };

  const getTotalShares = () => {
    return formData.recipients.reduce((sum, r) => sum + r.shares, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Transaction signing coming soon");
  };

  const totalShares = getTotalShares();
  const isValid = isConnected && totalShares === 100 && formData.amount;

  return (
    <div className="section-container py-20">
      <h1 className="text-5xl font-bold mb-12">Create a Payment Stream</h1>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="card space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2">Token Address</label>
            <input
              type="text"
              name="tokenAddress"
              placeholder="CAAAAAAA... (e.g., USDC on Stellar)"
              value={formData.tokenAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              disabled={!isConnected}
            />
            <p className="text-xs text-gray-500 mt-1">Enter the token contract address</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Total Amount to Stream</label>
            <input
              type="number"
              name="amount"
              placeholder="1000"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              disabled={!isConnected}
            />
            <p className="text-xs text-gray-500 mt-1">This amount will be split among recipients</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stream Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              disabled={!isConnected}
            >
              <option value="86400">1 day</option>
              <option value="604800">1 week</option>
              <option value="2592000">30 days</option>
              <option value="7776000">90 days</option>
              <option value="31536000">1 year</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Recipients</label>
              <button
                type="button"
                onClick={addRecipient}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                disabled={!isConnected || formData.recipients.length >= 10}
              >
                + Add Recipient
              </button>
            </div>

            <div className="space-y-4">
              {formData.recipients.map((recipient, index) => (
                <div key={index} className="flex gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Recipient address (GBBD47UZ...)"
                      value={recipient.address}
                      onChange={(e) => handleRecipientChange(index, "address", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                      disabled={!isConnected}
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Share %"
                      min="1"
                      max="100"
                      value={recipient.shares || ""}
                      onChange={(e) => handleRecipientChange(index, "shares", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                      disabled={!isConnected}
                    />
                  </div>
                  {formData.recipients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRecipient(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      disabled={!isConnected}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                Total shares: <span className={totalShares === 100 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {totalShares}%
                </span>
              </p>
              {totalShares !== 100 && (
                <p className="text-xs text-red-600 mt-1">
                  Recipients' shares must sum to exactly 100%
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {!isConnected && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700">Connect your wallet first to create a stream</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!isConnected ? "Connect Wallet First" : totalShares !== 100 ? "Fix Share Distribution" : "Create Stream"}
          </button>
        </form>

        <div className="mt-8 card">
          <h2 className="text-2xl font-bold mb-4">💡 How It Works</h2>
          <ol className="space-y-3 text-gray-600">
            <li><span className="font-bold">1. Set Recipients:</span> Add one or more recipients and split the stream amount among them</li>
            <li><span className="font-bold">2. Share Distribution:</span> Each recipient gets their percentage of the total amount</li>
            <li><span className="font-bold">3. Approve Transfer:</span> Sign the token transfer to lock funds in the contract</li>
            <li><span className="font-bold">4. Stream Starts:</span> Funds accrue linearly and recipients can withdraw anytime</li>
            <li><span className="font-bold">5. Flexible Withdrawals:</span> Recipients withdraw only what they need, when they need it</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
