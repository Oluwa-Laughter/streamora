export default function Community() {
  return (
    <div>
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">Community & Contributing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamora is open-source and community-driven. Join us.
          </p>
        </div>
      </section>

      <section className="section-container">
        <h2 className="text-4xl font-bold text-center mb-12">Get Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">🐛 Report Issues</h3>
            <p className="text-gray-600 mb-6">
              Found a bug? Have a suggestion? Open an issue on GitHub.
            </p>
            <a
              href="https://github.com/Strea-mora/Streamora/issues"
              className="text-teal-600 font-medium hover:text-teal-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Issues →
            </a>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-4">💻 Contribute Code</h3>
            <p className="text-gray-600 mb-6">
              Submit pull requests to improve contracts, SDK, or frontend.
            </p>
            <a
              href="https://github.com/Strea-mora/Streamora"
              className="text-teal-600 font-medium hover:text-teal-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository →
            </a>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-4">📚 Improve Docs</h3>
            <p className="text-gray-600 mb-6">
              Help us write clearer documentation and examples.
            </p>
            <a
              href="https://github.com/Strea-mora/Streamora/blob/main/CONTRIBUTING.md"
              className="text-teal-600 font-medium hover:text-teal-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribution Guide →
            </a>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-4">🤝 Join Stellar</h3>
            <p className="text-gray-600 mb-6">
              Connect with the broader Stellar developer community.
            </p>
            <a
              href="https://stellar.org/community"
              className="text-teal-600 font-medium hover:text-teal-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stellar Community →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 section-container">
        <h2 className="text-4xl font-bold text-center mb-12">Contributing Guidelines</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-3">Code of Conduct</h3>
            <p className="text-gray-600">
              Be respectful. Welcome all perspectives. No harassment or discrimination.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">How to Submit</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Fork the repository</li>
              <li>Create a feature branch</li>
              <li>Make your changes</li>
              <li>Write tests for new functionality</li>
              <li>Submit a pull request with a clear description</li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">Areas to Help</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Bug fixes and optimization</li>
              <li>Additional contract features</li>
              <li>SDK improvements</li>
              <li>Frontend enhancements</li>
              <li>Documentation and examples</li>
              <li>Security audits and reviews</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
