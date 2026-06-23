import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BuyerNavbar from '../../components/buyer/BuyerNavbar';
import Footer from '../../components/Footer';

export default function HelpPage({ activeTab }) {
  const location = useLocation();

  const sidebarLinks = [
    { id: 'help-center', label: 'Help Center', path: '/support/help-center' },
    { id: 'trust-safety', label: 'Trust & Safety', path: '/support/trust-safety' },
    { id: 'customer-support', label: 'Customer Support', path: '/support/customer-support' },
    { id: 'tickets', label: 'Support Tickets', path: '/support/tickets' },
    { id: 'payments', label: 'Payments', path: '/support/payments' },
  ];

  const contentMap = {
    'help-center': {
      title: 'Help Center',
      body: 'Welcome to the Nexlance Help Center. Browse through our articles and guides below to find answers to commonly asked questions about buying, selling, and managing your account.'
    },
    'trust-safety': {
      title: 'Trust & Safety',
      body: 'Nexlance is committed to providing a safe and secure environment. Read about our community standards, safety policies, and how we protect our users.'
    },
    'customer-support': {
      title: 'Customer Support',
      body: 'Need help with an ongoing order, account issue, or something else? Our Customer Support team is available 24/7. Please describe your issue to get started.'
    },
    'tickets': {
      title: 'Support Tickets',
      body: 'Track the status of your open requests with Customer Support. You currently have no open tickets.'
    },
    'payments': {
      title: 'Payment Support',
      body: 'Learn about payment methods, billing history, invoices, and resolving transaction issues. If you have a specific payment problem, you can file a ticket.'
    }
  };

  const content = contentMap[activeTab] || contentMap['help-center'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BuyerNavbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        
        
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-[#e4e5e7] rounded-lg p-4 shadow-sm sticky top-24">
            <h2 className="text-[14px] font-bold text-[#b5b6ba] uppercase tracking-wider mb-4 px-3">Categories</h2>
            <nav className="flex flex-col gap-1">
              {sidebarLinks.map(link => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`px-3 py-2 rounded text-[15px] font-semibold transition-colors ${
                    activeTab === link.id
                      ? 'bg-[#f7f7f7] text-[#404145]'
                      : 'text-[#62646a] hover:bg-[#f7f7f7] hover:text-[#404145]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        
        <section className="flex-1 bg-white border border-[#e4e5e7] rounded-lg p-10 shadow-sm min-h-[500px]">
          <h1 className="text-[28px] font-bold text-[#404145] mb-6">{content.title}</h1>
          <div className="w-16 h-1 bg-[#1dbf73] mb-8"></div>
          
          <p className="text-[16px] text-[#62646a] leading-relaxed mb-8">
            {content.body}
          </p>

          
          <div className="space-y-4">
            <div className="h-24 bg-[#f7f7f7] border border-[#e4e5e7] rounded-lg w-full flex items-center px-6">
              <span className="text-[#b5b6ba] text-[14px] font-semibold">Related Articles...</span>
            </div>
            <div className="h-24 bg-[#f7f7f7] border border-[#e4e5e7] rounded-lg w-full flex items-center px-6">
              <span className="text-[#b5b6ba] text-[14px] font-semibold">FAQs...</span>
            </div>
            {activeTab === 'customer-support' && (
              <button className="bg-[#404145] text-white px-6 py-3 rounded font-bold text-[15px] hover:bg-black transition-colors mt-4">
                Contact Us
              </button>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
