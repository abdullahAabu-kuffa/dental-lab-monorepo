'use client';
import ProcessStep from '../../../atoms/ProcessStep/ProcessStep';
import Button from '../../../atoms/Button/Button';
import { MANUFACTURING_STEPS } from '../../../../config/manufacturing-process.data';
import { componentStyles, gradients } from '../../../../../design-system';

export default function ManufacturingProcessSection() {
  return (
    <section className={`${componentStyles.layout.spacingSection} bg-gradient-to-br from-gray-50 via-white to-gray-100`}>
      <div className={`${componentStyles.layout.containerDefault} text-center`}>
        
        {/* Header */}
        <div className="mb-16 space-y-6">
          <h2 className="text-4xl md:text-6xl font-black leading-tight font-serif text-gray-900">
            Digital <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #D4AF37, #E4B441, #FFD700)' }}>Manufacturing Process</span>
          </h2>
          
          <p className="text-gray-700 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-sans">
            Follow your dental case from upload to delivery — every stage, visible in real-time.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
          {/* Horizontal Line */}
          <div
            className="absolute top-8 left-0 right-0 h-[3px] opacity-30"
            style={{ backgroundImage: gradients.gold }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 relative z-10">
            {MANUFACTURING_STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <ProcessStep step={step} />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            All updates appear live in your client dashboard — giving you full transparency and control over your cases.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => window.location.href = '/track-case'}
          >
            Track My Case
          </Button>
        </div>
      </div>
    </section>
  );
}