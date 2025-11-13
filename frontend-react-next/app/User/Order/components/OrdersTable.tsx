"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../../design-system';
import type { Order } from '../types';

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const [sortBy, setSortBy] = useState<keyof Order>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedOrders = [...orders].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });

  const handleSort = (field: keyof Order) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      variants={motionVariants.fadeIn(0.3)}
      initial="initial"
      animate="animate"
      className="p-4 rounded-lg bg-white shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">All Orders</h2>
      
      <div className="h-72 overflow-y-auto border border-gray-300 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-">
            <tr className="border-b border-gray-200">
              {[
                { key: 'id', label: 'Order ID' },
                { key: 'patientName', label: 'Patient' },
                { key: 'status', label: 'Status' },
                { key: 'date', label: 'Date' },
                { key: 'totalAmount', label: 'Amount' },
              ].map((column) => (
                <th
                  key={column.key}
                  className="text-left py-3 px-3 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200 last:border-r-0"
                  onClick={() => handleSort(column.key as keyof Order)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {sortBy === column.key && (
                      <span className="text-[#E4B441] text-xs">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order, index) => (
              <motion.tr
                key={order.id}
                variants={motionVariants.fadeInUp(index * 0.05)}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-3 text-sm font-medium text-gray-900 border-r border-gray-200 last:border-r-0">
                  {order.id}
                </td>
                <td className="py-3 px-3 text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
                  {order.patientName}
                </td>
                <td className="py-3 px-3 border-r border-gray-200 last:border-r-0">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-3 text-sm font-medium text-gray-900 border-r border-gray-200 last:border-r-0">
                  ${order.totalAmount.toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersTable;