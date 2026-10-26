export default function SDK() {
  return (
    <div className="section-container py-20">
      <h1 className="text-4xl font-bold mb-6">TypeScript SDK</h1>

      <div className="prose prose-invert max-w-4xl space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">Installation</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`npm install streamora-sdk`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Client Initialization</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`import { StreamoraClient, Network } from "streamora-sdk";

const client = new StreamoraClient({
  network: Network.TESTNET,
  contractId: "CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI",
  signerPublicKey: "GBBD47UZM2HO7K4E2YSQWPHWVXJ35Z5GBHB5ETUVFSXLBF2ZKOZWS7AG",
});`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Core Methods</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-teal-600 mb-2">getVestedAmount()</h3>
              <p className="text-gray-600 mb-2">Calculate vested amount at current time.</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                <code>{`const vestedAmount = await client.getVestedAmount(stream);
console.log(vestedAmount.toString()); // BigInt`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-teal-600 mb-2">getWithdrawableAmount()</h3>
              <p className="text-gray-600 mb-2">Get amount available for withdrawal.</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                <code>{`const withdrawable = await client.getWithdrawableAmount(stream);`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-teal-600 mb-2">prepareCreateStream()</h3>
              <p className="text-gray-600 mb-2">Prepare stream creation transaction.</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                <code>{`const txn = await client.prepareCreateStream({
  recipientAddress: "G...",
  tokenAddress: "C...",
  amount: 1000000000n,
  startTime: Math.floor(Date.now() / 1000),
  endTime: Math.floor(Date.now() / 1000) + 2592000,
});`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-teal-600 mb-2">validateStreamParams()</h3>
              <p className="text-gray-600 mb-2">Validate stream creation parameters.</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                <code>{`const { valid, error } = client.validateStreamParams(params);
if (!valid) console.error(error);`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Utility Functions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-teal-600">calculateVestedAmount()</h3>
              <p className="text-gray-600">Calculate vesting with explicit time parameter.</p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">toSmallestUnit()</h3>
              <p className="text-gray-600">Convert amount to stroops (7 decimals).</p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">fromSmallestUnit()</h3>
              <p className="text-gray-600">Convert stroops back to human-readable format.</p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">formatDate() / formatDuration()</h3>
              <p className="text-gray-600">Format timestamps and durations for display.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Type Definitions</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`interface Stream {
  id: string;
  payer: string;
  recipient: string;
  token: string;
  amount: bigint;
  startTime: number;
  endTime: number;
  withdrawn: bigint;
  isCancelled: boolean;
}

interface StreamInfo {
  stream: Stream;
  vestedAmount: bigint;
  withdrawableAmount: bigint;
  currentTime: number;
}`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
