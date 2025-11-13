"use client";

import React from 'react';
import {
  Search,
  Plus
} from 'lucide-react';
import type { OrderStats } from './types';

interface NewOrderStatsProps {
  stats: OrderStats;
}

const TrackOrder: React.FC<NewOrderStatsProps> = ({ stats }) => {
  const statsData = [
    {
      id: 1,
      label: 'Track Order',
      count: stats.total,
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      label: 'Add New Order',
      count: null,
      icon: Plus,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 h-full flex flex-col">
        <div className="flex gap-3 justify-center flex-1 items-center">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="w-32 h-20 rounded-lg p-3 transform hover:-translate-y-1 transition-all duration-300 text-left bg-gray-50 border border-gray-100 flex flex-col justify-between cursor-pointer"
              >
                {/* Icon Circle with Gradient */}
                <div className="relative group mx-auto">
                  {/* Count Badge - Only show if count exists */}
                  {stat.count && (
                    <div className={`absolute -top-1 -right-1 rounded-full w-4 h-4 flex items-center justify-center z-10 border-2 border-white ${
                      stat.id === 2
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                        : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                    }`}>
                      <span className="text-xs font-bold text-white">
                        {stat.count}
                      </span>
                    </div>
                  )}
                  <div className={`relative w-10 h-10 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Label */}
                <div className="text-center">
                  <h3 className={`text-xs font-bold ${stat.textColor} leading-tight`}>
                    {stat.label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Beautiful gradient divider line - Coffee colored gradient with fade edges */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-900 to-transparent rounded-full mt-3"></div>
      </div>
    </div>  
  );
};

export default TrackOrder;