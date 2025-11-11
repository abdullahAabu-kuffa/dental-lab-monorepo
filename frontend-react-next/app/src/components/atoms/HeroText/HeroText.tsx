'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { gradients } from '../../../../design-system/gradients';

interface HeroTextProps {
  text: string;
  gradientText?: string;
  className?: string;
  style?: React.CSSProperties;
  isGradient?: boolean;
  delay?: number;
}

const HeroText: React.FC<HeroTextProps> = ({
  text,
  gradientText,
  className = '',
  style,
  isGradient = false,
  delay = 0
}) => {
  const textParts = gradientText 
    ? text.split(gradientText)
    : [text];
  
  const renderText = () => {
    if (isGradient && gradientText) {
      return (
        <>
          {textParts[0]}
          <span 
            style={{ 
              background: gradients.goldText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {gradientText}
          </span>
          {textParts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <motion.p
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      {renderText()}
    </motion.p>
  );
};

export default HeroText;