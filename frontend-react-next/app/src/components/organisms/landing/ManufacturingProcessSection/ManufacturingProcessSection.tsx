'use client';
import { useState } from 'react';
import ProcessStep from '../../../atoms/ProcessStep/ProcessStep';
import { HeroHeading, HeroSubtitle, componentStyles, gradients } from '../../../../../design-system';
import ScrollAnimation from '../../../../../design-system/components/ScrollAnimation';
import { USER_PROCESS_STEPS } from '../../../../config/UserData/orderDataService';

export default function ManufacturingProcessSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackCase = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.href = '/track-case';
  };

  return (
    <section className={`${componentStyles.layout.spacingSection} bg-gradient-to-br from-gray-50 via-white to-gray-100`}>
      <div className={`${componentStyles.layout.containerDefault} text-center`}>

        {/* Header */}
        <ScrollAnimation animation="fadeInFromLeft" className="mb-16 space-y-6">
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
        <ScrollAnimation animation="fadeInFromBottom" delay={0.2} className="relative mb-16 px-4">

          {/*
              FIRST ROW (2 STEPS)
         */}
          <div className="relative w-fit mx-auto mb-12">

            {/* Steps */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10 mt-6">
              {USER_PROCESS_STEPS.slice(0, 3).map((step, index) => (
                <ScrollAnimation 
                  key={step.id} 
                  animation="scaleAndFadeIn"
                  delay={0.3 + (index * 0.1)}
                  className="flex flex-col items-center"
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

            {/* First row line - behind icons */}
            <div 
              className="absolute top-[45px] left-0 right-0 h-[3px] rounded-full opacity-30 z-0" 
              style={{ backgroundImage: gradients.gold }}
            />
          </div>

          {/*
              SECOND ROW (7 STEPS)
       */}
          <div className="relative w-fit mx-auto">

            {/* Steps */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-3 relative z-10 mt-5">
              {USER_PROCESS_STEPS.slice(3).map((step, index) => (
                <ScrollAnimation 
                  key={step.id} 
                  animation="scaleAndFadeIn"
                  delay={0.5 + (index * 0.1)}
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

            {/* Second row line - behind icons */}
            <div 
              className="absolute top-[55px] left-0 right-0 h-[3px] rounded-full opacity-40 z-0" 
              style={{ backgroundImage: gradients.gold }}
            />
          </div>

        </ScrollAnimation>

      </div>
    </section>
  );
}
