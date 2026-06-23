import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MoreMenu from './ui/MoreMenu';
import EducationEditModal from './EducationEditModal';

export default function EducationSection({ onAddEducation }) {
  const [education, setEducation] = useState([
    {
      id: 1,
      school: 'University of Delhi',
      degree: 'Bachelor of Technology, Computer Science',
      country: 'India',
      year: '2022',
    },
    {
      id: 2,
      school: 'Nexlance Academy',
      degree: 'Professional UI/UX & Freelance Business Program',
      country: 'India',
      year: '2024',
    },
  ]);

  const [editing, setEditing] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (item) => {
    setEditing(item);
    setIsEditOpen(true);
  };

  const handleUpdate = (updated) => {
    setEducation((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleDelete = (item) => {
    setEducation((prev) => prev.filter((e) => e.id !== item.id));
  };

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <button type="button" aria-label="Add Education" onClick={onAddEducation} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 cursor-pointer">
          <Plus size={16} />
          Add new
        </button>
      </div>

      <div className="space-y-3">
        {education.map((item) => (
          <div key={item.id} className="relative rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="absolute right-3 top-3">
              <MoreMenu
                onEdit={() => handleEdit(item)}
                onDelete={() => { if (window.confirm(`Delete ${item.school}?`)) handleDelete(item); }}
              />
            </div>

            <p className="text-sm font-semibold text-gray-900">{item.school}</p>
            <p className="mt-1 text-sm text-gray-600">{item.degree}</p>
            <p className="mt-2 text-xs text-gray-500">{item.country} • {item.year}</p>
          </div>
        ))}
      </div>
      
      <EducationEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        item={editing}
        onUpdate={(u) => { handleUpdate(u); }}
        onDelete={(i) => { handleDelete(i); setIsEditOpen(false); }}
      />
    </section>
  );
}