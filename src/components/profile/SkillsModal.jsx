import React, { useState } from 'react';
import ModalShell from './ui/ModalShell';
import FormInput from './ui/FormInput';
import FormSelect from './ui/FormSelect';

export default function SkillsModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({ skill: '', level: 'Pro' });
  const canSubmit = formData.skill.trim();

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Add Skill" sizeClass="max-w-2xl">
      <div className="p-6 sm:p-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Add Skill</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput label="Skill name" value={formData.skill} onChange={(event) => setFormData({ ...formData, skill: event.target.value })} placeholder="e.g. JavaScript" />
          <FormSelect label="Level" value={formData.level} onChange={(event) => setFormData({ ...formData, level: event.target.value })}>
            <option value="Pro">Pro</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
          </FormSelect>
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
