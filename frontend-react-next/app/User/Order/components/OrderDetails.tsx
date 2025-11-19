"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {  User, Calendar, Package, FileText, Crown } from 'lucide-react';
import { OrderDetailsPanelProps } from '../types';
import {  TEXT_STYLES } from '../../../design-system/orderStyles';

const OrderDetailsPanel: React.FC<OrderDetailsPanelProps> = ({ order }) => {
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if(s.includes("pending")) return "text-yellow-700 bg-yellow-100 border-yellow-300";
    if(s.includes("progress")) return "text-blue-700 bg-blue-100 border-blue-300";
    if(s.includes("complete")) return "text-green-700 bg-green-100 border-green-300";
    if(s.includes("cancelled")) return "text-red-700 bg-red-100 border-red-300";
    return "text-gray-700 bg-gray-100 border-gray-300";
  };

  const getUrgencyColor = (urgency: string) => {
    const u = urgency.toLowerCase();
    if(u === "high") return "text-red-700 bg-red-100";
    if(u === "medium") return "text-yellow-700 bg-yellow-100";
    if(u === "low") return "text-green-700 bg-green-100";
    return "text-gray-700 bg-gray-100";
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">

      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className={`${TEXT_STYLES.heading} text-2xl text-gray-900 mb-2`}>Order Details</h2>
        <p className={`${TEXT_STYLES.label}`}>Order ID: <span className={`${TEXT_STYLES.value}`}>#{order.id}</span></p>
      </div>

      {/* Total Amount */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 flex justify-between items-center">
        <span className={`${TEXT_STYLES.body} font-medium text-amber-900`}>Total Amount</span>
        <div className="text-2xl font-bold bg-gradient-to-r from-[#E4B441] to-[#D4AF37] bg-clip-text text-transparent">
          {order.totalAmount.toFixed(2)} EGP
        </div>
      </div>

      {/* Patient Info */}
      <div className="space-y-3">
        {[
          { label: "Patient Name", value: order.patientName, icon: <User className="w-5 h-5 text-white"/> , color: "from-blue-500 to-blue-600" },
          { label: "Order Date", value: formatDate(order.date), icon: <Calendar className="w-5 h-5 text-white"/>, color: "from-purple-500 to-purple-600" },
          { label: "Order Type", value: order.orderType, icon: <Package className="w-5 h-5 text-white"/>, color: "from-green-500 to-green-600" },
          { label: "Material", value: order.material, icon: <Crown className="w-5 h-5 text-white"/>, color: "from-orange-500 to-orange-600" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={TEXT_STYLES.label}>{item.label}</p>
              <p className={TEXT_STYLES.value}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Status & Urgency */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div>
          <p className={`${TEXT_STYLES.label} mb-1`}>Status</p>
          <span className={`inline-flex items-center px-4 py-2 rounded-lg ${TEXT_STYLES.body} font-semibold border-2 ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div>
          <p className={`${TEXT_STYLES.label} mb-1`}>Urgency</p>
          <span className={`inline-flex items-center px-4 py-2 rounded-lg ${TEXT_STYLES.body} font-semibold ${getUrgencyColor(order.urgency)}`}>
            {order.urgency}
          </span>
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"/>
            <div className="flex-1 min-w-0">
              <p className={`${TEXT_STYLES.label} font-semibold text-blue-900 mb-1`}>Notes</p>
              <p className={`${TEXT_STYLES.body} text-blue-800`}>{order.notes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className={`${TEXT_STYLES.body} text-gray-600`}>Subtotal</span>
            <span className={TEXT_STYLES.value}>{order.totalAmount.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-300">
            <span className={`${TEXT_STYLES.value} font-bold`}>Total</span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#E4B441] to-[#D4AF37] bg-clip-text text-transparent">
              {order.totalAmount.toFixed(2)} EGP
            </span>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default OrderDetailsPanel;
