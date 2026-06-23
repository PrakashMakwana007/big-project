import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import ModalShell from './ui/ModalShell';
import FormInput from './ui/FormInput';
import FormSelect from './ui/FormSelect';
import api from '../../services/api';

export default function EditProfileModal({ isOpen, onClose, initialValue, onSave }) {
  const savedUser = api.auth.getSavedUser() || {};
  const [formData, setFormData] = useState(
    initialValue || {
      name: savedUser.name || '',
      username: savedUser.username ? `@${savedUser.username}` : (savedUser.email ? `@${savedUser.email.split('@')[0]}` : ''),
      title: savedUser.title || '',
      location: savedUser.location || '',
      languages: savedUser.languages || 'English, Hindi',
    }
  );

  useEffect(() => {
    if (isOpen && initialValue) {
      setFormData(initialValue);
    }
  }, [isOpen, initialValue]);

  const canSubmit = formData.name.trim() && formData.title.trim();

  const initials = formData.name
    ? formData.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')
    : 'PB';

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Edit Profile" sizeClass="max-w-3xl">
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4 border-b border-gray-100 pb-4">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#22c55e] to-green-600 text-2xl font-semibold text-white">
            {initials}
            <button type="button" className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
            <p className="mt-1 text-sm text-gray-500">Update your public profile details.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput label="Name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
          <FormInput label="Username" value={formData.username} onChange={(event) => setFormData({ ...formData, username: event.target.value })} />
          <FormInput label="Seller title" className="sm:col-span-2" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
          <FormInput label="Location" value={formData.location} onChange={(event) => setFormData({ ...formData, location: event.target.value })} />
          <FormSelect label="Languages" value={formData.languages} onChange={(event) => setFormData({ ...formData, languages: event.target.value })}>
            <option>English, Hindi</option>
            <option>English</option>
            <option>Hindi</option>
            <option>English, Spanish</option>
          </FormSelect>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
          <button type="button" onClick={onClose} className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-200 cursor-pointer">
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => onSave?.(formData)}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
              canSubmit ? 'bg-[#22c55e] text-white hover:bg-green-600 cursor-pointer' : 'cursor-not-allowed bg-gray-200 text-gray-400'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
