export default function GettingStarted() {
  return (
    <div className="section-container py-20">
      <h1 className="text-4xl font-bold mb-6">Getting Started</h1>

      <div className="prose prose-invert max-w-4xl space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Rust 1.70+ with Soroban tools</li>
            <li>Node.js 18+</li>
            <li>A Stellar testnet wallet (Freighter recommended)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Installation</h2>
          <p className="text-gray-600 mb-4">Clone the repository and install dependencies:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{`git clone https://github.com/Strea-mora/Streamora.git
cd Streamora
npm install`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Set Up Stellar Environment</h2>
          <p className="text-gray-600 mb-4">Install the Soroban CLI:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{`rustup update
cargo install soroban-cli`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Run the Development Server</h2>
          <p className="text-gray-600 mb-4">Start the web application:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{`npm run dev`}</code>
          </pre>
          <p className="text-gray-600 mt-4">Visit http://localhost:5173 in your browser.</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Build the Smart Contract</h2>
          <p className="text-gray-600 mb-4">Compile the Soroban contract:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{`cd contracts/streaming
cargo build --target wasm32-unknown-unknown --release`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Deploy to Testnet</h2>
          <p className="text-gray-600 mb-4">
            Follow the deployment guide to deploy contracts to Stellar testnet:
          </p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{`soroban contract deploy \\
  --wasm target/wasm32-unknown-unknown/release/streamora_streaming.wasm \\
  --source-account <your-account> \\
  --network testnet`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Next Steps</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Read the Core Concepts guide to understand vesting</li>
            <li>Review Smart Contracts architecture</li>
            <li>Explore SDK examples for integration</li>
            <li>Join the Stellar community for support</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
