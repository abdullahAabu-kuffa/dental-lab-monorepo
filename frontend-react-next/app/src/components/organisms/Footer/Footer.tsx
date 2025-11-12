import React from 'react';
import { QUICK_LINKS, SERVICES_LINKS, CONTACT_INFO } from '../../../config/contact.data';
import { getIcon } from '../../../utils/iconMap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1C1C] text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/navbarG.svg" alt="Avanté Logo" className="h-12 w-auto" />
            </div>
            <p className="text-sm leading-relaxed">
              Egypt's first fully digital dental laboratory, revolutionizing dental restoration with technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              {SERVICES_LINKS.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contact Us</h4>
            {CONTACT_INFO.map((contact, index) => {
              const IconComponent = getIcon(contact.icon);
              return (
                <div key={index} className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-4 h-4 text-[#D4AF37]" />
                  {contact.link ? (
                    <a href={contact.link} className="text-sm hover:text-white transition" target="_blank" rel="noopener noreferrer">
                      {contact.value}
                    </a>
                  ) : (
                    <span className="text-sm">{contact.value}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-gray-800 py-6">
          <p className="text-center text-sm">&copy; 2024 Avanté Dental Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;