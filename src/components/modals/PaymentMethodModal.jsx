import React, { useState, useEffect } from 'react';
import { X, CreditCard } from 'lucide-react';

export default function PaymentMethodModal({ isOpen, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(null);

  
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-opacity p-4">
      
      
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-[20px] font-bold text-[#404145]">Add payment method</h2>
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        
        <div className="px-6 py-6 space-y-4">
          
          
          <label 
            className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors
              ${selectedMethod === 'card' ? 'border-gray-400 bg-gray-50' : 'border-[#e4e5e7] hover:border-gray-300'}
            `}
          >
            <div className="flex items-center justify-center">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                ${selectedMethod === 'card' ? 'border-[#404145]' : 'border-gray-400'}
              `}>
                {selectedMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#404145]"></div>}
              </div>
              <input 
                type="radio" 
                name="payment_method" 
                value="card" 
                className="hidden"
                checked={selectedMethod === 'card'}
                onChange={() => setSelectedMethod('card')}
              />
            </div>
            
            <div className="w-10 h-6 border border-gray-200 rounded flex items-center justify-center bg-white shadow-sm">
              <CreditCard size={14} className="text-gray-700" />
            </div>
            
            <span className="text-[16px] text-[#404145]">Credit or debit card</span>
          </label>

          
          <label 
            className={`flex items-center gap-4 p-4 border rounded cursor-pointer transition-colors
              ${selectedMethod === 'paypal' ? 'border-gray-400 bg-gray-50' : 'border-[#e4e5e7] hover:border-gray-300'}
            `}
          >
            <div className="flex items-center justify-center">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                ${selectedMethod === 'paypal' ? 'border-[#404145]' : 'border-gray-400'}
              `}>
                {selectedMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-[#404145]"></div>}
              </div>
              <input 
                type="radio" 
                name="payment_method" 
                value="paypal" 
                className="hidden"
                checked={selectedMethod === 'paypal'}
                onChange={() => setSelectedMethod('paypal')}
              />
            </div>
            
            <div className="w-10 h-6 border border-gray-200 rounded flex items-center justify-center bg-white shadow-sm">
              <span className="text-[14px] font-bold text-[#003087] italic">P</span>
              <span className="text-[14px] font-bold text-[#0079c1] italic">P</span>
            </div>
            
            <span className="text-[16px] text-[#404145]">PayPal</span>
          </label>

        </div>

        
        <div className="px-6 py-4 flex justify-end">
          <button 
            disabled={!selectedMethod}
            onClick={onClose}
            className={`px-6 py-2.5 rounded font-semibold text-[15px] transition-colors
              ${selectedMethod 
                ? 'bg-[#222325] text-white hover:bg-[#404145]' 
                : 'bg-[#efeff0] text-[#b5b6ba] cursor-not-allowed'
              }
            `}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
