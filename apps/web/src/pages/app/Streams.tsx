import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stream, formatUnits, formatDate } from "@streamora/sdk";
import { config } from "../../config";
import { client } from "../../lib/client";
import { getStreamIds } from "../../lib/store";
import { useWallet } from "../../contexts/WalletContext";
import WalletGate from "../../components/WalletGate";

function List() {
  const { address } = useWallet();
  const nav = useNavigate();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [lookup, setLookup] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      const found = await Promise.all(getStreamIds(address!).map((id) => client.getStream(BigInt(id)).catch(() => null)));
      if (alive) { setStreams(found.filter((s): s is Stream => !!s)); setLoading(false); }
    })();
    return () => { alive = false; };
  }, [address]);

  return (
    <>
      <form className="flex gap-2 mb-8" onSubmit={(e) => { e.preventDefault(); if (/^\d+$/.test(lookup)) nav(`/app/streams/${lookup}`); }}>
        <input aria-label="Stream ID" className="px-4 py-2 border border-gray-300 rounded-lg" placeholder="Open a stream by ID" value={lookup} onChange={(e) => setLookup(e.target.value.trim())} />
        <button className="btn-secondary">Open</button>
      </form>
      {loading ? <p>Loading…</p> : streams.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-xl mb-2">No streams saved in this browser</p>
          <p className="text-gray-600 mb-6">Streams you create here appear in this list. If someone streams to you, open it using the ID they share.</p>
          <Link to="/app/streams/create" className="btn-primary">Create a stream</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {streams.map((s) => (
            <Link key={String(s.id)} to={`/app/streams/${s.id}`} className="card block hover:shadow-md">
              <div className="flex justify-between">
                <div>
                  <b>Stream #{String(s.id)}</b>{s.cancelledAt !== null && <span className="ml-2 text-red-600 text-sm">cancelled</span>}
                  <p className="text-sm text-gray-600">{formatDate(s.startTime)} → {formatDate(s.endTime)}</p>
                </div>
                <b>{formatUnits(s.amount, config.decimals)}</b>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default function Streams() {
  return (
    <div className="section-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Streams</h1>
        <Link to="/app/streams/create" className="btn-primary">Create stream</Link>
      </div>
      <WalletGate><List /></WalletGate>
    </div>
  );
}
