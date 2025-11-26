"use client";

import React from "react";
import { motion } from "framer-motion";
import { Order } from "../../../../src/types";
import { getOrderStages } from "../../../../src/config/UserData/orderDataService";
import { getProgressStepColors } from "../../../../design-system/orderStyles";
import { DetailsOrder } from "./DetailsOrder";

interface OrderProgressProps {
  order: Order;
  useNewDetails?: boolean; // Optional prop to use the new OrderDetails component
}
export const OrderProgress: React.FC<OrderProgressProps> = ({ order, useNewDetails = false }) => {
  // Get progress steps from config based on order stages
  const progressSteps = getOrderStages(order);
  const FirstIcon = progressSteps[0].icon;
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Case Progress */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <FirstIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Case Progress
            </h3>
          </div>
          <div className="flex flex-col space-y-1">
            {progressSteps.map((step, index) => {
              const colors = getProgressStepColors(step.status);
              const StepIcon = step.icon;

              return (
                <div key={step.key} className="flex items-start relative">
                  <div className="flex flex-col items-center mr-4">
                    <motion.div
                      className={`
                        rounded-full w-12 h-12 flex items-center justify-center z-10 shrink-0
                        ${colors.bg}
                        ${colors.ring}
                        ${colors.iconColor}
                      `}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                    >
                      <StepIcon className="w-6 h-6" />
                    </motion.div>
                    {index < progressSteps.length - 1 && (
                      <motion.div
                        className={`
                          w-0.5 h-16 mt-2 rounded-full
                          ${step.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}
                        `}
                        initial={{ height: 0 }}
                        animate={{ height: 64 }}
                        transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                      />
                    )}
                  </div>
                  <motion.div
                    className="pt-2 pb-6 flex-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.1 }}
                  >
                    <p className={`text-base font-bold mb-1 ${colors.text}`}>
                      {step.label}
                    </p>
                    <p className={`text-sm font-medium ${colors.textSecondary}`}>
                      {step.date}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Order Details */}
        <div className="lg:col-span-2">
        
            <DetailsOrder order={order} />
        
        </div>
      </div>
    </div>
  );
};
