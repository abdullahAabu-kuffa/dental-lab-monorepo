"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, CreditCard, Calendar, User, FileText, Truck, Building } from "lucide-react";
import { Order } from "../../../../src/types";
import { getStatusColors, getUrgencyColors } from "../../../../design-system/orderStyles";
import { formatDate } from "@/app/src/utils/formatDate";

interface OrderDetailsProps {
  order: Order;
  showPaymentSection?: boolean;
  showShippingInfo?: boolean;
  showTimeline?: boolean;
  className?: string;
  onPayNow?: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ 
  order,
  showPaymentSection = true,
  showShippingInfo = true,
  showTimeline = true,
  className = "",
  onPayNow
}) => {
  const statusColors = getStatusColors(order.status);
  const urgencyColors = getUrgencyColors(order.urgency);

  const getPatientName = () => {
    return order.patientName || order.options?.patientName || "Unknown Patient";
  };

  const getDateValue = () => {
    if (order?.options?.date) return order.options.date;
    if (typeof order.date === 'string') return order.date;
    return formatDate(typeof order.createdAt === 'string' ? order.createdAt : order.createdAt.toISOString());
  };

  const getTotalAmount = () => {
    return order.totalAmount || 0;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Order Details Card */}
      <motion.div 
        className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Order Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
          {/* Left Column - Main Order Details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Order ID
                </label>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">#{order.id}</p>
              </div>
              
              <div className="group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Patient Name
                </label>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{getPatientName()}</p>
              </div>
              
              <div className="group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Order Type
                </label>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{order.orderType}</p>
              </div>
              
              <div className="group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </label>
                <p className={`text-sm font-bold mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusColors.badge}`}>
                  <span className={`w-2 h-2 rounded-full ${statusColors.dot}`}></span>
                  {order.status}
                </p>
              </div>
              
              <div className="group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Date
                </label>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{getDateValue()}</p>
              </div>
              
              <div className="group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Urgency
                </label>
                <p className="text-sm font-bold flex items-center gap-2 mt-1">
                  <span className={`w-3 h-3 rounded-full ${urgencyColors.dot}`}></span> 
                  <span className={urgencyColors.text}>
                    {order.urgency}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="group">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Material
              </label>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{order?.options?.material || order.material || "Not specified"}</p>
            </div>
            
            <div className="group">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Notes
              </label>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                {order?.options?.notes || order.notes || "No notes available"}
              </p>
            </div>
            
            {/* Payment Status */}
            {order.paymentStatus && (
              <div className="group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Payment Status
                </label>
                <div className="mt-1">
                  <span className={`text-sm font-bold px-3 py-1 rounded-lg border ${
                    order.paymentStatus === 'paid' 
                      ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700'
                      : 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
                  }`}>
                    {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Timestamps & Tracking */}
          {(showTimeline || showShippingInfo) && (
            <div className="space-y-5">
              {showTimeline && (
                <div className="border-t border-slate-200/60 dark:border-slate-700/60 pt-4">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Order Timeline</h4>
                  <div className="space-y-4">
                    <div className="group">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Created At
                      </label>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                        {new Date(typeof order.createdAt === 'string' ? order.createdAt : order.createdAt.toISOString()).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="group">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Last Updated
                      </label>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                        {new Date(typeof order.updatedAt === 'string' ? order.updatedAt : order.updatedAt.toISOString()).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {order.lab && (
                      <div className="group">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          Lab
                        </label>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{order.lab}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {showShippingInfo && (order.shippingCarrier || order.trackingNumber) && (
                <div className="border-t border-slate-200/60 dark:border-slate-700/60 pt-4">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Shipping Info
                  </h4>
                  <div className="space-y-4">
                    {order.shippingCarrier && (
                      <div className="group">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Shipping Carrier
                        </label>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{order.shippingCarrier}</p>
                      </div>
                    )}
                    
                    {order.trackingNumber && (
                      <div className="group">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Tracking Number
                        </label>
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1 font-mono">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Payment Section */}
      {showPaymentSection && (
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-200/50 dark:border-blue-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Total Amount</p>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${getTotalAmount()}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPayNow}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300"
            >
              <CreditCard className="w-5 h-5" />
              <span>Pay Now</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OrderDetails;