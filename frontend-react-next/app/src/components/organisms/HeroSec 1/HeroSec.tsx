'use client';

import HeroLogo from '../../molecules/HeroLogo/HeroLogo';
import HeroHeading from '../../molecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../molecules/HeroSubtitle/HeroSubtitle';
import HeroCTAButtons from '../../molecules/HeroCTAButtons/HeroCTAButtons';
import ScrollIndicator from '../../atoms/ScrollIndicator/ScrollIndicator';
import MedicalBackground from '../../atoms/MedicalBackground/MedicalBackground';
import { gradients } from '../../../../design-system/variables';

export default function HeroSec() {
  return (
    <section 
      className="relative min-h-screen flex items-start justify-center pt-24 pb-10 overflow-hidden"
      style={{ background: gradients.darkBg }}
    >
      {/* Medical Background Effects */}
      <MedicalBackground />
          
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-start gap-4 mb-4">

          {/* Logo */}
          <HeroLogo 
            src="/logo2.svg"
            alt="Dental Lab"
            width={300}
            height={300}
            className="h-20 sm:h-32 md:h-40 w-auto"
            delay={0}
          />

          {/* Texts */}
          <div className="flex flex-col items-center justify-center max-w-3xl text-center">
            <HeroHeading />
            <HeroSubtitle />
            {/* Highlight Badge */}
            <HeroCTAButtons />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
