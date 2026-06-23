import React from 'react';
import { Sparkles } from 'lucide-react';

const progressItems = [
  { label: 'Badge requirement', value: '0 / 1', progress: 20 },
  { label: 'Orders completed', value: '0 / 1', progress: 15 },
  { label: 'Total referrals given', value: '0 / 3', progress: 10 },
];

export default function ReferralProgramCard() {
  return (
    <div className="rounded-[14px] border border-[#e4e5e7] bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">Referrals badge</h3>

      <div className="mt-5 rounded-[14px] border border-dashed border-[#d9dbe0] bg-[#fafbfc] px-5 py-7 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1dbf73] shadow-sm ring-1 ring-[#e4e5e7]">
          <Sparkles size={28} />
        </div>
        <p className="mt-4 text-sm font-semibold text-gray-900">In progress</p>
        <p className="mt-1 text-sm text-gray-600">Complete the steps to unlock the referrals badge.</p>
      </div>

      <div className="mt-5 space-y-4">
        {progressItems.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className="text-gray-500">{item.value}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-[#1dbf73]" style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
