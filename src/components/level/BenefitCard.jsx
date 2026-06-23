import React from 'react';

export default function BenefitCard({ title, desc, badge, icon: Icon, featured = false, actionLabel = 'Learn more' }) {
  return (
    <div className={`rounded-lg border border-[#e4e5e7] bg-white p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${featured ? 'bg-[#f5f7ff]' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${featured ? 'border-[#d8ddff] bg-white text-[#5d5ce6]' : 'border-gray-200 bg-white text-gray-700'}`}>
            {Icon ? <Icon size={18} /> : null}
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">{title}</div>
            <div className="mt-1 text-xs leading-5 text-gray-500">{desc}</div>
          </div>
        </div>

        <div className="shrink-0">
          <div className={`rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide ${featured ? 'bg-[#dfe3ff] text-[#4a49cb]' : 'bg-gray-50 text-gray-700 ring-1 ring-gray-200'}`}>{badge}</div>
        </div>
      </div>

      <div className="mt-3 text-xs font-semibold text-gray-600 hover:text-[#1dbf73]">
        {actionLabel}
      </div>
    </div>
  );
}
