import { Link } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";

export default function Dashboard() {
  const { isConnected, publicKey } = useWallet();

  const stats = [
    { label: "Connected", value: isConnected ? "✅ Yes" : "❌ No" },
    { label: "Active Streams", value: "0" },
    { label: "Total Vested", value: "$0.00" },
    { label: "Available to Withdraw", value: "$0.00" },
  ];

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-10)}`;
  };

  return (
    <div className="section-container py-20">
      <h1 className="text-5xl font-bold mb-12">Dashboard</h1>

      {isConnected && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12">
          <p className="text-green-700">
            <span className="font-bold">✓ Connected:</span> {formatAddress(publicKey!)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="card text-center">
            <p className="text-gray-600 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Your Streams</h2>
          <p className="text-gray-600 mb-6">
            No streams yet. Create your first payment stream to get started.
          </p>
          <Link
            to="/app/streams/create"
            className={`btn-primary ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={(e) => !isConnected && e.preventDefault()}
          >
            {isConnected ? "Create Stream" : "Connect Wallet First"}
          </Link>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/app/streams" className="block text-teal-600 font-medium hover:text-teal-700">
              → View all streams
            </Link>
            <Link to="/app/activity" className="block text-teal-600 font-medium hover:text-teal-700">
              → View activity history
            </Link>
            <Link to="/app/settings" className="block text-teal-600 font-medium hover:text-teal-700">
              → Network settings
            </Link>
          </div>
        </div>
      </div>

      {!isConnected && (
        <div className="card bg-blue-50 border-blue-200">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            Connect your Freighter wallet to start creating and managing payment streams. Your wallet secures all
            transactions.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Don't have Freighter? Download it from{" "}
            <a
              href="https://www.freighter.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              freighter.app
            </a>
          </p>
        </div>
      )}

      {isConnected && (
        <div className="card bg-teal-50 border-teal-200">
          <h2 className="text-2xl font-bold mb-4">🚀 Ready to Stream</h2>
          <p className="text-gray-600 mb-6">
            Your wallet is connected and you're ready to create payment streams. Navigate to the Streams section to get
            started.
          </p>
          <Link to="/app/streams/create" className="btn-primary">
            Create Your First Stream
          </Link>
        </div>
      )}
    </div>
  );
}
