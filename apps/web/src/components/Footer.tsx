import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/use-cases" className="hover:text-white transition">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-white transition">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Developers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="hover:text-white transition">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/docs/sdk" className="hover:text-white transition">
                  SDK
                </Link>
              </li>
              <li>
                <a href="https://github.com/Strea-mora/Streamora" className="hover:text-white transition">
                  GitHub
                </a>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/docs/security" className="hover:text-white transition">
                  Security
                </Link>
              </li>
              <li>
                <a href="https://stellar.org" className="hover:text-white transition">
                  Stellar
                </a>
              </li>
              <li>
                <a href="https://soroban.stellar.org" className="hover:text-white transition">
                  Soroban
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/Strea-mora/Streamora/issues" className="hover:text-white transition">
                  Report Issues
                </a>
              </li>
              <li>
                <a href="https://github.com/Strea-mora/Streamora" className="hover:text-white transition">
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400">
            © 2026 Streamora Contributors. MIT Licensed.{" "}
            <a href="https://github.com/Strea-mora/Streamora" className="text-gray-300 hover:text-white">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
