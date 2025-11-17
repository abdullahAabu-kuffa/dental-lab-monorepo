'use client';
import React from 'react';
import Link from 'next/link';
import { Smile, CheckCircle } from 'lucide-react';
import StatCard from '../../../atoms/StatCard/StatCard';
import Button from '../../../atoms/Button/Button';
import { HeroHeading } from '../../../../../design-system';
import { HeroSubtitle } from '../../../../../design-system';
import DentalBackground from '../../../atoms/MedicalBackground/MedicalBackgroundLight';

import { STATS } from '../../../../config/LandingData/OurAchievements';


const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Components */}
      <DentalBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <HeroHeading
            primaryText="Our "
            gradientText="Achievements"
            variant="white"
          />
          <HeroSubtitle
            text="Numbers that reflect our dedication and success in digital dentistry."
            variant="white"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center mb-16">
          {STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-white text-2xl font-semibold mb-6 flex items-center justify-center gap-3">
            <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
            Ready to Go Digital?
            <Smile className="w-8 h-8 text-[#D4AF37]" />
          </p>
          <Link href="/dashboard">
            <Button variant="primary">
              Start Your Digital Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;