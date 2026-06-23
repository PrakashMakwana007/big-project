import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import GigsTabs from '../../components/gigs/GigsTabs';
import GigsTable from '../../components/gigs/GigsTable';
import Footer from '../../components/dashboard/Footer';
import { getActiveGigs } from '../../services/gigMetadataService';

export default function MyGigsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState('last30');

  const activeGigsQuery = useQuery({
    queryKey: ['activeGigs'],
    queryFn: getActiveGigs,
  });

  const activeGigs = useMemo(() => {
    if (!activeGigsQuery.data) return [];
    return activeGigsQuery.data.map((gig) => ({
      id: gig._id,
      title: gig.title,
      thumbnail: gig.gallery && gig.gallery.length > 0 
        ? (gig.gallery.find(img => img.isPrimary)?.imageUrl || gig.gallery[0].imageUrl)
        : '💼',
      impressions: 0,
      clicks: 0,
      orders: 0,
      cancellations: '0%',
      category: gig.categoryId?.name && gig.subcategoryId?.name 
        ? `${gig.categoryId.name} / ${gig.subcategoryId.name}`
        : 'Graphics & Design / Logo Design',
      createdDate: new Date(gig.publishedAt || gig.createdAt).toLocaleDateString(),
      status: 'Active',
      slug: gig.slug,
    }));
  }, [activeGigsQuery.data]);

  const tabs = [
    { id: 'active', label: 'ACTIVE', count: activeGigs.length },
    { id: 'pending', label: 'PENDING APPROVAL', count: 0 },
    { id: 'modification', label: 'REQUIRES MODIFICATION', count: 0 },
    { id: 'draft', label: 'DRAFT', count: 0 },
    { id: 'denied', label: 'DENIED', count: 0 },
    { id: 'paused', label: 'PAUSED', count: 0 },
  ];

  const gigsData = {
    active: activeGigs,
    pending: [],
    modification: [],
    draft: [],
    denied: [],
    paused: [],
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <DashboardNavbar />

      
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-light text-gray-700">My Gigs</h1>
          
          <div className="flex items-center gap-6">
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Accepting Custom Orders</span>
              <button
                onClick={() => setAcceptingOrders(!acceptingOrders)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  acceptingOrders ? 'bg-[#22c55e]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    acceptingOrders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            
            <button
              onClick={() => navigate('/seller/gigs/create')}
              className="bg-[#22c55e] hover:bg-green-600 text-white font-semibold px-6 py-3 rounded transition-all duration-200 cursor-pointer"
            >
              CREATE A NEW GIG
            </button>
          </div>
        </div>

        
        <GigsTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        
        <GigsTable
          gigs={gigsData[activeTab]}
          tabLabel={tabs.find(t => t.id === activeTab)?.label}
          filterPeriod={filterPeriod}
          onFilterChange={setFilterPeriod}
        />

        
        <div className="mt-8 text-right">
          <button className="text-[#22c55e] hover:underline text-sm font-medium cursor-pointer">
            What does your Gig® status mean?
          </button>
        </div>
      </main>

      
      <Footer />
    </div>
  );
}
