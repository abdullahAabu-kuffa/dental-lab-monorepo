"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle } from "../../../src/utils/UnifiedIcons";
import { Order } from "../../../src/types";
import {
  getProgressSteps,
  formatDate,
} from "../../../src/config/UserData/orderProgressData";

interface OrderProgressProps {
  order: Order;
  showPercentage?: boolean;
  showTimeline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const OrderProgress = ({ order }: OrderProgressProps) => {
  const progressSteps = getProgressSteps(order);
  const completedSteps = progressSteps.filter(
    (step) => step.status === "completed"
  ).length;
  const activeStepIndex = progressSteps.findIndex(
    (step) => step.status === "active"
  );
  const progressPercentage =
    progressSteps.length > 0
      ? (completedSteps / progressSteps.length) * 100
      : 0;

  const ActiveIconComponent =
    activeStepIndex >= 0 ? progressSteps[activeStepIndex].icon : null;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 h-full border-2 border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Order Progress</h3>
          <p className="text-sm text-gray-600 mt-1">
            {order.id} • {order.patientName}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {Math.round(progressPercentage)}%
          </div>
          <div className="text-xs text-gray-500 font-medium">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-600 font-medium">Overall Progress</span>
          <span className="text-gray-500 font-medium">
            {completedSteps} of {progressSteps.length} steps
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 h-4 rounded-full shadow-md"
          />
        </div>
      </div>

      {/* Current Step Box */}
      {activeStepIndex >= 0 &&
        order.status !== "Completed" &&
        order.status !== "Cancelled" &&
        ActiveIconComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-5 mb-10 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <ActiveIconComponent className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-base">
                  Currently: {progressSteps[activeStepIndex].name}
                </h4>
                <p className="text-sm text-blue-700 mt-0.5">
                  {progressSteps[activeStepIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}

      {/* Horizontal Timeline */}
      <div>
        <h4 className="font-bold text-gray-900 mb-6 text-lg">Timeline</h4>

        <div className="flex flex-wrap gap-8">
          {progressSteps.map((step, index) => {
            const isCompleted = step.status === "completed";
            const isActive = step.status === "active";
            const isRejected = step.status === "rejected";

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center w-40 text-center"
              >
                {/* Icon Circle */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-md mb-3 ${
                    isCompleted
                      ? "bg-gradient-to-br from-emerald-500 to-green-500 border-emerald-500"
                      : isActive
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-500 animate-pulse"
                      : isRejected
                      ? "bg-gradient-to-br from-red-500 to-rose-500 border-red-500"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  ) : isRejected ? (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? "bg-white" : "bg-gray-200"
                    }`}>
                      <step.icon
                        className={`w-6 h-6 ${
                          isActive ? "text-blue-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h5
                  className={`font-bold text-sm ${
                    isCompleted || isActive
                      ? "text-gray-900"
                      : isRejected
                      ? "text-red-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.name}
                </h5>

                {/* Description */}
                <p className="text-xs text-gray-500 mt-1">
                  {step.description}
                </p>

                {/* Timestamp */}
                {step.timestamp && isCompleted && (
                  <p className="text-xs text-emerald-600 mt-1">
                    {formatDate(step.timestamp)}
                  </p>
                )}

                {isActive && (
                  <Clock className="w-4 h-4 text-blue-500 mt-2 animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
