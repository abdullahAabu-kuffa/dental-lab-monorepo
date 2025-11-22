"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Order } from "../../../../src/types";
import { getStatusColors, getUrgencyColors } from "../../../../design-system/orderStyles";
import { formatDate } from "@/app/src/utils/formatDate";

interface OrderCardProps {
  order: Order;
  isSelected?: boolean;
  onClick?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  isSelected = false,
  onClick,
}) => {
  const statusColors = getStatusColors(order.status);
  const urgencyColors = getUrgencyColors(order.urgency);

  const getStatusDisplay = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return <Clock className="w-6 h-6" />;
      case "completed":
        return <CheckCircle2 className="w-6 h-6" />;
      case "pending":
        return <AlertCircle className="w-6 h-6" />;
      case "cancelled":
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getCardStyles = () => {
    if (isSelected) {
      return statusColors.card;
    }
    return "bg-white/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600";
  };

  const getIconStyles = () => {
    if (isSelected) {
      return statusColors.icon;
    }
    return "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400";
  };

  return (
    <motion.div
      onClick={onClick}
      className={`flex items-center gap-4 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${getCardStyles()}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${getIconStyles()}`}>
        {getStatusIcon(order.status)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-bold text-base truncate ${
            isSelected ? "text-slate-900 dark:text-white" : "text-slate-800 dark:text-slate-200"
          }`}
        >
          {order?.options?.patientName}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">#{order.id}</p>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">{order.orderType}</p>
        </div>
      </div>

      {/* Status + Urgency */}
      <div className="flex flex-col items-end gap-1">
        <span
          className={`text-xs font-bold rounded-lg px-3 py-1.5 border whitespace-nowrap ${statusColors.badge}`}
        >
          {getStatusDisplay(order.status)}
        </span>
        <span className={`text-xs font-semibold ${urgencyColors.text}`}>{order.urgency}</span>
        <div className="whitespace-nowrap text-xs text-gray-500 mt-1">
          {formatDate(order?.createdAt)}
        </div>
      </div>
    </motion.div>
  );
};
