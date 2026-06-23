import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DropdownSelect({ value, onChange, options, align = 'left', className = '' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-left text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={16} className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute top-full z-20 mt-2 min-w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-200 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        } ${align === 'right' ? 'right-0' : 'left-0'}`}
      >
        <div className="max-h-60 overflow-auto p-1">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-gray-50 ${
                value === option ? 'bg-gray-50 text-gray-900' : 'text-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}