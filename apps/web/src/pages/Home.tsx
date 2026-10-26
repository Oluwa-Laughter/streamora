import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">Money that moves with time.</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamora is open-source streaming-payments infrastructure built on Stellar using Soroban smart contracts.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/app" className="btn-primary text-lg px-8 py-3">
              Explore Streamora
            </Link>
            <Link to="/docs" className="btn-outline text-lg px-8 py-3">
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="section-container">
        <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Linear Vesting</h3>
            <p className="text-gray-600">Time-based payment streams that accrue continuously and automatically.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Stellar Native</h3>
            <p className="text-gray-600">Built on Soroban smart contracts with secure, transparent transactions.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Open Source</h3>
            <p className="text-gray-600">MIT licensed. Community-driven development on GitHub.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 section-container">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex gap-6">
            <div className="text-4xl font-bold text-teal-600 min-w-12">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Create a Stream</h3>
              <p className="text-gray-600">
                Specify the recipient, token, total amount, and time period. Your funds are held securely in the contract.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-4xl font-bold text-teal-600 min-w-12">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Funds Accrue</h3>
              <p className="text-gray-600">
                Over the specified duration, the payment amount vests linearly. Anyone can see exactly how much is available.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-4xl font-bold text-teal-600 min-w-12">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">Recipient Withdraws</h3>
              <p className="text-gray-600">
                The recipient can withdraw any portion of the vested amount at any time. No waiting for a fixed date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Start creating and managing payment streams in minutes.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/app" className="btn-primary text-lg px-8 py-3">
            Launch App
          </Link>
          <Link to="/docs/getting-started" className="btn-outline text-lg px-8 py-3">
            Setup Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
