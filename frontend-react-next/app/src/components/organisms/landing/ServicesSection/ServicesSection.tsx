'use client';

import React from 'react';
import { SERVICES } from '../../../../config/services.data';
import ServiceIcon from '../../../molecules/ServiceIcon/ServiceIcon';

export default function ServicesSection() {
  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h1  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8941F] to-[#D4AF37] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Services
          </h1>
          <p className="text-xl text-black leading-relaxed font-sans">
            Premium dental restorations crafted with precision and care
          </p>
        </div>
        
        {/* Services Grid - 4 cards in one row */}
        <div className="grid grid-cols-4 gap-8">
          {SERVICES.map((service) => {
            return (
              <div
                key={service.id}
                className="bg-[#E8E8E8] rounded-2xl p-10 hover:shadow-xl hover:scale-105 hover:border-[#B8941F] transition-all duration-300 border-2 border-[#D4AF37] cursor-pointer"
              >
                {/* Icon - Using ServiceIcon component */}
                <ServiceIcon iconName={service.icon.name} className="mb-6" />
                
                {/* Title */}
                <h3 className="text-xl font-bold text-black text-center mb-3 font-sans">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#4A4A4A] text-sm leading-relaxed text-center font-sans">
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