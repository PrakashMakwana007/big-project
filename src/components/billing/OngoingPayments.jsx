import React from 'react';

export default function OngoingPayments() {
  return (
    <div className="animate-in fade-in duration-300">
      
      <h2 className="text-[22px] font-bold text-[#404145] mb-6 tracking-tight">Ongoing payments</h2>

      <div className="bg-white border border-[#e4e5e7] rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7f7f7] border-b border-[#e4e5e7]">
                <th className="px-6 py-4 text-[13px] font-bold text-[#404145]">Service</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#404145]">Status</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#404145]">Price</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#404145]">Start date</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#404145]">Next payment</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#404145]">Payment method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="px-6 py-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-[18px] font-bold text-[#404145] mb-4">You don't have any ongoing payments</h3>
                    
                    {/* SVG Illustration Placeholder matching the grass image */}
                    <div className="mt-2">
                      <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 35H110" stroke="#404145" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M25 35C25 35 25 25 30 20C35 15 40 18 40 25C40 32 40 35 40 35" stroke="#404145" strokeWidth="1.5" fill="none" />
                        <path d="M40 35C40 35 45 20 50 20C55 20 55 28 55 35" stroke="#404145" strokeWidth="1.5" fill="none" />
                        <path d="M55 35C55 35 55 15 65 15C75 15 75 35 75 35" stroke="#404145" strokeWidth="1.5" fill="none" />
                        <path d="M75 35C75 35 80 25 85 25C90 25 90 35 90 35" stroke="#404145" strokeWidth="1.5" fill="none" />
                        <circle cx="45" cy="12" r="4" fill="#1dbf73" />
                        <circle cx="80" cy="15" r="5" fill="#1dbf73" />
                        <path d="M45 16L48 35" stroke="#404145" strokeWidth="1.5" fill="none" />
                        <path d="M80 20L72 35" stroke="#404145" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
