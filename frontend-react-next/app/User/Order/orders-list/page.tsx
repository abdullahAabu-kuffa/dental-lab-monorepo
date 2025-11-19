"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search } from 'lucide-react';
import OrderCard from '../components/OrderCard';
import OrderProgress from '../components/OrderProgress';
import OrderDetailsPanel from '../../Order/components/OrderDetails';
import { SAMPLE_ORDERS } from '../../../src/config/UserData/ordersData';
import { Order } from '../../../src/types';

export default function OrdersListPage() {
  const [orders] = useState(SAMPLE_ORDERS);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredOrders = orders.filter(order =>
    order.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDetailsClick = (order: Order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient from-gray-50 to-gray-100 w-full p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/20">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Orders</h1>
            <p className="text-xs text-gray-600">Track and manage your dental orders</p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-shadow"
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* Orders List */}
          <div className="w-1/3 space-y-1 max-h-[600px] overflow-y-auto">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <OrderCard
                    order={order}
                    onViewDetails={handleDetailsClick}
                    isSelected={selectedOrder?.id === order.id}
                  />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-md border border-gray-200">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-gray-600 mb-1">No matching orders</h3>
                <p className="text-gray-500 text-xs">Try a different name</p>
              </div>
            )}
          </div>

          {/* Order Progress */}
          <div className="w-2/3">
            {selectedOrder ? (
              <OrderProgress
                order={selectedOrder}
                showTimeline={true}
                showPercentage={true}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-600 mb-2">Select an Order</h3>
                <p className="text-gray-500">Click on an order to view its progress</p>
              </div>
            )}
          </div>

          {/* Order Details Panel */}
          {showDetails && selectedOrder && (
            <div className="w-1/4">
              <OrderDetailsPanel order={selectedOrder} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
