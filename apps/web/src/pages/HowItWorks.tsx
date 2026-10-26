export default function HowItWorks() {
  return (
    <div className="section-container">
      <h1 className="text-4xl font-bold mb-8">How Streaming Payments Work</h1>
      <div className="prose prose-lg max-w-3xl">
        <p>Streamora simplifies time-based payments through linear vesting mechanics.</p>
        <h2>The Concept</h2>
        <p>
          A streaming payment is an agreement where a payer commits funds that become available to a recipient over
          time. Rather than waiting for a specific date, the recipient can withdraw any portion of their accrued amount
          whenever they choose.
        </p>
        <h2>Example</h2>
        <p>Alice creates a stream to pay Bob 1,200 USDC over 12 months.</p>
        <ul>
          <li>After 3 months: 300 USDC is vested (available to withdraw)</li>
          <li>After 6 months: 600 USDC is vested</li>
          <li>After 12 months: 1,200 USDC is vested (fully available)</li>
        </ul>
        <p>Bob can withdraw 100 USDC after 3 months, then another 200 USDC after 5 months, etc.</p>
      </div>
    </div>
  );
}
