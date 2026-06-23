import React from 'react';

export default function FormSelect({ label, className = '', children, ...props }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <select
        {...props}
        className={`h-12 w-full rounded-md border border-[#dadbdd] bg-white px-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-[#1dbf73] focus:ring-2 focus:ring-[#1dbf73]/15 ${className}`}
      >
        {children}
      </select>
    </label>
  );
}
