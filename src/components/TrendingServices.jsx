import { services } from '../data/services';

const CARD_GRADIENTS = [
  "from-purple-100 to-blue-100",
  "from-pink-100 to-purple-100",
  "from-blue-100 to-cyan-100",
  "from-green-100 to-teal-100",
  "from-orange-100 to-yellow-100",
  "from-red-100 to-pink-100",
];

function StarRating({ rating }) {
  const full = Math.floor(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-yellow-400 text-sm" : "text-gray-200 text-sm"}>★</span>
      ))}
      <span className="text-gray-500 text-xs ml-1">{rating}</span>
    </span>
  );
}

function ServiceCard({ service, gradientIndex }) {
  const gradient = CARD_GRADIENTS[gradientIndex % CARD_GRADIENTS.length];
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer border border-gray-100 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25" tabIndex={0} role="button" aria-label={service.title}>
      
      <div className={`relative bg-gradient-to-br ${gradient} h-44 flex items-center justify-center`}>
        <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300">
          {service.emoji}
        </span>
        {service.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-md ${service.badgeColor}`}>
            {service.badge}
          </span>
        )}
      </div>

      
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-[#22c55e] font-semibold uppercase tracking-wide mb-1">
          {service.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-800 mb-3 leading-snug line-clamp-2 flex-1">
          {service.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={service.rating} />
          <span className="text-gray-400 text-xs">({service.reviews})</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Starting at</span>
          <span className="text-lg font-bold text-gray-900">₹{service.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function TrendingServices() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Trending Services</h2>
            <p className="text-gray-500 text-sm">Discover the most popular freelance services right now</p>
          </div>
          <button className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#22c55e] transition-all duration-200 hover:text-green-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">
            View All Services (35+) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service, i) => (
            <ServiceCard key={service.id} service={service} gradientIndex={i} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <button className="border border-[#22c55e] text-[#22c55e] px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-[#22c55e] hover:text-white hover:shadow-md hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dbf73]/25 cursor-pointer">
            View All Services (35+)
          </button>
        </div>
      </div>
    </section>
  );
}
