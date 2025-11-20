// Design system exports - only existing files
export { typography } from './typography';
export { componentStyles } from './components';
export { 
  animations, 
  hoverEffects, 
  tapEffects, 
  motionVariants, 
  welcomePageAnimations,
  scrollAnimations,
  viewport
} from './animations';
export { gradients } from './gradients';
export { colors } from './colors';



export { HeroSubtitle } from './components/HeroSubtitle';
export { HeroHeading } from './components/HeroHeading';
export { default as ScrollAnimation, StaggeredAnimation } from './components/ScrollAnimation';

// Re-export types
export type { Typography } from './typography';
export type { ComponentStyles } from './components';
export type { AnimationConfig, ScrollAnimationType, MotionVariantType } from './animations';
export type { Gradients } from './gradients';
export type { Colors } from './colors';