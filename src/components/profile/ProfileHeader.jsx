import React, { useEffect, useState } from 'react';
import { Camera, Edit2, MapPin, Languages, Share2, Eye } from 'lucide-react';
import api from '../../services/api';

export default function ProfileHeader({ onEditProfile }) {
  
  const savedUser = api.auth.getSavedUser() || {};

  const [profile, setProfile] = useState({
    name: savedUser.name || 'New User',
    username: savedUser.username ? `@${savedUser.username}` : '',
    title: savedUser.title || 'Add your seller title',
    location: savedUser.location || 'Add your location',
    languages: savedUser.languages || 'Add languages',
  });

  useEffect(() => {
    let isMounted = true;

    api.users
      .getMyProfile()
      .then((data) => {
        if (!isMounted || !data) return;
        const user = data.user || data;
        setProfile({
          name: user.name || 'New User',
          username: user.username ? `@${user.username}` : '',
          title: user.title || 'Add your seller title',
          location: user.location || 'Add your location',
          languages: user.languages || 'Add languages',
        });
      })
      .catch((err) => {
        
        console.error('Failed to load profile:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#22c55e] to-green-500 text-4xl font-semibold text-white shadow-lg ring-8 ring-green-50">
            {profile.name
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase())
              .join('') || 'NU'}
            <button type="button" aria-label="Edit profile photo" onClick={onEditProfile} className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 cursor-pointer">
              <Camera size={15} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold text-gray-900">{profile.name}</h1>
              <button type="button" aria-label="Edit profile" onClick={onEditProfile} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-200 hover:bg-gray-50 cursor-pointer">
                <Edit2 size={14} />
              </button>
            </div>

            <p className="text-sm font-medium text-gray-500">{profile.username}</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Seller title:</span>
                <span>{profile.title}</span>
                <button type="button" aria-label="Edit seller title" onClick={onEditProfile} className="text-gray-400 transition-colors duration-200 hover:text-gray-700 cursor-pointer">
                  <Edit2 size={13} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gray-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages size={14} className="text-gray-400" />
                <span>{profile.languages}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 cursor-pointer">
            <Share2 size={16} />
            Share
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-600 cursor-pointer">
            <Eye size={16} />
            Preview
          </button>
        </div>
      </div>
    </section>
  );
}