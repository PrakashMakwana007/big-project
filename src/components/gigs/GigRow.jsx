import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

export default function GigRow({ gig, isSelected, onSelect }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="h-4 w-4 rounded border-gray-300 text-[#22c55e] focus:ring-[#22c55e] cursor-pointer"
        />
      </td>

      
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
            {gig.thumbnail && (gig.thumbnail.startsWith('http') || gig.thumbnail.startsWith('data:') || gig.thumbnail.startsWith('/')) ? (
              <img src={gig.thumbnail} className="h-full w-full object-cover" alt="" />
            ) : (
              gig.thumbnail
            )}
          </div>
          <span 
            onClick={() => gig.slug && window.open(`/service/${gig.slug}`, '_blank')}
            className="text-sm font-medium text-gray-900 cursor-pointer hover:text-[#22c55e] line-clamp-2"
          >
            {gig.title}
          </span>
        </div>
      </td>

      
      <td className="px-6 py-4 text-sm text-gray-700">
        {gig.category}
      </td>

      
      <td className="px-6 py-4 text-sm text-gray-700">
        {gig.createdDate}
      </td>

      
      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {gig.impressions.toLocaleString()}
      </td>

      
      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {gig.clicks.toLocaleString()}
      </td>

      
      <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">
        {gig.orders}
      </td>

      
      <td className="px-6 py-4 text-sm">
        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 border border-green-200">
          {gig.status || 'Active'}
        </span>
      </td>

      
      <td className="px-6 py-4 text-right">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
            title="More actions"
          >
            <MoreVertical size={18} className="text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 z-10 w-48 rounded-lg border border-gray-100 bg-white shadow-lg">
              <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg cursor-pointer">
                Edit Gig
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                View Analytics
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                Pause
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 last:rounded-b-lg cursor-pointer">
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
