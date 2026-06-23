import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import GigRow from './GigRow';

export default function GigsTable({ gigs, tabLabel, filterPeriod, onFilterChange }) {
  const [selectedGigs, setSelectedGigs] = useState([]);

  const columns = ['', 'GIG', 'CATEGORY', 'CREATED DATE', 'IMPRESSIONS', 'CLICKS', 'ORDERS', 'STATUS', 'ACTIONS'];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedGigs(gigs.map(g => g.id));
    } else {
      setSelectedGigs([]);
    }
  };

  const handleSelectGig = (gigId) => {
    setSelectedGigs(prev => 
      prev.includes(gigId) 
        ? prev.filter(id => id !== gigId)
        : [...prev, gigId]
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          {tabLabel || 'GIGS'}
        </h3>
        
        
        <div className="relative">
          <button className="flex items-center gap-2 text-sm text-gray-700 px-3 py-2 hover:bg-gray-50 rounded transition-colors duration-200 cursor-pointer">
            <span>{filterPeriod === 'last30' ? 'Last 30 Days' : 'All Time'}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full">
          
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide ${
                    idx === 0 ? 'w-12' : ''
                  } ${idx >= 4 && idx <= 6 ? 'text-center' : ''}`}
                >
                  {column === '' ? (
                    <input
                      type="checkbox"
                      checked={selectedGigs.length === gigs.length && gigs.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-[#22c55e] focus:ring-[#22c55e] cursor-pointer"
                    />
                  ) : (
                    column
                  )}
                </th>
              ))}
            </tr>
          </thead>

          
          <tbody>
            {gigs && gigs.length > 0 ? (
              gigs.map((gig) => (
                <GigRow
                  key={gig.id}
                  gig={gig}
                  isSelected={selectedGigs.includes(gig.id)}
                  onSelect={() => handleSelectGig(gig.id)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center"
                >
                  <p className="text-gray-600 text-lg">No gigs to show.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
