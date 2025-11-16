"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { StatusBadge } from './ReusableForm/StatusBadge';
import { componentStyles } from '../../../design-system';
import type { Order } from '../types';

interface OrdersListPanelProps {
  orders: Order[];
  selectedOrder: Order | null;
  onSelectOrder: (order: Order) => void;
}

const OrdersListPanel: React.FC<OrdersListPanelProps> = ({
  orders,
  selectedOrder,
  onSelectOrder
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 h-[calc(100vh-150px)]">
      {/* Header */}
      <div className={`${componentStyles.background.sectionDark} p-4 rounded-t-2xl`}>
        <h2 className="text-xl font-bold text-white">All Orders</h2>
        <p className="text-gray-300 text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
        {orders.map((order, index) => {
          const isSelected = selectedOrder?.id === order.id;
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectOrder(order)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-gray-400'}`} />
                  <span className="font-bold text-gray-800 text-sm">#{order.id}</span>
                </div>
                <StatusBadge status={order.status} size="sm" />
              </div>
              
              {/* Patient Info */}
              <div className="text-sm font-semibold text-gray-800 mb-1">{order.patientName}</div>
              <div className="text-xs text-gray-500 mb-3">{new Date(order.date).toLocaleDateString()}</div>
              
              {/* Order Details */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-gray-800">{order.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <span className="font-semibold text-gray-800">{order.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-blue-600">${order.totalAmount}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 rounded-b-2xl bg-gray-50">
        <p className="text-xs text-gray-600 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default OrdersListPanel;