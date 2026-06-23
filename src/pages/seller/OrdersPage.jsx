import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import OrdersTabs from '../../components/orders/OrdersTabs';
import OrdersTable from '../../components/orders/OrdersTable';
import Footer from '../../components/dashboard/Footer';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('priority');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'priority', label: 'PRIORITY' },
    { id: 'active', label: 'ACTIVE' },
    { id: 'late', label: 'LATE' },
    { id: 'delivered', label: 'DELIVERED' },
    { id: 'completed', label: 'COMPLETED' },
    { id: 'cancelled', label: 'CANCELLED' },
    { id: 'starred', label: 'STARRED' },
  ];

  
  const ordersData = {
    priority: [],
    active: [],
    late: [],
    delivered: [],
    completed: [],
    cancelled: [],
    starred: [],
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <DashboardNavbar />

      
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-light text-gray-700">Manage Orders</h1>
          
          
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-4 py-2.5 focus-within:border-gray-400 focus-within:shadow-sm transition-all duration-200 hover:border-gray-300">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search My History..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
                title="Clear search"
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        
        <OrdersTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        
        <OrdersTable
          orders={ordersData[activeTab]}
          tabLabel={tabs.find(t => t.id === activeTab)?.label}
        />
      </main>

      
      <Footer />
    </div>
  );
}
