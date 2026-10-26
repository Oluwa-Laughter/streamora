import { Link } from "react-router-dom";

export default function DocsHome() {
  const sections = [
    {
      title: "Getting Started",
      description: "Setup your environment and create your first stream in minutes.",
      link: "/docs/getting-started",
    },
    {
      title: "Core Concepts",
      description: "Understand vesting, streams, withdrawals, and how the protocol works.",
      link: "/docs/concepts",
    },
    {
      title: "Smart Contracts",
      description: "Deep dive into the Soroban contract architecture and design.",
      link: "/docs/smart-contracts",
    },
    {
      title: "SDK Reference",
      description: "Complete TypeScript SDK API documentation and examples.",
      link: "/docs/sdk",
    },
    {
      title: "Code Examples",
      description: "Working examples of common tasks and integration patterns.",
      link: "/docs/examples",
    },
    {
      title: "Security",
      description: "Security assumptions, threat model, and known limitations.",
      link: "/docs/security",
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to build streaming payments on Stellar.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <Link
              key={section.title}
              to={section.link}
              className="card hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-3 text-teal-600">{section.title}</h3>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <span className="text-teal-600 font-medium">Read more →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 section-container">
        <h2 className="text-4xl font-bold text-center mb-8">Still Have Questions?</h2>
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <p className="text-gray-600">
            Check out our GitHub repository or join the Stellar community.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/Strea-mora/Streamora"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
            <a
              href="https://stellar.org/community"
              className="btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stellar Community
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
