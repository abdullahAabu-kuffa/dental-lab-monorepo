// WorkflowGrid.tsx
import { memo } from 'react';
import WorkflowCard from '../../../atoms/WorkflowCard/WorkflowCard';
import type { WorkflowStep } from '../../../../types/components';
import { getIcon } from '../../../../utils/iconMap';

interface WorkflowGridProps {
  steps: WorkflowStep[];
}

const WorkflowGrid = memo(function WorkflowGrid({ steps }: WorkflowGridProps) {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Icons row */}
      <div className="relative grid md:grid-cols-4 gap-6 mb-8">
        {/* Icons positioned above line with hover effects */}
        {steps.map((step, index) => (
          <div key={step.id} className="relative z-10 flex justify-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8960A] rounded-full flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110">
              {(() => {
                const IconComponent = getIcon(step.icon);
                return <IconComponent className="text-white transition-transform duration-300 group-hover:rotate-12" />;
              })()}
            </div>
          </div>
        ))}
      </div>
      
      {/* Thinner golden connection line from edges */}
      <div className="hidden md:block absolute top-8 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      
      {/* Cards row */}
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <WorkflowCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
});

export default WorkflowGrid;
export type { WorkflowGridProps };