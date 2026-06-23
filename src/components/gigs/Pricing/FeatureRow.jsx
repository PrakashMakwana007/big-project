import { Check } from 'lucide-react';

export default function FeatureRow({
  feature,
  packageKeys,
  packageDrafts,
  onPackageChange,
  options = []
}) {
  return (
    <tr>
      <td className="border-b border-r border-gray-300 bg-[#f7f7f7] p-4 text-[13px] text-[#404145]">
        {feature.name}
      </td>
      {packageKeys.map((key) => {
        const value = packageDrafts[key]?.featureValues?.[feature.id] || '';

        return (
          <td key={`${feature.id}-${key}`} className="border-b border-gray-300 p-0 text-center border-r last:border-r-0 relative bg-white">
            {feature.inputType === 'boolean' ? (
              <label className="flex h-full w-full cursor-pointer items-center justify-center p-4">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(e) => onPackageChange(key, `featureValues.${feature.id}`, e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-sm border border-gray-300 checked:border-black checked:bg-black hover:border-gray-400 focus:outline-none"
                  />
                  <Check className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                </div>
              </label>
            ) : feature.inputType === 'number' && options.length > 0 ? (
              <div className="relative w-full h-full">
                <select
                  value={value}
                  onChange={(e) => onPackageChange(key, `featureValues.${feature.id}`, e.target.value)}
                  className="w-full appearance-none bg-transparent p-4 text-center text-sm focus:outline-none cursor-pointer"
                >
                  <option value="" disabled>SELECT</option>
                  {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : (
               <input
                type="text"
                value={value}
                onChange={(e) => onPackageChange(key, `featureValues.${feature.id}`, e.target.value)}
                className="w-full h-full text-center bg-transparent p-4 text-sm focus:outline-none"
              />
            )}
          </td>
        );
      })}
    </tr>
  );
}
