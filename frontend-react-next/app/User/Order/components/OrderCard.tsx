// OrderCard component for displaying individual order information
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Order } from '../../../src/types';
import { ORDER_COLORS } from '../../../design-system/orderStyles';

interface OrderCardProps {
  order: Order;
  onViewDetails?: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  // Map statuses to design system colors
  const statusMap = {
    'Completed': ORDER_COLORS.completed,
    'In Progress': ORDER_COLORS.inProgress,
    'Pending': ORDER_COLORS.pending,
    'Cancelled': ORDER_COLORS.rejected
  };

  const statusColor = statusMap[order.status as keyof typeof statusMap] || ORDER_COLORS.pending;
  const cardColorClass = order.status === 'Cancelled' ? 'border-gray-200 bg-gray-50' : 'border-gray-200 bg-white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-lg border-2 ${cardColorClass} p-2 cursor-pointer transition-all duration-300 hover:shadow-xl w-full max-w-sm`}
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
        
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor.light} ${statusColor.darkText}`}>
          <span>{order.status}</span>
        </div>
      </div>

      {/* View Details Button - Very Compact */}
      <div className="mt-1 pt-1 border-t border-gray-200">
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-1 px-3 rounded-md hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-medium text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.(order.id);
          }}
        >
          Details
        </button>
      </div>
    </motion.div>
  );
};

export default OrderCard;