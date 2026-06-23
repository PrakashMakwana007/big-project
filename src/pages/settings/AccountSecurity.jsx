import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Smartphone, Monitor } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';

export default function AccountSecurity() {
  const [tfaEnabled, setTfaEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-[850px] mx-auto px-6 py-12">
        <Link to="/settings" className="inline-flex items-center text-[15px] font-semibold text-green-500 hover:text-green-600 mb-8 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Back to Account Settings
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Account Security</h1>

        <div className="space-y-6">
          
          
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-[17px] font-bold text-gray-900 mb-6">Change Password</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Current Password</label>
                <input type="password" placeholder="Enter current password" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">New Password</label>
                  <input type="password" placeholder="Min. 8 characters" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">Confirm Password</label>
                  <input type="password" placeholder="Re-enter password" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                </div>
              </div>
              <div className="pt-2">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-[15px]">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-1 flex items-center gap-2">
                Phone Verification 
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Verified</span>
              </h3>
              <p className="text-[15px] text-gray-600">Your phone is verified.</p>
            </div>
            <button className="border border-gray-300 text-gray-700 font-semibold py-2 px-5 rounded-lg hover:bg-gray-50 transition-colors text-[15px]">
              Edit
            </button>
          </div>

          
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[17px] font-bold text-gray-900 mb-1">Security Question</h3>
                <p className="text-[15px] text-gray-600">Set a security question to verify your identity when needed.</p>
              </div>
            </div>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Question</label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white">
                  <option>What was the name of your first pet?</option>
                  <option>What city were you born in?</option>
                  <option>What was your childhood nickname?</option>
                  <option>What is your mother's maiden name?</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Answer</label>
                <input type="text" placeholder="Enter answer" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
              </div>
              <div className="pt-2">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-[15px]">
                  Save Question
                </button>
              </div>
            </div>
          </div>

          {/* Two Factor Authentication */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm flex items-center justify-between">
            <div className="pr-8">
              <h3 className="text-[17px] font-bold text-gray-900 mb-1">Two Factor Authentication</h3>
              <p className="text-[15px] text-gray-600">To help keep your account secure, we'll ask you to submit a code when using a new device to log in.</p>
            </div>
            
            
            <button 
              type="button"
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${tfaEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
              role="switch"
              aria-checked={tfaEnabled}
              onClick={() => setTfaEnabled(!tfaEnabled)}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${tfaEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-[17px] font-bold text-gray-900 mb-6">Connected Devices</h3>
            
            <div className="space-y-6">
              
              
              <div className="flex items-start justify-between border-b border-gray-100 pb-6">
                <div className="flex gap-4">
                  <div className="mt-1 text-gray-400">
                    <Monitor size={24} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 flex items-center gap-2">
                      Chrome on Windows
                      <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">This Device</span>
                    </h4>
                    <p className="text-[13px] text-gray-500 mt-1">Last activity: Just now • Delhi, India</p>
                  </div>
                </div>
              </div>

              
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="mt-1 text-gray-400">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900">Mobile App on iOS</h4>
                    <p className="text-[13px] text-gray-500 mt-1">Last activity: 2 hours ago • Delhi, India</p>
                  </div>
                </div>
                <button className="text-[14px] font-semibold text-gray-500 hover:text-red-500 transition-colors">
                  Sign Out
                </button>
              </div>

            </div>
          </div>

          
          <div className="pt-4 flex justify-end">
            <button className="text-[15px] font-semibold text-red-500 hover:text-red-600 transition-colors">
              Sign out from all devices
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
