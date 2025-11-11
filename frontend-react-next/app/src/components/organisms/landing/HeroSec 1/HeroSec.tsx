'use client';

import HeroLogo from '../../../molecules/HeroSectionMolecules/HeroLogo/HeroLogo';
import HeroHeading from '../../../molecules/HeroSectionMolecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSectionMolecules/HeroSubtitle/HeroSubtitle';
import HeroCTAButtons from '../../../molecules/HeroSectionMolecules/HeroCTAButtons/HeroCTAButtons';
import ScrollIndicator from '../../../atoms/ScrollIndicator/ScrollIndicator';
import MedicalBackground from '../../../atoms/MedicalBackground/MedicalBackground';

export default function HeroSec() {
  return (
    <section
      className="relative min-h-screen flex items-start justify-center pt-24 pb-10 overflow-hidden"
    >
      <MedicalBackground />
             
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-start gap-4 mb-4">
          
          <HeroLogo
            src="/logo2.svg"
            alt="Dental Lab"
            width={300}
            height={300}
            className="h-20 sm:h-32 md:h-40 w-auto"
            delay={0}
          />

          <div className="flex flex-col items-center justify-center max-w-3xl text-center">
            
            <HeroHeading 
              primaryText="Egypt's First"
              gradientText="Digital Dental Lab"
              gradientColors="linear-gradient(to right, #FFD700, #E4B441, #C39321)"
            />

        
            <HeroSubtitle
              text="Revolutionizing dental restoration with"
              highlightText="ExoCAD"
              highlightColor="#E4B441"
              delay={0.5}
            />

            <HeroCTAButtons />
          </div>
        </div>
      </div>


      <ScrollIndicator />
    </section>
  );
}
