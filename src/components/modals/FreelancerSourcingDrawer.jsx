import React from 'react';
import { X, Check } from 'lucide-react';

export default function FreelancerSourcingDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 shadow-2xl flex flex-col`}>
        
        
        <div className="flex items-center justify-between p-6 border-b border-[#e4e5e7]">
          <h2 className="text-[22px] font-bold text-[#404145]">Freelancer sourcing by Nexlance Pro</h2>
          <button onClick={onClose} className="text-[#62646a] hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto p-6">
          
          
          <div className="bg-[#f5f7ff] rounded-xl p-6 mb-10">
            <div className="space-y-4 mb-8">
              
              <div className="bg-white rounded-lg p-5 flex gap-5 shadow-sm border border-[#eef0fa]">
                <div className="text-[#2b44ff] font-bold text-[28px] italic leading-none">1</div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#404145] mb-1">Set up a kickoff meeting</h3>
                  <p className="text-[14px] text-[#62646a] leading-relaxed">After payment, schedule a call with our team to discuss your needs, requirements, and ideal freelancer.</p>
                </div>
              </div>

              
              <div className="bg-white rounded-lg p-5 flex gap-5 shadow-sm border border-[#eef0fa]">
                <div className="text-[#2b44ff] font-bold text-[28px] italic leading-none">2</div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#404145] mb-1">We'll source freelance talent for you</h3>
                  <p className="text-[14px] text-[#62646a] leading-relaxed">A Nexlance Pro expert will screen, vet, and interview candidates based on your exact needs.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-lg p-5 flex gap-5 shadow-sm border border-[#eef0fa]">
                <div className="text-[#2b44ff] font-bold text-[28px] italic leading-none">3</div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#404145] mb-1">Get 2 recommendations</h3>
                  <p className="text-[14px] text-[#62646a] leading-relaxed">Receive a detailed report with recommended freelancers within a week.</p>
                </div>
              </div>
            </div>

            {/* Checkmarks */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 mb-6">
              <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#404145]">
                <Check size={18} className="text-[#404145]" /> Time saving
              </div>
              <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#404145]">
                <Check size={18} className="text-[#404145]" /> Quality freelancers
              </div>
              <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#404145]">
                <Check size={18} className="text-[#404145]" /> Money-back guarantee
              </div>
            </div>

            {/* Link */}
            <div className="text-center border-t border-[#e1e5f8] pt-6">
              <a href="#" className="text-[15px] font-bold text-[#404145] underline hover:text-[#2b44ff] transition-colors">
                Learn more about sourcing
              </a>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mb-6 px-2">
            <div className="flex items-center gap-4 mb-4">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Russell" alt="Russell Semon" className="w-14 h-14 rounded-full border border-gray-200" />
              <div>
                <h4 className="font-bold text-[16px] text-[#404145]">Russell Semon</h4>
                <p className="text-[14px] text-[#62646a]">Professional Counselor</p>
              </div>
            </div>
            <div className="bg-[#f5f5f5] rounded-xl p-5 relative">
              {/* Optional: little triangle for speech bubble effect */}
              <div className="absolute -top-2 left-8 w-4 h-4 bg-[#f5f5f5] rotate-45"></div>
              <p className="text-[15px] text-[#404145] leading-relaxed font-medium relative z-10">
                "Ethan the sourcing expert and Rakib the Vetted freelancer were the right combination to get me what I was looking for, and the price I was looking for."
              </p>
            </div>
          </div>

        </div>

        {/* Sticky Footer */}
        <div className="p-6 border-t border-[#e4e5e7] bg-white mt-auto">
          <button className="w-full bg-[#222325] hover:bg-[#404145] text-white font-bold py-4 px-4 rounded-lg mb-3 transition-colors text-[16px]">
            Continue ($199)
          </button>
          <p className="text-center text-[14px] text-[#62646a]">
            You won't be charged yet
          </p>
        </div>

      </div>
    </>
  );
}
