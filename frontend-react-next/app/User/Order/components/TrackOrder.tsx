import React from 'react';
import {
  Search,
  Plus
} from 'lucide-react';
import { StatCard, StatsGrid } from '.';
import type { OrderStats } from './../types';

interface TrackOrderProps {
  stats: OrderStats;
}

const TrackOrder: React.FC<TrackOrderProps> = ({ stats }) => {
  const statsData = [
    {
      id: 1,
      label: 'Track Order',
      count: stats.total,
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      label: 'Orders',
      count: null,
      icon: Plus,
      color: 'from-emerald-500 to-green-500',
      textColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="w-full h-full">
      <StatsGrid className="h-full flex flex-col">
        <div className="flex gap-3 justify-center flex-1 items-center">
          {statsData.map((stat) => (
            <StatCard key={stat.id} data={stat} />
          ))}
        </div>
      </StatsGrid>
    </div>
  );
};

export default TrackOrder;