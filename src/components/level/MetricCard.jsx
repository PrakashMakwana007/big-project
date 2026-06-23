import React from 'react';

export default function MetricCard({ title, value, subtitle }) {
  return (
    <div className="rounded-lg border border-[#e4e5e7] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      </div>
      <div className="mt-2 text-xs text-gray-500">{subtitle}</div>
    </div>
  );
}
