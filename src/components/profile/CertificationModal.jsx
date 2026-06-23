import React, { useState } from 'react';
import ModalShell from './ui/ModalShell';
import FormInput from './ui/FormInput';

export default function CertificationModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ title: '', org: '', year: '' });
  const canSubmit = formData.title.trim() && formData.org.trim();

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Add Certification" sizeClass="max-w-3xl">
      <div className="p-6 sm:p-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Add Certification</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput label="Certification title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
          <FormInput label="Issuing organization" value={formData.org} onChange={(event) => setFormData({ ...formData, org: event.target.value })} />
          <FormInput label="Issue year" value={formData.year} onChange={(event) => setFormData({ ...formData, year: event.target.value })} placeholder="2025" />
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
