"use client";

import React, { useState } from "react";
import { Wallet } from "lucide-react";
// import { OrderCardInvoices } from "../components/invoic/OrderCardInvoices";
// import { DetailsOrder } from "../components/OrderComponent/DetailsOrder";
// import { PaymentStatus } from "../components/invoic/PaymentInformation";
import { InvoiceModal } from "../components/invoic/InvoiceModal";
import { useAuth } from "@/app/src/hooks/useAuth";
import { DetailsOrder } from "./DetailsOrder";
import { PaymentStatus } from "./PaymentStatus";
import { OrderCardInvoices } from "./OrderCardInvoices";

export interface Invoice {
  id: number;
  clientId: number;
  createdAt: string;
  dueDate: string;
  status: string;
  totalPrice: number;
  paidAt: string | null;
  paymentMethod?: string;
  transactionId?: string;
  paymentDate?: Date;
}

export default function PaymentPage() {
  const { user, loading } = useAuth();
  // const [ordersState, setOrdersState] = useState<Invoice[]>([]);
  const [ordersState, setOrdersState] = useState<Invoice[]>(
  () => user?.data?.user?.invoices ?? []
);
  const [selectedOrder, setSelectedOrder] = useState<Invoice | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Initialize ordersState when user data loads
  // useEffect(() => {
  //   if (user?.data?.user?.invoices) {
  //     setOrdersState(user.data.user.invoices);
  //   }
  // }, [user]);

  const handleDetailsClick = (invoice: Invoice) => {
    setSelectedOrder(invoice);
  };

  const handlePayClick = (invoice: Invoice) => {
    setSelectedOrder(invoice);
    setShowModal(true);
  };

  const handleConfirmPayment = (invoiceId: number) => {
    const updatedOrders = ordersState.map((order) =>
      order.id === invoiceId
        ? {
            ...order,
            status: "PAID",
            paymentMethod: "Credit Card",
            transactionId: "TXN" + Date.now(),
            paidAt: new Date().toISOString(),
          }
        : order
    );

    setOrdersState(updatedOrders);
    setShowModal(false);

    if (selectedOrder?.id === invoiceId) {
      setSelectedOrder(updatedOrders.find((o) => o.id === invoiceId) || null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full min-h-screen">
      <div className="relative max-w-[1800px] mx-auto p-3 sm:p-4 lg:p-6 space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* LIST */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {ordersState.map((invoice, index) => (
                <div
                  key={invoice.id}
                  style={{ animationDelay: `${0.05 * index}ms` }}
                >
                  <OrderCardInvoices
                    invoices={invoice}
                    isSelected={selectedOrder?.id === invoice.id}
                    onClick={() => handleDetailsClick(invoice)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS + PAYMENT */}
          <div className="lg:col-span-8 xl:col-span-9 flex gap-6">
            {selectedOrder ? (
              <>
                <div className="w-1/2">
                  <DetailsOrder invoice={selectedOrder} />
                </div>
                <div className="w-1/2">
                  <PaymentStatus
                    order={selectedOrder}
                    onPay={() => handlePayClick(selectedOrder)}
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

      {selectedOrder && (
        <InvoiceModal
          invoice={selectedOrder}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirmPayment={handleConfirmPayment}
        />
      )}
    </div>
  );
}
