// OrderCard component for displaying individual order information
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { UnifiedOrder, getStatusColorClasses} from '../../../src/config/UserData/unifiedOrders';

interface OrderCardProps {
  order: UnifiedOrder;
  onViewDetails?: (orderId: string) => void;
  heightScale?: number;
  isSelected?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails, heightScale = 1, isSelected = false }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-lg border-2 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} p-${Math.round(2 * heightScale)} cursor-pointer transition-all duration-300 hover:shadow-xl w-full max-w-sm`}
      style={{ transform: `scaleY(${heightScale})`, transformOrigin: 'top' }}
      onClick={() => onViewDetails?.(order.id)}
    >
      {/* Header - Compact */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="text-xs font-bold text-gray-800 truncate">{order.patientName}</h3>
          <div className="text-xs text-gray-600">
            <span>{order.orderType}</span>
          </div>
        </div>
        
        <div className="text-right flex-shrink-0 ml-4">
          <div className="text-xs text-gray-600">
            <span>{new Date(order.date).toLocaleDateString()}</span>
          </div>
          
          <div className="text-xs">
            <span className="font-semibold text-green-600">${order.totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Material and Status */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-1">
        <div>
          <p className="text-xs text-gray-600 mb-0.5">Material:</p>
          <p className="text-xs font-medium text-gray-800 truncate">{order.material}</p>
        </div>
        
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColorClasses(order.status)}`}>
          <span>{order.status}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;