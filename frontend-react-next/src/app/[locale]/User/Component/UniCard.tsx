"use client";

import React from "react";
import { motion } from "framer-motion";

interface UniversalStatusCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  statusLabel: string;
  statusBadgeClass: string;
  urgency?: string;
  urgencyClass?: string;
  footer?: string;
  isSelected?: boolean;
  selectedCardClass?: string;
  defaultCardClass?: string;
  selectedIconClass?: string;
  defaultIconClass?: string;
  onClick?: () => void;

  paymentStatus?: "paid" | "unpaid";
  paidClass?: string;
  unpaidClass?: string;
}

export const UniversalStatusCard: React.FC<UniversalStatusCardProps> = ({
  title,
  subtitle,
  icon,
  statusLabel,
  statusBadgeClass,
  urgency,
  urgencyClass = "",
  footer,
  isSelected = false,
  selectedCardClass = "",
  defaultCardClass = "bg-white/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800",
  selectedIconClass = "",
  defaultIconClass = "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400",
  onClick,
  paymentStatus,
  paidClass = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-300/50 dark:border-green-700/50",
  unpaidClass = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-300/50 dark:border-red-700/50",
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`flex items-center gap-4 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
        isSelected ? selectedCardClass : defaultCardClass
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isSelected ? selectedIconClass : defaultIconClass
        }`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-bold text-base truncate ${
            isSelected ? "text-slate-900 dark:text-white" : "text-slate-800 dark:text-slate-200"
          }`}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 truncate">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Section: Status + (Urgency + Payment) + Footer */}
      <div className="flex flex-col items-end gap-1">
        {/* Status */}
        <span
          className={`text-xs font-bold rounded-lg px-3 py-1.5 border whitespace-nowrap ${statusBadgeClass}`}
        >
          {statusLabel}
        </span>

        {/* Urgency + Payment in the same row */}
        <div className="flex items-center gap-2">
          {urgency && <span className={`text-xs font-semibold ${urgencyClass}`}>{urgency}</span>}

          {paymentStatus && (
            <span
              className={`text-xs font-semibold rounded-lg px-2 py-1 border whitespace-nowrap ${
                paymentStatus === "paid" ? paidClass : unpaidClass
              }`}
            >
              {paymentStatus === "paid" ? "Paid" : "Unpaid"}
            </span>
          )}
        </div>

        {/* Footer */}
        {footer && <div className="whitespace-nowrap text-xs text-gray-500 mt-1">{footer}</div>}
      </div>
    </motion.div>
  );
};

export default UniversalStatusCard;
