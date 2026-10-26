import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold gradient-text">
            Streamora
          </Link>

          <div className="flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-teal-600 transition">
              Home
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-teal-600 transition">
              How It Works
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-teal-600 transition">
              Features
            </Link>
            <Link to="/docs" className="text-gray-700 hover:text-teal-600 transition">
              Docs
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-teal-600 transition">
              Community
            </Link>
            <Link to="/app" className="btn-primary">
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
