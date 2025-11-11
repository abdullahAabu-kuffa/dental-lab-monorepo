import React from 'react';
import { CTASectionProps } from '../../../types/components';

const CTASection: React.FC<CTASectionProps> = ({ 
  title = "Ready to Go Digital?",
  subtitle = "Join the future of dental restoration. Start your first case today.",
  primaryButtonText = "Create Account",
  secondaryButtonText = "Schedule a Call"
}) => {
  return (
    <section className="py-24 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-display font-bold mb-6 text-gray-900">
          {title}
        </h2>
        <p className="text-xl mb-10 text-gray-600">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-10 py-4 bg-[#D4AF37] text-white rounded-lg hover:bg-[#CABEB2] transition font-bold shadow-2xl transform hover:scale-105 flex items-center gap-2">
            <i className="fas fa-rocket"></i>
            {primaryButtonText}
          </button>
          <button className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-white transition font-bold flex items-center gap-2">
            <i className="fas fa-phone"></i>
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
