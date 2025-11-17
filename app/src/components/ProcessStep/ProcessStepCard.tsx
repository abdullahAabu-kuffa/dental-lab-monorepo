import React from 'react';
import { ProcessStep } from '@/app/src/types';
import {
  getStatusColor,
  getStatusBadgeColor,
  getStatusTextColor
} from '@/app/src/utils/processHelpers';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProcessStepCardProps {
  step: ProcessStep;
  isLast?: boolean;
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ 
  step, 
  isLast = false 
}) => {
  const IconComponent = step.icon;

  return (
    <div className="flex items-start max-w-80">
      <div className="flex flex-col items-center">
        {/* Main Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: step.id.charCodeAt(0) * 0.1, duration: 0.5 }}
          className={`
            w-16 h-16 
            rounded-full 
            ${getStatusColor(step.status)}
            flex items-center justify-center
            shadow-lg
            relative
          `}
        >
          <IconComponent 
            className="w-8 h-8 text-white" 
            strokeWidth={2}
          />
          
          {/* Check mark for completed */}
          {step.status === 'completed' && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
          )}
        </motion.div>

        {/* Connection line */}
        {!isLast && (
          <div className="w-0.5 h-16 bg-gray-300 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="ml-4 flex-1">
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
          {/* Title and Status Badge */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight">
              {step.title}
            </h3>
            {step.statusLabel && (
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${getStatusBadgeColor(step.status)}
              `}>
                {step.statusLabel}
              </span>
            )}
          </div>

          {/* Description */}
          {step.description && (
            <p className="text-xs text-gray-600 mb-2">
              {step.description}
            </p>
          )}

          {/* Completion/Start Date */}
          {(step.completedOn || step.startedOn) && (
            <div className="mb-2">
              <span className="text-xs text-gray-500">
                {step.completedOn ? 'Completed:' : 'Started:'} 
              </span>
              <span className={`text-xs font-medium ml-1 ${getStatusTextColor(step.status)}`}>
                {step.completedOn || step.startedOn}
              </span>
            </div>
          )}

          {/* Additional Info */}
          {step.additionalInfo && (
            <div className="bg-gray-50 rounded p-2 mt-2">
              <span className="text-xs text-gray-600">
                {step.additionalInfo}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};