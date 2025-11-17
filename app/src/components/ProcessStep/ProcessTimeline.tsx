import React from 'react';
import { ProcessStep } from '@/app/src/types';
import { ProcessStepIcon } from './ProcessStepIcon';
import { ProcessStepCard } from './ProcessStepCard';
import { ProgressBar } from './ProgressBar';
import { calculateProgress } from '@/app/src/utils/processHelpers';

interface ProcessTimelineProps {
  steps: ProcessStep[];
  variant?: 'simple' | 'detailed';
  showProgress?: boolean;
  title?: string;
  description?: string;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  steps,
  variant = 'simple',
  showProgress = true,
  title,
  description
}) => {
  const progress = calculateProgress(steps);

  return (
    <div className="space-y-8">
      {(title || description) && (
        <div className="text-center space-y-4">
          {title && (
            <h2 className="text-xl font-bold text-gray-800">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      
      {/* Timeline */}
      <div className={variant === 'simple'
        ? "flex justify-between items-start max-w-5xl mx-auto px-4"
        : "space-y-6"
      }>
        {steps.map((step, index) => (
          variant === 'simple' ? (
            <ProcessStepIcon
              key={step.id}
              step={step}
            />
          ) : (
            <ProcessStepCard
              key={step.id}
              step={step}
              isLast={index === steps.length - 1}
            />
          )
        ))}
      </div>

      {/* Progress Bar */}
      {showProgress && <ProgressBar progress={progress} />}
    </div>
  );
};