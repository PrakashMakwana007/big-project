import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function LanguageModal({ isOpen, onClose }) {
  
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

  const languages = [
    { name: 'English', selected: true },
    { name: 'Deutsch', selected: false },
    { name: 'Español', selected: false },
    { name: 'Français', selected: false },
    { name: 'Português', selected: false },
    { name: 'Italiano', selected: false },
    { name: 'Nederlands', selected: false },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-opacity p-4">
      
      
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Choose a language</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        
        <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
          {languages.map((lang) => (
            <button
              key={lang.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer group
                ${lang.selected ? 'bg-green-50/50' : 'hover:bg-gray-50'}
              `}
            >
              <div className="w-5 flex justify-center">
                {lang.selected && <Check size={18} className="text-green-500 font-bold" strokeWidth={3} />}
              </div>
              <span className={`text-[15px] ${lang.selected ? 'font-bold text-green-600' : 'font-medium text-gray-700 group-hover:text-gray-900'}`}>
                {lang.name}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
