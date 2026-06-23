import React from 'react';
import { Award, Target, TrendingUp } from 'lucide-react';

export default function FreelancerLevelSection() {
  const currentLevel = 'Pro';
  const nextLevel = 'Expert';

  const milestones = [
    {
      id: 1,
      title: 'Earn $5,000',
      description: 'Total earnings milestone',
      completed: true,
      icon: TrendingUp,
      color: 'text-[#22c55e]',
      bgColor: 'bg-green-100',
      progress: 100,
    },
    {
      id: 2,
      title: 'Maintain 4.8+ Rating',
      description: 'Quality service requirement',
      completed: true,
      icon: Award,
      color: 'text-[#22c55e]',
      bgColor: 'bg-green-100',
      progress: 100,
    },
    {
      id: 3,
      title: 'Complete 50 Orders',
      description: 'Order volume requirement',
      completed: false,
      icon: Target,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      progress: 62,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="text-xl font-semibold text-gray-900">Your path to the next freelancer level</h3>
      </div>

      
      <div className="p-6 space-y-4">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Current level</p>
            <p className="text-lg font-semibold text-gray-900">{currentLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Next level</p>
            <p className="text-lg font-semibold text-gray-900">{nextLevel}</p>
          </div>
        </div>

        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-semibold text-gray-900">2/3 requirements met</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#22c55e] h-2 rounded-full" style={{ width: '66%' }}></div>
          </div>
        </div>

        
        <div className="space-y-3">
          {milestones.map((milestone) => {
            const IconComponent = milestone.icon;
            return (
              <div
                key={milestone.id}
                className={`rounded-lg border p-4 transition-all ${
                  milestone.completed
                    ? 'bg-green-50 border-green-200'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${milestone.bgColor} rounded-lg p-2 flex-shrink-0`}>
                    <IconComponent size={18} className={milestone.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-gray-900">{milestone.title}</p>
                        <p className="text-xs text-gray-500">{milestone.description}</p>
                      </div>
                      {milestone.completed && (
                        <span className="text-xs font-semibold text-[#22c55e] flex-shrink-0">✓</span>
                      )}
                    </div>
                    {!milestone.completed && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Progress</span>
                          <span className="text-xs font-semibold text-gray-900">{milestone.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-orange-500 h-1.5 rounded-full transition-all"
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
