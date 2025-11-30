'use client';

import { motion } from 'framer-motion';

interface GoldenGlowProps {
  isActive: boolean;
  intensity?: 'light' | 'medium' | 'strong';
}

export default function GoldenGlow({ isActive, intensity = 'medium' }: GoldenGlowProps) {
  const intensityStyles = {
    light: 'from-[#E4B441]/30 via-[#E4B441]/15',
    medium: 'from-[#E4B441]/50 via-[#E4B441]/25',
    strong: 'from-[#E4B441]/70 via-[#E4B441]/35'
  };

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1.2 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={`absolute inset-0 bg-gradient-radial ${intensityStyles[intensity]} to-transparent blur-xl`}
      />
    </motion.div>
  );
}
