// app/User/Order/components/OrderDetailsCard.tsx
"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { TEXT_STYLES } from '../../design-system/orderStyles';

interface OrderDetail {
  label: string;
  value: string;
  highlight?: 'green' | 'yellow' | 'blue';
}

interface OrderDetailsCardProps {
  details: OrderDetail[];
}

export const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({ details }) => {
  const getHighlightColor = (highlight?: string) => {
    if (highlight === 'green') return 'text-green-600';
    if (highlight === 'yellow') return 'text-yellow-600';
    if (highlight === 'blue') return 'text-blue-600';
    return 'text-gray-900';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-blue-500">📋</span>
        Additional Information
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div key={index} className="space-y-1">
            <p className={TEXT_STYLES.label}>{detail.label}</p>
            <div className="flex items-center gap-2">
              <p className={`${TEXT_STYLES.value} ${getHighlightColor(detail.highlight)}`}>
                {detail.value}
              </p>
              {detail.highlight === 'green' && detail.label === 'Payment' && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsCard;