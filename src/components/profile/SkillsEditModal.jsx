import React, { useEffect, useState } from 'react';
import ModalShell from './ui/ModalShell';
import FormSelect from './ui/FormSelect';

export default function SkillsEditModal({ isOpen, onClose, skillItem, onUpdate, onDelete }) {
  const [skill, setSkill] = useState(skillItem?.name ?? '');
  const [level, setLevel] = useState(skillItem?.level ?? 'Pro');

  useEffect(() => {
    setSkill(skillItem?.name ?? '');
    setLevel(skillItem?.level ?? 'Pro');
  }, [skillItem]);

  const changed = skill !== (skillItem?.name ?? '') || level !== (skillItem?.level ?? 'Pro');

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Edit skill" sizeClass="max-w-md">
      <div className="p-6">
        <div className="space-y-4">
          <FormSelect label="Skill" value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Flutter">Flutter</option>
            <option value="PHP">PHP</option>
          </FormSelect>

          <FormSelect label="Level" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Pro">Pro</option>
            <option value="Expert">Expert</option>
          </FormSelect>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={() => { onDelete?.(skillItem); onClose(); }} className="text-sm font-semibold text-red-600">Delete</button>

          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} className="rounded-md bg-gray-100 px-4 py-2 text-sm">Cancel</button>
            <button type="button" disabled={!changed} onClick={() => { onUpdate?.({ ...skillItem, name: skill, level }); onClose(); }} className={`rounded-md px-4 py-2 text-sm font-semibold ${changed ? 'bg-[#1dbf73] text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
              Update
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
