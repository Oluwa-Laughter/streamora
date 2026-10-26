import { useWallet } from "../../contexts/WalletContext";
import { getActivity } from "../../lib/store";
import { config } from "../../config";
import { Link } from "react-router-dom";

const label = { create: "Created stream", withdraw: "Withdrew", cancel: "Cancelled stream" } as const;

export default function Activity() {
  const { address } = useWallet();
  const items = address ? getActivity(address) : [];
  return (
    <div className="section-container">
      <h1 className="text-4xl font-bold mb-8">Activity</h1>
      {!address ? <p>Connect your wallet to see activity.</p> : items.length === 0 ? (
        <div className="card text-center py-12"><p>No activity recorded in this browser yet.</p></div>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <div key={a.hash} className="card flex justify-between">
              <div>
                <b>{label[a.kind]}</b> <Link className="text-teal-600" to={`/app/streams/${a.streamId}`}>#{a.streamId}</Link>
                {a.amount && <span> · {a.amount}</span>}
                <p className="text-sm text-gray-600">{new Date(a.at).toLocaleString()}</p>
              </div>
              <a className="text-sm underline" target="_blank" rel="noopener noreferrer" href={`${config.explorer}/tx/${a.hash}`}>{a.hash.slice(0, 10)}…</a>
            </div>
          ))}
        </div>
      )}
      <p className="text-sm text-gray-500 mt-6">History is saved only in this browser. The blockchain explorer holds the full record.</p>
    </div>
  );
}
