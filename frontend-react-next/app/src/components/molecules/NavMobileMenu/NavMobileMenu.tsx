"use client";

import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { NAVBAR_CONFIG } from '../../../config/LandingData/navigation';

interface NavMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavMobileMenu: React.FC<NavMobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen
          ? 'max-h-96 opacity-100'
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}
    >
      <div className="px-4 pt-2 pb-6 space-y-3 bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A] border-t border-[#E4B441]/20">
        {/* Navigation Links */}
        {NAVBAR_CONFIG.links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="block px-4 py-3 rounded-lg text-[#CABEB2] hover:text-white hover:bg-[#2A2A2A] font-semibold transition-all duration-200"
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
        
        {/* Auth Buttons Section */}
        <div className="pt-3 border-t border-[#E4B441]/20 space-y-2">
          <Link
            href={NAVBAR_CONFIG.authButtons.login.href}
            className="block w-full px-4 py-3 rounded-lg border border-[#E4B441] text-[#E4B441] font-semibold text-sm transition-all duration-200 hover:bg-[#E4B441] hover:text-white text-center"
            onClick={onClose}
          >
            {NAVBAR_CONFIG.authButtons.login.text}
          </Link>
          <Link
            href={NAVBAR_CONFIG.authButtons.register.href}
            className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white font-bold text-sm transition-all duration-200 hover:from-[#FFD700] hover:to-[#E4B441] shadow-lg text-center"
            onClick={onClose}
          >
            {NAVBAR_CONFIG.authButtons.register.text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavMobileMenu;