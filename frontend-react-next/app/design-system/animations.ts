// Essential animations only - used by Logo and HeroLogo components
export const animations = {
  spring: { type: "spring" as const, stiffness: 400, damping: 10 },
};

// Used by Logo component
export const hoverEffects = {
  scaleSmall: { scale: 1.02 },
};

export const tapEffects = {
  scaleSmall: { scale: 0.97 },
};

// Used by HeroLogo component  
export const motionVariants = {
  fadeInDown: (delay = 0) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 }
  }),
} as const;

export type AnimationConfig = typeof animations;