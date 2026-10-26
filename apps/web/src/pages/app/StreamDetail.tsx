import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Stream, StreamoraClient, calculateVestedAmount, formatDate, formatUnits, parseError } from "@streamora/sdk";
import { config } from "../../config";
import { client } from "../../lib/client";
import { addActivity, addStreamId } from "../../lib/store";
import { useWallet } from "../../contexts/WalletContext";
import { useTx } from "../../hooks/useTx";
import TxStatus from "../../components/TxStatus";

const fmt = (v: bigint) => formatUnits(v, config.decimals);

export default function StreamDetail() {
  const { id = "" } = useParams();
  const { address, status } = useWallet();
  const [stream, setStream] = useState<Stream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const { state, run } = useTx();

  const load = useCallback(async () => {
    try { setStream(await client.getStream(BigInt(id))); setError(null); } catch (e) { setError(parseError(e).message); }
  }, [id]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (stream && address && (stream.payer === address || stream.recipients.some((r) => r.address === address))) addStreamId(address, id); }, [stream, address, id]);

  if (error) return <div className="section-container"><div className="card"><p role="alert" className="text-red-600">{error}</p><Link to="/app/streams" className="text-teal-600">← Back to streams</Link></div></div>;
  if (!stream) return <div className="section-container">Loading…</div>;

  const t = stream.cancelledAt !== null ? Math.min(now, stream.cancelledAt) : now;
  const vested = calculateVestedAmount(stream.amount, stream.startTime, stream.endTime, t);
  const pct = stream.amount > 0n ? Number((vested * 10000n) / stream.amount) / 100 : 0;
  const me = stream.recipients.find((r) => r.address === address);
  const mine = address ? StreamoraClient.withdrawableAt(stream, address, now) : 0n;
  const isPayer = address === stream.payer;
  const busy = ["simulating", "signing", "pending"].includes(state.phase);

  const cancel = async () => {
    const res = await run(() => client.prepareCancel(stream.id, address!));
    if (res?.status === "SUCCESS") { addActivity(address!, { hash: res.hash, kind: "cancel", streamId: id, at: Date.now(), status: "SUCCESS" }); load(); }
  };

  return (
    <div className="section-container">
      <Link to="/app/streams" className="text-teal-600">← Streams</Link>
      <h1 className="text-4xl font-bold my-6">Stream #{id} {stream.cancelledAt !== null && <span className="text-red-600 text-xl">cancelled</span>}</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card"><p className="text-gray-600">Total</p><p className="text-3xl font-bold">{fmt(stream.amount)}</p></div>
        <div className="card"><p className="text-gray-600">Vested</p><p className="text-3xl font-bold">{fmt(vested)}</p></div>
        <div className="card"><p className="text-gray-600">Your withdrawable</p><p className="text-3xl font-bold">{me ? fmt(mine) : "—"}</p></div>
      </div>
      <div className="card mb-8">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-teal-600" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2"><span>{formatDate(stream.startTime)}</span><span>{pct.toFixed(2)}%</span><span>{formatDate(stream.endTime)}</span></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card space-y-2 text-sm">
          <p><b>Payer:</b> <span className="font-mono break-all">{stream.payer}</span></p>
          <p><b>Token:</b> <span className="font-mono break-all">{stream.token}</span></p>
          <p className="font-bold pt-2">Recipients</p>
          {stream.recipients.map((r) => <p key={r.address} className="font-mono break-all">{r.shares}% {r.address} (withdrawn {fmt(r.withdrawn)})</p>)}
        </div>
        <div className="card space-y-3">
          <h2 className="text-xl font-bold">Actions</h2>
          {status !== "connected" && <p className="text-gray-600">Connect your wallet to withdraw or cancel.</p>}
          {me && <Link to={`/app/streams/${id}/withdraw`} className="btn-primary block text-center">Withdraw</Link>}
          {isPayer && stream.cancelledAt === null && <button className="btn-secondary w-full" onClick={cancel} disabled={busy}>Cancel stream (refund unvested)</button>}
          {address && !me && !isPayer && <p className="text-gray-600">Your account is not part of this stream.</p>}
          <TxStatus state={state} />
        </div>
      </div>
    </div>
  );
}
