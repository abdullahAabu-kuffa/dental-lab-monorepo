"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Search,
  Package,
} from "lucide-react";
import { STATUS_ITEMS } from '../../../src/config/UserData/statusData';

interface SidebarIconsProps {
  onNewOrder?: () => void;
  onShowStatusOrders?: (status: string) => void;
  onTrackOrder?: () => void;
  onShowOrdersTable?: () => void;
}

export const DropList: React.FC<SidebarIconsProps> = ({
  onNewOrder,
  onShowStatusOrders,
  onTrackOrder,
  onShowOrdersTable
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalOrders = useMemo(() => STATUS_ITEMS.reduce((sum, item) => sum + item.count, 0), []);

  const toggleDropdown = useCallback(() => setIsDropdownOpen(prev => !prev), []);
  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);
  const handleStatusClick = useCallback((statusId: string) => {
    onShowStatusOrders?.(statusId);
    closeDropdown();
  }, [onShowStatusOrders, closeDropdown]);

  return (
    <motion.div
      style={{ top: "calc(8rem + 10px)" }}
      className="fixed left-4 z-50 flex flex-col items-center gap-6"
    >
      {/* All Orders Button */}
      <motion.div
        onClick={toggleDropdown}
        className="relative group cursor-pointer flex flex-col items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center border border-white/20 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6366F1 100%)' }}
        >
          <Package className="w-6 h-6 text-white relative z-10" strokeWidth={2} />
        </div>

        {totalOrders > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-rose-500 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md border border-white"
          >
            {totalOrders}
          </motion.div>
        )}

        <div className="mt-1">
          <span className="bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-gray-200">
            All Orders
          </span>
        </div>
      </motion.div>

      {/* Status Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-4 mt-2"
          >
            {STATUS_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleStatusClick(item.id)}
                className="relative group flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <div
                  className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center border border-white/20 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)` }}
                >
                  <item.Icon className="w-6 h-6 text-white relative z-10" strokeWidth={2} />
                </div>

                {item.count > 0 && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-rose-500 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md border border-white"
                  >
                    {item.count}
                  </motion.div>
                )}

                <div className="mt-1">
                  <span className="bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-gray-200">
                    {item.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      

        {/* New Order Button */}
        <motion.button
          onClick={onNewOrder}
          className="relative group flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <div
            className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center border border-white/20 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
          >
            <PlusCircle className="w-6 h-6 text-white relative z-10" strokeWidth={2} />
          </div>

          <div className="mt-1">
            <span className="bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-gray-200">
              New Order
            </span>
          </div>
        </motion.button>
    </motion.div>
  );
};
