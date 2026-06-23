import React from 'react';
import { Briefcase, Star, DollarSign } from 'lucide-react';

export default function AnalyticsCard() {
  const stats = [
    {
      id: 1,
      icon: DollarSign,
      label: 'Earnings',
      value: '$2,450',
      sublabel: 'This month',
      color: 'text-[#22c55e]',
      bgColor: 'bg-green-50',
    },
    {
      id: 2,
      icon: Briefcase,
      label: 'Active Orders',
      value: '5',
      sublabel: 'In progress',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 3,
      icon: Star,
      label: 'Success Score',
      value: '95%',
      sublabel: 'Overall',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="space-y-3">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 mb-1">{stat.label}</p>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-400 mt-1">{stat.sublabel}</p>
              </div>
              <div className={`${stat.bgColor} rounded-lg p-2.5 flex-shrink-0`}>
                <IconComponent size={20} className={stat.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
