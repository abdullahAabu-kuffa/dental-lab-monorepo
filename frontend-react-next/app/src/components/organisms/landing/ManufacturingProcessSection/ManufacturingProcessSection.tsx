'use client';
import ProcessStep from '../../../atoms/ProcessStep/ProcessStep';
import Button from '../../../atoms/Button/Button';
import HeroHeading from '../../../molecules/HeroSectionMolecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSectionMolecules/HeroSubtitle/HeroSubtitle';
import { MANUFACTURING_STEPS } from '../../../../config/manufacturing-process.data';

const ManufacturingProcessSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-[#fafafa] to-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-16">
          <HeroHeading
            primaryText="Digital "
            gradientText="Manufacturing Process"
            gradientColors="linear-gradient(to right, #D4AF37, #CABEB2)"
            textColor="#374151"
          />
          <HeroSubtitle
            text="Follow your dental case from upload to delivery — every stage, visible in real-time."
            textColor="text-gray-600 text-lg max-w-3xl mx-auto"
          />
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
          {/* Horizontal Line */}
          <div className="absolute top-8 left-0 right-0 h-[3px] bg-[#D4AF37]/30"></div>

          <div className="grid grid-cols-8 gap-6 relative z-10">
            {MANUFACTURING_STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <ProcessStep step={step} />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <HeroSubtitle
            text="All updates appear live in your client dashboard — giving you full transparency and control over your cases."
            textColor="text-gray-500 text-sm max-w-2xl mx-auto"
          />
        </div>

        <div className="text-center">
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/track-case'}
            className="mt-8 px-6 py-3 bg-[#D4AF37] text-white font-semibold rounded-full shadow-md hover:bg-[#c09b2f] transition-all border-0"
          >
            Track My Case
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingProcessSection;