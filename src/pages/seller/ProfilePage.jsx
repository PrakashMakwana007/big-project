import React from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <DashboardNavbar />

      
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">
        
        <h1 className="text-5xl font-light text-gray-700 mb-8">My Profile</h1>

        
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <p className="text-gray-600 text-lg">Profile settings and information will be displayed here.</p>
        </div>
      </main>

      
      <Footer />
    </div>
  );
}
