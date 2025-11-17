import React from 'react';
import { ProcessStep } from '@/app/src/types';
import { getStatusColor } from '@/app/src/utils/processHelpers';
import { motion } from 'framer-motion';

interface ProcessStepIconProps {
  step: ProcessStep;
  size?: 'sm' | 'md' | 'lg';
}

export const ProcessStepIcon: React.FC<ProcessStepIconProps> = ({
  step,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const IconComponent = step.icon;

  return (
    <div className="flex flex-col items-center max-w-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: step.id.charCodeAt(0) * 0.1, duration: 0.5 }}
        className={`
          ${sizeClasses[size]}
          rounded-full
          ${getStatusColor(step.status)}
          flex items-center justify-center
          shadow-lg
          transition-all duration-200
          hover:scale-105
        `}
      >
        <IconComponent
          className={`${iconSizeClasses[size]} text-white`}
          strokeWidth={2}
        />
      </motion.div>
      
      <span className="text-sm font-medium text-gray-700 mt-3 text-center leading-tight">
        {step.title}
      </span>
    </div>
  );
};