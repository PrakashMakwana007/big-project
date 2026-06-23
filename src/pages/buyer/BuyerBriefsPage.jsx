import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import Footer from '../../components/Footer';

export default function BuyerBriefsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-[28px] font-bold text-[#404145] mb-6">Briefs</h1>

        <div className="border border-[#e4e5e7] rounded-lg bg-white overflow-hidden min-h-[600px] shadow-sm">
          
          <div className="grid grid-cols-4 border-b border-[#e4e5e7] py-4 px-6 bg-[#fafafa]">
            <div className="text-[12px] font-bold text-[#404145] uppercase">Brief Title</div>
            <div className="text-[12px] font-bold text-[#404145] uppercase text-center">Status</div>
            <div className="text-[12px] font-bold text-[#404145] uppercase text-center">Summary</div>
            <div className="text-[12px] font-bold text-[#404145] uppercase text-right">Action</div>
          </div>

          
          <div className="flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center">
            
            <div className="mb-10 w-[320px] pointer-events-none select-none">
              <div className="flex flex-col gap-3 relative">
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#1dbf73]/5 rounded-full blur-2xl"></div>
                
                {[
                  { title: 'Website developer', status: 'HIRED', opacity: 'opacity-40 scale-95' },
                  { title: 'Video marketing', status: 'HIRED', opacity: 'opacity-100 scale-100 shadow-sm z-10' },
                  { title: 'Brand strategy', status: 'HIRED', opacity: 'opacity-40 scale-95' }
                ].map((item, idx) => (
                  <div key={idx} className={`flex justify-between items-center bg-white border border-[#e4e5e7] p-3 rounded-lg transition-all ${item.opacity}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-2 bg-gray-200 rounded-full"></div>
                      <span className="text-[13px] font-semibold text-[#404145]">{item.title}</span>
                    </div>
                    <span className="text-[9px] font-bold text-[#1dbf73] bg-[#1dbf73]/10 px-2 py-1 rounded-sm tracking-wider">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-[22px] font-bold text-[#404145] mb-3">Post your first brief</h2>
            <p className="text-[16px] text-[#62646a] mb-8 leading-relaxed">
              Describe your project needs and generate a brief with AI.<br/>
              Then get a curated shortlist of offers to choose from.
            </p>

            <button className="bg-[#222325] hover:bg-[#404145] text-white font-bold py-3 px-6 rounded-lg mb-8 transition-colors text-[15px]">
              Post a project brief
            </button>

            <button className="flex items-center gap-2 text-[15px] font-bold text-[#404145] hover:text-[#1dbf73] transition-colors">
              <PlayCircle size={18} />
              How does it work?
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
