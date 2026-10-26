export default function UseCases() {
  const useCases = [
    {
      title: "Payroll & Salaries",
      description: "Employers can create salary streams for employees, ensuring predictable income that vests continuously throughout the pay period.",
      icon: "💼",
    },
    {
      title: "Vendor Contracts",
      description: "Streaming invoices instead of lump-sum payments. Vendors see immediate accrual and can withdraw at any time.",
      icon: "🏭",
    },
    {
      title: "Freelance Agreements",
      description: "Long-term projects automatically stream payments to freelancers as milestones approach, reducing payment friction.",
      icon: "👨‍💻",
    },
    {
      title: "Grant Programs",
      description: "Organizations distribute grants linearly over time, encouraging thoughtful use and progress verification.",
      icon: "🎓",
    },
    {
      title: "Subscription Alternatives",
      description: "Replace subscriptions with per-service streaming, paying only for the time the service is active.",
      icon: "📡",
    },
    {
      title: "Vesting for Team Members",
      description: "Startups stream equity or token grants to employees and advisors, aligning incentives with company growth.",
      icon: "📈",
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-navy-50 to-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl font-bold mb-6">Real-World Use Cases</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamora adapts to any scenario where continuous accrual beats lump-sum payments.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="card hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">{useCase.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 section-container text-center">
        <h2 className="text-4xl font-bold mb-8">Why Streams Win</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3 text-teal-600">Trustless</h3>
            <p className="text-gray-600">No intermediary. The contract enforces the rules, not a company.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3 text-teal-600">Flexible</h3>
            <p className="text-gray-600">Withdraw anytime. No lockups, no waiting for arbitrary release dates.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3 text-teal-600">Transparent</h3>
            <p className="text-gray-600">Every transaction on the blockchain. Full auditability from day one.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
