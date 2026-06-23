import { useState } from 'react';

export default function OfferPackagesToggle({ isEnabled, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[15px] font-semibold text-gray-700">Offer packages</span>
      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        onClick={() => onChange(!isEnabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
          isEnabled ? 'bg-black' : 'bg-gray-300'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isEnabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        >
          {isEnabled && (
            <svg className="h-3 w-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
