'use client';

import HeroLogo from '../../../components/molecules/HeroLogo/HeroLogo';
import HeroCTAButtons from '../../../components/molecules/HeroCTAButtons/HeroCTAButtons';
import ScrollIndicator from '../../atoms/ScrollIndicator/ScrollIndicator';
import MedicalBackground from '../../atoms/MedicalBackground/MedicalBackground';

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Egypt's First{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4E4A6]">
                Digital Dental Lab
              </span>
            </h1>
            <p className="text-[#B8B8B8] text-xl sm:text-2xl max-w-3xl mx-auto mb-6 font-light leading-relaxed">
              Revolutionizing dental restoration with{' '}
              <span className="text-[#E4B441] font-bold">ExoCAD</span> integration,
              real-time tracking, and instant online payments
            </p>
            
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