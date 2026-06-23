import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MoreMenu from './ui/MoreMenu';
import CertificationsEditModal from './CertificationsEditModal';

export default function CertificationsSection({ onAddCertification }) {
  const [items, setItems] = useState([
    { id: 1, name: 'Front-End Developer Certificate', issuer: 'Coursera', year: '2023' },
  ]);

  const [editing, setEditing] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (item) => { setEditing(item); setIsEditOpen(true); };
  const handleUpdate = (u) => setItems((prev) => prev.map((p) => (p.id === u.id ? u : p)));
  const handleDelete = (i) => setItems((prev) => prev.filter((p) => p.id !== i.id));

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
        <button type="button" aria-label="Add Certification" onClick={onAddCertification} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 cursor-pointer">
          <Plus size={16} />
          Add certifications
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-500">No certifications added yet.</p>
          </div>
        )}

        {items.map((it) => (
          <div key={it.id} className="relative rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="absolute right-3 top-3">
              <MoreMenu onEdit={() => handleEdit(it)} onDelete={() => { if (window.confirm(`Delete ${it.name}?`)) handleDelete(it); }} />
            </div>

            <p className="text-sm font-semibold text-gray-900">{it.name}</p>
            <p className="mt-1 text-sm text-gray-600">{it.issuer}</p>
            <p className="mt-2 text-xs text-gray-500">{it.year}</p>
          </div>
        ))}
      </div>

      <CertificationsEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} item={editing} onUpdate={(u) => handleUpdate(u)} onDelete={(i) => { handleDelete(i); setIsEditOpen(false); }} />
    </section>
  );
}