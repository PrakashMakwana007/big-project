import React, { useState } from 'react';
import ModalShell from './ui/ModalShell';
import FormInput from './ui/FormInput';
import FormSelect from './ui/FormSelect';

export default function EducationModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ school: '', degree: '', country: '', year: '' });
  const canSubmit = formData.school.trim() && formData.degree.trim();

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Education" sizeClass="max-w-3xl">
      <div className="p-6 sm:p-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Education</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput label="School" value={formData.school} onChange={(event) => setFormData({ ...formData, school: event.target.value })} />
          <FormInput label="Degree" value={formData.degree} onChange={(event) => setFormData({ ...formData, degree: event.target.value })} />
          <FormSelect label="Country" value={formData.country} onChange={(event) => setFormData({ ...formData, country: event.target.value })}>
            <option value="">Country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
          </FormSelect>
          <FormInput label="Graduation year" value={formData.year} onChange={(event) => setFormData({ ...formData, year: event.target.value })} placeholder="2024" />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
          <button type="button" onClick={onClose} className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-200 cursor-pointer">
            Cancel
          </button>
          <button type="button" disabled={!canSubmit} onClick={() => onSave?.(formData)} className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${canSubmit ? 'bg-[#22c55e] text-white hover:bg-green-600 cursor-pointer' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}>
            Add
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
