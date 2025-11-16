import React from 'react';
import { Order } from '../../types';

interface StatusBadgeProps {
  status: Order['status'];
  size?: 'sm' | 'md' | 'lg';
}

const STATUS_CONFIG = {
  'Pending': { bg: 'bg-yellow-500', text: 'text-white' },
  'In Progress': { bg: 'bg-blue-500', text: 'text-white' },
  'Completed': { bg: 'bg-green-500', text: 'text-white' },
  'Cancelled': { bg: 'bg-red-500', text: 'text-white' }
};

const SIZE_CONFIG = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status];
  
  return (
    <span className={`
      inline-flex items-center justify-center rounded-full font-bold
      ${config.bg} ${config.text} ${SIZE_CONFIG[size]}
    `}>
      {status}
    </span>
  );
};
