import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-50 to-white">
      <div className="section-container text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary text-lg px-8 py-3">
            Back to Home
          </Link>
          <Link to="/docs" className="btn-outline text-lg px-8 py-3">
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
