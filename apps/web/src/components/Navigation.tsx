import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import { useState } from "react";

export default function Navigation() {
  const location = useLocation();
  const { isConnected, publicKey, connectWallet, disconnectWallet, error } = useWallet();
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  const isAppPage = location.pathname.startsWith("/app");

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold gradient-text">
            Streamora
          </Link>

          <div className="flex gap-8 items-center">
            {!isAppPage && (
              <>
                <Link to="/" className="text-gray-700 hover:text-teal-600 transition">
                  Home
                </Link>
                <Link to="/how-it-works" className="text-gray-700 hover:text-teal-600 transition">
                  How It Works
                </Link>
                <Link to="/features" className="text-gray-700 hover:text-teal-600 transition">
                  Features
                </Link>
                <Link to="/docs" className="text-gray-700 hover:text-teal-600 transition">
                  Docs
                </Link>
                <Link to="/community" className="text-gray-700 hover:text-teal-600 transition">
                  Community
                </Link>
              </>
            )}

            {isAppPage && (
              <>
                <Link to="/app" className="text-gray-700 hover:text-teal-600 transition">
                  Dashboard
                </Link>
                <Link to="/app/streams" className="text-gray-700 hover:text-teal-600 transition">
                  Streams
                </Link>
                <Link to="/app/activity" className="text-gray-700 hover:text-teal-600 transition">
                  Activity
                </Link>
                <Link to="/app/settings" className="text-gray-700 hover:text-teal-600 transition">
                  Settings
                </Link>
              </>
            )}

            <div className="relative">
              {isConnected ? (
                <>
                  <button
                    onClick={() => setShowWalletMenu(!showWalletMenu)}
                    className="btn-primary"
                  >
                    {formatAddress(publicKey!)}
                  </button>
                  {showWalletMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-gray-200">
                        <p className="text-sm text-gray-600">Connected Wallet</p>
                        <p className="font-mono text-xs break-all">{publicKey}</p>
                      </div>
                      <button
                        onClick={() => {
                          disconnectWallet();
                          setShowWalletMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button onClick={connectWallet} className="btn-primary">
                  Connect Wallet
                </button>
              )}
              {error && (
                <div className="absolute right-0 mt-2 w-64 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 z-50">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
