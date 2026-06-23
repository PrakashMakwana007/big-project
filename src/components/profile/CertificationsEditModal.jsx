import React, { useEffect, useState } from 'react';
import ModalShell from './ui/ModalShell';
import FormInput from './ui/FormInput';

export default function CertificationsEditModal({ isOpen, onClose, item, onUpdate, onDelete }) {
  const [name, setName] = useState(item?.name ?? '');
  const [issuer, setIssuer] = useState(item?.issuer ?? '');
  const [year, setYear] = useState(item?.year ?? '');

  useEffect(() => {
    setName(item?.name ?? '');
    setIssuer(item?.issuer ?? '');
    setYear(item?.year ?? '');
  }, [item]);

  if (!item) return null;

  const changed = name !== item.name || issuer !== item.issuer || year !== item.year;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Edit certification" sizeClass="max-w-md">
      <div className="p-6">
        <div className="space-y-4">
          <FormInput label="Certification" value={name} onChange={(e) => setName(e.target.value)} />
          <FormInput label="Issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
          <FormInput label="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={() => { onDelete?.(item); onClose(); }} className="text-sm font-semibold text-red-600">Delete</button>

          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} className="rounded-md bg-gray-100 px-4 py-2 text-sm">Cancel</button>
            <button type="button" disabled={!changed} onClick={() => { onUpdate?.({ ...item, name, issuer, year }); onClose(); }} className={`rounded-md px-4 py-2 text-sm font-semibold ${changed ? 'bg-[#1dbf73] text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
              Update
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
