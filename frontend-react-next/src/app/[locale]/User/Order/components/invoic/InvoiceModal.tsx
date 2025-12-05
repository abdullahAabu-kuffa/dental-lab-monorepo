"use client";

import React from "react";
import { X } from "lucide-react";
import { Invoice } from "@/app/[locale]/dashboard/interfaces/users";

interface InvoiceModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (invoiceId: number) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoice,
  isOpen,
  onClose,
  onConfirmPayment
}) => {
  if (!isOpen) return null;

  const isPaid = invoice.status === "PAID";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full mx-4 border border-gray-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {isPaid ? "Invoice Details" : "Payment"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm">Order ID</p>
              <p className="font-medium">#{invoice.id}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Patient</p>
              {/* invoices don't have patient name */}
              {/* <p className="font-medium">{order.patientName}</p> */}
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Amount</p>
              <p className="font-medium text-lg">${invoice.totalPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <p className={`font-medium ${isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                {isPaid ? 'Paid' : 'Pending'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded font-medium transition-colors"
            >
              Close
            </button>
            
            {!isPaid && (
              <button
                onClick={() => onConfirmPayment(invoice.id)}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};