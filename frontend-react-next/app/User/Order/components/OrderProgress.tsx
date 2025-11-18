"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from '../../../src/utils/UnifiedIcons';
import { OrderProgressProps } from '../../../src/types';
import { 
  SIZE_CLASSES, 
  getProgressSteps, 
  getStepStatusColor, 
  formatDate 
} from '../../../src/config/UserData/orderProgressData';

export const OrderProgress: React.FC<OrderProgressProps> = ({
  order,
  showPercentage = true,
  showTimeline = true,
  size = 'md',
  className = ''
}) => {
  const steps = getProgressSteps(order);
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const activeStep = steps.find(step => step.status === 'active');
  const progressPercentage = (completedSteps / steps.length) * 100;
  const currentSize = SIZE_CLASSES[size];

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className={`flex items-center justify-between mb-6 ${currentSize.spacing}`}>
        <div>
          <h3 className={`font-bold text-gray-900 ${currentSize.title}`}>
            Order Progress
          </h3>
          <p className={`text-gray-600 ${currentSize.text}`}>
            {order.id} • {order.patientName}
          </p>
        </div>
        {showPercentage && (
          <div className="text-right">
            <div className={`text-2xl font-bold text-blue-600 ${currentSize.title}`}>
              {Math.round(progressPercentage)}%
            </div>
            <div className={`text-gray-500 ${currentSize.text}`}>
              Complete
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-gray-600 ${currentSize.text}`}>Overall Progress</span>
          <span className={`text-gray-500 ${currentSize.text}`}>
            {completedSteps} of {steps.length} steps
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Current Active Step */}
      {activeStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className={`${currentSize.icon} bg-blue-500 rounded-full flex items-center justify-center`}>
              <activeStep.icon className="w-1/2 h-1/2 text-white" />
            </div>
            <div>
              <h4 className={`font-semibold text-blue-900 ${currentSize.text}`}>
                Currently Working On: {activeStep.name}
              </h4>
              <p className={`text-blue-700 ${currentSize.text}`}>
                {activeStep.description}
              </p>
              {activeStep.estimatedCompletion && (
                <p className={`text-blue-600 ${currentSize.text} mt-1`}>
                  Estimated completion: {formatDate(activeStep.estimatedCompletion)}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Timeline Steps Horizontal */}
      {showTimeline && (
        <div className="overflow-x-auto">
          <h4 className={`font-semibold text-gray-900 ${currentSize.title} mb-4`}>
            Order Timeline
          </h4>

          <div className="flex gap-12 min-w-max">
            {steps.map((step, index) => {
              const colors = getStepStatusColor(step.status);
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center w-auto px-4"
                >
                  <div
                    className={`relative z-10 ${currentSize.icon} rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center shadow-sm`}
                  >
                    <Icon className={`w-1/2 h-1/2 ${colors.icon}`} />
                  </div>

                  <h5 className={`font-medium text-gray-900 mt-2 ${currentSize.text} text-center`}>
                    {step.name}
                  </h5>

                  <p className={`text-gray-600 mt-1 ${currentSize.text} text-center`}>
                    {step.description}
                  </p>

                  {step.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  )}
                  {step.status === 'active' && (
                    <Clock className="w-4 h-4 text-blue-500 animate-pulse mt-1" />
                  )}

                  {step.timestamp && (
                    <span className="text-xs text-gray-500 mt-1">
                      Completed: {formatDate(step.timestamp)}
                    </span>
                  )}
                  {step.estimatedCompletion && !step.timestamp && (
                    <span className="text-xs text-gray-500 mt-1">
                      Est. completion: {formatDate(step.estimatedCompletion)}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProgress;
