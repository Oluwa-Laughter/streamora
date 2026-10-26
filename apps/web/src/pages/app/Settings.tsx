import { config } from "../../config";
import { useWallet } from "../../contexts/WalletContext";

export default function Settings() {
  const { address, status, wrongNetwork } = useWallet();
  const rows: [string, string][] = [
    ["Network", config.network],
    ["RPC", config.rpcUrl],
    ["Contract", config.contractId],
    ["Default token", config.defaultToken],
    ["Wallet", status === "connected" ? address! : "Not connected"],
  ];
  return (
    <div className="section-container">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <div className="card max-w-3xl space-y-4">
        {rows.map(([k, v]) => <div key={k}><p className="text-sm text-gray-600">{k}</p><p className="font-mono text-sm break-all">{v}</p></div>)}
        {wrongNetwork && <p role="alert" className="text-red-600">Freighter is on a different network than this app ({config.network}).</p>}
        <a className="text-teal-600 underline" target="_blank" rel="noopener noreferrer" href={`${config.explorer}/contract/${config.contractId}`}>View contract on explorer</a>
        <p className="text-sm text-gray-500">Network and contract are set at build time via VITE_* environment variables.</p>
      </div>
    </div>
  );
}
