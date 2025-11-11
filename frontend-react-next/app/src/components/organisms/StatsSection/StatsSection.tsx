import React from 'react';
import { StatsSectionProps } from '../../../types/components';
import StatCard from '../../atoms/StatCard/StatCard';
import { STATS } from '../../../config/stats.data';
import { typography } from '../../../../design-system/typography';

const StatsSection: React.FC<StatsSectionProps> = ({ 
  title = "Our Achievements",
  subtitle = "Numbers that reflect our dedication and success in digital dentistry.",
  stats = STATS 
}) => {
  return (
    <section className="py-24 bg-[#1C1C1C] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`${typography.hero} mb-4 text-white`}>
            {title}
          </h2>
          <p className={`${typography.subtitle} text-gray-400 max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className={`${typography.badge} mb-6 text-white`}>
            Ready to Go Digital?
          </h3>
          <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#CABEB2] text-white font-bold rounded-lg hover:from-[#CABEB2] hover:to-[#D4AF37] transition-all duration-300 font-inter shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Your Digital Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;