"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';
import OrderCard from '../components/OrderCard';
import OrderProgress from '../components/OrderProgress';
import { SAMPLE_ORDERS } from '../../../src/config/UserData/ordersData';
import { Order } from '../../../src/types';
//...
export default function OrdersListPage() {
  const [orders] = useState(SAMPLE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="min-h-screen bg-white p-10 "> 
      <div className="max-w-[1400px] mx-auto">

        
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Orders</h1>
          <p className="text-xs text-gray-600">Track and manage your dental orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          
          {/* LEFT — Orders List */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {orders.length > 0 ? (
              orders.map((order: Order, index: number) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <OrderCard
                    order={order}
                    onViewDetails={setSelectedOrder}
                    isSelected={selectedOrder?.id === order.id}
                  />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-md border border-gray-200">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-gray-600 mb-1">No orders found</h3>
                <p className="text-gray-500 text-xs">Try adjusting your search</p>
              </div>
            )}
          </div>

          {/* RIGHT — Order Progress */}
          <div className="lg:col-span-3 lg:sticky lg:top-3 lg:self-start w-full">
            <AnimatePresence mode="wait">
              {selectedOrder ? (
                <motion.div
                  key={selectedOrder.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <OrderProgress order={selectedOrder} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-lg shadow-lg border border-dashed border-gray-300 p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
                >
                  <Package className="w-16 h-16 text-gray-300 mb-3" />
                  <h3 className="text-lg font-black text-gray-600 mb-2">Select an Order</h3>
                  <p className="text-gray-500 text-sm">
                    Click on any order card to view tracking details and progress timeline
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}