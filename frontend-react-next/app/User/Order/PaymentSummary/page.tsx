"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign } from 'lucide-react';

interface PaymentSummaryProps {
  selectedServices: Array<{ label: string; price: number }>;
  totalAmount: number;
}

export default function PaymentSummary({ selectedServices, totalAmount }: PaymentSummaryProps) {
  return (
    <div className="w-96 sticky top-8 h-fit">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-r from-[#E4B441] to-[#D4A431] rounded-full flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
            <p className="text-sm text-gray-500">Selected services</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
          {selectedServices.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-400 text-sm">No services selected yet</p>
            </div>
          ) : (
            selectedServices.map((service, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700 flex-1">{service.label}</span>
                <span className="text-sm font-semibold text-[#E4B441]">
                  ${service.price}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <div className="bg-gradient-to-r from-[#E4B441]/10 to-[#D4A431]/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Total Services:</span>
            <span className="text-gray-700 font-semibold">
              {selectedServices.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">Total Amount:</span>
            <span className="text-3xl font-bold text-[#E4B441]">
              ${totalAmount}
            </span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-600">
            💡 Prices are estimates. Final cost may vary based on complexity.
          </p>
        </div>
      </motion.div>
    </div>
  );
}