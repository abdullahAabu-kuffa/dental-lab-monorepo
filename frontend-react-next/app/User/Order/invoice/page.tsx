"use client";

import React, { useState } from "react";
import { Wallet, DollarSign, FileText, TrendingUp } from "lucide-react";
import { OrderCardInvoices } from "../components/invoic/OrderCardInvoices";
import { DetailsOrder } from "../components/OrderComponent/DetailsOrder";
import { PaymentStatus } from "../components/invoic/PaymentInformation";
import { staticInvoiceOrders, getInvoiceStats } from "../staticData";
import { Order} from "../../../src/types";

export default function PaymentPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Use static data instead of API
  const orders: Order[] = staticInvoiceOrders;
  
  // Get stats for potential use in UI
  const stats = getInvoiceStats();

  const handleDetailsClick = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="relative max-w-[1800px] mx-auto p-3 sm:p-4 lg:p-6 space-y-3">
        
     

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          
          {/* LIST */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {orders?.map((order: Order, index) => (
                <div key={order.id} style={{ animationDelay: `${0.05 * index}ms` }}>
                  <OrderCardInvoices
                    order={order}
                    isSelected={selectedOrder?.id === order.id}
                    onClick={() => handleDetailsClick(order)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS + PAYMENT SIDE BY SIDE */}
          <div className="lg:col-span-8 xl:col-span-9 flex gap-6">
            {selectedOrder ? (
              <>
                {/* Order Details */}
                <div className="w-1/2">
                  <DetailsOrder order={selectedOrder} />
                </div>

                {/* Payment Information */}
                <div className="w-1/2">
                  <PaymentStatus 
                    order={selectedOrder} 
                    onPay={() => {
                      // TODO: Implement payment processing logic
                      console.log(`Processing payment for order ${selectedOrder.id}`);
                    }}
                  />
                </div>

              </>
            ) : (
              <div className="w-full bg-white/50 rounded-2xl p-16 text-center border-2 border-dashed border-gray-200">
                <Wallet className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-400 text-lg font-medium">
                  Select an order to view payment details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
