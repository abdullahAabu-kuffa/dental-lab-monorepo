"use client";

import { motion } from 'framer-motion';

interface HeroHeadingProps {
  primaryText: string;
  gradientText: string;
  variant?: 'white' | 'black';
  className?: string;
  delay?: number;
}

const headingVariants = {
  white: {
    primaryColor: '#FFFFFF',
    gradientColors: 'linear-gradient(to right, #D4AF37, #F4E4A6)'
  },
  black: {
    primaryColor: '#000000',
    gradientColors: 'linear-gradient(to right, #D4AF37, #C39321)'
  }
};

/**
 * Hero heading component with white and black variants
 * Uses Playfair Display font to match website branding
 */
export const HeroHeading: React.FC<HeroHeadingProps> = ({
  primaryText,
  gradientText,
  variant = 'white',
  className = '',
  delay = 0,
}) => {
  const colors = headingVariants[variant];

  return (
    <motion.h1
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center ${className}`}
      style={{ 
        fontFamily: 'Playfair Display, serif',
        color: colors.primaryColor
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      {primaryText}
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage: colors.gradientColors,
        }}
      >
        {gradientText}
      </span>
    </motion.h1>
  );
};

export default HeroHeading;