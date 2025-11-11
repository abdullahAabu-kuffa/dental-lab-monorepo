import React from 'react';
import { ContactSectionProps } from '../../../types/components';
import { CONTACT_INFO } from '../../../config/contact.data';
import { getIcon } from '../../../utils/iconMap';

const ContactSection: React.FC<ContactSectionProps> = ({ 
  title = "Get In Touch",
  subtitle = "Have questions? We're here to help you transform your dental practice with digital innovation.",
  contactInfo = CONTACT_INFO
}) => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2
              className="text-5xl font-black mb-6 text-gray-900"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {title}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {subtitle}
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
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
              
              <button 
                type="submit" 
                className="w-full py-4 bg-[#D4AF37] text-white rounded-lg hover:bg-[#CABEB2] transition font-bold shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
