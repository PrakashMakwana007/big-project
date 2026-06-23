import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import ExtraFastDelivery from './ExtraFastDelivery';
import GigExtraModal from './GigExtraModal';

export default function GigExtras({
  packageKeys,
  packageDrafts,
  onPackageChange,
  extrasList = [],
  onAddExtra
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExtra = (extraId, checked) => {
    packageKeys.forEach(pkg => {
      onPackageChange(pkg, `featureValues.extra:${extraId}`, checked);
    });
  };

  const setExtraPrice = (extraId, price) => {
    packageKeys.forEach(pkg => {
      onPackageChange(pkg, `featureValues.extraPrice:${extraId}`, price);
    });
  };

  return (
    <div className="w-full bg-white border border-gray-300">
      <div className="bg-[#f7f7f7] border-b border-gray-300 p-4">
        <h3 className="text-[15px] font-semibold text-[#404145]">Add extra services</h3>
      </div>
      
      <div className="p-6">
        <ExtraFastDelivery 
          packageKeys={packageKeys} 
          packageDrafts={packageDrafts} 
          onPackageChange={onPackageChange} 
        />

        <div className="space-y-4">
          {extrasList.map(extra => {
            
            const isEnabled = packageKeys.some(pkg => packageDrafts[pkg]?.featureValues?.[`extra:${extra.id}`]);
            const price = packageDrafts[packageKeys[0]]?.featureValues?.[`extraPrice:${extra.id}`] || '';

            return (
              <div key={extra.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 gap-4">
                <label className="flex cursor-pointer items-center">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={(e) => toggleExtra(extra.id, e.target.checked)}
                      className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-sm border border-gray-300 checked:border-black checked:bg-black hover:border-gray-400 focus:outline-none"
                    />
                    <Check className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                  </div>
                  <span className="ml-3 text-[15px] font-semibold text-[#404145]">{extra.name}</span>
                </label>

                {isEnabled && (
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-[#62646a]">for an extra</span>
                    <div className="relative w-20">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#404145] text-[13px]">$</span>
                      <input
                        type="number"
                        min="5"
                        step="5"
                        value={price}
                        onChange={(e) => setExtraPrice(extra.id, e.target.value)}
                        className="w-full rounded border border-gray-300 py-1.5 pl-7 pr-3 text-[13px] text-[#404145] focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 text-[14px] font-semibold text-[#4a73e8] hover:underline"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            Add Gig Extra
          </button>
        </div>
      </div>

      <GigExtraModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={onAddExtra} 
      />
    </div>
  );
}
