export default function Features() {
  return (
    <div className="section-container">
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">✅ Linear Time-Based Vesting</h3>
          <p>Payments accrue continuously based on elapsed time. Simple, predictable, and auditable.</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">✅ Stellar Native</h3>
          <p>Built on Soroban smart contracts. Secure, transparent, and fully on-chain.</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">✅ TypeScript SDK</h3>
          <p>Easy integration with a clean, type-safe SDK. No private keys embedded.</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">✅ React Dashboard</h3>
          <p>Intuitive web interface for creating and managing streams.</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">🔄 Planned: Stream Cancellation</h3>
          <p>Payers can reclaim unvested funds. Full specification coming soon.</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">🔄 Planned: Multi-Recipient Streams</h3>
          <p>Split payments across multiple recipients in a single stream.</p>
        </div>
      </div>
    </div>
  );
}
