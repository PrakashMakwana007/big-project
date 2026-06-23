import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchInput({ placeholder, value, onChange, onClear }) {
  return (
    <label className="group flex items-center gap-3 border-b border-[#e4e5e7] pb-2 transition-colors duration-150 focus-within:border-[#1dbf73]">
      <div className="relative flex-1">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full bg-transparent pr-10 text-sm font-medium text-gray-900 outline-none placeholder:font-normal placeholder:text-[#74767e]"
        />

        {value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={15} />
          </button>
        ) : (
          <Search size={16} className="absolute right-1 top-1/2 -translate-y-1/2 text-[#74767e]" />
        )}
      </div>
    </label>
  );
}
