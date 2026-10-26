export default function HowItWorks() {
  return (
    <div>
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">How Streaming Payments Work</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understand the mechanics of continuous time-based payments.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">The Concept</h2>
            <p className="text-lg text-gray-600">
              A streaming payment is an agreement where a payer commits funds that become available to a recipient over
              time. Rather than waiting for a specific date, the recipient can withdraw any portion of their accrued
              amount whenever they choose.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-6">Example: Monthly Salary</h2>
            <p className="text-gray-600 mb-6">
              Alice creates a stream to pay Bob 12,000 USDC over 12 months.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-teal-600 w-24">Month 1</div>
                <div className="flex-1">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="font-bold">1,000 USDC vested</p>
                    <p className="text-sm text-gray-600">Bob can withdraw up to 1,000</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-teal-600 w-24">Month 6</div>
                <div className="flex-1">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="font-bold">6,000 USDC vested</p>
                    <p className="text-sm text-gray-600">Bob can withdraw up to 6,000 (minus what he already withdrew)</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-teal-600 w-24">Month 12</div>
                <div className="flex-1">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="font-bold">12,000 USDC vested</p>
                    <p className="text-sm text-gray-600">Full amount available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Key Advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-xl font-bold mb-3 text-teal-600">Flexible Withdrawals</h3>
                <p className="text-gray-600">
                  Recipients don't need to wait for arbitrary release dates. Withdraw any amount, anytime.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-3 text-teal-600">Predictable Income</h3>
                <p className="text-gray-600">
                  Continuous accrual means steady, predictable income flow over the stream period.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-3 text-teal-600">Trustless</h3>
                <p className="text-gray-600">
                  Smart contracts enforce the rules automatically. No intermediary required.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">The Math</h2>
            <div className="bg-gray-100 p-6 rounded-lg font-mono text-sm space-y-4">
              <p>
                <span className="font-bold">Vested Amount</span> = Total Amount × (Current Time - Start Time) / (End
                Time - Start Time)
              </p>
              <p>
                <span className="font-bold">Withdrawable</span> = Vested Amount - Already Withdrawn
              </p>
              <p className="text-gray-600 text-xs pt-4">
                Linear interpolation ensures fair, continuous accrual with no cliff or cliff edges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
