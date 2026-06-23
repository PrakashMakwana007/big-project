const REVIEWS = [
  {
    text: "Our entire app was built in 3 weeks by a team I found here. Communication was smooth and the code quality was exceptional.",
    name: "Marcus Reed",
    role: "CTO, DataStack",
    initials: "MR",
    color: "bg-blue-500",
  },
  {
    text: "I've used 4 other platforms. This has the best talent-to-price ratio by far. My go-to for all marketing projects.",
    name: "Amara Lin",
    role: "Marketing Director, Growbrand",
    initials: "AL",
    color: "bg-green-500",
  },
  {
    text: "Found an incredible logo designer in under 10 minutes. The quality was outstanding and delivery was two days early. Highly recommend!",
    name: "Sarah Kim",
    role: "Founder, LaunchPad Co.",
    initials: "SK",
    color: "bg-pink-500",
  },
  {
    text: "The best freelance platform I've ever used. Fast turnaround, professional work, and amazing support team.",
    name: "James Mitchell",
    role: "Project Manager, TechFlow",
    initials: "JM",
    color: "bg-purple-500",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What our clients say</h2>
          <p className="text-gray-500 text-sm">Real stories from businesses that have grown with our platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex text-yellow-400 text-base mb-3">★★★★★</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`${r.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {r.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                  <p className="text-gray-400 text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
