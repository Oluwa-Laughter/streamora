import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration, parseUnits, validateCreateParams, formatUnits, RecipientInput } from "@streamora/sdk";
import { config } from "../../config";
import { client } from "../../lib/client";
import { addActivity, addStreamId } from "../../lib/store";
import { useWallet } from "../../contexts/WalletContext";
import { useTx } from "../../hooks/useTx";
import TxStatus from "../../components/TxStatus";
import WalletGate from "../../components/WalletGate";

const DURATIONS = [3600, 86400, 604800, 2592000, 7776000, 31536000];
const input = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent";

function Form() {
  const { address } = useWallet();
  const nav = useNavigate();
  const { state, run } = useTx();
  const [token, setToken] = useState(config.defaultToken);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(86400);
  const [recipients, setRecipients] = useState<RecipientInput[]>([{ address: "", shares: 100 }]);
  const [review, setReview] = useState(false);

  const total = recipients.reduce((s, r) => s + (Number.isFinite(r.shares) ? r.shares : 0), 0);
  const update = (i: number, patch: Partial<RecipientInput>) =>
    setRecipients((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  let parsed: bigint | null = null;
  let amountError: string | null = null;
  try { parsed = amount ? parseUnits(amount, config.decimals) : null; } catch (e) { amountError = (e as Error).message; }
  const start = Math.floor(Date.now() / 1000) + 60;
  const params = parsed !== null ? { payer: address!, recipients, token, amount: parsed, startTime: start, endTime: start + duration } : null;
  const problem = amountError ?? (params ? validateCreateParams(params) : "Enter an amount");

  const submit = async () => {
    if (!params) return;
    const res = await run(() => client.prepareCreateStream(params));
    if (res?.status === "SUCCESS") {
      const id = String(res.returnValue);
      addStreamId(address!, id);
      addActivity(address!, { hash: res.hash, kind: "create", streamId: id, amount: amount, at: Date.now(), status: "SUCCESS" });
      nav(`/app/streams/${id}`);
    }
  };

  if (review && params && !problem) {
    return (
      <div className="card space-y-4">
        <h2 className="text-2xl font-bold">Review and sign</h2>
        <p>You will lock <b>{formatUnits(params.amount, config.decimals)}</b> of token <span className="font-mono text-xs break-all">{token}</span> in the contract for <b>{formatDuration(duration)}</b>, starting in about a minute.</p>
        <ul className="text-sm space-y-1">
          {recipients.map((r) => <li key={r.address}><span className="font-mono">{r.address.slice(0, 8)}…{r.address.slice(-6)}</span>: {r.shares}%</li>)}
        </ul>
        <p className="text-sm text-gray-600">You can cancel at any time; the unvested remainder is refunded to you.</p>
        <TxStatus state={state} />
        <div className="flex gap-3">
          <button className="btn-secondary" onClick={() => setReview(false)} disabled={["simulating", "signing", "pending"].includes(state.phase)}>Back</button>
          <button className="btn-primary" onClick={submit} disabled={["simulating", "signing", "pending"].includes(state.phase)}>Sign with Freighter</button>
        </div>
      </div>
    );
  }

  return (
    <form className="card space-y-6" onSubmit={(e) => { e.preventDefault(); if (!problem) setReview(true); }}>
      <div>
        <label htmlFor="token" className="block text-sm font-medium mb-2">Token contract</label>
        <input id="token" className={input} value={token} onChange={(e) => setToken(e.target.value.trim())} />
        <p className="text-xs text-gray-500 mt-1">Defaults to native XLM on testnet. Assumes 7 decimals.</p>
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-2">Total amount</label>
        <input id="amount" className={input} inputMode="decimal" placeholder="10" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium mb-2">Duration</label>
        <select id="duration" className={input} value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
          {DURATIONS.map((d) => <option key={d} value={d}>{formatDuration(d)}</option>)}
        </select>
      </div>
      <fieldset>
        <legend className="text-sm font-medium mb-2 flex justify-between w-full">
          <span>Recipients</span>
          <button type="button" className="text-teal-600" disabled={recipients.length >= 10} onClick={() => setRecipients([...recipients, { address: "", shares: 0 }])}>+ Add</button>
        </legend>
        {recipients.map((r, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input aria-label={`Recipient ${i + 1} address`} className={input} placeholder="G…" value={r.address} onChange={(e) => update(i, { address: e.target.value.trim() })} />
            <input aria-label={`Recipient ${i + 1} share`} className="w-24 px-3 py-2 border border-gray-300 rounded-lg" type="number" min={1} max={100} value={r.shares || ""} onChange={(e) => update(i, { shares: Number(e.target.value) })} />
            {recipients.length > 1 && <button type="button" aria-label="Remove recipient" className="px-3 text-red-600" onClick={() => setRecipients(recipients.filter((_, j) => j !== i))}>✕</button>}
          </div>
        ))}
        <p className={`text-sm ${total === 100 ? "text-green-700" : "text-red-600"}`}>Total: {total}% (must be 100%)</p>
      </fieldset>
      {problem && amount && <p role="alert" className="text-sm text-red-600">{problem}</p>}
      <button className="btn-primary w-full py-3 disabled:opacity-50" disabled={!!problem}>Review</button>
    </form>
  );
}

export default function CreateStream() {
  return (
    <div className="section-container">
      <h1 className="text-4xl font-bold mb-8">Create a stream</h1>
      <div className="max-w-2xl"><WalletGate><Form /></WalletGate></div>
    </div>
  );
}
