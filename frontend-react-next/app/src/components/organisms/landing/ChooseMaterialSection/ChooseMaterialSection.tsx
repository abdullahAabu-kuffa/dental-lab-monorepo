'use client';
import React from 'react';
import Button from '../../../atoms/Button/Button';
import HeroHeading from '../../../molecules/HeroSectionMolecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSectionMolecules/HeroSubtitle/HeroSubtitle';

const ChooseMaterialSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content - Left */}
          <div className="text-left">
            <HeroHeading
              primaryText="Choose Your Material & "
              gradientText="Track Your Order Online"
              gradientColors="linear-gradient(to right, #8B4513, #D2691E, #A0522D)"
              textColor="#374151"
            />
            
            <HeroSubtitle
              text="Upload your ExoCAD file, select your preferred material, shade, and design options – and our lab will start manufacturing instantly. You can follow your order's progress online, step by step."
              textColor="text-gray-700 text-xl max-w-2xl lg:mx-0 mb-6 leading-relaxed"
            />

            <div className="flex flex-wrap gap-4">
              <Button variant="beigeSolid" onClick={() => window.location.href = '/get-started'}>
                Get Started
              </Button>
              <Button variant="beigeOutline" onClick={() => window.location.href = '/track-order'}>
                Track Order
              </Button>
            </div>
          </div>

          {/* Image - Right */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div className="rounded-2xl overflow-hidden drop-shadow-lg">
                <img
                  src="/2920348.png"
                  alt="Dental Material Selection & Order Tracking"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChooseMaterialSection;
