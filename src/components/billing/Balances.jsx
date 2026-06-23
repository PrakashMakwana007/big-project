import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Balances() {
  return (
    <div className="animate-in fade-in duration-300">
      
      <h2 className="text-[22px] font-bold text-[#404145] mb-8 tracking-tight">Available balances</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        
        
        <div>
          <h3 className="text-[16px] font-bold text-[#404145] mb-4">Nexlance Balance</h3>
          
          <div className="bg-white border border-[#e4e5e7] rounded shadow-sm">
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#62646a]">
                  Earnings
                  <HelpCircle size={14} className="text-[#b5b6ba] cursor-pointer hover:text-[#404145] transition-colors" />
                </div>
                <Link to="/seller/earnings" className="text-[14px] text-[#446ee7] hover:underline">
                  Your Earnings Page
                </Link>
              </div>
              <p className="text-[28px] font-bold text-[#404145] tracking-tight mt-3">₹0.00</p>
              <p className="text-[14px] text-[#62646a] mt-1">Available for withdrawal or purchases.</p>
            </div>

            <div className="border-t border-[#e4e5e7]"></div>

            
            <div className="p-6">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#62646a] mb-2">
                From canceled orders
                <HelpCircle size={14} className="text-[#b5b6ba] cursor-pointer hover:text-[#404145] transition-colors" />
              </div>
              <p className="text-[22px] font-bold text-[#404145] tracking-tight mt-3">₹0.00</p>
            </div>
          </div>
        </div>

        
        <div>
          <h3 className="text-[16px] font-bold text-[#404145] mb-4">Nexlance Credits</h3>
          
          <div className="bg-white border border-[#e4e5e7] rounded shadow-sm">
            
            <div className="p-6">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#62646a] mb-2">
                Credits
                <HelpCircle size={14} className="text-[#b5b6ba] cursor-pointer hover:text-[#404145] transition-colors" />
              </div>
              <p className="text-[28px] font-bold text-[#404145] tracking-tight mt-3">₹0.00</p>
              <p className="text-[14px] text-[#62646a] mt-1">Use for purchases.</p>
            </div>

            <div className="border-t border-[#e4e5e7]"></div>

            
            <div className="p-6">
              <h4 className="text-[16px] font-bold text-[#404145] mb-1">Like to earn some credits?</h4>
              <p className="text-[14px] text-[#62646a] mb-5">Refer people you know and everyone benefits!</p>
              
              <button className="bg-[#222325] hover:bg-[#404145] text-white font-bold py-2 px-5 rounded text-[14px] transition-colors">
                Earn Nexlance Credits
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
