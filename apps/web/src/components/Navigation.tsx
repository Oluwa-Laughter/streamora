import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useWallet } from "../contexts/WalletContext";

const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

export default function Navigation() {
  const { pathname } = useLocation();
  const { status, address, connect, disconnect, error, wrongNetwork } = useWallet();
  const [menu, setMenu] = useState(false);
  const inApp = pathname.startsWith("/app");
  const link = "text-gray-700 hover:text-teal-600 transition";
  const links = inApp
    ? [["/app", "Dashboard"], ["/app/streams", "Streams"], ["/app/activity", "Activity"], ["/app/settings", "Settings"]]
    : [["/", "Home"], ["/how-it-works", "How It Works"], ["/features", "Features"], ["/docs", "Docs"], ["/community", "Community"]];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
        <Link to="/" className="text-2xl font-bold gradient-text">Streamora</Link>
        <div className="flex flex-wrap gap-6 items-center">
          {links.map(([to, label]) => (
            <Link key={to} to={to} className={link}>{label}</Link>
          ))}
          {!inApp && <Link to="/app" className="btn-outline">Launch App</Link>}
          <div className="relative">
            {status === "connected" && address ? (
              <>
                <button onClick={() => setMenu(!menu)} className="btn-primary" aria-expanded={menu}>
                  {wrongNetwork ? "Wrong network" : short(address)}
                </button>
                {menu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                    <p className="font-mono text-xs break-all mb-3">{address}</p>
                    <button onClick={() => { disconnect(); setMenu(false); }} className="text-red-600">Disconnect</button>
                  </div>
                )}
              </>
            ) : (
              <button onClick={connect} className="btn-primary" disabled={status === "connecting"}>
                {status === "connecting" ? "Connecting…" : "Connect Wallet"}
              </button>
            )}
            {error && status !== "connected" && (
              <div role="alert" className="absolute right-0 mt-2 w-72 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 z-50">{error}</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
