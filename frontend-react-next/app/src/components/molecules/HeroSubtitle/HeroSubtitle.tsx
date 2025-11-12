'use client';

import { motion } from 'framer-motion';

interface HeroSubtitleProps {
  text: string;
  highlightText?: string;
  highlightColor?: string;
  delay?: number;
}

export default function HeroSubtitle({
  text,
  highlightText = "ExoCAD",
  highlightColor = '#E4B441',
  delay = 0.5,
}: HeroSubtitleProps) {
  const parts = text.split(highlightText);

  return (
    <motion.p 
      className="text-white/90 text-center text-xl md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="font-bold" style={{ color: highlightColor }}>
              {highlightText}
            </span>
          )}
        </span>
      ))}
    </motion.p>
  );
}