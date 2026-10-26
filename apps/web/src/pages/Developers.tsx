import { Link } from "react-router-dom";

export default function Developers() {
  return (
    <div>
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">Build with Streamora</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Integrate streaming payments into your application. Full documentation and TypeScript SDK.
          </p>
          <Link to="/docs/getting-started" className="btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
        </div>
      </section>

      <section className="section-container">
        <h2 className="text-4xl font-bold text-center mb-12">Developer Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">📚 Full Documentation</h3>
            <p className="text-gray-600 mb-6">
              Comprehensive guides covering architecture, smart contracts, SDK, and deployment.
            </p>
            <Link to="/docs" className="text-teal-600 font-medium hover:text-teal-700">
              Read Docs →
            </Link>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-4">⚙️ TypeScript SDK</h3>
            <p className="text-gray-600 mb-6">
              Type-safe SDK with validation, amount formatting, and contract interaction.
            </p>
            <Link to="/docs/sdk" className="text-teal-600 font-medium hover:text-teal-700">
              SDK Reference →
            </Link>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-4">🔐 Security & Audits</h3>
            <p className="text-gray-600 mb-6">
              Learn about security assumptions, threat model, and limitations.
            </p>
            <Link to="/docs/security" className="text-teal-600 font-medium hover:text-teal-700">
              Security Info →
            </Link>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-4">💻 Code Examples</h3>
            <p className="text-gray-600 mb-6">
              Real working examples of stream creation, withdrawal, and contract interaction.
            </p>
            <Link to="/docs/examples" className="text-teal-600 font-medium hover:text-teal-700">
              View Examples →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 section-container">
        <h2 className="text-4xl font-bold text-center mb-12">Quick Start</h2>
        <div className="max-w-2xl mx-auto">
          <ol className="space-y-6">
            <li className="flex gap-6">
              <div className="text-3xl font-bold text-teal-600 min-w-12">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Setup Stellar Tools</h3>
                <p className="text-gray-600">
                  Install Rust, Soroban CLI, and Node.js.
                </p>
              </div>
            </li>
            <li className="flex gap-6">
              <div className="text-3xl font-bold text-teal-600 min-w-12">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Install the SDK</h3>
                <p className="text-gray-600">
                  <code className="bg-white p-2 rounded border border-gray-200">npm install streamora-sdk</code>
                </p>
              </div>
            </li>
            <li className="flex gap-6">
              <div className="text-3xl font-bold text-teal-600 min-w-12">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Follow the Guide</h3>
                <p className="text-gray-600">
                  Read the Getting Started documentation for step-by-step instructions.
                </p>
              </div>
            </li>
            <li className="flex gap-6">
              <div className="text-3xl font-bold text-teal-600 min-w-12">4</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Build & Deploy</h3>
                <p className="text-gray-600">
                  Deploy to testnet, then mainnet when ready.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section-container text-center">
        <h2 className="text-4xl font-bold mb-6">Contribute to Streamora</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamora is open-source and MIT licensed. We welcome contributions, bug reports, and community feedback.
        </p>
        <Link to="/community" className="btn-primary text-lg px-8 py-3">
          Learn How to Contribute
        </Link>
      </section>
    </div>
  );
}
