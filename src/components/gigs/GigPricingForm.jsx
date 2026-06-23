import { useState, useEffect } from 'react';
import { AlertCircle, CircleOff } from 'lucide-react';
import OfferPackagesToggle from './Pricing/OfferPackagesToggle';
import PricingTable from './Pricing/PricingTable';
import GigExtras from './Pricing/GigExtras';
import HelpVideoCard from './Pricing/HelpVideoCard';

export default function GigPricingForm({
  subcategoryName,
  pricingFeatures,
  packageDrafts,
  onPackageChange,
  onExtrasChange,
  defaultExtras = [],
}) {
  const [offerPackages, setOfferPackages] = useState(true);
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    if (defaultExtras.length > 0 && extras.length === 0) {
      setExtras(defaultExtras);
    }
  }, [defaultExtras, extras.length]);

  useEffect(() => {
    if (typeof onExtrasChange === 'function') {
      onExtrasChange(extras);
    }
  }, [extras, onExtrasChange]);

  const handleAddExtra = (newExtra) => {
    setExtras(prev => [...prev, newExtra]);
  };

  if (!subcategoryName) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-3 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>Select a category and subcategory in the Overview step to load pricing features.</p>
        </div>
      </section>
    );
  }

  if (!pricingFeatures || pricingFeatures.length === 0) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-3 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
          <CircleOff size={18} className="mt-0.5 shrink-0" />
          <p>No pricing features are configured for this subcategory yet.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-7xl mx-auto">
      
      <div className="flex-1 min-w-0 w-full">
        
        <div className="mb-8 rounded-md bg-[#ffe0ea] p-6 flex flex-col sm:flex-row justify-between items-center overflow-hidden relative">
          <div className="z-10 max-w-xl">
            <h2 className="text-[22px] font-bold text-[#404145] mb-2">Looking to fast-track your success?</h2>
            <p className="text-[15px] text-[#404145] mb-4">
              Join Seller Plus Kickstart for valuable insights, exclusive benefits, and resources to create a profile that grabs attention.
            </p>
            <button className="text-[14px] font-bold text-[#404145] hover:underline uppercase tracking-wide">
              Let's do it <span className="ml-1">→</span>
            </button>
          </div>
          {/* Promotional Illustration Placeholder */}
          <div className="hidden sm:block absolute right-0 bottom-0 h-full w-1/3 bg-gradient-to-l from-[#ffccd8] to-transparent">
            <div className="absolute right-10 bottom-4 w-24 h-16 bg-white rounded shadow flex items-center justify-center border border-gray-200">
              <span className="font-bold text-pink-500 text-xl">Plus</span>
              <div className="absolute -right-3 -bottom-3 w-10 h-10 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                %
              </div>
            </div>
          </div>
        </div>

        {/* Header with Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-[28px] font-semibold text-[#404145]">Scope & Pricing</h2>
          <OfferPackagesToggle isEnabled={offerPackages} onChange={setOfferPackages} />
        </div>

        {/* Packages Table */}
        <div className="mb-8">
          <h3 className="mb-4 text-[15px] font-semibold text-[#404145]">Packages</h3>
          <PricingTable 
            packageDrafts={packageDrafts} 
            onPackageChange={onPackageChange} 
            pricingFeatures={pricingFeatures} 
            offerPackages={offerPackages}
          />
        </div>

        {/* Extras Section */}
        <div>
          <GigExtras 
            packageKeys={offerPackages ? ['basic', 'standard', 'premium'] : ['basic']}
            packageDrafts={packageDrafts}
            onPackageChange={onPackageChange}
            extrasList={extras}
            onAddExtra={handleAddExtra}
          />
        </div>
      </div>

      {/* Right Sidebar - Sticky Help Card */}
      <div className="w-full lg:w-[300px] shrink-0">
        <HelpVideoCard />
      </div>
    </div>
  );
}
