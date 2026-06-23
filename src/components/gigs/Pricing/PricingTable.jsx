import { useState } from 'react';
import FeatureRow from './FeatureRow';

export default function PricingTable({
  packageDrafts,
  onPackageChange,
  pricingFeatures = [],
  offerPackages = true,
}) {
  const packageKeys = offerPackages ? ['basic', 'standard', 'premium'] : ['basic'];
  const packageLabels = {
    basic: 'BASIC',
    standard: 'STANDARD',
    premium: 'PREMIUM',
  };

  
  const deliveryOptions = ['1 Day Delivery', '2 Days Delivery', '3 Days Delivery', '4 Days Delivery', '5 Days Delivery', '7 Days Delivery', '10 Days Delivery', '14 Days Delivery', '21 Days Delivery', '30 Days Delivery'];
  const revisionOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Unlimited'];
  const conceptOptions = ['1', '2', '3', '4', '5'];

  return (
    <div className="w-full overflow-hidden border border-gray-300 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[15px] text-[#404145]">
          <colgroup>
            <col className="w-1/4" />
            {packageKeys.map((key) => (
              <col key={key} className={offerPackages ? 'w-1/4' : 'w-3/4'} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="border-b border-r border-gray-300 bg-[#f7f7f7] p-0 font-normal"></th>
              {packageKeys.map((key) => (
                <th key={key} className="border-b border-gray-300 bg-[#f7f7f7] p-5 text-center align-top font-bold text-[#404145] tracking-wide text-sm border-r last:border-r-0">
                  {packageLabels[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            
            <tr>
              <td className="border-b border-r border-gray-300 bg-[#f7f7f7] p-0 align-top"></td>
              {packageKeys.map((key) => (
                <td key={`name-${key}`} className="border-b border-gray-300 p-0 border-r last:border-r-0">
                  <textarea
                    rows={1}
                    placeholder="Name your package"
                    value={packageDrafts[key]?.packageName || ''}
                    onChange={(e) => onPackageChange(key, 'packageName', e.target.value)}
                    className="w-full resize-none p-4 pb-0 text-sm focus:outline-none focus:ring-0 placeholder-gray-400 font-semibold"
                    maxLength={35}
                  />
                  <div className="flex justify-end px-3 pb-2">
                    <svg className="h-4 w-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.414.586l-1.586 1.586c-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414l1.586 1.586c.378.378.88.586 1.414.586s1.036-.208 1.414-.586l1.586-1.586zm-12.707 9.878l-2.122-2.122 8.485-8.485 2.122 2.122-8.485 8.485zm-2.828 2.828l2.122-2.122-2.122-2.122-2.122 2.122 2.122 2.122z" />
                    </svg>
                  </div>
                </td>
              ))}
            </tr>

            
            <tr>
              <td className="border-b border-r border-gray-300 bg-[#f7f7f7] p-0 align-top"></td>
              {packageKeys.map((key) => (
                <td key={`desc-${key}`} className="border-b border-gray-300 p-0 border-r last:border-r-0">
                  <textarea
                    rows={4}
                    placeholder="Describe the details of your offering"
                    value={packageDrafts[key]?.description || ''}
                    onChange={(e) => onPackageChange(key, 'description', e.target.value)}
                    className="w-full resize-none p-4 pb-0 text-sm text-gray-600 focus:outline-none focus:ring-0 placeholder-gray-400 leading-relaxed"
                    maxLength={100}
                  />
                  <div className="flex justify-end px-3 pb-2">
                     <svg className="h-4 w-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.414.586l-1.586 1.586c-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414l1.586 1.586c.378.378.88.586 1.414.586s1.036-.208 1.414-.586l1.586-1.586zm-12.707 9.878l-2.122-2.122 8.485-8.485 2.122 2.122-8.485 8.485zm-2.828 2.828l2.122-2.122-2.122-2.122-2.122 2.122 2.122 2.122z" />
                    </svg>
                  </div>
                </td>
              ))}
            </tr>

            
            <tr>
              <td className="border-b border-r border-gray-300 bg-[#f7f7f7] p-4 text-sm font-semibold text-[#404145]"></td>
              {packageKeys.map((key) => (
                <td key={`delivery-${key}`} className="border-b border-gray-300 p-0 border-r last:border-r-0 relative">
                  <select
                    value={packageDrafts[key]?.deliveryDays || ''}
                    onChange={(e) => onPackageChange(key, 'deliveryDays', e.target.value)}
                    className="w-full appearance-none bg-transparent p-4 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-400">DELIVERY TIME</option>
                    {deliveryOptions.map(opt => (
                      <option key={opt} value={parseInt(opt) || 1}>{opt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </td>
              ))}
            </tr>

            
            <tr>
              <td className="border-b border-r border-gray-300 bg-[#f7f7f7] p-4 text-sm text-[#404145]">
                Revisions
              </td>
              {packageKeys.map((key) => (
                <td key={`revisions-${key}`} className="border-b border-gray-300 p-0 border-r last:border-r-0 relative bg-[#fafafa]">
                  <select
                    value={packageDrafts[key]?.revisions || ''}
                    onChange={(e) => onPackageChange(key, 'revisions', e.target.value)}
                    className="w-full appearance-none bg-transparent p-4 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="" disabled>SELECT</option>
                    {revisionOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </td>
              ))}
            </tr>

            
            {pricingFeatures.map((feature) => (
              <FeatureRow 
                key={feature.id} 
                feature={feature} 
                packageKeys={packageKeys} 
                packageDrafts={packageDrafts} 
                onPackageChange={onPackageChange} 
                options={feature.inputType === 'number' ? conceptOptions : []}
              />
            ))}

            
            <tr>
              <td className="border-r border-gray-300 bg-[#f7f7f7] p-4 text-sm text-[#404145]">
                Price
              </td>
              {packageKeys.map((key) => (
                <td key={`price-${key}`} className="border-gray-300 p-0 border-r last:border-r-0 relative">
                  <div className="flex items-center w-full px-4 text-[#404145] font-semibold text-lg bg-[#fafafa]">
                    <span>$</span>
                    <input
                      type="number"
                      min="5"
                      step="5"
                      value={packageDrafts[key]?.price || ''}
                      onChange={(e) => onPackageChange(key, 'price', e.target.value)}
                      className="w-full bg-transparent p-4 text-right focus:outline-none focus:ring-0"
                    />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
