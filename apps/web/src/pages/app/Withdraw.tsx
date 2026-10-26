import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Stream, StreamoraClient, formatUnits, parseError, parseUnits } from "@streamora/sdk";
import { config } from "../../config";
import { client } from "../../lib/client";
import { addActivity } from "../../lib/store";
import { useWallet } from "../../contexts/WalletContext";
import { useTx } from "../../hooks/useTx";
import TxStatus from "../../components/TxStatus";
import WalletGate from "../../components/WalletGate";

function Form({ id }: { id: string }) {
  const { address } = useWallet();
  const nav = useNavigate();
  const { state, run } = useTx();
  const [stream, setStream] = useState<Stream | null>(null);
  const [available, setAvailable] = useState<bigint>(0n);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const s = await client.getStream(BigInt(id));
        setStream(s);
        const w = await client.getWithdrawable(s.id, address!).catch(() => StreamoraClient.withdrawableAt(s, address!, Math.floor(Date.now() / 1000)));
        setAvailable(w);
        setAmount(formatUnits(w, config.decimals));
      } catch (e) { setError(parseError(e).message); }
    })();
  }, [id, address]);

  if (error) return <p role="alert" className="text-red-600">{error}</p>;
  if (!stream) return <p>Loading…</p>;
  if (!stream.recipients.some((r) => r.address === address)) return <p>Your account is not a recipient of this stream.</p>;

  let parsed: bigint | null = null;
  let problem: string | null = null;
  try { parsed = parseUnits(amount || "0", config.decimals); } catch (e) { problem = (e as Error).message; }
  if (!problem && parsed !== null) {
    if (parsed <= 0n) problem = "Enter an amount greater than zero";
    else if (parsed > available) problem = "Amount exceeds what is currently withdrawable";
  }
  const busy = ["simulating", "signing", "pending"].includes(state.phase);

  const submit = async () => {
    const res = await run(() => client.prepareWithdraw(stream.id, address!, parsed!));
    if (res?.status === "SUCCESS") {
      addActivity(address!, { hash: res.hash, kind: "withdraw", streamId: id, amount, at: Date.now(), status: "SUCCESS" });
      setTimeout(() => nav(`/app/streams/${id}`), 1500);
    }
  };

  return (
    <div className="card space-y-4">
      <p>Withdrawable now: <b>{formatUnits(available, config.decimals)}</b></p>
      <div>
        <label htmlFor="w" className="block text-sm font-medium mb-2">Amount to withdraw</label>
        <input id="w" className="w-full px-4 py-2 border border-gray-300 rounded-lg" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="button" className="text-teal-600 text-sm mt-1" onClick={() => setAmount(formatUnits(available, config.decimals))}>Max</button>
      </div>
      {problem && <p role="alert" className="text-sm text-red-600">{problem}</p>}
      <TxStatus state={state} />
      <button className="btn-primary w-full py-3 disabled:opacity-50" disabled={!!problem || busy} onClick={submit}>Sign withdrawal with Freighter</button>
    </div>
  );
}

export default function Withdraw() {
  const { id = "" } = useParams();
  return (
    <div className="section-container">
      <Link to={`/app/streams/${id}`} className="text-teal-600">← Stream #{id}</Link>
      <h1 className="text-4xl font-bold my-6">Withdraw</h1>
      <div className="max-w-xl"><WalletGate><Form id={id} /></WalletGate></div>
    </div>
  );
}
