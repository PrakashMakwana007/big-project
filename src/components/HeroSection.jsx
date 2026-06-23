export default function HeroSection({ handleProtectedAction }) {
  function handleSearchClick() {
    
    
    console.log('Search services');
  }

  return (
    <section
      className="relative min-h-[520px] flex items-center"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f172a 100%)",
      }}
    >
      
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.16) 0%, transparent 70%)",
          transform: "translate(25%, -50%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Connect with top freelancers for your next big idea
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
            Hire experts, collaborate easily, and get your work done faster.
          </p>

          
          <div
            className="flex w-full max-w-lg overflow-hidden rounded-full"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <input
              type="text"
              placeholder="What service are you looking for?"
              className="flex-1 px-5 py-4 text-sm text-gray-800 bg-white outline-none"
            />
            <button
              type="button"
              onClick={handleSearchClick}
              className="bg-[#22c55e] text-white px-7 py-4 font-semibold text-sm hover:bg-[#16a34a] transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>

          
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="text-gray-400 text-sm">Popular:</span>
            {["Brand Design", "Product Dev", "Automation", "SEO", "Motion"].map((tag) => (
              <button
                key={tag}
                type="button"
                className="text-xs text-white border border-white/30 px-3 py-1 rounded-full hover:border-[#22c55e] hover:text-[#22c55e] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        
        <div
          className="flex flex-wrap gap-8 mt-12 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {[
            { value: "16.3M", label: "Total Orders" },
            { value: "4.9★", label: "Average Rating" },
            { value: "160K+", label: "Specialists" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
