import React from 'react';

const TABS = [
  { id: 'buyers', label: 'MY BUYERS' },
  { id: 'sellers', label: 'MY SELLERS' },
];

export default function ContactsTabs({ activeTab, onChange }) {
  return (
    <div className="flex gap-6 border-b border-[#e4e5e7]">
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative pb-3 text-xs font-semibold tracking-[0.18em] transition-colors duration-150 ${active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            {tab.label}
            <span className={`absolute left-0 right-0 bottom-[-1px] h-[2px] rounded-full transition-all duration-150 ${active ? 'bg-[#1dbf73]' : 'bg-transparent'}`} />
          </button>
        );
      })}
    </div>
  );
}
