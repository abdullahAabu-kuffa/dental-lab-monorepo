'use client';
import React from 'react';
import Button from '../../../atoms/Button/Button';
import { HeroHeading , HeroSubtitle ,componentStyles } from '../../../../../design-system';
import { CONTACT_INFO } from '../../../../config/LandingData/contact.data';
import { getIcon } from '../../../../utils/UnifiedIcons';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className={`${componentStyles.layout.spacingSection} bg-white`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <HeroHeading
              primaryText=""
              gradientText="Get In Touch"
              variant="black"
            />
            
            <HeroSubtitle
              text="Have questions? We are here to help you transform your dental practice with digital innovation."
              variant="black"
            />
            
            <div className="space-y-6 mt-8">
              {CONTACT_INFO.map((info, index) => {
                const IconComponent = getIcon(info.icon);
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                      <div className="text-[#D4AF37] text-xl">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{info.title}</div>
                      {info.link ? (
                        <a href={info.link} className="text-gray-600 hover:text-[#D4AF37] transition" target="_blank" rel="noopener noreferrer">
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-gray-600">{info.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition"
                  placeholder="Dr. Ahmed Mohamed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition"
                  placeholder="ahmed@clinic.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition"
                  placeholder="+20 123 456 7890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition resize-none"
                  placeholder="Tell us about your needs..."
                ></textarea>
              </div>
              
              <Button
                variant="primary"
                onClick={() => {}}
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
