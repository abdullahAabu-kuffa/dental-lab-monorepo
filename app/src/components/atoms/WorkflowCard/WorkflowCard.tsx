import { memo } from 'react';
import type { WorkflowStep } from '../../../types/components';
import { typography } from '../../../../design-system/typography';

interface WorkflowCardProps {
  step: WorkflowStep;
}

const WorkflowCard = memo(function WorkflowCard({ step }: WorkflowCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 group text-center">
      <h3 className={typography.cardTitle}>
        {step.title}
      </h3>
      
      <p className={typography.cardDescription}>
        {step.description}
      </p>
    </div>
  );
});

export default WorkflowCard;
export type { WorkflowCardProps };