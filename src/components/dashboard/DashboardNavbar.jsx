import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, MessageCircle, HelpCircle, User, ChevronDown, Globe, LogOut } from 'lucide-react';
import LanguageModal from '../modals/LanguageModal';
import CurrencyModal from '../modals/CurrencyModal';
import api from '../../services/api';

export default function DashboardNavbar() {
  const [activeNav, setActiveNav] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const location = useLocation();
  const user = api.auth.getSavedUser() || { name: 'User', email: '' };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/seller/dashboard',
      dropdown: false,
    },
    {
      id: 'business',
      label: 'My Business',
      dropdown: true,
      items: [
        { label: 'Orders', path: '/seller/orders' },
        { label: 'Gigs', path: '/seller/gigs' },
        { label: 'Profile', path: '/seller/profile' },
        { label: 'Earnings', path: '/seller/earnings' },
      ],
    },
    {
      id: 'growth',
      label: 'Growth & Marketing',
      dropdown: true,
      items: [
        { label: 'Level Overview', path: '/seller/level-overview' },
        { label: 'Referrals', path: '/seller/referrals' },
        { label: 'Contacts', path: '/seller/contacts' },
        { label: 'Program Benefits', path: '/seller/program' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      dropdown: true,
      items: [
        { label: 'Overview', path: '/seller/analytics/overview' },
        { label: 'Repeat Business', path: '/seller/analytics/repeat-business' },
        { label: 'Keyword Search', path: '#' },
      ],
    },
  ];

  return (
    <nav className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-6">
      
      <div className="flex items-center">
        <Link to="/seller/dashboard" className="text-2xl font-bold text-[#22c55e] tracking-tight">Nexlance</Link>
      </div>

      
      <div className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(`/${item.id}`) || (item.path && location.pathname === item.path);
          
          return (
            <div key={item.id} className={item.dropdown ? 'group relative' : ''}>
              {item.dropdown ? (
                <button
                  type="button"
                  className={`flex items-center gap-1 px-4 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'text-[#22c55e] border-[#22c55e]'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  <ChevronDown size={14} className="opacity-60" />
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 px-4 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'text-[#22c55e] border-[#22c55e]'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              )}

              {item.dropdown && (
                <div className="invisible absolute left-0 top-full z-20 pt-2 w-48 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-lg border border-gray-100 bg-white shadow-lg overflow-hidden">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-green-600"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      
      <div className="flex items-center gap-4">
        
        
        <div className="group relative">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors" title="Notifications">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
          </button>
          <div className="invisible absolute right-0 top-full z-20 pt-2 w-80 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-semibold text-gray-900">Notifications (2)</h3>
                <Link to="#" className="text-[13px] text-gray-500 hover:text-[#22c55e] transition-colors">Mark as read</Link>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer flex gap-3 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-green-600 mt-0.5">
                    <Bell size={14} />
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-800 leading-snug"><span className="font-bold">Alex Smith</span> viewed your recent offer details.</p>
                    <p className="text-[12px] text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer flex gap-3 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mt-0.5">
                    <Bell size={14} />
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-800 leading-snug"><span className="font-bold">System</span> Your Gig was successfully published!</p>
                    <p className="text-[12px] text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-center border-t border-gray-100 bg-gray-50/50">
                <Link to="#" className="text-[14px] text-[#22c55e] hover:underline font-semibold tracking-wide">See all notifications</Link>
              </div>
            </div>
          </div>
        </div>

        
        <div className="group relative">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Messages">
            <MessageCircle size={20} className="text-gray-700" />
          </button>
          <div className="invisible absolute right-0 top-full z-20 pt-2 w-80 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-semibold text-gray-900">Inbox</h3>
                <Link to="#" className="text-[13px] text-gray-500 hover:text-[#22c55e] transition-colors">Mark as read</Link>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer flex gap-3 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center font-bold text-purple-700">J</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-gray-900">John Doe</h4>
                    <p className="text-[13px] text-gray-600 truncate mt-0.5">Hey, are you available for a quick project right now?</p>
                    <p className="text-[12px] text-gray-400 mt-1">4 hours ago</p>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer flex gap-3 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center font-bold text-orange-700">S</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-gray-900">Sarah Smith</h4>
                    <p className="text-[13px] text-gray-600 truncate mt-0.5">Thanks for the delivery! It looks absolutely perfect.</p>
                    <p className="text-[12px] text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-center border-t border-gray-100 bg-gray-50/50">
                <Link to="#" className="text-[14px] text-[#22c55e] hover:underline font-semibold tracking-wide">See all in inbox</Link>
              </div>
            </div>
          </div>
        </div>

        
        <div className="group relative">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Help">
            <HelpCircle size={20} className="text-gray-700" />
          </button>
          <div className="invisible absolute right-0 top-full z-20 pt-2 w-56 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden py-2">
              <Link to="#" className="block px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#22c55e] transition-colors font-medium">Help Center</Link>
              <Link to="#" className="block px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#22c55e] transition-colors font-medium">Nexlance Forum</Link>
              <Link to="#" className="block px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#22c55e] transition-colors font-medium">Nexlance Blogs</Link>
              <Link to="#" className="block px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#22c55e] transition-colors font-medium">Ask the Community</Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link to="#" className="block px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#22c55e] transition-colors font-medium">Contact Support</Link>
            </div>
          </div>
        </div>

        
        <div className="group relative">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#22c55e] to-green-600 text-white transition-all hover:shadow-md">
            {user.name ? user.name[0].toUpperCase() : <User size={20} />}
          </button>

          <div className="invisible absolute right-0 top-full z-20 pt-2 w-72 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg overflow-hidden">
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-900">{user.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user.email || ''}</p>
              </div>

              <Link to="/orders" className="block w-full text-center mb-3 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">Switch to Buying</Link>

              <div className="space-y-1 mb-2">
                <Link to="/seller/profile" className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors">Profile</Link>
                <Link to="/seller/referrals" className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors">Refer a Friend</Link>
                <Link to="/seller/billing" className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors">Billing & Payments</Link>
                <Link to="/settings" className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors">Settings</Link>
              </div>

              <hr className="my-2 border-gray-100" />

              <div className="mt-2 space-y-2">
                <button 
                  onClick={() => setIsLangOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>English</span>
                  </div>
                  <span className="text-gray-500"> </span>
                </button>

                <button 
                  onClick={() => setIsCurrOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">₹</span>
                    <span>INR</span>
                  </div>
                  <span className="text-gray-500"> </span>
                </button>
              </div>

              <hr className="my-3 border-gray-100" />

              <button 
                onClick={async () => {
                  await api.auth.logout();
                  window.location.href = '/';
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 flex items-center gap-2 hover:bg-red-50"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <LanguageModal isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />
      <CurrencyModal isOpen={isCurrOpen} onClose={() => setIsCurrOpen(false)} />
    </nav>
  );
}
