import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function CurrencyModal({ isOpen, onClose }) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currencies = [
    { name: 'United States Dollar', code: 'USD - $' },
    { name: 'Euro', code: 'EUR - €' },
    { name: 'British Pound', code: 'GBP - £' },
    { name: 'Australian Dollar', code: 'AUD - A$' },
    { name: 'Canadian Dollar', code: 'CAD - CA$' },
    { name: 'Israeli Shekel', code: 'ILS - ₪' },
    { name: 'Indian Rupee', code: 'INR - ₹' },
    { name: 'Japanese Yen', code: 'JPY - ¥' },
    { name: 'Singapore Dollar', code: 'SGD - S$' },
    { name: 'UAE Dirham', code: 'AED - د.إ' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-opacity p-4">
      
      
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Choose a currency</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        
        <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {currencies.map((currency) => (
              <button
                key={currency.name}
                className="w-full flex flex-col items-start px-4 py-3 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer group border border-transparent hover:border-gray-200"
              >
                <span className="text-[15px] font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                  {currency.name}
                </span>
                <span className="text-[13px] text-gray-500 mt-1">
                  {currency.code}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
