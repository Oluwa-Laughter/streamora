import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateStream() {
  const [formData, setFormData] = useState({
    recipientAddress: "",
    tokenAddress: "",
    amount: "",
    duration: "2592000",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Wallet connection coming soon");
  };

  return (
    <div className="section-container py-20">
      <h1 className="text-5xl font-bold mb-12">Create a Stream</h1>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Recipient Address</label>
            <input
              type="text"
              name="recipientAddress"
              placeholder="GBBD47UZ2HO7K4E2..."
              value={formData.recipientAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Token Address</label>
            <input
              type="text"
              name="tokenAddress"
              placeholder="CAAAAAAA..."
              value={formData.tokenAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="100"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              disabled
            >
              <option value="86400">1 day</option>
              <option value="604800">1 week</option>
              <option value="2592000">30 days</option>
              <option value="7776000">90 days</option>
              <option value="31536000">1 year</option>
            </select>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Stream (Wallet Connection Required)
          </button>
        </form>

        <div className="mt-8 card">
          <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
          <ol className="space-y-3 text-gray-600">
            <li>1. Connect your wallet to authorize the stream creation</li>
            <li>2. Approve the token transfer to the contract</li>
            <li>3. Your stream is created and funds are held securely</li>
            <li>4. The recipient can withdraw vested funds anytime</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
