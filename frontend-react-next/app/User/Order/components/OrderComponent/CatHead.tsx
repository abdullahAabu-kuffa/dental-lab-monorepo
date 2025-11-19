"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { calculateStatusCounts, SAMPLE_ORDERS } from "../../../../src/config/UserData/orderDataService";
import { Order } from "../../../../src/types";
import { componentStyles } from "../../../../design-system/components";

interface StatusIconsProps {
  onNewOrder?: () => void;
  onShowStatusOrders?: (status: string) => void;
  orders?: Order[]; // Allow passing orders to calculate dynamic counts
}

export const StatusIcons: React.FC<StatusIconsProps> = ({
  onNewOrder,
  onShowStatusOrders,
  orders = SAMPLE_ORDERS // Use provided orders or default to SAMPLE_ORDERS
}) => {
  // Calculate dynamic status counts based on actual orders
  const statusItemsWithCounts = calculateStatusCounts(orders);

  return (
    <motion.div className={componentStyles.statusIcons.container}>
     

      {/* Status Icons with Dynamic Counts - Enhanced Circular */}
      {statusItemsWithCounts.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onShowStatusOrders?.(item.id)}
          className={componentStyles.statusIcons.statusButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)`,
            }}
          >
            <item.Icon className={componentStyles.statusIcons.icon} strokeWidth={2} />
          </div>

          {/* Counter Badge - Only show if count > 0 */}
          {item.count > 0 && (
            <motion.div
              className={componentStyles.statusIcons.counterBadge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {item.count}
            </motion.div>
          )}

          {/* Tooltip */}
          <div className={componentStyles.statusIcons.tooltip}>
            <span>{item.label}</span>
          </div>
        </motion.button>
      ))}

      {/* New Order Button - Enhanced Circular */}
      <motion.button
        onClick={onNewOrder}
        className={componentStyles.statusIcons.newOrderButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <div className="relative w-full h-full flex items-center justify-center rounded-full">
          <PlusCircle className={componentStyles.statusIcons.icon} strokeWidth={2} />
        </div>

        {/* Tooltip */}
        <div className={componentStyles.statusIcons.tooltip}>
          <span>New Order</span>
        </div>
      </motion.button>
    </motion.div>
  );
};