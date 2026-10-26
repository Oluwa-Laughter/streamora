export default function Roadmap() {
  const phases = [
    {
      phase: "Alpha (Current)",
      status: "In Progress",
      features: [
        "✅ Linear time-based vesting",
        "✅ Single-recipient streams",
        "✅ Withdrawal functionality",
        "✅ Stream cancellation",
        "✅ TypeScript SDK",
        "✅ React dashboard",
      ],
    },
    {
      phase: "Beta",
      status: "Planned",
      features: [
        "🔄 Multi-recipient streams",
        "🔄 Batch stream creation",
        "🔄 Stream pause/resume",
        "🔄 Advanced stream types",
        "🔄 Enhanced dashboard analytics",
        "🔄 Mobile app support",
      ],
    },
    {
      phase: "Production",
      status: "Future",
      features: [
        "📋 Third-party audit",
        "📋 Mainnet deployment",
        "📋 Cross-chain bridges",
        "📋 Decentralized governance",
        "📋 Plugin ecosystem",
        "📋 Institutional integrations",
      ],
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">Roadmap</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamora is in active development. Here's what's coming next.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="space-y-12">
          {phases.map((phase) => (
            <div key={phase.phase} className="border-l-4 border-teal-600 pl-6">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold">{phase.phase}</h2>
                <span className={`px-4 py-2 rounded-full text-white font-medium ${
                  phase.status === "In Progress"
                    ? "bg-teal-600"
                    : phase.status === "Planned"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}>
                  {phase.status}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.features.map((feature) => (
                  <li key={feature} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 section-container text-center">
        <h2 className="text-4xl font-bold mb-6">Help Shape the Future</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamora is open-source. If you have feature ideas, bug reports, or want to contribute,
          join us on GitHub.
        </p>
        <a
          href="https://github.com/Strea-mora/Streamora"
          className="btn-primary text-lg px-8 py-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </section>
    </div>
  );
}
