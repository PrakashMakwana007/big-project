import React, { useState } from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import BillingHistory from '../../components/billing/BillingHistory';
import BillingInfo from '../../components/billing/BillingInfo';
import Balances from '../../components/billing/Balances';
import PaymentMethods from '../../components/billing/PaymentMethods';
import OngoingPayments from '../../components/billing/OngoingPayments';

export default function BillingPayments() {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', label: 'Billing history' },
    { id: 'info', label: 'Billing info' },
    { id: 'balances', label: 'Balances' },
    { id: 'payment', label: 'Payment methods' },
    { id: 'ongoing', label: 'Ongoing payments' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-8">Billing and payments</h1>
        
        
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-4 font-semibold text-[15px] transition-colors
                  ${activeTab === tab.id
                    ? 'border-[#404145] text-[#404145]'
                    : 'border-transparent text-[#b5b6ba] hover:text-[#7a7d85] hover:border-gray-200'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        
        <div className="mt-6">
          {activeTab === 'history' && <BillingHistory />}
          {activeTab === 'info' && <BillingInfo />}
          {activeTab === 'balances' && <Balances />}
          {activeTab === 'payment' && <PaymentMethods />}
          {activeTab === 'ongoing' && <OngoingPayments />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
