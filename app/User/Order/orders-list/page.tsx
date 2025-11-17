"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search } from 'lucide-react';
import OrderCard from '../components/OrderCard';
import OrderProcess from '../ProcessOrders/processOrders';
import { SAMPLE_ORDERS, UnifiedOrder } from '../../../src/config/UserData/unifiedOrders';

export default function OrdersListPage() {
  const [orders] = useState<UnifiedOrder[]>(SAMPLE_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<UnifiedOrder | null>(null);

  const filteredOrders = orders.filter(order =>
    order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) setSelectedOrder(order);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Column - Orders List */}
        <div className="w-[400px] flex-shrink-0 bg-white overflow-hidden">
          <div className="p-12 h-full">

            {/* Search Bar */}
            <div className="relative mb-8" >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onViewDetails={handleViewDetails}
                    isSelected={selectedOrder?.id === order.id}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">No orders found</h3>
                  <p className="text-gray-500 text-xs mb-4">
                    {searchTerm ? 'Try adjusting your search' : 'Create your first order'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Order Process */}
        <div className="flex-1 bg-white overflow-hidden ml-[45px] flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            {selectedOrder ? (
              <motion.div
                key="order-details"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <OrderProcess order={selectedOrder} />
              </motion.div>
            ) : (
              <motion.div
                key="no-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Select an Order
                  </h3>
                  <p className="text-gray-600">
                    Click on any order card from the left to view its progress details and manufacturing status
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}