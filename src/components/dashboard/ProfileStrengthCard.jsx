import React from 'react';
import { CheckCircle, AlertCircle, Zap } from 'lucide-react';

export default function ProfileStrengthCard() {
  const strengthScore = 9;
  const maxScore = 12;
  const percentage = (strengthScore / maxScore) * 100;

  const completedItems = [
    { id: 1, name: 'Profile Picture', icon: CheckCircle, color: 'text-[#22c55e]' },
    { id: 2, name: 'Bio & Description', icon: CheckCircle, color: 'text-[#22c55e]' },
    { id: 3, name: 'Hourly Rate', icon: CheckCircle, color: 'text-[#22c55e]' },
  ];

  const incompleteItems = [
    { id: 4, name: 'Add Portfolio', icon: AlertCircle, color: 'text-orange-500' },
    { id: 5, name: 'Verify Identity', icon: AlertCircle, color: 'text-orange-500' },
    { id: 6, name: 'Add Services', icon: AlertCircle, color: 'text-orange-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      
      <div className="flex items-center gap-2 mb-6">
        <Zap size={20} className="text-[#22c55e]" />
        <h3 className="text-lg font-semibold text-gray-900">Profile Strength</h3>
      </div>

      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Completion Score</span>
          <span className="text-2xl font-bold text-[#22c55e]">
            {strengthScore}/{maxScore}
          </span>
        </div>

        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#22c55e] to-green-500 h-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">{Math.round(percentage)}% Complete</p>
      </div>

      
      {completedItems.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-600 mb-3 uppercase">Completed</p>
          <div className="space-y-2">
            {completedItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <IconComponent size={16} className={item.color} />
                  <span className="text-gray-700">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      
      {incompleteItems.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-600 mb-3 uppercase">To Complete</p>
          <div className="space-y-2">
            {incompleteItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <IconComponent size={16} className={item.color} />
                  <span className="text-gray-700">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      
      <button className="w-full py-2 px-4 bg-[#22c55e] text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
        Complete Profile
      </button>
    </div>
  );
}
