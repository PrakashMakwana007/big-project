import React from 'react';

export default function FormTextarea({ label, className = '', ...props }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <textarea
        {...props}
        className={`w-full rounded-md border border-[#dadbdd] bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#1dbf73] focus:ring-2 focus:ring-[#1dbf73]/15 ${className}`}
      />
    </label>
  );
}
