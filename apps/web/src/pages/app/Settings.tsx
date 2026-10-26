import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    network: "testnet",
    theme: "light",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="section-container py-20">
      <h1 className="text-5xl font-bold mb-12">Settings</h1>

      <div className="max-w-2xl">
        <div className="card space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Network</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Stellar Network</label>
              <select
                name="network"
                value={settings.network}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              >
                <option value="testnet">Testnet (Recommended for testing)</option>
                <option value="public" disabled>
                  Mainnet (Coming soon)
                </option>
              </select>
              <p className="text-sm text-gray-600 mt-2">
                Currently using testnet. Mainnet deployment coming soon.
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-2xl font-bold mb-6">Preferences</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              >
                <option value="light">Light Mode</option>
                <option value="dark" disabled>
                  Dark Mode (Coming soon)
                </option>
              </select>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-2xl font-bold mb-6">Contract Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Contract Address</p>
                <p className="font-mono text-sm">CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Network</p>
                <p className="font-mono text-sm">Stellar Testnet</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-green-600 font-medium">Connected</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h2 className="text-2xl font-bold mb-6">Wallet</h2>
            <p className="text-gray-600 mb-6">
              Connect or disconnect your Stellar wallet.
            </p>
            <button className="btn-primary py-3 disabled:opacity-50" disabled>
              Manage Wallet (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
