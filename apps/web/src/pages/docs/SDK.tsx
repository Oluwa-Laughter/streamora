export default function SDK() {
  const code = `import { StreamoraClient, parseUnits } from "@streamora/sdk";

const client = new StreamoraClient({ network: "testnet", contractId: "C..." });

const prepared = await client.prepareCreateStream({
  payer, recipients: [{ address: bob, shares: 100 }],
  token, amount: parseUnits("10", 7),
  startTime: now + 60, endTime: now + 86400,
});
const { signedTxXdr } = await signTransaction(prepared.xdr, {
  networkPassphrase: prepared.networkPassphrase,
});
const result = await client.submit(signedTxXdr);`;
  return (
    <div className="section-container">
      <h1 className="text-4xl font-bold mb-6">TypeScript SDK</h1>
      <p className="text-gray-600 mb-6">
        The SDK prepares and simulates transactions; your wallet signs; you submit. It never holds keys.
        Amounts are <code>bigint</code> in the token&apos;s smallest unit.
      </p>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm mb-8"><code>{code}</code></pre>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li><code>getStream(id)</code>, <code>getWithdrawable(id, who)</code></li>
        <li><code>prepareCreateStream</code>, <code>prepareWithdraw</code>, <code>prepareCancel</code></li>
        <li><code>submit(signedXdr)</code> waits for a final SUCCESS or FAILED result</li>
        <li><code>parseUnits</code> / <code>formatUnits</code> for exact decimal conversion</li>
        <li><code>StreamoraError</code> with readable contract error messages</li>
      </ul>
    </div>
  );
}
