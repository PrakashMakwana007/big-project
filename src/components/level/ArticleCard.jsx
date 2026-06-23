import React from 'react';

export default function ArticleCard({ title, category, subtitle }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#e4e5e7] bg-white shadow-sm">
      <div className="h-32 w-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
      <div className="p-4">
        <div className="text-xs font-semibold text-[#1dbf73]">{category}</div>
        <div className="mt-2 text-sm font-semibold text-gray-900">{title}</div>
        <div className="mt-1 text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
}
