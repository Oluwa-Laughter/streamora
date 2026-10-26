export default function Features() {
  const implemented = [
    {
      title: "Linear Time-Based Vesting",
      description: "Payments accrue continuously based on elapsed time. Simple, predictable, and auditable.",
      icon: "📈",
    },
    {
      title: "Stellar Native",
      description: "Built on Soroban smart contracts. Secure, transparent, and fully on-chain.",
      icon: "🌟",
    },
    {
      title: "TypeScript SDK",
      description: "Easy integration with a clean, type-safe SDK. No private keys embedded.",
      icon: "⚙️",
    },
    {
      title: "React Dashboard",
      description: "Intuitive web interface for creating and managing streams.",
      icon: "💻",
    },
    {
      title: "Cancellation and Multi-Recipient Streams",
      description: "Payers can cancel and reclaim the unvested part. Up to 10 recipients per stream with percentage shares.",
      icon: "🔀",
    },
    {
      title: "Open Source",
      description: "MIT licensed. Full source code available on GitHub. Community-driven.",
      icon: "🔓",
    },
    {
      title: "Comprehensive Documentation",
      description: "Architecture docs, API reference, security model, and deployment guides.",
      icon: "📚",
    },
  ];

  const planned = [
    {
      title: "Batch Operations",
      description: "Create multiple streams in a single transaction.",
    },
    {
      title: "Stream Pause/Resume",
      description: "Temporarily suspend accrual without cancelling the stream.",
    },
    {
      title: "Advanced Vesting Curves",
      description: "Support for non-linear vesting patterns and milestones.",
    },
    {
      title: "Mainnet Deployment",
      description: "Security audit and production-grade mainnet deployment.",
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">Features</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful, secure streaming payments on Stellar.
          </p>
        </div>
      </section>

      <section className="section-container">
        <h2 className="text-4xl font-bold text-center mb-12">✅ Implemented (testnet, unaudited)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {implemented.map((feature) => (
            <div key={feature.title} className="card hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 section-container">
        <h2 className="text-4xl font-bold text-center mb-12">🔄 Planned (Roadmap)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {planned.map((feature) => (
            <div key={feature.title} className="card border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-bold mb-2 text-gray-700">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container text-center">
        <h2 className="text-4xl font-bold mb-6">Have a Feature Request?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamora is open-source and community-driven. Share your ideas on GitHub.
        </p>
        <a
          href="https://github.com/Strea-mora/Streamora/issues"
          className="btn-primary text-lg px-8 py-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Issues
        </a>
      </section>
    </div>
  );
}
