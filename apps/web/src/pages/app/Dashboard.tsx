import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    { label: "Connected", value: "—" },
    { label: "Active Streams", value: "0" },
    { label: "Total Vested", value: "$0.00" },
    { label: "Available to Withdraw", value: "$0.00" },
  ];

  return (
    <div className="section-container py-20">
      <h1 className="text-5xl font-bold mb-12">Dashboard</h1>

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
          <Link to="/app/streams/create" className="btn-primary">
            Create Stream
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

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <p className="text-gray-600 mb-4">
          Connect your wallet to start creating and managing payment streams.
        </p>
        <button className="btn-primary" disabled>
          Connect Wallet (Coming Soon)
        </button>
      </div>
    </div>
  );
}
