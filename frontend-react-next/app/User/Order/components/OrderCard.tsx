// OrderCard component for displaying individual order information
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Calendar,
  DollarSign,
  Clock,
  Eye,
  User,
} from "lucide-react";
import { Order } from "../../../src/types";

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  isSelected?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onViewDetails,
  isSelected = false,
}) => {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("pending")) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (statusLower.includes("progress")) return "text-blue-600 bg-blue-50 border-blue-200";
    if (statusLower.includes("complete")) return "text-green-600 bg-green-50 border-green-200";
    if (statusLower.includes("cancelled")) return "text-red-600 bg-red-50 border-red-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getUrgencyColor = (urgency: string) => {
    const urgencyLower = urgency.toLowerCase();
    if (urgencyLower === "high") return "text-red-600 bg-red-50";
    if (urgencyLower === "medium") return "text-yellow-600 bg-yellow-50";
    if (urgencyLower === "low") return "text-green-600 bg-green-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        bg-white rounded-lg shadow-md border p-3 cursor-pointer transition-all duration-200 max-w-xs
        ${isSelected 
          ? "border-blue-500 shadow-lg ring-2 ring-blue-200" 
          : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
        }
      `}
      onClick={() => onViewDetails(order)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <div className="p-1 bg-blue-50 rounded-lg flex-shrink-0">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-sm truncate">
              Order #{order.id}
            </h3>
            <div className="flex items-center text-xs text-gray-500 truncate">
              <User className="w-3 h-3 mr-0.5 flex-shrink-0" />
              <span className="truncate text-xs">{order.patientName}</span>
            </div>
          </div>
        </div>
        <div className="text-right ml-1 flex-shrink-0">
          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
          <div className={`mt-0.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(order.urgency)}`}>
            {order.urgency}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs gap-1">
          <div className="flex items-center text-gray-600 min-w-0">
            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate text-xs">{formatDate(order.date)}</span>
          </div>
          <div className="flex items-center text-gray-600 flex-shrink-0">
            <DollarSign className="w-3 h-3 mr-0.5" />
            <span className="font-semibold text-green-600 text-xs">
              {order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;