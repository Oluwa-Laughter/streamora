export default function Concepts() {
  return (
    <div className="section-container py-20">
      <h1 className="text-4xl font-bold mb-6">Core Concepts</h1>

      <div className="prose prose-invert max-w-4xl space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">Streaming Payments</h2>
          <p className="text-gray-600">
            A stream is a time-based payment. Instead of paying a lump sum on a fixed date,
            funds accrue continuously from a start time to an end time.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Vesting Formula</h2>
          <p className="text-gray-600 mb-4">
            At any point in time, the amount vested is calculated as:
          </p>
          <div className="bg-gray-100 p-6 rounded">
            <code className="text-sm">{`If t ≤ start_time: vested = 0
If t ≥ end_time: vested = amount
Otherwise: vested = floor(amount × (t - start_time) / (end_time - start_time))`}</code>
          </div>
          <p className="text-gray-600 mt-4">
            This ensures linear, predictable accrual. Recipients can see exactly how much is available
            at any moment.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Withdrawals</h2>
          <p className="text-gray-600">
            The withdrawable amount is the vested amount minus any already-withdrawn amount.
            Recipients can withdraw any portion of the vested balance at any time.
          </p>
          <p className="text-gray-600 mt-4">
            <strong>Withdrawable = vested - previously_withdrawn</strong>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Cancellation</h2>
          <p className="text-gray-600">
            The payer can cancel a stream at any time. Vested funds remain with the recipient;
            unvested funds return to the payer.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Actors</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-teal-600">Payer</h3>
              <p className="text-gray-600">
                The entity sending the payment. Initiates the stream and can cancel it.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">Recipient</h3>
              <p className="text-gray-600">
                The entity receiving the payment. Can withdraw vested amounts at any time.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-teal-600">Contract</h3>
              <p className="text-gray-600">
                The Soroban smart contract that enforces the rules and holds funds.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Token Decimals</h2>
          <p className="text-gray-600">
            All amounts are stored as integers to avoid floating-point precision errors.
            Token decimals are handled at the boundary—conversion to/from user-facing amounts
            happens in the SDK and frontend.
          </p>
        </section>
      </div>
    </div>
  );
}
