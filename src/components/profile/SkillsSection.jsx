import React from 'react';
import { MoreVertical } from 'lucide-react';

export default function SkillsSection({ onAddSkills }) {
  const skills = ['HTML', 'CSS', 'JavaScript', 'ASP.NET', 'C#', 'MySQL', 'PHP', 'Flutter'];

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Skills & Expertise</h2>
        <button type="button" aria-label="Add Skills" onClick={onAddSkills} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-200 hover:bg-gray-50 cursor-pointer">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-200 hover:border-[#22c55e]/40 hover:bg-white">
            <div>
              <p className="text-sm font-semibold text-gray-900">{skill}</p>
              <p className="text-xs text-gray-500">Pro</p>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#22c55e] ring-1 ring-[#22c55e]/15">Pro</span>
          </div>
        ))}
      </div>
    </section>
  );
}