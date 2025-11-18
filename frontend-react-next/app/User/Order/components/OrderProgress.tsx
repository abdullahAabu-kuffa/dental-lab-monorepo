
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { OrderProgressProps } from '../../../src/types';
import { getProgressSteps, formatDate } from '../../../src/config/UserData/orderProgressData';

const OrderProgress: React.FC<OrderProgressProps> = ({
  order,
  showPercentage = true,
  showTimeline = true,
  size = 'md',
  className = ''
}) => {
  const router = useRouter();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const steps = getProgressSteps(order);
  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const activeStep = steps.find(s => s.status === 'active');
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-5 ${className}`}>

      {/* Header */}
      <div className="mb-3">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
            <p className="text-sm text-gray-500 truncate">{order.patientName}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/User/Order/${order.id}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#E4B441] to-[#D4AF37] text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Eye className="w-3.5 h-3.5" />
              Details
            </motion.button>
            {showPercentage && (
              <div className="text-2xl font-bold bg-gradient-to-r from-[#E4B441] to-[#D4AF37] bg-clip-text text-transparent">
                {Math.round(progressPercentage)}%
              </div>
            )}
          </div>
        </div>
      </div>



      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-bold text-gray-900">Progress</span>
          <span className="text-xs font-medium text-gray-600">{completedSteps}/{steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="bg-gradient-to-r from-[#E4B441] to-[#D4AF37] h-2 rounded-full"
          />
        </div>
      </div>

      {/* Active Step */}
      {activeStep && (
        <div className="mb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E4B441] to-[#D4AF37] rounded-lg flex items-center justify-center shadow-md">
                <activeStep.icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-amber-900 text-sm mb-0.5">
                  {activeStep.name}
                </h4>
                <p className="text-xs text-amber-700 line-clamp-1">{activeStep.description}</p>
                {activeStep.estimatedCompletion && (
                  <p className="text-xs text-amber-600 mt-1">
                    Est: {formatDate(activeStep.estimatedCompletion)}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Timeline */}
      {showTimeline && (
        <div className="pt-3">
          <h4 className="font-bold text-gray-900 mb-4 text-sm">
            Process Timeline
          </h4>

          <div className="flex items-start justify-between w-full overflow-x-auto pb-3 gap-2">
            {steps.map((step, index) => {
              const isCompleted = step.status === "completed";
              const isActive = step.status === "active";
              const isLastStep = index === steps.length - 1;

              const colorScheme = isCompleted
                ? "from-emerald-400 to-green-600"
                : isActive
                ? "from-sky-400 to-cyan-500 animate-pulse"
                : "from-sky-300 to-cyan-400";

              const connectorColor = isCompleted
                ? "border-green-400"
                : isActive
                ? "border-blue-400"
                : "border-gray-300";

              return (
                <React.Fragment key={step.id}>

                  {/* Step Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center flex-shrink-0 w-20"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg mb-0.5 bg-gradient-to-br ${colorScheme}`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>

                    <h5
                      className={`font-semibold text-[11px] text-center leading-tight ${
                        isCompleted || isActive ? "text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {step.name}
                    </h5>

                    {step.timestamp && isCompleted && (
                      <p className="text-[9px] text-green-600 font-medium mt-0.5">
                        {formatDate(step.timestamp).split(' ')[0]}
                      </p>
                    )}
                  </motion.div>

                  {/* Connector */}
                  {!isLastStep && (
                    <div className="flex-grow h-px mt-6">
                      <div className={`border-t-2 border-dashed ${connectorColor}`} />
                    </div>
                  )}

                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}


    </div>
  );
};

export default OrderProgress;
