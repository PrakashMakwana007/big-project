import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Headset, Ticket, Settings, User, Shield } from 'lucide-react';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import Footer from '../../components/Footer';

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerNavbar />

      <main className="flex-1 w-full pb-0">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <h1 className="text-[32px] font-bold text-[#404145] mb-10">Support</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            
            <Link to="/support/help-center" className="block border border-[#e4e5e7] rounded-xl p-8 hover:shadow-md transition-shadow cursor-pointer bg-white group">
              <div className="mb-4 text-[#404145] group-hover:text-[#1dbf73] transition-colors">
                <BookOpen size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2 group-hover:text-[#1dbf73] transition-colors">Help Center</h3>
              <p className="text-[15px] text-[#62646a] leading-relaxed">
                Browse articles and guides to find answers to common questions on Nexlance.
              </p>
            </Link>

            
            <Link to="/support/trust-safety" className="block border border-[#e4e5e7] rounded-xl p-8 hover:shadow-md transition-shadow cursor-pointer bg-white group">
              <div className="mb-4 text-[#404145] group-hover:text-[#1dbf73] transition-colors">
                <ShieldCheck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2 group-hover:text-[#1dbf73] transition-colors">Trust & Safety</h3>
              <p className="text-[15px] text-[#62646a] leading-relaxed">
                Learn about Nexlance's policies, safety, and community standards.
              </p>
            </Link>

            {/* Card 3 */}
            <Link to="/support/customer-support" className="block border border-[#e4e5e7] rounded-xl p-8 hover:shadow-md transition-shadow cursor-pointer bg-white group">
              <div className="mb-4 text-[#404145] group-hover:text-[#1dbf73] transition-colors">
                <Headset size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2 group-hover:text-[#1dbf73] transition-colors">Customer Support</h3>
              <p className="text-[15px] text-[#62646a] leading-relaxed">
                Contact Support for help with your account, orders, or payments.
              </p>
            </Link>

            {/* Card 4 */}
            <Link to="/support/tickets" className="block border border-[#e4e5e7] rounded-xl p-8 hover:shadow-md transition-shadow cursor-pointer bg-white group">
              <div className="mb-4 text-[#404145] group-hover:text-[#1dbf73] transition-colors">
                <Ticket size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-bold text-[#404145] mb-2 group-hover:text-[#1dbf73] transition-colors">Support tickets</h3>
              <p className="text-[15px] text-[#62646a] leading-relaxed">
                Track and manage your requests with Customer Support.
              </p>
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="bg-[#fafafa] py-16 px-6 border-t border-[#e4e5e7]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[18px] font-bold text-[#404145] mb-6">Find freelance talent — your way</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white border border-[#e4e5e7] rounded-xl p-8 flex flex-col shadow-sm">
                <div className="w-10 h-10 mb-4 flex items-center">
                  <Settings size={28} className="text-[#404145]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-bold text-[#404145] mb-2">Post a project brief</h3>
                <p className="text-[14px] text-[#62646a] mb-8 leading-relaxed flex-1">
                  Generate a brief with AI to receive a curated shortlist of freelancer offers.
                </p>
                <div className="flex justify-end mt-auto">
                  <Link to="/buyer/briefs" className="border border-[#404145] text-[#404145] font-bold text-[14px] px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Post a brief
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-[#e4e5e7] rounded-xl p-8 flex flex-col shadow-sm">
                <div className="w-10 h-10 mb-4 flex items-center">
                  <User size={28} className="text-[#404145]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-bold text-[#404145] mb-2">Let us find your freelancer</h3>
                <p className="text-[14px] text-[#62646a] mb-8 leading-relaxed flex-1">
                  Save the endless search — we'll source, interview, and vet freelancers for you.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[#62646a] text-[13px]">Only ₹19,975</span>
                  <Link to="/buyer/profile" className="border border-[#404145] text-[#404145] font-bold text-[14px] px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Get started
                  </Link>
                </div>
              </div>

              
              <div className="bg-white border border-[#e4e5e7] rounded-xl p-8 flex flex-col shadow-sm">
                <div className="w-10 h-10 mb-4 flex items-center">
                  <Shield size={28} className="text-[#404145]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-bold text-[#404145] mb-2">Get a team built for you</h3>
                <p className="text-[14px] text-[#62646a] mb-8 leading-relaxed flex-1">
                  Big project? No problem. We'll build a freelance team and fully execute your project.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[#62646a] text-[13px]">Custom pricing</span>
                  <Link to="/buyer/managed-projects" className="border border-[#404145] text-[#404145] font-bold text-[14px] px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Book free consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
