// Animation configuration for the design system
export const animationConfig = {
  spring: {
    default: { type: "spring" as const, stiffness: 400, damping: 10 },
    smooth: { type: "spring" as const, stiffness: 100, damping: 20 },
    bounce: { type: "spring" as const, damping: 25, stiffness: 200 },
  },
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
    slowest: 1,
  },
  easing: {
    easeOut: "easeOut" as const,
    easeInOut: "easeInOut" as const,
    linear: "linear" as const,
  }
} as const;

// Motion Variants
export const motionVariants = {
  fadeInUp: (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: animationConfig.duration.slower }
  }),
  fadeInDown: (delay = 0) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: animationConfig.duration.slower }
  }),
  fadeIn: (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: animationConfig.duration.normal }
  }),
  scaleIn: (delay = 0) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay, duration: animationConfig.duration.slow }
  }),
  slideFromRight: (delay = 0) => ({
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay, duration: animationConfig.duration.normal }
  }),
} as const;

// Hover Effects
export const hoverEffects = {
  scale: { scale: 1.05 },
  scaleSmall: { scale: 1.02 },
  scaleLarge: { scale: 1.2 },
  rotate3D: { rotateY: 8, y: -2 },
  liftShadow: { 
    scale: 1.05,
    boxShadow: '0 20px 40px rgba(228, 180, 65, 0.4)',
    rotateX: 5,
  },
} as const;

// Tap Effects
export const tapEffects = {
  scale: { scale: 0.95 },
  scaleSmall: { scale: 0.97 },
  rotate3D: { scale: 0.95, rotateX: -5 },
} as const;

// Legacy exports for backward compatibility
export const animations = animationConfig;

export type AnimationConfig = typeof animationConfig;
export type MotionVariants = typeof motionVariants;
export type HoverEffects = typeof hoverEffects;
export type TapEffects = typeof tapEffects;