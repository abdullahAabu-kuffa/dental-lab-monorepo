'use client';

import HeroLogo from '../../../../components/molecules/HeroLogo/HeroLogo';
import { HeroHeading, HeroSubtitle } from '../../../../../design-system';
import HeroCTAButtons from '../../../../components/molecules/HeroCTAButtons/HeroCTAButtons';
import ScrollIndicator from '../../../atoms/ScrollIndicator/ScrollIndicator';
import MedicalBackground from '../../../atoms/MedicalBackground/MedicalBackground';

export default function HeroSec() {
  return (
    <section
      className="relative h-[85vh] flex items-center justify-center py-12 overflow-hidden bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A]"
    >
      {/* Medical Background Effects */}
      <MedicalBackground />
            
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5">

          {/* Logo */}
          <HeroLogo
            src="/logo2.svg"
            alt="Dental Lab"
            width={300}
            height={300}
            className="h-20 sm:h-32 md:h-40 w-auto"
            delay={0}
          />

          {/* Main Heading */}
          <div className="text-center">
            <HeroHeading
              primaryText="Egypt's First "
              gradientText="Digital Dental Lab"
              variant="white"
              delay={0.2}
            />
            <HeroSubtitle
              text="Revolutionizing dental restoration with ExoCAD integration, real-time tracking, and instant online payments"
              variant="white"
            />
            
            {/* Premium Badge */}
            <div className="flex items-center justify-center mb-6">
              <span className="text-3xl mr-3">⚡</span>
              <p className="text-[#E4B441] text-base sm:text-lg font-semibold">
                The only lab in Egypt with a fully digital workflow
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <HeroCTAButtons />
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}