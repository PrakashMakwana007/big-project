import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PaymentMethodModal from '../modals/PaymentMethodModal';

export default function PaymentMethods() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-300">
      
      <h2 className="text-[22px] font-bold text-[#404145] mb-3 tracking-tight">Payment methods</h2>
      <p className="text-[15px] text-[#62646a] mb-8">Easily manage your payments methods through our secure system.</p>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full max-w-[500px] bg-white border border-[#e4e5e7] rounded flex items-center gap-3 py-6 px-6 hover:shadow-sm transition-shadow cursor-pointer"
      >
        <Plus size={20} strokeWidth={2.5} className="text-[#1dbf73]" />
        <span className="font-bold text-[#404145] text-[16px]">Add a payment method</span>
      </button>

      <PaymentMethodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}
