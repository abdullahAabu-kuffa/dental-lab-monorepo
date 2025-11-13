import { memo } from 'react';
import WorkflowCard from '../../atoms/WorkflowCard/WorkflowCard';
import type { WorkflowStep } from '../../../types/components';
import { getIcon } from '../../../utils/iconMap';
import { componentStyles} from '../../../../design-system';

interface WorkflowGridProps {
  steps: WorkflowStep[];
}
const WorkflowGrid = memo(function WorkflowGrid({ steps }: WorkflowGridProps) {
  return (
    <div className={`${componentStyles.layout.relative} max-w-5xl mx-auto px-4`}>
      {/* Icons Row */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {steps.map((step, index) => {
          const IconComponent = getIcon(step.icon);
          
          return (
            <div key={step.id} className={`${componentStyles.layout.relative} z-10 flex justify-center group`}>
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                style={{
                  backgroundImage: 'linear-gradient(to right, #FFD700, #E4B441, #C39321)'
                }}
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                <IconComponent
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform duration-300 group-hover:rotate-12"
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Connection Line */}
      <div
        className="hidden md:block absolute top-7 sm:top-8 left-8 right-8 h-[1px] opacity-60"
        style={{ backgroundImage: 'linear-gradient(to right, #FFD700, #E4B441, #C39321)' }}
      />
      {/* Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <WorkflowCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
});

WorkflowGrid.displayName = 'WorkflowGrid';

export default WorkflowGrid;
export type { WorkflowGridProps };