
// CONSOLIDATED ANIMATION SYSTEM


// Basic animation configurations
export const animations = {
  spring: { type: "spring" as const, stiffness: 400, damping: 10 },
};

// Hover effects
export const hoverEffects = {
  scaleSmall: { scale: 1.02 },
  scaleMedium: { scale: 1.05 },
  scaleLarge: { scale: 1.1 },
};

// Tap effects
export const tapEffects = {
  scaleSmall: { scale: 0.97 },
  scaleMedium: { scale: 0.95 },
};


// SCROLL ANIMATION PATTERNS
// Used with ScrollAnimation component

export const scrollAnimations = {
  fadeInFromLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  fadeInFromRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  fadeInFromBottom: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInFromTop: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
  },
  scaleAndFadeIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  complexEntrance: {
    initial: { opacity: 0, x: 50, scale: 0.8 },
    animate: { opacity: 1, x: 0, scale: 1 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

// Viewport configuration for scroll animations
export const viewport = { once: true, amount: 0.3 };


// MOTION VARIANTS
// Reusable motion variants with parameters

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
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
} as const;


// PAGE-SPECIFIC ANIMATIONS


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


// TYPE EXPORTS

export type AnimationConfig = typeof animations;
export type ScrollAnimationType = keyof typeof scrollAnimations;
export type MotionVariantType = keyof typeof motionVariants;
