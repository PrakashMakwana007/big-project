import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import api from '../../services/api';

export default function ProfileCard() {
  const savedUser = api.auth.getSavedUser() || {};
  const [profile, setProfile] = useState({
    name: savedUser.name || 'New Seller',
    username: savedUser.username ? `@${savedUser.username}` : (savedUser.email ? `@${savedUser.email.split('@')[0]}` : '@username'),
    profileImage: savedUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(savedUser.name || 'SarahChen'),
    isNewSeller: true,
    sellerLevel: savedUser.title || 'New Seller',
    availability: 'Available',
  });

  useEffect(() => {
    let isMounted = true;
    api.users.getMyProfile()
      .then((data) => {
        if (!isMounted || !data) return;
        const user = data.user || data;
        setProfile({
          name: user.name || savedUser.name || 'New Seller',
          username: user.username ? `@${user.username}` : (user.email ? `@${user.email.split('@')[0]}` : '@username'),
          profileImage: user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(user.name || 'SarahChen'),
          isNewSeller: true,
          sellerLevel: user.title || 'New Seller',
          availability: 'Available',
        });
      })
      .catch((err) => {
        console.error('Failed to load profile on profile card:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <img
            src={profile.profileImage}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#22c55e]"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
              {profile.isNewSeller && (
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
                  New seller
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{profile.username}</p>
            <button className="mt-2 text-sm font-medium text-gray-700 underline hover:text-[#22c55e] transition-colors">
              Upgrade to Seller Plus
            </button>
          </div>
        </div>

        
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <Calendar size={18} className="text-gray-400" />
          <span>{profile.availability}</span>
          <span className="text-gray-300">›</span>
        </div>
      </div>
    </div>
  );
}
