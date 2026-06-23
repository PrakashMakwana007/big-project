import React, { useState } from 'react';
import { Search, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BillingHistory() {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  
  const toggleDateRange = () => {
    setIsDateRangeOpen(!isDateRangeOpen);
    setIsDocumentOpen(false);
    setIsCurrencyOpen(false);
  };
  const toggleDocument = () => {
    setIsDocumentOpen(!isDocumentOpen);
    setIsDateRangeOpen(false);
    setIsCurrencyOpen(false);
  };
  const toggleCurrency = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
    setIsDateRangeOpen(false);
    setIsDocumentOpen(false);
  };

  return (
    <div className="animate-in fade-in duration-300">
      
      <h2 className="text-[22px] font-bold text-[#404145] mb-6 tracking-tight">Billing history</h2>

      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        
        
        <div className="flex flex-wrap items-center gap-3">
          
          
          <div className="relative">
            <button 
              onClick={toggleDateRange}
              className="px-4 py-2 bg-white border border-[#c5c6c9] rounded hover:border-[#9fa0a4] text-[14px] text-[#404145] font-semibold flex items-center gap-2 transition-colors"
            >
              Date range 
              {isDateRangeOpen ? <ChevronUp size={14} className="text-[#62646a]" /> : <ChevronDown size={14} className="text-[#62646a]" />}
            </button>

            {isDateRangeOpen && (
              <div className="absolute top-full left-0 mt-1 w-[320px] bg-white border border-[#e4e5e7] rounded-md shadow-lg z-20">
                <div className="p-4">
                  <h3 className="font-bold text-[#404145] mb-4 text-[16px]">Date range</h3>
                  
                  <div className="relative mb-4">
                    <select className="w-full appearance-none bg-white border border-[#c5c6c9] rounded px-3 py-2.5 text-[14px] text-[#b5b6ba] focus:outline-none focus:border-[#404145] cursor-pointer">
                      <option>Select a month</option>
                      <option>This Month</option>
                      <option>Last Month</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5b6ba] pointer-events-none" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-[13px] font-bold text-[#404145] mb-1">From</label>
                      <input type="text" placeholder="Date" className="w-full border border-[#c5c6c9] rounded px-3 py-2 text-[14px] focus:outline-none focus:border-[#404145] placeholder-[#b5b6ba]" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[13px] font-bold text-[#404145] mb-1">To</label>
                      <input type="text" placeholder="Date" className="w-full border border-[#c5c6c9] rounded px-3 py-2 text-[14px] focus:outline-none focus:border-[#404145] placeholder-[#b5b6ba]" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-[#e4e5e7] p-3 flex justify-between items-center bg-gray-50/50">
                  <button className="text-[14px] text-[#404145] font-semibold hover:underline">Clear</button>
                  <button className="bg-[#1dbf73] text-white font-bold px-5 py-2 rounded text-[14px] hover:bg-[#19a463] transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          
          <div className="relative">
            <button 
              onClick={toggleDocument}
              className="px-4 py-2 bg-white border border-[#c5c6c9] rounded hover:border-[#9fa0a4] text-[14px] text-[#404145] font-semibold flex items-center gap-2 transition-colors"
            >
              Document 
              {isDocumentOpen ? <ChevronUp size={14} className="text-[#62646a]" /> : <ChevronDown size={14} className="text-[#62646a]" />}
            </button>

            {isDocumentOpen && (
              <div className="absolute top-full left-0 mt-1 w-[280px] bg-white border border-[#e4e5e7] rounded-md shadow-lg z-20">
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-[#404145] mb-2 text-[16px]">Document type</h3>
                  
                  {['Invoices', 'Receipts', 'Credit notes'].map((doc) => (
                    <label key={doc} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-[#c5c6c9] group-hover:border-[#9fa0a4] flex items-center justify-center transition-colors"></div>
                      <span className="text-[15px] text-[#404145]">{doc}</span>
                    </label>
                  ))}
                </div>
                
                <div className="border-t border-[#e4e5e7] p-3 flex justify-between items-center bg-gray-50/50">
                  <button className="text-[14px] text-[#404145] font-semibold hover:underline">Clear</button>
                  <button className="bg-[#1dbf73] text-white font-bold px-5 py-2 rounded text-[14px] hover:bg-[#19a463] transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          
          <div className="relative">
            <button 
              onClick={toggleCurrency}
              className="px-4 py-2 bg-white border border-[#c5c6c9] rounded hover:border-[#9fa0a4] text-[14px] text-[#404145] font-semibold flex items-center gap-2 transition-colors"
            >
              Currency 
              {isCurrencyOpen ? <ChevronUp size={14} className="text-[#62646a]" /> : <ChevronDown size={14} className="text-[#62646a]" />}
            </button>

            {isCurrencyOpen && (
              <div className="absolute top-full left-0 mt-1 w-[240px] bg-white border border-[#e4e5e7] rounded-md shadow-lg z-20">
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-[#404145] mb-2 text-[16px]">Currency</h3>
                  
                  {['USD ($)', 'EUR (€)', 'GBP (£)', 'INR (₹)'].map((curr) => (
                    <label key={curr} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-[#c5c6c9] group-hover:border-[#9fa0a4] flex items-center justify-center transition-colors"></div>
                      <span className="text-[15px] text-[#404145]">{curr}</span>
                    </label>
                  ))}
                </div>
                
                <div className="border-t border-[#e4e5e7] p-3 flex justify-between items-center bg-gray-50/50">
                  <button className="text-[14px] text-[#404145] font-semibold hover:underline">Clear</button>
                  <button className="bg-[#1dbf73] text-white font-bold px-5 py-2 rounded text-[14px] hover:bg-[#19a463] transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        
        <div className="relative w-full lg:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b5b6ba] w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by invoice or order number" 
            className="w-full pl-9 pr-4 py-2 border border-[#c5c6c9] rounded text-[14px] focus:outline-none focus:border-[#404145] hover:border-[#9fa0a4] transition-colors placeholder-[#b5b6ba]"
          />
        </div>
      </div>

      
      <div className="flex items-center justify-between mb-4">
        <p className="text-[14px] text-[#62646a]">Showing 0 results.</p>
        <button className="flex items-center gap-2 text-[14px] text-[#404145] font-semibold hover:text-[#1dbf73] transition-colors group">
          <div className="w-5 h-5 rounded flex items-center justify-center border border-[#1dbf73] group-hover:bg-[#1dbf73]/10">
            <Download size={12} className="text-[#1dbf73]" />
          </div>
          Download report
        </button>
      </div>

      
      <div className="bg-white border border-[#e4e5e7] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7f7f7] border-b border-[#e4e5e7]">
                <th className="px-6 py-4 w-12">
                  <div className="w-4 h-4 bg-white border border-[#c5c6c9] rounded-sm"></div>
                </th>
                <th className="px-4 py-4 text-[13px] font-bold text-[#62646a] tracking-tight">Date</th>
                <th className="px-4 py-4 text-[13px] font-bold text-[#62646a] tracking-tight">Document</th>
                <th className="px-4 py-4 text-[13px] font-bold text-[#62646a] tracking-tight">Service</th>
                <th className="px-4 py-4 text-[13px] font-bold text-[#62646a] tracking-tight">Order</th>
                <th className="px-4 py-4 text-[13px] font-bold text-[#62646a] tracking-tight">Currency</th>
                <th className="px-4 py-4 text-[13px] font-bold text-[#62646a] tracking-tight">Total</th>
                <th className="px-4 py-4 text-[13px] font-bold text-[#62646a] tracking-tight">PDF</th>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <td colSpan="8" className="px-6 py-24 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    
                    <div className="w-48 h-32 mb-8 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gray-50 rounded-lg"></div>
                      <span className="relative text-gray-400 text-sm font-medium">Illustration Placeholder</span>
                    </div>
                    
                    <h3 className="text-[22px] font-bold text-[#404145] mb-4">No invoices yet...</h3>
                    
                    <div className="text-[15px] text-[#62646a] mb-8 leading-relaxed">
                      <p>Ready to place an order?</p>
                      <p>Make sure <Link to="/seller/billing" className="text-[#404145] underline font-semibold">your billing info</Link> is up to date.</p>
                    </div>
                    
                    <button className="bg-[#222325] hover:bg-[#404145] text-white font-bold py-3 px-8 rounded transition-colors text-[15px]">
                      Explore
                    </button>
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
