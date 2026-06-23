import React from 'react';

export default function OrdersTabs({ tabs, activeTab, onTabChange }) {
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
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
