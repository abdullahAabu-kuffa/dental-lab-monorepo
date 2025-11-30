'use client';
import React from 'react';
import { StatItem } from '../../../types/index';

interface StatCardProps {
  stat: StatItem;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl py-8 px-4 border border-white/10 hover:border-[#D4AF37]/40 transition h-full flex flex-col justify-center items-center text-center">
      <div className="text-5xl font-bold mb-3 text-[#D4AF37] leading-tight">
        {stat.number}
      </div>
      <div className="text-gray-300 text-sm uppercase tracking-wide">
        {stat.label}
      </div>
    </div>
  );
};

export default StatCard;