"use client";

import { motion } from 'framer-motion';
import { gradients } from '../gradients';

interface AnimatedBackgroundProps {
  /** Number of animated orbs (default: 3) */
  orbCount?: number;
  /** Gradient to use for orbs (default: gradients.gold) */
  gradient?: string;
  /** Opacity of orbs (default: 0.2) */
  opacity?: number;
  /** Blur intensity in pixels (default: 'xl') */
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const blurClasses = {
  sm: 'blur-sm',
  md: 'blur-md',
  lg: 'blur-lg',
  xl: 'blur-xl',
  '2xl': 'blur-2xl',
  '3xl': 'blur-3xl',
};

const defaultOrbPositions = [
  { top: 20, left: 10, size: 32, delay: 0 },
  { top: 40, right: 20, size: 24, delay: 2 },
  { bottom: 40, left: 20, size: 40, delay: 4 }
];

/**
 * Animated background component with floating gradient orbs
 * Used across the application for consistent animated backgrounds
 */
export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  orbCount = 3,
  gradient = gradients.gold,
  opacity = 0.2,
  blur = 'xl'
}) => {
  const orbs = defaultOrbPositions.slice(0, orbCount);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((props, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${blurClasses[blur]}`}
          style={{
            ...props,
            width: props.size * 4,
            height: props.size * 4,
            background: gradient,
            opacity
          }}
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0] 
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
