import React from 'react';
import { Edit2 } from 'lucide-react';

export default function AboutSection({ onEditAbout }) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">About</h2>
        <button type="button" onClick={onEditAbout} aria-label="Edit About" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-200 hover:bg-gray-50 cursor-pointer">
          <Edit2 size={14} />
        </button>
      </div>
      <p className="max-w-3xl text-sm leading-6 text-gray-600">
        I help brands build clean, high-performing digital experiences through full-stack development, UI design,
        and thoughtful product execution. I focus on clear communication, reliable delivery, and polished work that
        feels professional from first click to final handoff.
      </p>
    </section>
  );
}