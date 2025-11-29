"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, PlusCircle } from "lucide-react"; 
import { calculateStatusCounts, SAMPLE_ORDERS } from "../../../../src/config/UserData/orderDataService";
import { Order } from "../../../../src/types";
import { componentStyles } from "../../../../design-system/components";

interface StatusIconsProps {
  onNewOrder?: () => void;
  onShowStatusOrders?: (status: string) => void;
  orders?: Order[];
}

export const StatusIcons: React.FC<StatusIconsProps> = ({
  onNewOrder,
  onShowStatusOrders,
  orders = SAMPLE_ORDERS,
}) => {

  const statusItems = calculateStatusCounts(orders);
  const statusItemsWithDraft = [
    ...statusItems,
    {
      id: "draft",
      label: "Draft",
      Icon: FileText,
      gradient: ["#FFD700", "#FFA500"], 
      count: orders.filter(o => o.status === "draft").length,
    },
  ];

  return (
    <motion.div className="flex items-center gap-2"> 
      <h2 className="text-xl font-bold text-gray-700">Orders</h2>

      {/* Status Icons */}
      <div className="flex items-center gap-2">
        {statusItemsWithDraft.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onShowStatusOrders?.(item.id)}
            className={componentStyles.statusIcons.statusButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <div
              className="relative w-10 h-10 flex items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(135deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)`,
              }}
            >
              <item.Icon className={componentStyles.statusIcons.icon} strokeWidth={2} />
            </div>

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

            <div className={componentStyles.statusIcons.tooltip}>
              <span>{item.label}</span>
            </div>
          </motion.button>
        ))}
        <motion.button
          onClick={onNewOrder}
          className={componentStyles.statusIcons.statusButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-blue-500">
            <PlusCircle className="text-white w-5 h-5" />
          </div>
          <div className={componentStyles.statusIcons.tooltip}>
            <span>New Order</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};
