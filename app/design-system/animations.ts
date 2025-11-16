// KEEP ONLY what's actually used in the application
export const animations = {
  spring: { type: "spring" as const, stiffness: 400, damping: 10 },
};

export const hoverEffects = {
  scaleSmall: { scale: 1.02 },
  scaleMedium: { scale: 1.05 },
  scaleLarge: { scale: 1.1 },
};

export const tapEffects = {
  scaleSmall: { scale: 0.97 },
  scaleMedium: { scale: 0.95 },
};

// ONLY the motion variants that are actually used
export const motionVariants = {
  fadeInUp: (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8 }
  }),
  fadeInDown: (delay = 0) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8 }
  }),
  processStep: (index = 0) => ({
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      delay: index * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  }),
} as const;

// Welcome Page Animation Constants
export const welcomePageAnimations = {
  // Main container animation
  mainContainer: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  
  // Hero section animation
  heroSection: {
    variants: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 }
    }
  },
  
  // Hero message animation
  heroMessage: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 0.2, duration: 0.6 }
  },
  
  // Hero title animation
  heroTitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3, duration: 0.6 }
  },
  
  // Hero text animation
  heroText: (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delay + 0.4, duration: 0.6 }
  }),
  
  // Action buttons animation
  actionButtons: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.6, duration: 0.6 }
  },
  
  // Process section animation
  processSection: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.7, duration: 0.8 }
  },
  
  // Section title animation
  sectionTitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.8, duration: 0.6 }
  },
  
  // Section subtitle animation
  sectionSubtitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.9, duration: 0.6 }
  },
  
  // Footer animation
  footerNote: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 1.8, duration: 0.6 }
  }
} as const;

export type AnimationConfig = typeof animations;