'use client';
import { useState } from 'react';
import ProcessStep from '../../../atoms/ProcessStep/ProcessStep';
import Button from '../../../atoms/Button/Button';
import { HeroHeading, HeroSubtitle, componentStyles, gradients } from '../../../../../design-system';
import ScrollAnimation from '../../../../../design-system/components/ScrollAnimation';
import { USER_PROCESS_STEPS } from '../../../../config/UserData/orderDataService';

export default function ManufacturingProcessSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackCase = async () => {
    setIsLoading(true);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to tracking page
    window.location.href = '/track-case';
  };

  return (
    <section className={`${componentStyles.layout.spacingSection} bg-gradient-to-br from-gray-50 via-white to-gray-100`}>
      <div className={`${componentStyles.layout.containerDefault} text-center`}>

        {/* Header */}
        <ScrollAnimation
          animation="fadeInFromLeft"
          className="mb-16 space-y-6"
        >
          <HeroHeading
            primaryText="Digital "
            gradientText="Manufacturing Process"
            variant="black"
          />

          <HeroSubtitle
            text="Follow your dental case from upload to delivery — every stage, visible in real-time."
            variant="black"
          />
        </ScrollAnimation>

        {/* Timeline */}
        <ScrollAnimation
          animation="fadeInFromBottom"
          delay={0.2}
          className="relative mb-16 px-4"
        >
          {/* Horizontal Line */}
          <div
            className="absolute top-8 left-8 right-8 h-[3px] opacity-30 rounded-full"
            style={{ backgroundImage: gradients.gold }}
          />

          {/* Grid of steps */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 md:gap-6 relative z-10 max-w-6xl mx-auto">
            {USER_PROCESS_STEPS.map((step, index) => (
              <ScrollAnimation 
                key={step.id} 
                animation="scaleAndFadeIn"
                delay={0.3 + (index * 0.1)}
                className="flex flex-col items-center min-w-0"
              >
                <ProcessStep step={{
                  id: step.id.toString(),
                  title: step.title,
                  icon: step.icon,
                  status: step.completed ? 'completed' : 'pending'
                }} />
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Description */}
        <ScrollAnimation
          animation="fadeInUp"
          delay={0.4}
          className="mb-12"
        >
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            All updates appear live in your client dashboard — giving you full transparency and control over your cases.
          </p>
        </ScrollAnimation>

        {/* CTA Button */}
        <ScrollAnimation
          animation="fadeInFromBottom"
          delay={0.6}
          className="text-center"
        >
          <Button
            variant="primary"
            onClick={handleTrackCase}
            disabled={isLoading}
            className="min-w-[160px]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              'Track My Case'
            )}
          </Button>
        </ScrollAnimation>
      </div>
    </section>
  );
}
