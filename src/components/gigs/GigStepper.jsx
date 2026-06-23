import React from 'react';
import { ChevronRight } from 'lucide-react';

const steps = [
  'Overview',
  'Pricing',
  'Description & FAQ',
  'Requirements',
  'Gallery',
  'Publish',
];

export default function GigStepper({ activeStep = 1, onStepChange, onSave }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === activeStep;

            return (
              <div key={step} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onStepChange?.(stepNumber)}
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-200 hover:bg-gray-50 cursor-pointer"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive ? 'bg-[#22c55e] text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </span>
                  <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{step}</span>
                </button>

                {stepNumber !== steps.length && <ChevronRight size={14} className="text-gray-300" />}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onSave}
          className="self-start rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}