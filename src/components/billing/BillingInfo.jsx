import React from 'react';
import { HelpCircle, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function BillingInfo() {
  const user = api.auth.getSavedUser() || {};
  const defaultBillingName = user.name || (user.email ? user.email.split('@')[0] : 'username');

  return (
    <div className="animate-in fade-in duration-300">
      
      <div className="max-w-3xl">
        <h2 className="text-[22px] font-bold text-[#404145] mb-8 tracking-tight">Billing information</h2>

        <form className="space-y-6">
          
          <div className="space-y-1">
            <label className="block text-[15px] font-semibold text-[#404145]">
              Full name <span className="text-[#b5b6ba] font-normal">(mandatory)</span>
            </label>
            <input 
              type="text" 
              defaultValue={defaultBillingName}
              className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[15px] font-semibold text-[#404145]">
              Company name
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[15px] font-semibold text-[#404145]">
              Country
            </label>
            <div className="relative">
              <select className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px] appearance-none cursor-pointer bg-white">
                <option>India</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#7a7d85] pointer-events-none">
                <span className="text-xs mr-1">✕</span>
                <svg width="12" height="12" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[15px] font-semibold text-[#404145]">
              State/Union territory <span className="text-[#b5b6ba] font-normal">(mandatory)</span>
            </label>
            <div className="relative">
              <select className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px] appearance-none cursor-pointer bg-white">
                <option>Gujarat</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#7a7d85] pointer-events-none">
                <span className="text-xs mr-1">✕</span>
                <svg width="12" height="12" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[15px] font-semibold text-[#404145]">
              Address
            </label>
            <input 
              type="text" 
              placeholder="Street or POB"
              className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px] placeholder-[#b5b6ba]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[15px] font-semibold text-[#404145]">
              City
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[15px] font-semibold text-[#404145]">
              Postal code
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px]"
            />
          </div>

          
          <div className="pt-4 space-y-6">
            <div className="space-y-3">
              <label className="flex items-center gap-1 text-[15px] font-semibold text-[#404145]">
                Are you a citizen/resident of India? <span className="text-[#b5b6ba] font-normal">(mandatory)</span>
                <HelpCircle size={14} className="text-[#b5b6ba] cursor-pointer hover:text-[#404145] transition-colors" />
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="resident" className="w-4 h-4 text-green-500 bg-white border-gray-300 focus:ring-green-500 focus:ring-2 cursor-pointer" />
                  <span className="text-[15px] text-[#404145]">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="resident" className="w-4 h-4 text-green-500 bg-white border-gray-300 focus:ring-green-500 focus:ring-2 cursor-pointer" />
                  <span className="text-[15px] text-[#404145]">No</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-1 text-[15px] font-semibold text-[#404145]">
                Are you registered for India GST? <span className="text-[#b5b6ba] font-normal">(mandatory)</span>
                <HelpCircle size={14} className="text-[#b5b6ba] cursor-pointer hover:text-[#404145] transition-colors" />
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="gst" className="w-4 h-4 text-green-500 bg-white border-gray-300 focus:ring-green-500 focus:ring-2 cursor-pointer" />
                  <span className="text-[15px] text-[#404145]">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="gst" className="w-4 h-4 text-green-500 bg-white border-gray-300 focus:ring-green-500 focus:ring-2 cursor-pointer" />
                  <span className="text-[15px] text-[#404145]">No</span>
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-1 text-[15px] font-semibold text-[#404145]">
                PAN number
                <HelpCircle size={14} className="text-[#b5b6ba] cursor-pointer hover:text-[#404145] transition-colors" />
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px]"
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-1 text-[15px] font-semibold text-[#404145]">
                What is your 'TCS under GST' tax category? <span className="text-[#b5b6ba] font-normal">(mandatory)</span>
                <HelpCircle size={14} className="text-[#b5b6ba] cursor-pointer hover:text-[#404145] transition-colors" />
              </label>
              <div className="relative max-w-[200px]">
                <select className="w-full px-4 py-2 border border-[#c5c6c9] rounded hover:border-[#9fa0a4] focus:border-[#404145] focus:outline-none transition-colors text-[15px] appearance-none cursor-pointer bg-white">
                  <option>Export</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-[#7a7d85] pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <div>
              <h3 className="text-[15px] font-bold text-[#404145] mb-2">Invoices</h3>
              <p className="text-[15px] text-[#62646a]">
                You will find your invoices under the <Link to="/seller/billing" className="text-[#404145] underline font-semibold">Billing history</Link> tab.
              </p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-[#c5c6c9] text-green-500 focus:ring-green-500 focus:ring-2 cursor-pointer" />
              <span className="text-[15px] text-[#62646a]">I want to get invoices via email as well.</span>
            </label>
          </div>

          <div className="pt-4">
            <button type="button" className="bg-[#222325] hover:bg-[#404145] text-white font-bold py-3 px-6 rounded transition-colors text-[15px]">
              Save Changes
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
