'use client';
import { motion } from 'framer-motion';
import { typography } from '../../../../design-system';

interface HeroHeadingProps {
  primaryText: string;
  gradientText: string;
  gradientColors: string;
  textColor?: string;
  className?: string;
}

export default function HeroHeading({
  primaryText,
  gradientText,
  gradientColors,
  textColor = '#ffffff',
  className = ''
}: HeroHeadingProps) {
  return (
    <motion.h1
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center ${className}`}
      style={{ fontFamily: 'Playfair Display, serif' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <span style={{ color: textColor }}>{primaryText}</span>
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage: gradientColors,
        }}
      >
        {gradientText}
      </span>
    </motion.h1>
  );
}