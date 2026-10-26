import { ReactNode } from "react";
import { useWallet } from "../contexts/WalletContext";

export default function WalletGate({ children }: { children: ReactNode }) {
  const { status, wrongNetwork, connect, error } = useWallet();
  if (status !== "connected") {
    return (
      <div className="card text-center py-12">
        <p className="text-xl mb-4">Connect your Freighter wallet to continue</p>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button onClick={connect} className="btn-primary" disabled={status === "connecting"}>
          {status === "connecting" ? "Connecting…" : "Connect Wallet"}
        </button>
      </div>
    );
  }
  if (wrongNetwork) {
    return (
      <div className="card bg-yellow-50 border-yellow-200">
        <p className="font-bold">Wrong network</p>
        <p>Switch Freighter to the Stellar Testnet and reload this page.</p>
      </div>
    );
  }
  return <>{children}</>;
}
