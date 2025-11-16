import React from 'react';
import { LucideIcon } from '../../../../src/utils/UserIcons';
import { colors } from '../../../../design-system';

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  variant?: 'default' | 'compact';
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  icon: Icon, 
  label, 
  value,
  variant = 'default' 
}) => (
  <div className={`bg-white/10 backdrop-blur-sm rounded-lg ${variant === 'compact' ? 'p-2' : 'p-3'}`}>
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`${variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5'} text-[${colors.gold.vintage}]`} />
      <span className={`text-white ${variant === 'compact' ? 'text-xs' : 'text-sm'} font-medium`}>
        {label}
      </span>
    </div>
    <div className={`text-white ${variant === 'compact' ? 'text-sm' : 'text-base'} font-bold`}>
      {value}
    </div>
  </div>
);