export default function Activity() {
  const activities = [];

  return (
    <div className="section-container py-20">
      <h1 className="text-5xl font-bold mb-12">Activity</h1>

      {activities.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No activity yet</p>
          <p className="text-gray-600">
            Your transaction history will appear here once you create or withdraw from streams.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity: any) => (
            <div key={activity.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{activity.type}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{activity.amount}</p>
                  <p className="text-sm text-gray-600">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
