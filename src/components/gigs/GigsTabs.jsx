import React from 'react';

export default function GigsTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-4 px-1 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-200 ${
            activeTab === tab.id
              ? 'border-b-2 border-black text-black'
              : 'text-gray-400 hover:text-gray-700 border-b-2 border-transparent'
          } cursor-pointer`}
        >
          {tab.label}
          {tab.count > 0 && activeTab === tab.id && (
            <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#22c55e] text-white text-xs font-bold">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
