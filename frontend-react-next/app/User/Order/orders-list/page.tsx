// app/User/Order/orders-list/page.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Plus, Package } from 'lucide-react';
import OrderCard from '../components/OrderCard';
import { SAMPLE_ORDERS } from '../../../src/config/UserData/ordersData';
import { Order } from '../../../src/types';

export default function OrdersListPage() {
  const [orders] = useState<Order[]>(SAMPLE_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(order =>
    order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (orderId: string) => {
    setSelectedOrder(orderId);
    console.log('Viewing details for order:', orderId);
  };

  const handleBackToWelcome = () => {
    window.history.back();
  };

  return (
    <div className="p-6">
      {/* Header with Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToWelcome}
            className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-600 mt-1">Manage and track all your dental orders</p>
          </div>
        </div>

        {/* Search and New Order */}
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-medium flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Order
          </button>
        </div>
      </motion.div>

      {/* Stacked Orders List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-2 max-w-2xl"
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <OrderCard
                order={order}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Try adjusting your search criteria'
                : 'Start by creating your first order'
              }
            </p>
          </div>
        )}
      </motion.div>

      {/* Load More Button */}
      {filteredOrders.length > 0 && filteredOrders.length >= 10 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            Load More Orders
          </button>
        </motion.div>
      )}
    </div>
  );
}
