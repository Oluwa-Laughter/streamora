import { useParams, Link } from "react-router-dom";

export default function StreamDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="section-container py-20">
      <Link to="/app/streams" className="text-teal-600 hover:text-teal-700 mb-6 inline-block">
        ← Back to Streams
      </Link>

      <h1 className="text-5xl font-bold mb-12">Stream {id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card">
          <p className="text-gray-600 mb-2">Total Amount</p>
          <p className="text-3xl font-bold">—</p>
        </div>
        <div className="card">
          <p className="text-gray-600 mb-2">Vested</p>
          <p className="text-3xl font-bold">—</p>
        </div>
        <div className="card">
          <p className="text-gray-600 mb-2">Withdrawable</p>
          <p className="text-3xl font-bold">—</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Stream Details</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex justify-between">
              <span>Payer:</span>
              <span className="font-mono">—</span>
            </div>
            <div className="flex justify-between">
              <span>Recipient:</span>
              <span className="font-mono">—</span>
            </div>
            <div className="flex justify-between">
              <span>Token:</span>
              <span className="font-mono">—</span>
            </div>
            <div className="flex justify-between">
              <span>Start Time:</span>
              <span>—</span>
            </div>
            <div className="flex justify-between">
              <span>End Time:</span>
              <span>—</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span>—</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn-primary py-3 disabled:opacity-50" disabled>
              Withdraw
            </button>
            <button className="w-full btn-secondary py-3 disabled:opacity-50" disabled>
              Cancel Stream
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Vesting Timeline</h2>
        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-teal-600 rounded-full" style={{ width: "0%" }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <span>Start</span>
          <span>Progress</span>
          <span>End</span>
        </div>
      </div>
    </div>
  );
}
