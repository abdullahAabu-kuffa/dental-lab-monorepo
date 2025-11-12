'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';

interface NavbarBackgroundProps {
  scrolled: boolean;
}

const NavbarBackground = memo(function NavbarBackground({ scrolled }: NavbarBackgroundProps) {
  return (
    <motion.div
      className={`absolute inset-0 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
});

export default NavbarBackground;