import { memo } from 'react';
import ProcessStep from '../../atoms/ProcessStep/ProcessStep';
import { MANUFACTURING_STEPS } from '../../../config/manufacturing-process.data';

interface ManufacturingProcessSectionProps {
  className?: string;
}

const ManufacturingProcessSection = memo(function ManufacturingProcessSection({ className = "" }: ManufacturingProcessSectionProps) {
  return (
    <section className={`py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            Digital <span style={{ color: '#C9A961' }}>Manufacturing Process</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-inter">
            Experience our state-of-the-art digital manufacturing workflow, from file upload to final delivery
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          {/* All screens - Horizontal layout with continuous line */}
          <div className="flex justify-center">
            <div className="relative flex items-center gap-8 lg:gap-12 overflow-x-auto pb-4 px-4">
              {/* Continuous line through all steps */}
              <div className="hidden sm:block absolute top-10 left-8 right-8 h-[2px] bg-[#C9A961] z-0"></div>
              
              {MANUFACTURING_STEPS.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative flex-shrink-0 z-10">
                  <ProcessStep step={step} isLast={index === MANUFACTURING_STEPS.length - 1} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm max-w-3xl mx-auto font-inter">
            Our digital manufacturing process ensures precision, quality, and speed at every step. 
            From initial file upload to final delivery, each stage is carefully monitored to deliver 
            exceptional dental restorations that meet the highest professional standards.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            className="px-8 py-4 bg-[#C9A961] text-white font-semibold rounded-lg font-inter hover:bg-[#B8960A] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Track My Case
          </button>
        </div>
      </div>
    </section>
  );
});

export default ManufacturingProcessSection;
export type { ManufacturingProcessSectionProps };