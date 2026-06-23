import React from 'react';
import { CheckCircle2, BookOpenCheck, BriefcaseBusiness, Sparkles } from 'lucide-react';

export default function SidebarProfileStrength() {
  const score = 78;

  const actions = [
    { id: 1, label: 'Create intro video', icon: Sparkles },
    { id: 2, label: 'List certifications', icon: BookOpenCheck },
    { id: 3, label: 'List experience', icon: BriefcaseBusiness },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Profile Strength</h3>
        <span className="text-2xl font-semibold text-[#22c55e]">{score}%</span>
      </div>

      <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-[#22c55e]" style={{ width: `${score}%` }} />
      </div>

      <p className="mt-3 text-sm text-gray-500">Complete the actions below to make your profile stronger and more discoverable.</p>

      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 transition-all duration-200 hover:border-[#22c55e]/40 hover:bg-gray-50 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Icon size={16} className="text-[#22c55e]" />
                {action.label}
              </span>
              <CheckCircle2 size={16} className="text-gray-300" />
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg bg-gray-50 p-3">
        <a href="#" className="text-sm font-medium text-[#22c55e] transition-colors hover:underline">
          Gigs
        </a>
      </div>
    </div>
  );
}