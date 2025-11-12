'use client';
import React from 'react';
import StatCard from '../../../atoms/StatCard/StatCard';
import Button from '../../../atoms/Button/Button';
import HeroHeading from '../../../molecules/HeroHeading/HeroHeading';

import { STATS } from '../../../../config/stats.data';


const StatsSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <HeroHeading
            primaryText="Our "
            gradientText="Achievements"
            gradientColors="linear-gradient(to right, #FFD700, #E4B441, #C39321)"
          />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Numbers that reflect our dedication and success in digital dentistry.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center mb-16">
          {STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-white text-2xl font-semibold mb-6">
            Ready to Go Digital?
          </p>
          <Button variant="primary" onClick={() => window.location.href = '/dashboard'}>
            Start Your Digital Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;