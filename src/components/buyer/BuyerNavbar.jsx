import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Mail, Heart, User, Search, Globe, LogOut, Menu } from 'lucide-react';
import LanguageModal from '../modals/LanguageModal';
import CurrencyModal from '../modals/CurrencyModal';
import NotificationDropdown from '../dashboard/header-popups/NotificationDropdown';
import InboxDropdown from '../dashboard/header-popups/InboxDropdown';
import api from '../../services/api';

export default function BuyerNavbar({ onMenuToggle }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openPopup, setOpenPopup] = useState(null);

  const togglePopup = (popupName) => {
    setOpenPopup(openPopup === popupName ? null : popupName);
  };

  const user = api.auth.getSavedUser() || { name: 'User', email: '' };

  return (
    <nav className="h-20 bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-6">
      
      <div className="flex items-center flex-shrink-0 gap-4">
        <button className="lg:hidden text-gray-700 hover:text-[#1dbf73] transition-colors" onClick={onMenuToggle}>
          <Menu size={24} />
        </button>
        <Link to="/buyer/dashboard" className="text-[28px] font-black text-[#404145] tracking-tighter">
          Nexlance<span className="text-[#1dbf73]">.</span>
        </Link>
      </div>

      
      <div className="hidden md:flex flex-1 max-w-2xl mx-8">
        <div className="relative w-full flex items-center border border-gray-300 rounded overflow-hidden focus-within:border-gray-500">
          <input
            type="text"
            placeholder="What service are you looking for today?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-4 pr-10 text-[15px] text-[#404145] outline-none placeholder-gray-500"
          />
          <button className="absolute right-0 h-full w-12 bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
            <Search className="text-white h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>

      
      <div className="flex items-center gap-5">
        
        
        <div className="hidden lg:flex items-center gap-5">
          <div className="relative">
            <button 
              onClick={() => togglePopup('notifications')}
              className="text-gray-500 hover:text-[#1dbf73] transition-colors p-1" 
              title="Notifications"
            >
              <Bell size={20} />
            </button>
            <NotificationDropdown open={openPopup === 'notifications'} />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => togglePopup('inbox')}
              className="text-gray-500 hover:text-[#1dbf73] transition-colors p-1" 
              title="Messages"
            >
              <Mail size={20} />
            </button>
            <InboxDropdown open={openPopup === 'inbox'} />
          </div>

          <Link to="/buyer/lists" className="text-gray-500 hover:text-[#1dbf73] transition-colors p-1" title="Lists">
            <Heart size={20} />
          </Link>
          <Link to="/orders" className="text-[15px] font-semibold text-gray-500 hover:text-[#1dbf73] transition-colors">
            Orders
          </Link>
        </div>

        
        <div className="group relative">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-sm">
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </button>

          <div className="invisible absolute right-0 top-full z-20 pt-3 w-[320px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
            <div className="rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden py-3">
              
              
              <div className="px-4 pb-3">
                <div className="font-bold text-[#404145] text-[16px]">{user.name || 'User'}</div>
                <div className="text-[#62646a] text-[15px] mb-3">{user.email || ''}</div>
                <Link to="/seller/dashboard" className="block w-full text-center px-3 py-2.5 rounded-lg border border-[#404145] text-[15px] font-bold text-[#404145] hover:bg-gray-50 transition-colors">
                  Switch to Selling
                </Link>
              </div>
              
              <div className="border-t border-gray-200 my-1"></div>

              
              <div className="py-1">
                <Link to="/buyer/briefs" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Your briefs</Link>
                <Link to="/buyer/briefs" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Post a project brief</Link>
              </div>

              <div className="border-t border-gray-200 my-1"></div>

              
              <div className="py-1">
                <Link to="/buyer/profile" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Profile</Link>
                <Link to="/settings" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Account settings</Link>
                <Link to="/seller/billing" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Billing and payments</Link>
                <Link to="/support" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Support</Link>
              </div>

              <div className="border-t border-gray-200 my-1"></div>

              
              <div className="py-2">
                <div className="px-4 text-[13px] font-bold text-[#b5b6ba] mb-1">Exclusive features</div>
                <Link to="#" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Invite your teammates</Link>
                <Link to="#" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Let us find your freelancer</Link>
                <Link to="#" className="block w-full px-4 py-2.5 text-left text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium">Let us manage your project</Link>
              </div>

              <div className="border-t border-gray-200 my-1"></div>

              
              <div className="py-1">
                <button 
                  onClick={() => setIsLangOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium"
                >
                  <Globe size={18} className="text-[#62646a]" />
                  <span>English</span>
                </button>

                <button 
                  onClick={() => setIsCurrOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium"
                >
                  <span className="text-lg leading-none font-normal text-[#62646a]">₹</span>
                  <span>INR</span>
                </button>
              </div>

              <div className="border-t border-gray-200 my-1"></div>

              
              <div className="py-1">
                <button 
                  onClick={async () => {
                    await api.auth.logout();
                    window.location.href = '/';
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[16px] text-[#404145] hover:bg-gray-100 transition-colors font-medium"
                >
                  <LogOut size={18} className="text-[#62646a]" />
                  <span>Sign out</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <LanguageModal isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />
      <CurrencyModal isOpen={isCurrOpen} onClose={() => setIsCurrOpen(false)} />
    </nav>
  );
}
