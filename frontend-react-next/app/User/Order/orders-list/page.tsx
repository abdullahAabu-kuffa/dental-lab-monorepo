"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { OrderCard } from '../components/OrderComponent/OrderCard';
import { OrderDetailsSidebar } from '../components/OrderComponent/OrderProgress';
import { StatusIcons } from '../components/OrderComponent/CatHead';

import PaymentSummary from "../components/FormComponent/PaymentSummary";

import {
  SAMPLE_ORDERS,
  filterOrdersByStatus
} from '../../../src/config/UserData/orderDataService';

import { Order } from '../../../src/types';
import { useRouter } from 'next/navigation';
import { useOrders } from './quere';
import toast from 'react-hot-toast';

export default function OrdersListPage() {
  const router = useRouter();

  // const [orders] = useState<Order[]>(SAMPLE_ORDERS);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all-orders");
  const {data } = useOrders();
  const orders = data?.data?.orders;
  console.log(orders&&orders);
  
  const getSelectedPaymentInfo = () => {
    if (!selectedOrder) return { items: [], total: 0 };

    const items = [{
      label: `${selectedOrder.orderType} - ${selectedOrder.material}`,
      price: selectedOrder.totalAmount
    }];

    return { items, total: selectedOrder?.totalPrice };
  };

  const { items: paymentItems, total: paymentTotal } = getSelectedPaymentInfo();

  const handleDetailsClick = (order: Order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleShowStatusOrders = (status: string) => {
    setActiveFilter(status);

    const filtered = filterOrdersByStatus(orders, status);
    setFilteredOrders(filtered);

    if (filtered.length === 0) {
      setSelectedOrder(null);
      setShowDetails(false);
    } else {
      if (!selectedOrder || !filtered.find(o => o.id === selectedOrder.id)) {
        setSelectedOrder(filtered[0]);
        setShowDetails(true);
      }
    }
    console.log(filtered);
  };


  const handlePayNow = () => {
    router.push('/User/Order/Form');
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative">
      <div className="relative w-full p-6 space-y-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/20"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                My Orders ({filteredOrders.length})
              </h1>

              <StatusIcons
                onNewOrder={() => router.push('/User/Order/Form')}
                onShowStatusOrders={handleShowStatusOrders}
                orders={orders}
              />
            </div>

            <div className="w-full lg:w-auto lg:min-w-80">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 1114 0 7 7 0 01-14 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                  onChange={(e) => {
                    const searchTerm = e.target.value;
                    // Filter orders based on search term
                    const filtered = orders.filter(order =>
                      order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      order.orderType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      order.material.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    setFilteredOrders(filtered);
                    
                    // Reset selected order if it doesn't match the new filter
                    if (selectedOrder && !filtered.find(o => o.id === selectedOrder.id)) {
                      setSelectedOrder(null);
                      setShowDetails(false);
                    }
                  }}
                />
              </div>
            </div>

          </div>
        </motion.div>

        {/* Main Layout */}
        <div className="flex gap-6 w-full">

          {/* Orders List */}
          <div className="w-1/4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {orders?.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 * index,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
              >
                <OrderCard
                  order={order}
                  isSelected={selectedOrder?.id === order.id}
                  onClick={() => handleDetailsClick(order)}
                />
              </motion.div>
            ))}
          </div>

          {/* Order Details */}
          <div className="flex-1 min-w-0">
            {selectedOrder ? (
              <OrderDetailsSidebar order={selectedOrder} />
            ) : (
              <div className="p-12 text-center opacity-70">Select an order...</div>
            )}
          </div>

          {/* Payment Summary — Fixed Size + Sticky */}
          <div
            className="
              w-[320px]
              xl:w-[350px]
              flex-shrink-0
              relative
            "
          >
            <div
              className="
                sticky top-28
                bg-white
                rounded-2xl
                shadow-md
                border border-gray-200
                p-5
              "
            >
              {selectedOrder ? (
                <PaymentSummary
                  title="Order Payment"
                  subtitle="Services included"
                  selectedItems={paymentItems}
                  totalAmount={paymentTotal}
                  buttonLabel="Pay Now"
                  onAction={handlePayNow}
                />
              ) : (
                <div className="bg-white rounded-xl p-6 shadow text-center opacity-70">
                  No order selected
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}