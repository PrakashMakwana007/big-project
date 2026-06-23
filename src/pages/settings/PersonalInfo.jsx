import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, X, Eye } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import api from '../../services/api';

export default function PersonalInfo() {
  const [activeModal, setActiveModal] = useState(null);
  const user = api.auth.getSavedUser() || { name: 'User', email: '' };

  const nameParts = (user.name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  
  const maskEmail = (email) => {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    if (local.length <= 2) return `${local[0]}***@${domain}`;
    return `${local[0]}***${local[local.length - 1]}@${domain}`;
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        <Link to="/settings" className="inline-flex items-center text-[15px] font-semibold text-green-500 hover:text-green-600 mb-8 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Back to Account Settings
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Personal Information</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              
              
              <div className="p-8 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-1">Full Name</h3>
                  <p className="text-[15px] text-gray-600">{user.name || 'User'}</p>
                </div>
                <button onClick={() => setActiveModal('name')} className="text-[15px] font-semibold text-green-500 hover:text-green-600 hover:underline">
                  Edit
                </button>
              </div>

              
              <div className="p-8 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-[15px] text-gray-600">{maskEmail(user.email)}</p>
                </div>
                <button onClick={() => setActiveModal('email')} className="text-[15px] font-semibold text-green-500 hover:text-green-600 hover:underline">
                  Edit
                </button>
              </div>

              
              <div className="p-8 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-1">Online Status</h3>
                  <p className="text-[15px] text-gray-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                    Online
                  </p>
                  <p className="text-sm text-gray-500 mt-2">When online, your Gigs are visible under the Online search filter.</p>
                </div>
                <button onClick={() => setActiveModal('visibility')} className="text-[15px] font-semibold text-green-500 hover:text-green-600 hover:underline">
                  Edit
                </button>
              </div>

              
              <div className="p-8 flex justify-between items-start bg-gray-50/50">
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-1">Account Deactivation</h3>
                  <p className="text-[15px] text-gray-600">What happens when you deactivate your account?</p>
                </div>
                <button onClick={() => setActiveModal('deactivate')} className="text-[15px] font-semibold text-red-500 hover:text-red-600 hover:underline">
                  Deactivate Account
                </button>
              </div>

            </div>
          </div>

          
          <div className="w-full lg:w-[320px]">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                <Eye size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Your Profile is Public</h3>
              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                While your personal information is kept private, buyers can view your public profile to see your Gigs, reviews, and portfolio.
              </p>
              <Link to="/seller/profile" className="w-full border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                Go to Profile
              </Link>
            </div>
          </div>
        </div>
      </main>

      
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {activeModal === 'name' && 'Edit Full Name'}
                {activeModal === 'email' && 'Change Email Address'}
                {activeModal === 'visibility' && 'Update Online Status'}
                {activeModal === 'deactivate' && 'Deactivate Account'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {activeModal === 'name' && (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-900 mb-1.5">First Name</label>
                      <input type="text" defaultValue={firstName} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-900 mb-1.5">Last Name</label>
                      <input type="text" defaultValue={lastName} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'email' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">Current Email</label>
                    <input type="text" disabled defaultValue={user.email} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">New Email</label>
                    <input type="email" placeholder="Enter new email" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">Password</label>
                    <input type="password" placeholder="Enter current password to confirm" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                  </div>
                </div>
              )}

              {activeModal === 'visibility' && (
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="status" defaultChecked className="w-4 h-4 text-green-500 focus:ring-green-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Online</div>
                      <div className="text-sm text-gray-500">Visible under the Online search filter</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="status" className="w-4 h-4 text-green-500 focus:ring-green-500" />
                    <div>
                      <div className="font-semibold text-gray-900">Offline</div>
                      <div className="text-sm text-gray-500">You won't appear as online for a chosen duration</div>
                    </div>
                  </label>
                </div>
              )}

              {activeModal === 'deactivate' && (
                <div className="space-y-4">
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg text-[15px] font-medium">
                    Warning: Deactivating your account will disable your profile and remove all your Gigs from search.
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">Reason for leaving</label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white">
                      <option>Choose a reason...</option>
                      <option>I'm not getting any orders</option>
                      <option>I'm unhappy with the platform</option>
                      <option>I have another account</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">Password</label>
                    <input type="password" placeholder="Enter password to confirm" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button onClick={closeModal} className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={closeModal} className={`px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors ${activeModal === 'deactivate' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
                {activeModal === 'deactivate' ? 'Deactivate' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
