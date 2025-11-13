"use client";

import React from 'react';
import {
  ShoppingBag,
  Clock,
  Settings,
  CheckCircle
} from 'lucide-react';
import { StatCard, StatsGrid } from '.';
import type { OrderStats } from './../types';

interface NewOrderStatsProps {
  stats: OrderStats;
}

const NewOrderStats: React.FC<NewOrderStatsProps> = ({ stats }) => {
  const statsData = [
    {
      id: 1,
      label: 'Orders',
      count: stats.total,
      icon: ShoppingBag,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600'
    },
    {
      id: 2,
      label: 'Pending',
      count: stats.pending,
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-600'
    },
    {
      id: 3,
      label: 'Progress',
      count: stats.inProgress,
      icon: Settings,
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-600'
    },
    {
      id: 4,
      label: 'Done',
      count: stats.completed,
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-500',
      textColor: 'text-emerald-600'
    }
  ];

  return (
    <StatsGrid>
      {statsData.map((stat) => (
        <StatCard key={stat.id} data={stat} />
      ))}
    </StatsGrid>
  );
};

export default NewOrderStats;