"use client";

import { motion } from 'framer-motion';

interface HeroSubtitleProps {
  text: string;
  highlightText?: string;
  highlightColor?: string;      
  variant?: 'white' | 'black';
  className?: string;
  delay?: number;
}

const textVariants = {
  white: {
    color: '#FFFFFF',
    highlightColor: '#E4B441'
  },
  black: {
    color: '#000000',
    highlightColor: '#D4AF37'
  }
};

/**
 * Hero subtitle component with white and black variants
 * Uses Playfair Display font as default to match website branding
 */
export const HeroSubtitle: React.FC<HeroSubtitleProps> = ({
  text,
  highlightText = "ExoCAD",
  variant = 'white',
  className = '',
  delay = 0.5,
}) => {
  const colors = textVariants[variant];
  const parts = text.split(highlightText);

  return (
    <motion.p 
      className={`text-center max-w-2xl mx-auto mb-6 leading-relaxed ${className}`}
      style={{ 
        color: colors.color, 
        fontSize: '1.375rem',
        fontFamily: 'Playfair Display, serif'
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="font-bold" style={{ color: colors.highlightColor }}>
              {highlightText}
            </span>
          )}
        </span>
      ))}
    </motion.p>
  );
};

export default HeroSubtitle;