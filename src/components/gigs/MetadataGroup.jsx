import React from 'react';

export default function MetadataGroup({ group, selectedValue, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-gray-100 py-5 md:grid-cols-2 md:items-start">
      <div>
        <h4 className="text-sm font-semibold text-gray-700">{group.title}</h4>
      </div>

      <div className="space-y-3">
        {group.options.map((option) => {
          const optionId = option.id || option.value;
          const optionValue = option.value || option;
          const checked = selectedValue === optionValue;

          return (
            <label
              key={optionId}
              className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 text-sm transition-all duration-200 ${
                checked ? 'border-[#22c55e] bg-green-50 text-gray-900' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={group.id}
                checked={checked}
                onChange={() => onSelect(group.id, optionValue)}
                className="h-4 w-4 border-gray-300 text-[#22c55e] focus:ring-[#22c55e]"
              />
              <span>{optionValue}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}