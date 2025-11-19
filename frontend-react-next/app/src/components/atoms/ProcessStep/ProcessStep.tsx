import { memo } from 'react';
import type { ProcessStep as ProcessStepType } from '../../../types';

interface ProcessStepProps { // Define the props for the ProcessStep component
  step: ProcessStepType;
  isLast?: boolean;
}

const ProcessStep = memo(function ProcessStep({ step, isLast = false }: ProcessStepProps) {
  const IconComponent = step.icon;

  const getStepStyles = () => {
    switch (step.status) {
      case 'completed':
      case 'active':
        return 'bg-[#D4AF37] text-white shadow-lg';
      case 'pending':
        return 'bg-[#D1D5DB] text-gray-600';
      default:
        return 'bg-[#D1D5DB] text-gray-600';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Step Circle */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${getStepStyles()}`}>
        <IconComponent className="w-8 h-8" />
      </div>
      
      {/* Step Label */}
      <h3 className="mt-4 text-sm font-semibold text-gray-800">
        {step.title}
      </h3>
    </div>
  );
});

export default ProcessStep;
export type { ProcessStepProps };