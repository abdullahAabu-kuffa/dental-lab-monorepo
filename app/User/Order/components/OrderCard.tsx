// OrderCard component for displaying individual order information
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Order } from '../../../src/types';

interface OrderCardProps {
  order: Order;
  onViewDetails?: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'border-green-200 bg-green-50';
      case 'In Progress':
        return 'border-blue-200 bg-blue-50';
      case 'Pending':
        return 'border-yellow-200 bg-yellow-50';
      case 'Cancelled':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusColorClasses = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-600';
      case 'In Progress':
        return 'bg-blue-100 text-blue-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-lg border-2 ${getStatusColor(order.status)} p-2 cursor-pointer transition-all duration-300 hover:shadow-xl w-full max-w-sm`}
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