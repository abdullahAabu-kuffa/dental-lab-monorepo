'use client';

import { motion } from 'framer-motion';
import { typography } from '../../../../../design-system/typography';

interface HeroSubtitleProps {
  text: string;
  highlightText?: string;
  highlightColor?: string;
  delay?: number;
  textColor?: string;
}

export default function HeroSubtitle({
  text,
  highlightText,
  highlightColor = '#E4B441',
  delay = 0.5,
  textColor,
}: HeroSubtitleProps) {
  return (
    <motion.p
      className={textColor || typography.heroSubtitle}
      style={textColor ? { color: textColor } : {}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      {text}{' '}
      {highlightText && (
        <span
          className="font-bold"
          style={{ color: highlightColor }}
        >
          {highlightText}
        </span>
      )}
    </motion.p>
  );
}
