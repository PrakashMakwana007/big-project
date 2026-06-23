import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { categories } from '../../data/categoriesList';

export default function BuyerCategoryNav({ isMobileOpen, onClose }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);

  const generateSlug = (text) => {
    if (!text) return '';
    return text.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const visibleCategories = categories.filter(c => !c.hidden);

  const toggleMobileCategory = (label) => {
    if (expandedMobileCategory === label) {
      setExpandedMobileCategory(null);
    } else {
      setExpandedMobileCategory(label);
    }
  };

  return (
    <>
      
      <div 
        className="hidden lg:block w-full border-b border-gray-200 bg-white relative z-40"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <ul className="flex items-center gap-6 overflow-x-auto whitespace-nowrap hide-scrollbar relative">
            {visibleCategories.map((cat, index) => (
              <li 
                key={index} 
                className="flex-shrink-0 relative"
                onMouseEnter={() => setHoveredCategory(cat.label)}
              >
                <Link 
                  to={`/categories/${generateSlug(cat.label)}`} 
                  className={`block py-3 text-[15px] font-medium transition-all duration-200 border-b-[3px] ${
                    hoveredCategory === cat.label 
                      ? 'text-[#404145] border-[#1dbf73]' 
                      : 'text-[#62646a] border-transparent hover:text-[#404145] hover:border-[#1dbf73]'
                  }`}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        
        <div 
          className={`absolute left-0 w-full bg-white border-t border-b border-gray-200 shadow-sm transition-all duration-300 ease-in-out origin-top ${
            hoveredCategory ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 py-8">
            {hoveredCategory && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {visibleCategories.find(c => c.label === hoveredCategory)?.groups.map((group, gIdx) => (
                  <div key={gIdx} className="flex flex-col">
                    {group.items.map((item, iIdx) => (
                      item.isHeader ? (
                        <h4 key={iIdx} className={`text-[16px] font-bold text-[#404145] mb-4 ${item.mt ? 'mt-8' : ''}`}>
                          {item.title}
                        </h4>
                      ) : (
                        <Link 
                          key={iIdx} 
                          to={`/categories/${generateSlug(hoveredCategory)}/${generateSlug(item.name)}`} 
                          className="text-[15px] text-[#62646a] hover:text-[#1dbf73] transition-colors py-1.5 flex items-center"
                        >
                          {item.name}
                          {item.tag && (
                            <span className="ml-2 text-[10px] font-bold text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded-full border border-pink-200">
                              {item.tag}
                            </span>
                          )}
                        </Link>
                      )
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      
      
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      
      <div 
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-bold text-[#404145] text-lg">Categories</span>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            {visibleCategories.map((cat, index) => (
              <li key={index} className="border-b border-gray-100 last:border-0">
                <button 
                  onClick={() => toggleMobileCategory(cat.label)}
                  className="w-full flex items-center justify-between p-4 text-left text-[15px] font-semibold text-[#404145] hover:bg-gray-50"
                >
                  {cat.label}
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform ${
                      expandedMobileCategory === cat.label ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${
                    expandedMobileCategory === cat.label ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 flex flex-col gap-2">
                    {cat.groups.map((group, gIdx) => (
                      <div key={gIdx} className="flex flex-col mb-2">
                        {group.items.map((item, iIdx) => (
                          item.isHeader ? (
                            <h4 key={iIdx} className={`text-[15px] font-bold text-[#404145] mb-2 ${item.mt ? 'mt-4' : ''}`}>
                              {item.title}
                            </h4>
                          ) : (
                            <Link 
                              key={iIdx} 
                              to={`/categories/${generateSlug(cat.label)}/${generateSlug(item.name)}`} 
                              className="text-[14px] text-[#62646a] hover:text-[#1dbf73] py-1.5 flex items-center"
                              onClick={onClose}
                            >
                              {item.name}
                              {item.tag && (
                                <span className="ml-2 text-[10px] font-bold text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded-full border border-pink-200">
                                  {item.tag}
                                </span>
                              )}
                            </Link>
                          )
                        ))}
                      </div>
                    ))}
                    <Link to={`/categories/${generateSlug(cat.label)}`} className="block text-[14px] font-semibold text-[#1dbf73] pt-4 border-t border-gray-200 mt-2" onClick={onClose}>
                      All in {cat.label} <ChevronRight size={14} className="inline mb-0.5" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
