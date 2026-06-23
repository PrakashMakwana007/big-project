import React from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import ProfileCard from '../../components/dashboard/ProfileCard';
import AnalyticsCard from '../../components/dashboard/AnalyticsCard';
import OrdersSection from '../../components/dashboard/OrdersSection';
import MessagesSection from '../../components/dashboard/MessagesSection';
import FreelancerLevelSection from '../../components/dashboard/FreelancerLevelSection';
import ResourcesSection from '../../components/dashboard/ResourcesSection';
import Footer from '../../components/dashboard/Footer';

export default function SellerDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <DashboardNavbar />

      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        
        <section className="mb-6">
          <ProfileCard />
        </section>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            <OrdersSection />

            
            <MessagesSection />

            
            <FreelancerLevelSection />

            
            <ResourcesSection />
          </div>

          
          <div className="space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Track Your Performance</h3>
              <AnalyticsCard />
            </div>

            
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Share Your Feedback</h3>
              <p className="text-sm text-gray-500 mb-4">
                Help us improve your seller experience
              </p>
              <button className="w-full py-2 px-4 rounded-lg bg-[#22c55e] text-white text-sm font-semibold transition-all duration-200 hover:bg-green-600 hover:shadow-md">
                Give Feedback
              </button>
            </div>
          </div>
        </div>
      </main>

      
      <Footer />
    </div>
  );
}
