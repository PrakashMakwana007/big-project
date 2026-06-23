import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';

export default function Notifications() {
  const [realTime, setRealTime] = useState(true);
  const [sounds, setSounds] = useState(true);

  const notificationsOptions = [
    { id: 'inbox', label: 'Inbox Messages' },
    { id: 'order_msgs', label: 'Order Messages' },
    { id: 'order_updates', label: 'Order Updates' },
    { id: 'rating', label: 'Rating Reminders' },
    { id: 'buyer_briefs', label: 'Buyer Briefs' },
    { id: 'account', label: 'Account Updates' },
    { id: 'gig', label: 'Gig Updates' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-[850px] mx-auto px-6 py-12">
        <Link to="/settings" className="inline-flex items-center text-[15px] font-semibold text-green-500 hover:text-green-600 mb-8 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Back to Account Settings
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Notifications</h1>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          
          
          <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 px-8 py-5">
            <div className="col-span-8 text-[13px] font-bold text-gray-500 uppercase tracking-wider">Type</div>
            <div className="col-span-2 text-center text-[13px] font-bold text-gray-500 uppercase tracking-wider">Email</div>
            <div className="col-span-2 text-center text-[13px] font-bold text-gray-500 uppercase tracking-wider">Push</div>
          </div>

          
          <div className="divide-y divide-gray-100">
            {notificationsOptions.map((opt) => (
              <div key={opt.id} className="grid grid-cols-12 items-center px-8 py-5 hover:bg-gray-50/50 transition-colors">
                <div className="col-span-8 text-[15px] font-semibold text-gray-800">{opt.label}</div>
                <div className="col-span-2 flex justify-center">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer" />
                </div>
                <div className="col-span-2 flex justify-center">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm space-y-6 mb-8">
          <h3 className="text-[17px] font-bold text-gray-900 mb-2">Real-Time Notifications</h3>
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="pr-8">
              <h4 className="text-[15px] font-semibold text-gray-800">Enable real-time notifications</h4>
              <p className="text-[14px] text-gray-500 mt-1">Get notifications in real time while you're active on the platform.</p>
            </div>
            <button 
              type="button"
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${realTime ? 'bg-green-500' : 'bg-gray-200'}`}
              onClick={() => setRealTime(!realTime)}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${realTime ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="pr-8">
              <h4 className="text-[15px] font-semibold text-gray-800">Enable sound</h4>
              <p className="text-[14px] text-gray-500 mt-1">Play a sound when you receive a new notification or message.</p>
            </div>
            <button 
              type="button"
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${sounds ? 'bg-green-500' : 'bg-gray-200'}`}
              onClick={() => setSounds(!sounds)}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${sounds ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-[15px]">
            Save Preferences
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
