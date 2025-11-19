"use client";

import React from "react";
import { motion } from "framer-motion";
import { Order } from "../../../../src/types";
import { CARD_STYLES, TEXT_STYLES } from "../../../../design-system/orderStyles";

import { getOrderStatusConfig } from "../../../../src/config/UserData/orderDataService";

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

  const statusConfig = getOrderStatusConfig(order.status);
  const StatusIconComponent = statusConfig.icon;

  return (
    <motion.div
      onClick={onClick}
      className={`
        ${CARD_STYLES.base}
        ${CARD_STYLES.hover}
        ${isSelected ? CARD_STYLES.selected : CARD_STYLES.unselected}
        flex flex-col gap-1
        bg-gradient-to-r from-white to-gray-50
        border border-black/10
        py-2 px-3
        h-24
        overflow-hidden
      `}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Row 1: Order ID + Status */}
      <div className="flex justify-between items-center">
        <div className="text-xs font-medium text-gray-600 truncate">
          #{order.id}
        </div>
        <div className={`
          inline-flex items-center gap-1 px-2 py-0.5 rounded-full
          ${statusConfig.color.light} ${statusConfig.color.darkText}
          ${TEXT_STYLES.body} font-semibold text-xs
        `}>
          <StatusIconComponent className="w-3 h-3" />
          {statusConfig.label}
        </div>
      </div>

      {/* Row 2: Patient Name + Due Date */}
      <div className="flex justify-between items-center mt-1 text-xs text-gray-700 font-medium">
        <div className="truncate">{order.patientName}</div>
        <div className="whitespace-nowrap">{order.date}</div>
      </div>
    </motion.div>
  );
};
