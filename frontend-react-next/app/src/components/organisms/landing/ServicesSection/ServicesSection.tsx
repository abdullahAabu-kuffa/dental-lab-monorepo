import React from 'react';
import { Crown, Zap, Smile, Microscope } from 'lucide-react';
import HeroHeading from '../../../molecules/HeroSectionMolecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSectionMolecules/HeroSubtitle/HeroSubtitle';
import { SERVICES } from '../../../../config/services.data';

// Icon mapping
const iconMap = {
  Crown,
  Zap,
  Smile,
  Microscope
};

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <HeroHeading
            primaryText="Our "
            gradientText="Services"
            gradientColors="linear-gradient(to right, #E4B441, #C9A961, #B8960A)"
          />
          <HeroSubtitle
            text="Premium dental restorations crafted with precision and care"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className="group bg-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <div className="w-12 h-12 mb-6 text-yellow-600 group-hover:scale-110 transition">
                  <IconComponent className="w-full h-full" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;