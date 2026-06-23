import React from 'react';

export default function OrdersTable({ orders, tabLabel }) {
  const columns = ['BUYER', 'SERVICE', 'DUE ON', 'TOTAL', 'NOTE', 'STATUS'];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          {tabLabel || 'ORDERS'}
        </h3>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full">
          
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{order.buyer}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.service}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.dueOn}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.note}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Late'
                        ? 'bg-red-100 text-red-800'
                        : order.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Cancelled'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center"
                >
                  <p className="text-gray-600 text-xl">No orders to show.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
