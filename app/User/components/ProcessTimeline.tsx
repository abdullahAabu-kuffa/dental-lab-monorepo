// app/User/Order/components/ProcessTimeline.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ICON_MAP } from '../../src/utils/UnifiedIcons';
import { ORDER_COLORS } from '../../design-system/orderStyles';

interface ProcessStep {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
  details?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  const iconMap = {
    'Order Received': ICON_MAP.orderReceived,
    'Design Review': ICON_MAP.designReview,
    'Manufacturing': ICON_MAP.manufacturing,
    'Quality Check': ICON_MAP.qualityCheck
  };

  const getStepColors = (status: string) => {
    if (status === 'completed') return ORDER_COLORS.completed;
    if (status === 'active') return ORDER_COLORS.inProgress;
    if (status === 'pending') return ORDER_COLORS.pending;
    return ORDER_COLORS.waiting;
  };

  // Calculate progress percentage
  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const progressPercent = (completedSteps / steps.length) * 100;

  return (
    <div className="relative py-8">
      {/* Progress Line Background */}
      <div className="absolute top-14 left-0 right-0 h-1 bg-gray-300 rounded-full mx-16" />
      
      {/* Progress Line Active */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `calc(${progressPercent}% - 8rem)` }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-14 left-16 h-1 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
      />
      
      {/* Steps */}
      <div className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const Icon = iconMap[step.name as keyof typeof iconMap];
          const colors = getStepColors(step.status);
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex flex-col items-center text-center flex-1"
            >
              {/* Icon Circle */}
              <div className={`relative w-14 h-14 rounded-full ${colors.bg} flex items-center justify-center shadow-lg mb-3`}>
                {Icon && <Icon className="w-7 h-7 text-white" />}
                {step.status === 'active' && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-50"
                  />
                )}
              </div>
              
              {/* Step Name */}
              <h3 className="font-bold text-xs text-gray-800 mb-2 px-1">{step.name}</h3>
              
              {/* Status Badge */}
              {step.status === 'completed' && (
                <span className={`px-2 py-1 ${colors.light} ${colors.darkText} rounded-full text-xs font-bold mb-1`}>
                  ✓ Complete
                </span>
              )}
              {step.status === 'active' && (
                <span className={`px-2 py-1 ${colors.light} ${colors.darkText} rounded-full text-xs font-bold mb-1`}>
                  ⚡ Active
                </span>
              )}
              {step.status === 'pending' && (
                <span className={`px-2 py-1 ${colors.light} ${colors.darkText} rounded-full text-xs font-bold mb-1`}>
                  ⏳ Waiting
                </span>
              )}
              
              {/* Timestamp */}
              {step.timestamp && (
                <div className="text-xs text-gray-500 mt-1">
                  <p className="font-medium">{step.timestamp}</p>
                  {step.details && <p className="text-gray-400">{step.details}</p>}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessTimeline;