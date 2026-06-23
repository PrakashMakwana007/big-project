import React from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, Bell, CheckCircle } from 'lucide-react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Footer from '../../components/dashboard/Footer';
import api from '../../services/api';

export default function AccountSettingsHome() {
  const user = api.auth.getSavedUser() || { name: 'User', email: '' };

  const maskEmail = (email) => {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    if (local.length <= 2) return `${local[0]}***@${domain}`;
    return `${local[0]}***${local[local.length - 1]}@${domain}`;
  };

  const cards = [
    {
      icon: <User className="w-8 h-8 text-green-500 mb-4" strokeWidth={1.5} />,
      title: 'Personal Information',
      description: 'Provide personal details and how we can reach you',
      path: '/settings/personal-info'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500 mb-4" strokeWidth={1.5} />,
      title: 'Account Security',
      description: 'Update your password and secure your account',
      path: '/settings/security'
    },
    {
      icon: <Bell className="w-8 h-8 text-green-500 mb-4" strokeWidth={1.5} />,
      title: 'Notifications',
      description: 'Choose notification preferences and how you want to be contacted',
      path: '/settings/notifications'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500 mb-4" strokeWidth={1.5} />,
      title: 'Identity Verification',
      description: 'Review your verified ID and details',
      path: '/settings/verification'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Account Settings</h1>
            <p className="text-gray-900 font-semibold text-[15px]">{user.name}, <span className="text-gray-500 font-normal">{maskEmail(user.email)}</span></p>
          </div>
          <Link to="/seller/profile" className="text-green-500 font-semibold hover:text-green-600 transition-colors text-[15px]">
            Go to Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <Link 
              key={idx} 
              to={card.path}
              className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col items-start cursor-pointer h-full"
            >
              {card.icon}
              <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-500 transition-colors">{card.title}</h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">{card.description}</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
