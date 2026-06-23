import React from 'react';
import FieldHelpContent from './FieldHelpContent';

const pointerTopByField = {
  gigTitle: 'top-16',
  category: 'top-40',
  description: 'top-64',
  searchTags: 'top-[22rem]',
  default: 'top-16',
};

export default function GigHelpSidebar({ activeField = 'default' }) {
  const pointerTop = pointerTopByField[activeField] || pointerTopByField.default;

  return (
    <aside className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-200 lg:sticky lg:top-24">
      <span className={`absolute -left-2 hidden h-4 w-4 rotate-45 border-l border-t border-gray-200 bg-white lg:block ${pointerTop}`} />

      <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
        <FieldHelpContent activeField={activeField} />
      </div>
    </aside>
  );
}