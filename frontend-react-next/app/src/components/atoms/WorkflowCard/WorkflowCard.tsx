import { memo } from 'react';
import type { WorkflowStep } from '../../../types/components';

interface WorkflowCardProps {
  step: WorkflowStep;
}

const WorkflowCard = memo(function WorkflowCard({ step }: WorkflowCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 group text-center">
      <h3 className="text-xl font-bold mb-3 font-inter">
        {step.title}
      </h3>
      
      <p className="text-gray-400 text-sm font-inter">
        {step.description}
      </p>
    </div>
  );
});

export default WorkflowCard;
export type { WorkflowCardProps };