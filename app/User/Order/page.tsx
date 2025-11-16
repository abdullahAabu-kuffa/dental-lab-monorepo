"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePage from './components/WelcomePage';
import OrdersListPanel from './components/OrdersListPanel';
import type { Order } from './types';
import { SAMPLE_ORDERS } from '../../src/config/UserData/ordersData';

// Default export for Next.js page
export default function Page() {
  const [currentView, setCurrentView] = useState<'welcome' | 'orders'>('welcome');
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Navigation handlers
  const handleShowOrdersTable = () => {
    setCurrentView('orders');
  };

  const handleStartOrder = () => {
    window.location.href = '/User/NewOrder';
  };

  const handleViewOrders = () => {
    setCurrentView('orders');
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'orders':
        return (
          <OrdersListPanel
            orders={orders}
            selectedOrder={selectedOrder}
            onSelectOrder={handleSelectOrder}
          />
        );
      case 'welcome':
      default:
        return (
          <WelcomePage
            onStartOrder={handleStartOrder}
            onViewOrders={handleViewOrders}
            onNewOrder={handleStartOrder}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}