'use client';

import React from 'react';
import { SERVICES } from '../../../../config/LandingData/services.data';
import ServiceIcon from '../../../molecules/ServiceIcon/ServiceIcon';
import { HeroHeading ,HeroSubtitle } from '../../../../../design-system';

export default function ServicesSection() {
  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <HeroHeading
            primaryText=""
            gradientText="Our Services"
            variant="black"
          />
          <HeroSubtitle
            text="Premium dental restorations crafted with precision and care"
            variant="black"
          />
        </div>

        {/* Services Grid - 4 cards in one row */}
        <div className="grid grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            return (
              <div
                key={service.id}
                className="relative bg-[#E8E8E8] rounded-2xl p-10 hover:shadow-xl hover:scale-105 hover:border-[#D4AF37] transition-all duration-300 border-2 border-[#D4AF37] cursor-pointer overflow-hidden group"
              >
                {/* Golden Glow Effect - shows on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E4B441]/20 via-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon - Using ServiceIcon component */}
                <ServiceIcon iconName={service.icon.name} className="mb-6 relative z-10" />

                {/* Title */}
                <h3 className="text-xl font-bold text-black text-center mb-3 font-sans relative z-10">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#4A4A4A] text-sm leading-relaxed text-center font-sans relative z-10">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}