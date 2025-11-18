// OrderCard component for displaying individual order information
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Calendar,
  DollarSign,
  Clock,
} from "lucide-react";
import { Order } from "../../../src/types";
import { ORDER_COLORS } from "../../../design-system/orderStyles";

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  isSelected?: boolean;
}

const OrderCard = ({ order, onViewDetails, isSelected = false }: OrderCardProps) => {
  const statusMap = {
    Completed: ORDER_COLORS.completed,
    "In Progress": ORDER_COLORS.inProgress,
    Pending: ORDER_COLORS.pending,
    Cancelled: ORDER_COLORS.rejected,
  } as const;

  const statusColor = statusMap[order.status] || ORDER_COLORS.pending;

  const urgencyColors: Record<string, string> = {
    High: "bg-rose-500",
    Medium: "bg-amber-500",
    Low: "bg-gray-400",
  };

  const getEstimatedDelivery = (order: Order): Date | null => {
    const orderDate = new Date(order.date);
    const days =
      order.urgency === "High" ? 7 : order.urgency === "Medium" ? 14 : 21;
    return new Date(orderDate.getTime() + days * 24 * 60 * 60 * 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      className={`relative bg-white rounded-2xl shadow-md border transition-all duration-300 cursor-pointer overflow-hidden
        ${
          isSelected
            ? "border-blue-500 ring-4 ring-blue-100"
            : "border-gray-200 hover:border-blue-300 hover:shadow-xl"
        }`}
      onClick={() => onViewDetails?.(order)}
    >
      {/* Urgency Thin Bar */}
      {order.urgency !== "Low" && (
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 ${
            urgencyColors[order.urgency]
          }`}
        />
      )}

      <div className="p-5">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-base font-bold text-gray-900 truncate">
                {order.patientName}
              </h3>

              {order.urgency !== "Low" && (
                <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  {order.urgency}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              {order.orderType}
            </p>
          </div>

          {/* Status Badge */}
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusColor.light} ${statusColor.darkText} border ${statusColor.border}`}
          >
            {order.status}
          </div>
        </div>

        {/* Date + Amount */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-semibold text-gray-700">
                {new Date(order.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-bold text-emerald-600">
                ${order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Material Box */}
        <div className="bg-gray-100 rounded-xl p-3 mb-4 border border-gray-300">
          <p className="text-xs text-gray-500 mb-1.5">
            Material:{" "}
            <span className="font-bold text-gray-900">
              {order.material}
            </span>
          </p>

          {order.status !== "Completed" && (
            <p className="text-xs text-blue-600 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5" />
              Est.{" "}
              {getEstimatedDelivery(order)?.toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric" }
              )}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;
