'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '../../molecules/Logo/Logo';
import NavLink from '../../molecules/NavLink/NavLink';
import Button from '../../atoms/Button/Button';
import MobileMenu from '../../molecules/MobileMenu/MobileMenu';
import { NAV_ITEMS } from '../../../config/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="sticky top-0 z-50 relative"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Glassmorphism Background */}
      <motion.div
        className="absolute inset-0 backdrop-blur-xl bg-white/80 border-b border-white/20"
        animate={{
          backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
          backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.8)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink href={item.href} icon={item.icon}>
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop Buttons */}
          <motion.div 
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline">Login</Button>
            <Button variant="solid">Get Started</Button>
          </motion.div>
          
          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
      
      {/* Underline */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a07916] via-[#E4B441] to-[#a07916] shadow-[0_0_10px_#E4B44180]" />
    </motion.nav>
  );
}