import React from 'react';

export default function FreelanceTalentSection() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-[#404145] mb-8">
        Find freelance talent — your way
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h3 className="text-xl font-bold text-[#404145] mb-4">Post a project brief</h3>
            <p className="text-[16px] text-[#62646a] mb-8 leading-relaxed">
              Generate a brief with AI to receive a curated shortlist of freelancer offers.
            </p>
          </div>
          <button className="w-full py-3 bg-white border border-[#222325] text-[#222325] font-bold rounded hover:bg-gray-50 transition-colors">
            Post a Brief
          </button>
        </div>

        
        <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-bl-lg">NEW</div>
          <div>
            <h3 className="text-xl font-bold text-[#404145] mb-4">Let us find your freelancer</h3>
            <p className="text-[16px] text-[#62646a] mb-2 leading-relaxed">
              Save time and let us source, interview, and vet freelancers for you.
            </p>
            <p className="text-[16px] font-bold text-[#404145] mb-8">
              Only ₹19,976
            </p>
          </div>
          <button className="w-full py-3 bg-[#222325] text-white font-bold rounded hover:bg-black transition-colors">
            Get Started
          </button>
        </div>

        
        <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h3 className="text-xl font-bold text-[#404145] mb-4">Get a team built for you</h3>
            <p className="text-[16px] text-[#62646a] mb-8 leading-relaxed">
              We'll build and manage a dedicated team for your project.
            </p>
          </div>
          <button className="w-full py-3 bg-white border border-[#222325] text-[#222325] font-bold rounded hover:bg-gray-50 transition-colors">
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
