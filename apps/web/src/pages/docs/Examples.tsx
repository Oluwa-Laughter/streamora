export default function Examples() {
  return (
    <div className="section-container py-20">
      <h1 className="text-4xl font-bold mb-6">Code Examples</h1>

      <div className="prose prose-invert max-w-4xl space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">Creating a Stream</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`import { StreamoraClient, Network } from "streamora-sdk";

const client = new StreamoraClient({
  network: Network.TESTNET,
  contractId: "CBQHNAXSI...",
  signerPublicKey: "GBBD47UZ...",
});

const streamParams = {
  recipientAddress: "GBBD47UZ...",
  tokenAddress: "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4",
  amount: 1000000000n, // 100 tokens with 7 decimals
  startTime: Math.floor(Date.now() / 1000),
  endTime: Math.floor(Date.now() / 1000) + 2592000, // 30 days
};

// Validate before submitting
const { valid, error } = client.validateStreamParams(streamParams);
if (!valid) {
  console.error("Invalid params:", error);
  return;
}

// Prepare transaction (you'll need to sign and submit this)
const txn = await client.prepareCreateStream(streamParams);`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Checking Vested Amount</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`const stream = {
  id: "stream-123",
  payer: "GBBD47UZ...",
  recipient: "GCPD7RQ36SUNEE7GXLRG5 ГРАД...",
  token: "CAAAAAAA...",
  amount: 1000000000n,
  startTime: 1700000000,
  endTime: 1702592000,
  withdrawn: 100000000n,
  isCancelled: false,
};

// Get current vested amount
const vestedAmount = await client.getVestedAmount(stream);
console.log("Vested:", vestedAmount.toString());

// Get withdrawable amount
const withdrawable = await client.getWithdrawableAmount(stream);
console.log("Withdrawable:", withdrawable.toString());

// Get full stream info
const info = await client.getStreamInfo(stream);
console.log("Current time:", info.currentTime);
console.log("Vested:", info.vestedAmount.toString());
console.log("Withdrawable:", info.withdrawableAmount.toString());`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Withdrawing Funds</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`// Check how much we can withdraw
const withdrawable = await client.getWithdrawableAmount(stream);

// Withdraw half of what's available
const withdrawAmount = withdrawable / 2n;

// Prepare withdrawal transaction
const withdrawTxn = await client.prepareWithdraw(stream, {
  streamId: stream.id,
  amount: withdrawAmount,
});

// Sign and submit the transaction (implementation depends on your wallet)`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Formatting for Display</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`import {
  toSmallestUnit,
  fromSmallestUnit,
  formatDate,
  formatDuration,
} from "streamora-sdk";

// User enters 100 tokens
const userInput = 100;
const stroops = toSmallestUnit(userInput, 7); // 1000000000n

// Convert back for display
const displayAmount = fromSmallestUnit(stroops, 7); // 100

// Format timestamps
const startDate = formatDate(1700000000); // "Nov 15, 2023"
const duration = formatDuration(2592000); // "30 days"

console.log(\`Stream from \${startDate} for \${duration}\`);`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
