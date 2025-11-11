import { memo } from 'react';
import MedicalBackground from '../../atoms/MedicalBackground/MedicalBackground';
import WorkflowGrid from '../../molecules/WorkflowGrid/WorkflowGrid';
import { WORKFLOW_STEPS } from '../../../config/workflow.data';

interface WorkflowSectionProps {
  title?: string;
  subtitle?: string;
}

const WorkflowSection = memo(function WorkflowSection({
  title = "How It Works",
  subtitle = "A seamless digital workflow from scan to delivery"
}: WorkflowSectionProps) {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A] text-white overflow-hidden">
      {/* Medical Background */}
      <MedicalBackground />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2
            className="text-5xl font-black mb-4 text-center"
            style={{
              fontFamily: "'DM Serif Display', serif",
              background: "linear-gradient(to right, #D4AF37, #CABEB2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            {title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center font-inter">
            {subtitle}
          </p>
        </div>
        
        <WorkflowGrid steps={WORKFLOW_STEPS} />
      </div>
    </section>
  );
});

export default WorkflowSection;
export type { WorkflowSectionProps };