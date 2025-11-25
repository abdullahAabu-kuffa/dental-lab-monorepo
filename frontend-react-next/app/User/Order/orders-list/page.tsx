"use client";
import React, { useState } from "react";
import ScrollAnimation from "@/app/design-system/components/ScrollAnimation";
import { OrderCard } from "../components/OrderComponent/OrderCard";
import { OrderProgress } from "../components/OrderComponent/OrderProgress";
import { StatusIcons } from "../components/OrderComponent/CatHead";
import { Calendar } from "lucide-react";
import { componentStyles } from "../../../design-system";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "lottie-react";
import animationData from "@/assets/lotties/Anesthesia.json";
import {
filterOrdersByStatus,
} from "../../../src/config/UserData/orderDataService";
import { Order } from "../../../src/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLoading } from "@/app/src/contexts/LoadingContext";
import { useOrders } from "@/app/src/lib/orders";


export default function OrdersListPage() {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all-orders");
  const { data, isLoading } = useOrders();
  const orders = data;
    console.log(orders);
    
  const getSelectedPaymentInfo = () => {
    if (!selectedOrder) return { items: [], total: 0 };

    const items = [
      {
        label: `${selectedOrder.orderType} - ${selectedOrder.material}`,
        price: selectedOrder.totalAmount,
      },
    ];

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
      if (!selectedOrder || !filtered.find((o) => o.id === selectedOrder.id)) {
        setSelectedOrder(filtered[0]);
        setShowDetails(true);
      }
    }
  };

  const handlePayNow = () => {
    router.push("/User/Order/Form");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-[1800px] mx-auto p-3 sm:p-4 lg:p-6 space-y-3">
        {/* HEADER */}
        <ScrollAnimation
          animation="fadeInFromTop"
          className="backdrop-blur-xl px-2 py-1 rounded-3xl border border-white/50 transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <h1 className="text-33xl sm:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent whitespace-nowrap">
                My Orders{" "}
                <span className="text-2xl sm:text-3xl font-semibold text-gray-400">
                  {/* ({orders.length}) */}
                </span>
              </h1>

              <StatusIcons
                onNewOrder={() => router.push("/User/Order/Form")}
                onShowStatusOrders={handleShowStatusOrders}
                orders={orders}
              />
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto lg:min-w-96">
              {/* SEARCH */}
              <div className="relative group flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 1114 0 7 7 0 01-14 0z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder="Search by patient, type, or material..."
                  className="block w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 outline-none"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filtered = orders?.filter(
                      (order) =>
                        order.patientName.toLowerCase().includes(searchTerm) ||
                        order.orderType.toLowerCase().includes(searchTerm) ||
                        order.material.toLowerCase().includes(searchTerm)
                    );

                    setFilteredOrders(filtered);

                    if (
                      selectedOrder &&
                      !filtered?.find((o) => o.id === selectedOrder.id)
                    ) {
                      setSelectedOrder(null);
                      setShowDetails(false);
                    }
                  }}
                />
              </div>

              {/* EVENTS BUTTON */}
           
            </div>
          </div>
        </ScrollAnimation>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* LIST */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {orders?.map((order, index) => (
                <ScrollAnimation
                  key={order.id}
                  animation="fadeInFromLeft"
                  delay={0.05 * index}
                >
                  <OrderCard
                    order={order}
                    isSelected={selectedOrder?.id === order.id}
                    onClick={() => handleDetailsClick(order)}
                  />
                </ScrollAnimation>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-5 xl:col-span-8">
            {selectedOrder ? (
              <ScrollAnimation animation="fadeInFromBottom" delay={0.2}>
                <OrderProgress order={selectedOrder} />
              </ScrollAnimation>
            ) : (
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-16 text-center border-2 border-dashed border-gray-200">
                <svg
                  className="mx-auto h-16 w-16 text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-400 text-lg font-medium">
                  Select an order to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}