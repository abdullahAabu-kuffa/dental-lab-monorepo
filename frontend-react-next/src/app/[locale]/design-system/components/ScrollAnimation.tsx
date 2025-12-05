'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { scrollAnimations, viewport, ScrollAnimationType } from '../animations';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: ScrollAnimationType;
  variant?: ScrollAnimationType; // Alias for animation
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animation,
  variant,
  delay = 0,
  duration = 0.6,
  className = ''
}: ScrollAnimationProps) {
  // Support both 'animation' and 'variant' props for backward compatibility
  const animationType = animation || variant || 'fadeInFromBottom';
  const anim = scrollAnimations[animationType];

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.animate}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut" 
      }}
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered version
interface StaggeredAnimationProps {
  children: React.ReactNode;
  animation?: ScrollAnimationType;
  variant?: ScrollAnimationType; // Alias for animation
  staggerDelay?: number;
  duration?: number;
  className?: string;
}

export function StaggeredAnimation({
  children,
  animation,
  variant,
  staggerDelay = 0.1,
  duration = 0.6,
  className = ''
}: StaggeredAnimationProps) {
  // Support both 'animation' and 'variant' props for backward compatibility
  const animationType = animation || variant || 'fadeInFromBottom';
  const anim = scrollAnimations[animationType];

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.animate}
      transition={{ 
        duration,
        staggerChildren: staggerDelay,
        staggerDirection: 1
      }}
      viewport={viewport}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={anim.initial}
          whileInView={anim.animate}
          transition={{ 
            duration,
            delay: index * staggerDelay,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
