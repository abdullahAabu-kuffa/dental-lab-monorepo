import React from 'react';
import { STATS } from '../../../config/stats.data';
import { typography } from '../../../../design-system/typography';

const StatsAndCTASection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 text-gray-900">
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-16">
          <h2 className={`${typography.hero} mb-4 text-gray-900`}>
            Our Achievements
          </h2>
          <p className={`${typography.subtitle} text-gray-600 max-w-2xl mx-auto`}>
            Numbers that reflect our dedication and success in digital dentistry.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl py-8 border border-gray-200 hover:border-[#D4AF37]/40 transition shadow-lg">
              <div className="text-5xl font-bold mb-3 text-[#D4AF37]">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`${typography.hero} mb-6 text-gray-900`}>
          Ready to Go Digital?
        </h2>
        <p className={`${typography.subtitle} mb-10 text-gray-600`}>
          Join the future of dental restoration. Start your first case today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-10 py-4 bg-[#D4AF37] text-white rounded-lg hover:bg-[#CABEB2] transition font-bold shadow-2xl transform hover:scale-105 flex items-center gap-2">
            <i className="fas fa-rocket"></i>
            Create Account
          </button>
          <button className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-white transition font-bold flex items-center gap-2">
            <i className="fas fa-phone"></i>
            Schedule a Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsAndCTASection;