// Animation configurations for the design system
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  scale: {
    initial: { scale: 0.95 },
    animate: { scale: 1 },
    transition: { duration: 0.2, ease: "easeOut" }
  }
} as const;

// Hover effects for interactive elements
export const hoverEffects = {
  scale: {
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  lift: {
    y: -2,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2, ease: "easeOut" }
  },
  glow: {
    boxShadow: "0 0 20px rgba(228, 180, 65, 0.3)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
} as const;

// Tap/click effects for touch interactions
export const tapEffects = {
  scale: {
    scale: 0.98,
    transition: { duration: 0.1 }
  },
  flash: {
    backgroundColor: "rgba(228, 180, 65, 0.1)",
    transition: { duration: 0.15 }
  }
} as const;

// Motion variants for Framer Motion components
export const motionVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }
} as const;

export type AnimationConfig = {
  animations: typeof animations;
  hoverEffects: typeof hoverEffects;
  tapEffects: typeof tapEffects;
  motionVariants: typeof motionVariants;
};
