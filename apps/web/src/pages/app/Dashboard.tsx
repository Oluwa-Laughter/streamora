import { Link } from "react-router-dom";
import { useWallet } from "../../contexts/WalletContext";
import { getStreamIds } from "../../lib/store";

export default function Dashboard() {
  const { status, address, connect, error } = useWallet();
  const count = address ? getStreamIds(address).length : 0;
  return (
    <div className="section-container">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card"><p className="text-gray-600">Wallet</p><p className="text-xl font-bold">{status === "connected" ? "Connected" : "Not connected"}</p></div>
        <div className="card"><p className="text-gray-600">Your streams (this browser)</p><p className="text-3xl font-bold">{count}</p></div>
        <div className="card"><p className="text-gray-600">Network</p><p className="text-xl font-bold">Stellar Testnet</p></div>
      </div>
      {status !== "connected" ? (
        <div className="card">
          <p className="mb-4">Connect Freighter (set to Testnet) to create and manage streams.</p>
          {error && <p role="alert" className="text-red-600 mb-3">{error}</p>}
          <button className="btn-primary" onClick={connect}>Connect Wallet</button>
        </div>
      ) : (
        <div className="flex gap-4"><Link to="/app/streams/create" className="btn-primary">Create stream</Link><Link to="/app/streams" className="btn-outline">View streams</Link></div>
      )}
    </div>
  );
}
