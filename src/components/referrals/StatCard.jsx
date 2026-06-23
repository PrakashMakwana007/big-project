import React from 'react';

export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-[12px] border border-[#e4e5e7] bg-white p-5 shadow-sm transition-shadow duration-150 hover:shadow-md">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-500 ring-1 ring-[#e4e5e7]">
        {Icon ? <Icon size={18} /> : null}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">{value}</div>
    </div>
  );
}
