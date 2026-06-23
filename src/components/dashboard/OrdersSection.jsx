import React, { useState } from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';

export default function OrdersSection() {
  const [orders] = useState([]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      
      <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Orders</h3>
        <a href="#" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#22c55e] transition-colors">
          Orders
          <ArrowUpRight size={16} />
        </a>
      </div>

      
      {orders.length === 0 ? (
        <div className="p-6 text-center">
          <Clock size={40} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 font-medium">No active orders</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
