export default function Security() {
  return (
    <div className="section-container py-20">
      <h1 className="text-4xl font-bold mb-6">Security & Threat Model</h1>

      <div className="prose prose-invert max-w-4xl space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">Security Assumptions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Soroban runtime is secure and correctly enforces authorization</li>
            <li>Token smart contracts correctly implement transfer() semantics</li>
            <li>Stellar network is operating normally and achieving consensus</li>
            <li>Private keys are properly secured by users/wallets</li>
            <li>RPC endpoints are trustworthy (or you run your own)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Known Limitations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-teal-600">No Audit</h3>
              <p className="text-gray-600">
                The contract is alpha software. No third-party security audit has been conducted.
                Do not use with production funds until audited.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">No Pause Mechanism</h3>
              <p className="text-gray-600">
                The contract cannot be paused by the operator if a bug is discovered.
                Upgrades require migration to a new contract.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">Integer Rounding</h3>
              <p className="text-gray-600">
                Vesting uses integer floor division. Very small streams may have rounding variance.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">Token Decimals Assumption</h3>
              <p className="text-gray-600">
                The SDK assumes standard Stellar token decimals (7). Non-standard tokens require manual conversion.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Authorization & Access Control</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Only the payer can create a stream (requires payer.require_auth())</li>
            <li>Only the recipient can withdraw (requires recipient.require_auth())</li>
            <li>Only the payer can cancel (requires payer.require_auth())</li>
            <li>Authorization is enforced by Soroban at invocation time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Threats & Mitigations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-teal-600">Unauthorized Withdrawals</h3>
              <p className="text-gray-600">
                <strong>Mitigation:</strong> Soroban's require_auth() enforces that only the recipient
                can call withdraw().
              </p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">Double-Spending</h3>
              <p className="text-gray-600">
                <strong>Mitigation:</strong> Atomicity: the contract updates withdrawn balance before
                transferring tokens. If transfer fails, the entire transaction reverts.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">Reentrancy</h3>
              <p className="text-gray-600">
                <strong>Mitigation:</strong> Soroban does not support reentrancy within a single transaction.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">Cancellation Front-Running</h3>
              <p className="text-gray-600">
                <strong>Mitigation:</strong> Stellar ledger is deterministic. A payer cannot selectively
                cancel after seeing a withdrawal in the mempool.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Frontend Security</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Never store private keys in browser storage</li>
            <li>Always use a wallet extension (Freighter) for signing</li>
            <li>Validate all user input on the client and contract</li>
            <li>Use HTTPS only in production</li>
            <li>Keep dependencies updated</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Reporting Security Issues</h2>
          <p className="text-gray-600">
            See SECURITY.md in the repository for responsible disclosure guidelines.
          </p>
        </section>
      </div>
    </div>
  );
}
