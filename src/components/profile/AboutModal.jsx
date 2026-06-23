import React, { useEffect, useMemo, useState } from 'react';
import { CircleAlert } from 'lucide-react';
import ModalShell from './ui/ModalShell';

const MAX_LENGTH = 600;

export default function AboutModal({ isOpen, onClose, initialValue, onSave }) {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    if (isOpen) setValue(initialValue || '');
  }, [isOpen, initialValue]);

  const count = useMemo(() => value.length, [value]);

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="About" sizeClass="max-w-4xl">
      <div className="p-6 sm:p-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900">About</h2>

        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <CircleAlert size={18} className="mt-0.5 text-gray-700" />
            <p>Add details about your expertise and the services you offer to help clients get to know you.</p>
          </div>
        </div>

        <div className="mt-4 rounded-[12px] border-2 border-gray-800 bg-white p-5 shadow-sm">
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value.slice(0, MAX_LENGTH))}
            className="min-h-[150px] w-full resize-none border-0 bg-transparent text-base leading-7 text-gray-900 outline-none focus:ring-0"
            aria-label="About description"
          />

          <div className="mt-6 flex items-center justify-between">
            <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 transition-all duration-200 hover:bg-gray-50 cursor-pointer" title="Copy text">
              ⧉
            </button>
            <span className="text-sm text-gray-500">
              {count}/{MAX_LENGTH} characters
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
          <button type="button" onClick={onClose} className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-200 cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={() => onSave?.(value)} className="rounded-xl bg-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-600 cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </ModalShell>
  );
}