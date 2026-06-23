const STEPS = [
  {
    number: 1,
    title: "Post a Job",
    description: "Tell us what you need — describe your project, set your budget, and timeframe.",
    emoji: "📋",
  },
  {
    number: 2,
    title: "Browse Talent",
    description: "Review proposals from top-rated freelancers. Compare profiles, portfolios, and reviews.",
    emoji: "👥",
  },
  {
    number: 3,
    title: "Hire & Collaborate",
    description: "Work with your freelancer in real-time. Use our built-in tools to track progress.",
    emoji: "🤝",
  },
  {
    number: 4,
    title: "Pay Safely",
    description: "Release payment only when you're 100% satisfied. Secure, fast, and transparent.",
    emoji: "🔒",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-500 text-sm">Simple, transparent, and efficient process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-full border-2 border-[#22c55e] bg-white flex items-center justify-center shadow-md">
                  <span className="text-3xl">{step.emoji}</span>
                </div>
                <div className="absolute -top-1 -left-1 w-7 h-7 bg-[#22c55e] rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                  {step.number}
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            <button className="bg-[#22c55e] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#16a34a] transition-colors shadow-lg text-sm">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
