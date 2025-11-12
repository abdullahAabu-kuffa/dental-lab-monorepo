'use client';
import React from 'react';
import StatCard from '../../../atoms/StatCard/StatCard';
import Button from '../../../atoms/Button/Button';
import HeroHeading from '../../../molecules/HeroSectionMolecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSectionMolecules/HeroSubtitle/HeroSubtitle';
import { STATS } from '../../../../config/stats.data';
import { typography, componentStyles } from '../../../../../design-system';

const StatsSection: React.FC = () => {
  return (
    <section className={`${componentStyles.background.sectionDark}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <HeroHeading
            primaryText="Our "
            gradientText="Achievements"
            gradientColors="linear-gradient(to right, #FFD700, #E4B441, #C39321)"
          />
          <HeroSubtitle
            text="Numbers that reflect our dedication and success in digital dentistry."
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center mb-16">
          {STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <HeroSubtitle
            text="Ready to Go Digital?"
          />
          <Button variant="primary" onClick={() => window.location.href = '/dashboard'}>
            Start Your Digital Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;