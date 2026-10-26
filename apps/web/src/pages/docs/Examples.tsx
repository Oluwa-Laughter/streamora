const withdraw = `const w = await client.getWithdrawable(streamId, me);
const prepared = await client.prepareWithdraw(streamId, me, w);
const { signedTxXdr } = await signTransaction(prepared.xdr, {
  networkPassphrase: prepared.networkPassphrase,
});
const result = await client.submit(signedTxXdr);
if (result.status === "SUCCESS") console.log("withdrawn", result.hash);`;

const cancel = `const prepared = await client.prepareCancel(streamId, payer);
// sign + submit as above; result.returnValue is the refunded (unvested) amount`;

export default function Examples() {
  return (
    <div className="section-container">
      <h1 className="text-4xl font-bold mb-6">Examples</h1>
      <p className="text-gray-600 mb-6">These calls were exercised against the testnet contract.</p>
      <h2 className="text-2xl font-bold mb-2">Withdraw</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm mb-8"><code>{withdraw}</code></pre>
      <h2 className="text-2xl font-bold mb-2">Cancel (payer only)</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm"><code>{cancel}</code></pre>
    </div>
  );
}
