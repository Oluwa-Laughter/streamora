export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">About Streamora</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Open-source streaming payments infrastructure on Stellar.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              Streamora exists to make streaming payments accessible, auditable, and trustless.
              Traditional finance has payroll systems, subscription services, and contract management.
              Blockchain has nothing equivalent—until now.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Why Streaming Payments?</h2>
            <p className="text-gray-600 mb-4">
              The real world runs on streams. Salaries accrue daily. Rent covers 30 days.
              Contracts unfold over months. Yet blockchain treats payments like light switches—on or off.
            </p>
            <p className="text-gray-600">
              Streamora fills the gap. It lets you encode continuous time into your smart contracts,
              making payments feel natural and predictable.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Open Source & MIT Licensed</h2>
            <p className="text-gray-600 mb-4">
              Streamora is entirely open-source. The smart contracts, SDK, and frontend are all
              available on GitHub under the MIT license.
            </p>
            <p className="text-gray-600">
              This means you can fork it, audit it, modify it, and deploy your own version.
              No vendor lock-in. No closed infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Built on Stellar</h2>
            <p className="text-gray-600">
              Streamora is built on Stellar and the Soroban smart contract platform.
              Stellar is focused on payments, fast settlement, and low fees—the perfect foundation
              for streaming payments infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Community-Driven</h2>
            <p className="text-gray-600">
              Streamora is maintained by contributors who believe in open-source finance.
              We welcome ideas, bug reports, pull requests, and community feedback.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 section-container">
        <h2 className="text-4xl font-bold text-center mb-12">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold mb-3 text-teal-600">Trustless</h3>
            <p className="text-gray-600">
              Smart contracts, not companies, enforce the rules. You don't need to trust anyone.
            </p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-3 text-teal-600">Transparent</h3>
            <p className="text-gray-600">
              Every transaction is on the blockchain. Full auditability. No hidden fees.
            </p>
          </div>
          <div className="card">
            <h3 className="text-2xl font-bold mb-3 text-teal-600">Accessible</h3>
            <p className="text-gray-600">
              Open-source. MIT licensed. Free to use, fork, and modify. No paywalls.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
