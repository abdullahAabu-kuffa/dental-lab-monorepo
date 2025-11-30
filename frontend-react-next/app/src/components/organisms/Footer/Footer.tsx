import React from 'react';
import Image from 'next/image';
import { QUICK_LINKS, SERVICES_LINKS, CONTACT_INFO } from '../../../config/LandingData/contact.data';
import { getIcon } from '../../../utils/UnifiedIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1C1C] text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="mb-2 relative h-10 w-36">
              <Image src="/navbarG.svg" alt="Avanté Logo" fill className="object-contain" />
            </div>
            <p className="text-sm leading-relaxed text-gray-300 mt-2">
              Egypt&apos;s first fully digital dental laboratory, revolutionizing dental restoration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold text-base mb-2 text-[#D4AF37] pb-2 border-b-2 border-[#D4AF37] inline-block">
              Quick Links
            </h4>
            <ul className="space-y-1.5 mt-2">
              {QUICK_LINKS.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold text-base mb-2 text-[#D4AF37] pb-2 border-b-2 border-[#D4AF37] inline-block">
              Services
            </h4>
            <ul className="space-y-1.5 mt-2">
              {SERVICES_LINKS.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold text-base mb-2 text-[#D4AF37] pb-2 border-b-2 border-[#D4AF37] inline-block">
              Contact Us
            </h4>
            <div className="space-y-2 mt-2 flex flex-col items-center sm:items-start">
              {CONTACT_INFO.map((contact, index) => {
                const IconComponent = getIcon(contact.icon);
                return (
                  <div key={index} className="flex items-center gap-2.5">
                    <IconComponent className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-300">{contact.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-4">
          <p className="text-center text-sm text-gray-400">
            &copy; 2024 Avanté Dental Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
