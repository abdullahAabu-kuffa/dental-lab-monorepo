'use client';
import { motion } from 'framer-motion';
import { typography } from '../../../../../design-system/typography';

interface HeroHeadingProps {
  primaryText: string;
  gradientText?: string;
  gradientColors?: string;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
  fontClass?: keyof typeof typography; // <- هنا بنستقبل نوع الخط
}

export default function HeroHeading({
  primaryText,
  gradientText,
  gradientColors,
  textColor,
  className = '',
  style,
  fontClass = 'hero', 
}: HeroHeadingProps) {
  return (
    <motion.h1
      className={`${typography[fontClass]} mb-8 ${className}`}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <span style={{ color: textColor }}>{primaryText} </span>
      {gradientText && (
        <motion.span
          className="text-transparent bg-clip-text"
          style={{
            backgroundImage: gradientColors,
            backgroundSize: '200% 200%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        >
          {gradientText}
        </motion.span>
      )}
    </motion.h1>
  );
}
