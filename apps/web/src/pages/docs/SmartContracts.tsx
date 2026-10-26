export default function SmartContracts() {
  return (
    <div className="section-container py-20">
      <h1 className="text-4xl font-bold mb-6">Smart Contract Architecture</h1>

      <div className="prose prose-invert max-w-4xl space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="text-gray-600">
            The Streamora contract is built in Rust using the Soroban SDK.
            It manages stream creation, vesting calculations, and fund transfers.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Core Data Structure</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{`pub struct Stream {
  pub id: String,
  pub payer: Address,
  pub recipient: Address,
  pub token: Address,
  pub amount: i128,
  pub start_time: u64,
  pub end_time: u64,
  pub withdrawn: i128,
  pub is_cancelled: bool,
}`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Key Functions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-teal-600 mb-2">create_stream</h3>
              <p className="text-gray-600 mb-2">Initiates a new payment stream.</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                <code>{`fn create_stream(
  payer: Address,
  recipient: Address,
  token: Address,
  amount: i128,
  start_time: u64,
  end_time: u64,
) -> Result<(), String>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-teal-600 mb-2">get_vested_amount</h3>
              <p className="text-gray-600 mb-2">Calculates vested amount at a specific time.</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                <code>{`fn get_vested_amount(
  stream_id: String,
  at_time: u64,
) -> Result<i128, String>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-teal-600 mb-2">withdraw</h3>
              <p className="text-gray-600 mb-2">Allows recipient to withdraw vested funds.</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                <code>{`fn withdraw(
  stream_id: String,
  amount: i128,
) -> Result<(), String>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-teal-600 mb-2">cancel_stream</h3>
              <p className="text-gray-600 mb-2">Cancels stream and returns unvested funds.</p>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                <code>{`fn cancel_stream(
  stream_id: String,
) -> Result<(), String>`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Security Considerations</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>All amounts are integer-based (i128) to prevent rounding errors</li>
            <li>Authorization checks via Soroban's require_auth() mechanism</li>
            <li>Time boundaries validated on creation and withdrawal</li>
            <li>Token transfer failures revert the entire transaction</li>
            <li>Cancellation properly handles vested vs unvested funds</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Storage</h2>
          <p className="text-gray-600">
            Streams are persisted in the contract's persistent storage.
            Each stream is keyed by its stream_id for O(1) lookup.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Testing</h2>
          <p className="text-gray-600">
            The contract includes unit tests for vesting formulas,
            authorization boundaries, and error cases.
          </p>
        </section>
      </div>
    </div>
  );
}
