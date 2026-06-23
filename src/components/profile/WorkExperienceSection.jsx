import React from 'react';
import { BriefcaseBusiness } from 'lucide-react';

export default function WorkExperienceSection({ onAddWorkExperience }) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        <button type="button" aria-label="Add Work Experience" onClick={onAddWorkExperience} className="rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-600 cursor-pointer">
          Add Work Experience
        </button>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm">
          <BriefcaseBusiness size={28} />
        </div>
        <p className="mt-4 text-sm text-gray-500">Add work history to show clients your professional background.</p>
      </div>
    </section>
  );
}