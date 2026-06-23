import React from 'react';

export default function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-[12px] border border-[#dadbdd] bg-white p-5 shadow-sm">
      <div className="mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>

      <div>{children}</div>
    </section>
  );
}
