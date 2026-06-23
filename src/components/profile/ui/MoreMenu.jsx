import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function MoreMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-lg border border-gray-100 bg-white shadow-lg">
          <ul className="py-1">
            <li>
              <button onClick={() => { setOpen(false); onEdit?.(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Edit2 size={16} />
                Edit
              </button>
            </li>
            <li>
              <button onClick={() => { setOpen(false); onDelete?.(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Trash2 size={16} />
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
