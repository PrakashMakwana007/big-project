import { useState } from 'react';
import { Check } from 'lucide-react';

export default function ExtraFastDelivery({
  packageKeys,
  packageDrafts,
  onPackageChange
}) {
  const [enabled, setEnabled] = useState(true);

  const packageLabels = {
    basic: 'Basic',
    standard: 'Standard',
    premium: 'Premium',
  };

  const deliveryOptions = ['1 Day', '2 Days', '3 Days', '4 Days', '5 Days', '7 Days'];

  return (
    <div className="mb-4 border-b border-gray-200 pb-6">
      <div className="mb-4 flex items-center gap-3">
        <label className="flex cursor-pointer items-center justify-center">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-sm border border-gray-300 checked:border-black checked:bg-black hover:border-gray-400 focus:outline-none"
            />
            <Check className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
          </div>
          <span className="ml-3 text-[15px] font-semibold text-[#404145]">Extra fast delivery</span>
        </label>
      </div>

      {enabled && (
        <div className="ml-8 space-y-3">
          {packageKeys.map(key => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
              <span className="w-24 text-[15px] text-[#62646a]">{packageLabels[key]}</span>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[13px] text-[#62646a]">I'll deliver in only</span>
                
                <div className="relative w-28">
                  <select
                    value={packageDrafts[key]?.featureValues?.extraFastDeliveryDays || ''}
                    onChange={(e) => onPackageChange(key, 'featureValues.extraFastDeliveryDays', e.target.value)}
                    className="w-full appearance-none rounded border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-[13px] text-[#404145] focus:border-black focus:outline-none"
                  >
                    <option value="" disabled>SELECT</option>
                    {deliveryOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <span className="text-[13px] text-[#62646a]">for an extra</span>
                
                <div className="relative w-20">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#404145] text-[13px]">$</span>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    value={packageDrafts[key]?.featureValues?.extraFastDeliveryPrice || ''}
                    onChange={(e) => onPackageChange(key, 'featureValues.extraFastDeliveryPrice', e.target.value)}
                    className="w-full rounded border border-gray-300 py-1.5 pl-7 pr-3 text-[13px] text-[#404145] focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
