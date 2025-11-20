"use client";

import React from "react";
import { Order } from "../../../../src/types";
import { ORDER_COLORS, CARD_STYLES, TEXT_STYLES } from "../../../../design-system/orderStyles";
import { LucideIcon } from "lucide-react";
import {  getOrderStatusConfig, getProgressPercentage,   getOrderStages} from "../../../../src/config/UserData/orderDataService";

interface OrderDetailsSidebarProps {
  order: Order;
}

interface ManufacturingStep {
  label: string;
  icon: LucideIcon;
  status: "completed" | "active" | "pending";
  date: string;
}

export const OrderDetailsSidebar: React.FC<OrderDetailsSidebarProps> = ({ order }) => {
  const statusConfig = getOrderStatusConfig(order.status);
  const progressPercentage = getProgressPercentage(order.status);

  const stageData = getOrderStages(order);

  const steps: ManufacturingStep[] = stageData.map((step) => ({
    label: step.label,
    icon: step.icon,
    status: step.status as "completed" | "active" | "pending",
    date: step.date,
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      
      {/* ❇ Header Card (Simple Clean Style) */}
      <div
        className={`
          ${CARD_STYLES.base}
          bg-white
          shadow-sm
          border border-gray-200
          p-4 rounded-xl
        `}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Order #{order.id}</p>
            <h1 className="text-gray-900 mt-0.5 text-sm font-bold">
              {order.patientName} - {order.orderType}
            </h1>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-xs">Created: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-500 text-xs mt-0.5">Due: {order.date}</p>

            <div
              className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded-full mt-1
                ${statusConfig.color.light} ${statusConfig.color.darkText}
                text-xs font-semibold
              `}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {statusConfig.label}
            </div>
          </div>
        </div>
      </div>

      {/* ❇ Manufacturing Process (Modern Minimal Timeline) */}
      <div
        className={`
          ${CARD_STYLES.base}
          bg-white
          shadow-sm
          border border-gray-200
          p-4 rounded-xl
        `}
      >
        <h3 className="text-gray-900 mb-4 text-lg font-bold">Manufacturing Process</h3>

        <div className="flex items-start relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center flex-1 relative">
                {/* Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center relative z-10
                    ${step.status === "completed"
                      ? "bg-green-500 text-white"
                      : step.status === "active"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  {React.createElement(step.icon, {
                    className: "w-4 h-4",
                  })}
                </div>

                <p
                  className={`
                    mt-2 text-xs font-semibold text-center
                    ${step.status === "completed"
                      ? "text-green-700"
                      : step.status === "active"
                      ? "text-blue-700"
                      : "text-gray-500"
                    }
                  `}
                >
                  {step.label}
                </p>

                <p className="text-xs text-center text-gray-400">{step.date}</p>
              </div>

              {/* Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mt-5 mx-1 rounded-full
                    ${step.status === "completed"
                      ? "bg-green-400"
                      : step.status === "active"
                      ? "bg-blue-400"
                      : "bg-gray-300"
                    }
                  `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ❇ Order Details */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className={`
            col-span-2
            ${CARD_STYLES.base}
            bg-white
            shadow-sm
            border border-gray-200
            p-4 rounded-xl
          `}
        >
          <h3 className="text-gray-900 mb-4 text-lg font-bold">Order Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-gray-500 text-xs font-medium">Associated Lab</p>
              <p className="text-gray-900 text-sm font-semibold">{order.lab || "Precision Dental Labs"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-500 text-xs font-medium">Shipping Carrier</p>
              <p className="text-gray-900 text-sm font-semibold">
                {order.shippingCarrier || "Not assigned"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-500 text-xs font-medium">Tracking Number</p>
              <p className="text-gray-900 text-sm font-semibold">{order.trackingNumber || "---"}</p>
            </div>

            <div className="col-span-2 space-y-1">
              <p className="text-gray-500 text-xs font-medium">Internal Notes</p>
              <p className="text-gray-700 bg-gray-100 p-2 rounded-lg border border-gray-200 text-sm">
                {order.notes || "No special notes."}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className={`
            col-span-1
            ${CARD_STYLES.base}
            bg-white
            shadow-sm
            border border-gray-200
            p-4 rounded-xl
          `}
        >
          <h3 className="text-gray-900 mb-4 text-lg font-bold">Actions</h3>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};
