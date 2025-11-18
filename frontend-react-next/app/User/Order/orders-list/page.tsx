

// app/User/Order/orders-list/page.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';
import OrderCard from '../components/OrderCard';
import OrderProgress from '../components/OrderProgress';
import { SAMPLE_ORDERS } from '../../../src/config/UserData/ordersData';
import { Order } from '../../../src/types';

export default function OrdersListPage() {
  const [orders] = useState(SAMPLE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — LIST OF ORDERS WITHOUT SCROLL */}
          <div className="lg:col-span-1 space-y-4">
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
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No orders found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your search</p>
              </div>
            )}
          </div>

          {/* RIGHT — ORDER PROGRESS PANEL */}
          <div className="lg:col-span-2 lg:sticky lg:top-6 lg:self-start">
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
                  className="bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 p-16 text-center h-full flex flex-col items-center justify-center"
                >
                  <Package className="w-24 h-24 text-gray-300 mb-6" />
                  <h3 className="text-2xl font-black text-gray-600 mb-3">Select an Order</h3>
                  <p className="text-gray-500">
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
