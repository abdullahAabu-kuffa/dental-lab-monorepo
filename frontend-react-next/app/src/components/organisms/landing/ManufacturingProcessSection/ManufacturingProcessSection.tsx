'use client';
import ProcessStep from '../../../atoms/ProcessStep/ProcessStep';
import Button from '../../../atoms/Button/Button';
import { HeroHeading , HeroSubtitle, componentStyles, gradients  } from '../../../../../design-system';
import { USER_PROCESS_STEPS } from '../../../../config/UserData/UserProcessSteps';

export default function ManufacturingProcessSection() {
  return (
    <section className={`${componentStyles.layout.spacingSection} bg-gradient-to-br from-gray-50 via-white to-gray-100`}>
      <div className={`${componentStyles.layout.containerDefault} text-center`}>

        {/* Header */}
        <div className="mb-16 space-y-6">
          <HeroHeading
            primaryText="Digital "
            gradientText="Manufacturing Process"
            variant="black"
          />

          <HeroSubtitle
            text="Follow your dental case from upload to delivery — every stage, visible in real-time."
            variant="black"
          />
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
          {/* Horizontal Line */}
          <div
            className="absolute top-8 left-0 right-0 h-[3px] opacity-30"
            style={{ backgroundImage: gradients.gold }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 relative z-10">
            {USER_PROCESS_STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <ProcessStep step={{
                  id: step.id.toString(),
                  title: step.title,
                  icon: step.icon,
                  status: step.completed ? 'completed' : 'pending'
                }} />
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