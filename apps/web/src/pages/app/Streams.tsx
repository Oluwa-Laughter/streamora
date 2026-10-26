import { Link } from "react-router-dom";

export default function Streams() {
  const streams = [];

  return (
    <div className="section-container py-20">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold">Your Streams</h1>
        <Link to="/app/streams/create" className="btn-primary">
          Create Stream
        </Link>
      </div>

      {streams.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-xl text-gray-600 mb-6">No streams yet</p>
          <p className="text-gray-600 mb-8">
            Create your first payment stream to get started with streaming payments.
          </p>
          <Link to="/app/streams/create" className="btn-primary">
            Create Your First Stream
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {streams.map((stream: any) => (
            <Link
              key={stream.id}
              to={`/app/streams/${stream.id}`}
              className="card hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{stream.id}</h3>
                  <p className="text-gray-600">
                    To: {stream.recipient.slice(0, 10)}...
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{stream.amount}</p>
                  <p className="text-gray-600">Vested: {stream.vested}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
