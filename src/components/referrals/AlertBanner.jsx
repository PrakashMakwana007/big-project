import React from 'react';
import { Info } from 'lucide-react';

export default function AlertBanner() {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#f0b8bc] bg-[#fff4f5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#d94d5a] ring-1 ring-[#f0b8bc]">
          <Info size={16} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            You&apos;re not currently eligible for the freelancer referral program.
          </p>
          <p className="mt-1 text-sm text-gray-700">
            This program is open to Level 1, Level 2, Top Rated, and Pro freelancers.
          </p>
        </div>
      </div>

      <button type="button" className="inline-flex items-center justify-center rounded-lg border border-[#e4e5e7] bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors duration-150 hover:bg-gray-50">
        Learn more
      </button>
    </div>
  );
}
