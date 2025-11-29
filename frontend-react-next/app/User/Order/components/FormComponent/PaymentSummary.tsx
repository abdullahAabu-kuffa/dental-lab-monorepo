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
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#E4B441] to-[#D4A431] rounded-full flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Items List */}
      <div className={`space-y-2 sm:space-y-3 mb-4 sm:mb-6 overflow-y-auto ${maxHeight}`}>
        {selectedItems.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <p className="text-gray-400 text-xs sm:text-sm">No items selected</p>
          </div>
        ) : (
          selectedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2"
            >
              <span className="text-xs sm:text-sm text-gray-700 flex-1 line-clamp-2">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#E4B441] flex-shrink-0">
                ${item.price}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-200 my-3 sm:my-4"></div>

      {/* Total Section */}
      <div className="bg-gradient-to-r from-[#E4B441]/10 to-[#D4A431]/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            Total Items:
          </span>
          <span className="text-sm sm:text-base text-gray-700 font-semibold">
            {selectedItems.length}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
            Total Amount:
          </span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E4B441]">
            ${totalAmount}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        onClick={!isDisabled ? onAction : undefined}
        disabled={isDisabled}
        className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all ${
          isDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white hover:from-[#FFD700] hover:to-[#E4B441] shadow-lg hover:shadow-xl"
        }`}
      >
        <span className="truncate">{buttonLabel}</span>
        <span className="font-bold flex-shrink-0">- ${totalAmount}</span>
      </motion.button>
    </motion.div>
  );
}