import React, { useState } from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import ContactsTabs from '../../components/contacts/ContactsTabs';
import SearchInput from '../../components/contacts/SearchInput';
import ContactsEmptyState from '../../components/contacts/ContactsEmptyState';

export default function MyContacts() {
  const [activeTab, setActiveTab] = useState('buyers');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145]">
      <DashboardNavbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-4 border-b border-[#e4e5e7] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">My Contacts</h1>
            </div>

            <div className="w-full sm:max-w-sm">
              <SearchInput
                placeholder="Search My History..."
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </div>
          </div>

          <div className="mt-5">
            <ContactsTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <section className="mt-6 rounded-[14px] border border-[#e4e5e7] bg-white px-6 py-12 shadow-sm sm:py-20">
            <ContactsEmptyState activeTab={activeTab} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
