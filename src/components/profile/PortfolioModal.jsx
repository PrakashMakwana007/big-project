import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import ModalShell from './ui/ModalShell';
import FormInput from './ui/FormInput';
import FormTextarea from './ui/FormTextarea';
import FormSelect from './ui/FormSelect';

export default function PortfolioModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ title: '', category: '', description: '', link: '' });
  const canSubmit = formData.title.trim() && formData.description.trim();

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Add Portfolio Project" sizeClass="max-w-4xl">
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4 border-b border-gray-100 pb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-[#22c55e]">
            <ImagePlus size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Add Portfolio Project</h2>
            <p className="mt-1 text-sm text-gray-500">Showcase your best work in a clean layout.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput label="Project title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
          <FormSelect label="Category" value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })}>
            <option value="">Select category</option>
            <option>Web Development</option>
            <option>Logo Design</option>
            <option>SEO</option>
            <option>Writing</option>
          </FormSelect>
          <FormTextarea className="sm:col-span-2 min-h-[140px]" label="Description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} placeholder="Describe the project, your role, and the outcome." />
          <FormInput className="sm:col-span-2" label="Project link (optional)" value={formData.link} onChange={(event) => setFormData({ ...formData, link: event.target.value })} placeholder="https://" />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
          <button type="button" onClick={onClose} className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-200 cursor-pointer">
            Cancel
          </button>
          <button type="button" disabled={!canSubmit} onClick={() => onSave?.(formData)} className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${canSubmit ? 'bg-[#22c55e] text-white hover:bg-green-600 cursor-pointer' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}>
            Add Project
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
