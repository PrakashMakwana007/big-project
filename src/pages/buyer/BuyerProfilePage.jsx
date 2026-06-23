import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, CheckCircle2, Eye, User, Settings, Shield, Target, Star, Heart } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import Footer from '../../components/Footer';
import FreelancerSourcingDrawer from '../../components/modals/FreelancerSourcingDrawer';
import api from '../../services/api';

export default function BuyerProfilePage() {
  const [isSourcingOpen, setIsSourcingOpen] = useState(false);
  const navigate = useNavigate();
  const user = api.auth.getSavedUser() || { name: 'Buyer', email: '' };

  const userInitials = user.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')
    : 'B';

  const userUsername = user.username
    ? `@${user.username}`
    : (user.email ? `@${user.email.split('@')[0]}` : '@username');

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
      <BuyerNavbar />

      
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-10">
        
        
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="text-[13px] text-[#62646a] mb-6 flex items-center gap-2">
              <Link to="/" className="hover:underline">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-[#404145]">Client profile</span>
            </div>
            <p className="text-[16px] text-[#404145] leading-relaxed">
              Create your <strong>client profile</strong> on Nexlance.<br/>
              Are you a freelancer? Visit your <Link to="/seller/profile" className="underline hover:text-[#1dbf73]">freelancer profile</Link> to view and update it.
            </p>
          </div>
          <button className="flex items-center gap-2 text-[#404145] font-bold text-[14px] border border-[#e4e5e7] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors bg-white">
            <Eye size={18} /> Public view
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          
          <div className="flex-1 w-full flex flex-col gap-6">
            
            
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-8 relative shadow-sm">
              <button className="absolute top-6 right-6 text-[#1dbf73] text-[15px] font-bold hover:underline">Edit</button>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 bg-[#000033] flex items-center justify-center text-white text-2xl font-bold">
                  {userInitials}
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-[28px] font-bold text-[#404145] leading-none mb-2">{user.name}</h2>
                  <p className="text-[#62646a] text-[15px] mb-4">{userUsername}</p>
                  <div className="flex items-center gap-5 text-[#62646a] text-[14px]">
                    <div className="flex items-center gap-1.5"><MapPin size={16} /> India</div>
                    <div className="flex items-center gap-1.5"><Calendar size={16} /> Joined in May 2026</div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-8 relative overflow-hidden shadow-sm">
              <div className="max-w-[70%] relative z-10">
                <h3 className="text-[20px] font-bold text-[#404145] mb-3">Overview</h3>
                <p className="text-[15px] text-[#62646a] mb-6">
                  Share details about yourself, your business, and what services you're looking to order.
                </p>
                <button className="border border-[#404145] text-[#404145] font-bold text-[15px] px-6 py-2 rounded hover:bg-gray-50 transition-colors">
                  Add
                </button>
              </div>
              <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none opacity-80">
                <div className="w-24 h-28 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center relative shadow-sm">
                  <div className="w-12 h-12 bg-white rounded border border-gray-200 absolute -top-4 -left-4 shadow-sm flex items-center justify-center">
                    <User size={20} className="text-[#1dbf73]" />
                  </div>
                  <div className="w-14 h-2 bg-gray-200 rounded-full mt-4"></div>
                  <div className="w-10 h-2 bg-gray-200 rounded-full mt-2"></div>
                </div>
              </div>
            </div>

            {/* Communication Preferences Card */}
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-8 relative shadow-sm">
              <button className="absolute top-6 right-6 text-[#1dbf73] text-[15px] font-bold hover:underline">Edit</button>
              <h3 className="text-[20px] font-bold text-[#404145] mb-6">Communication preferences</h3>
              <div className="flex gap-16">
                <div className="flex-1">
                  <p className="text-[#62646a] text-[15px] font-semibold mb-3">Speaks</p>
                  <ul className="space-y-3">
                    <li className="text-[15px] text-[#404145]">
                      <strong>English</strong> <span className="text-[#62646a]">(Fluent): Messages or video calls</span>
                    </li>
                    <li className="text-[15px] text-[#404145]">
                      <strong>Hindi</strong> <span className="text-[#62646a]">(Fluent): Messages or video calls</span>
                    </li>
                    <li className="text-[15px] text-[#404145]">
                      <strong>Gujarati</strong> <span className="text-[#62646a]">(Fluent): Messages or video calls</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <p className="text-[#62646a] text-[15px] font-semibold mb-3">Preferred hours</p>
                  <p className="text-[15px] text-[#404145] font-bold">
                    Tue-Mon, 12:00 AM-11:30 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Card */}
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-8 shadow-sm">
              <h3 className="text-[20px] font-bold text-[#404145] mb-16">Reviews from freelancers</h3>
              <div className="flex flex-col items-center justify-center pb-8 text-center">
                <div className="flex mb-4 gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={28} className="fill-[#1dbf73] text-[#1dbf73]" />)}
                </div>
                <p className="text-[15px] text-[#62646a]">
                  Here you'll see when freelancers you've worked with write a review about you.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-[350px] flex flex-col gap-6 shrink-0">
            
            {/* Progress Card */}
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between text-[13px] font-bold text-[#404145] mb-3">
                <span>0%</span>
                <span>100%</span>
              </div>
              <div className="h-2.5 w-full bg-gray-200 rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-[#404145] rounded-full w-full"></div>
              </div>
              <p className="text-[15px] font-bold text-[#404145]">
                Your profile is complete, you're all set!
              </p>
            </div>

            
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-6 shadow-sm">
              <h3 className="text-[18px] font-bold text-[#404145] mb-4">Quick links</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/buyer/briefs" className="flex items-center gap-3 text-[#62646a] font-bold hover:text-[#1dbf73] transition-colors">
                    <CheckCircle2 size={20} className="text-[#62646a]" /> Briefs
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="flex items-center gap-3 text-[#62646a] font-bold hover:text-[#1dbf73] transition-colors">
                    <Target size={20} className="text-[#62646a]" /> Orders
                  </Link>
                </li>
                <li>
                  <Link to="#" className="flex items-center gap-3 text-[#62646a] font-bold hover:text-[#1dbf73] transition-colors">
                    <Heart size={20} className="text-[#62646a]" /> Lists
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        
        <div className="mt-16 mb-8 border-t border-gray-200 pt-16">
          <h2 className="text-[20px] font-bold text-[#404145] mb-6">Find freelance talent — your way</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-6 flex flex-col shadow-sm">
              <div className="w-10 h-10 mb-4 bg-white flex items-center justify-center rounded border border-gray-200">
                <Settings size={20} className="text-[#62646a]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2">Post a project brief</h3>
              <p className="text-[15px] text-[#62646a] mb-8 leading-relaxed flex-1">
                Generate a brief with AI to receive a curated shortlist of freelancer offers.
              </p>
              <div className="flex justify-end">
                <button className="border border-[#404145] text-[#404145] font-bold text-[15px] px-6 py-2 rounded hover:bg-gray-50 transition-colors">
                  Post a brief
                </button>
              </div>
            </div>

            
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-6 flex flex-col shadow-sm">
              <div className="w-10 h-10 mb-4 bg-white flex items-center justify-center rounded border border-gray-200">
                <User size={20} className="text-[#62646a]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2">Let us find your freelancer</h3>
              <p className="text-[15px] text-[#62646a] mb-8 leading-relaxed flex-1">
                Save the endless search — we'll source, interview, and vet freelancers for you.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#62646a] text-[14px]">Only ₹19,975</span>
                <button 
                  onClick={() => setIsSourcingOpen(true)}
                  className="border border-[#404145] text-[#404145] font-bold text-[15px] px-6 py-2 rounded hover:bg-gray-50 transition-colors"
                >
                  Get started
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#e4e5e7] rounded-lg p-6 flex flex-col shadow-sm">
              <div className="w-10 h-10 mb-4 bg-white flex items-center justify-center rounded border border-gray-200">
                <Shield size={20} className="text-[#62646a]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2">Get a team built for you</h3>
              <p className="text-[15px] text-[#62646a] mb-8 leading-relaxed flex-1">
                Big project? No problem. We'll build a freelance team and fully execute your project.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#62646a] text-[14px]">Custom pricing</span>
                <button 
                  onClick={() => navigate('/buyer/managed-projects')}
                  className="border border-[#404145] text-[#404145] font-bold text-[15px] px-6 py-2 rounded hover:bg-gray-50 transition-colors"
                >
                  Book free consultation
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      
      <FreelancerSourcingDrawer 
        isOpen={isSourcingOpen} 
        onClose={() => setIsSourcingOpen(false)} 
      />
    </div>
  );
}
