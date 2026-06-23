import React, { useEffect, useState } from 'react';
import ModalShell from './ui/ModalShell';
import FormInput from './ui/FormInput';

export default function EducationEditModal({ isOpen, onClose, item, onUpdate, onDelete }) {
  const [school, setSchool] = useState(item?.school ?? '');
  const [degree, setDegree] = useState(item?.degree ?? '');
  const [country, setCountry] = useState(item?.country ?? '');
  const [year, setYear] = useState(item?.year ?? '');

  useEffect(() => {
    setSchool(item?.school ?? '');
    setDegree(item?.degree ?? '');
    setCountry(item?.country ?? '');
    setYear(item?.year ?? '');
  }, [item]);

  if (!item) return null;

  const changed = school !== item.school || degree !== item.degree || country !== item.country || year !== item.year;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Edit education" sizeClass="max-w-md">
      <div className="p-6">
        <div className="space-y-4">
          <FormInput label="School" value={school} onChange={(e) => setSchool(e.target.value)} />
          <FormInput label="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
          <FormInput label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          <FormInput label="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={() => { onDelete?.(item); onClose(); }} className="text-sm font-semibold text-red-600">Delete</button>

          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} className="rounded-md bg-gray-100 px-4 py-2 text-sm">Cancel</button>
            <button type="button" disabled={!changed} onClick={() => { onUpdate?.({ ...item, school, degree, country, year }); onClose(); }} className={`rounded-md px-4 py-2 text-sm font-semibold ${changed ? 'bg-[#1dbf73] text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
              Update
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
