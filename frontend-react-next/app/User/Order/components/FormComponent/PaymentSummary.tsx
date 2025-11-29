"use client";

import React from "react";
import { motion } from "framer-motion";

interface PaymentSummaryProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;

  selectedItems: Array<{ label: string; price: number }>;
  totalAmount: number;

  buttonLabel?: string;
  onAction?: () => void;
  disabled?: boolean;

  maxHeight?: string;
}

export default function PaymentSummary({
  title = "Order Summary",
  subtitle = "Selected services",
  icon,
  selectedItems,
  totalAmount,
  buttonLabel = "Pay Now",
  onAction,
  disabled,
  maxHeight = "max-h-96",
}: PaymentSummaryProps) {
  const isDisabled = disabled || selectedItems.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
   
     
      

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-r from-[#E4B441] to-[#D4A431] rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* Items List */}
      <div className={`space-y-3 mb-6 overflow-y-auto ${maxHeight}`}>
        {selectedItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No items selected</p>
          </div>
        ) : (
          selectedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-700 flex-1">{item.label}</span>
              <span className="text-sm font-semibold text-[#E4B441]">
                ${item.price}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Total Section */}
      <div className="bg-gradient-to-r from-[#E4B441]/10 to-[#D4A431]/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 font-medium">Total Items:</span>
          <span className="text-gray-700 font-semibold">
            {selectedItems.length}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">Total Amount:</span>
          <span className="text-3xl font-bold text-[#E4B441]">${totalAmount}</span>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        onClick={!isDisabled ? onAction : undefined}
        disabled={isDisabled}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
          isDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white hover:from-[#FFD700] hover:to-[#E4B441] shadow-lg hover:shadow-xl"
        }`}
      >
        {buttonLabel} - ${totalAmount}
      </motion.button>
    </motion.div>
  );
}