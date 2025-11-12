export const animations = {
  spring: { type: "spring" as const, stiffness: 400, damping: 10 },
  springMedium: { type: "spring" as const, stiffness: 300, damping: 20 },
  springGentle: { type: "spring" as const, stiffness: 200, damping: 25 },
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

export const motionVariants = {
  fadeInDown: (delay = 0) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 }
  }),
  fadeInUp: (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 }
  }),
  fadeIn: (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: 0.5 }
  }),
} as const;

export type AnimationConfig = typeof animations;
