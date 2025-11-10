// Colors
export const colors = {
  primary: {
    gold: '#E4B441',
    lightGold: '#FFD700',
    darkGold: '#C39321',
    mediumGold: '#D4A431',
    bronzeGold: '#a07916',
  },
  background: {
    dark: '#0a0a0a',
    darker: '#000000',
    medium: '#151515',
  },
  text: {
    white: '#ffffff',
    lightGray: 'rgba(255, 255, 255, 0.9)',
    gray: '#1f2937',
    dark: '#171717',
  },
  transparent: {
    white80: 'rgba(255, 255, 255, 0.8)',
    white90: 'rgba(255, 255, 255, 0.9)',
    white20: 'rgba(255, 255, 255, 0.2)',
    black20: 'rgba(0, 0, 0, 0.2)',
  }
};

// Gradients
export const gradients = {
  gold: 'linear-gradient(to right, #E4B441, #D4A431, #C39321)',
  goldReverse: 'linear-gradient(to right, #C39321, #D4A431, #E4B441)',
  goldText: 'linear-gradient(to right, #FFD700, #E4B441, #C39321)',
  goldUnderline: 'linear-gradient(90deg, transparent, #E4B441, #FFD700, #E4B441, transparent)',
  goldNavUnderline: 'linear-gradient(to right, #E4B441, #C39321)',
  goldNavBg: 'linear-gradient(to right, rgba(228, 180, 65, 0.1), rgba(195, 147, 33, 0.1))',
  darkBg: 'linear-gradient(to bottom, #0A0A0A, #151515, #0A0A0A)',
  radialGold: (opacity: number) => `radial-gradient(circle, rgba(228, 180, 65, ${opacity}), rgba(228, 180, 65, ${opacity/2}), transparent)`,
};

// Shadows & Effects
export const effects = {
  boxShadow: {
    gold: '0 20px 40px rgba(228, 180, 65, 0.4)',
    goldGlow: '0 0 10px rgba(228, 180, 65, 0.5)',
    goldNav: '0 0 10px rgba(228, 180, 65, 0.5)',
  },
  dropShadow: {
    gold: 'drop-shadow(0 0 50px rgba(255, 224, 49, 1))',
    goldLight: 'drop-shadow(0 0 30px rgba(228, 180, 65, 0.5))',
    goldIcon: 'drop-shadow(0 0 8px rgba(228, 180, 65, 0.6))',
  },
  blur: {
    xl: 'blur(10px)',
    xxl: 'blur(20px)',
    xxxl: 'blur(30px)',
  }
};

// Animations
export const animations = {
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
};

// Motion Variants (Reusable animation presets for Framer Motion)
export const motionVariants = {
  fadeInUp: (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: animations.duration.slower }
  }),
  fadeInDown: (delay = 0) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: animations.duration.slower, ease: animations.easing.easeOut }
  }),
  fadeIn: (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: animations.duration.normal }
  }),
  scaleIn: (delay = 0) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay, duration: animations.duration.slow }
  }),
  slideFromRight: (delay = 0) => ({
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay, duration: animations.duration.normal }
  }),
};

// Hover Effects
export const hoverEffects = {
  scale: { scale: 1.05 },
  scaleSmall: { scale: 1.02 },
  scaleLarge: { scale: 1.2 },
  rotate3D: { rotateY: 8, y: -2 },
  liftShadow: { 
    scale: 1.05,
    boxShadow: effects.boxShadow.gold,
    rotateX: 5,
  },
};

// Tap Effects
export const tapEffects = {
  scale: { scale: 0.95 },
  scaleSmall: { scale: 0.97 },
  rotate3D: { scale: 0.95, rotateX: -5 },
};

// Sizes
export const sizes = {
  icon: {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  },
  logo: {
    mobile: 'h-20',
    tablet: 'h-32',
    desktop: 'h-40',
  },
  button: {
    padding: 'px-8 py-3',
    rounded: 'rounded-xl',
  },
};

// Typography
export const typography = {
  hero: 'text-3xl md:text-7xl font-black leading-tight',
  subtitle: 'text-xl md:text-xl leading-relaxed',
  badge: 'text-xl md:text-2xl font-bold',
  navLink: 'font-medium',
};

// Spacing
export const spacing = {
  section: 'py-20',
  container: 'container mx-auto px-4',
  gap: {
    small: 'gap-2',
    medium: 'gap-6',
    large: 'gap-8',
  }
};

// Z-Index
export const zIndex = {
  base: 'z-10',
  overlay: 'z-40',
  modal: 'z-50',
};

//  Component Styles  Updated Buttons
export const componentStyles = {
  button: {
    base: "relative overflow-hidden rounded-2xl px-8 py-4 font-semibold transition-all duration-300",
    
    // 
    solid: `
      bg-gradient-to-r from-[#E4B441] to-[#D4A431]
      text-[#0a0a0a] 
      hover:from-[#FFD700] hover:to-[#E4B441]
      shadow-lg shadow-[#E4B441]/40
      hover:shadow-xl hover:shadow-[#E4B441]/60
      border-2 border-[#E4B441]
      transition-all duration-300
    `,

    // 
    outline: `
      border-2 
      border-[#E4B441] 
      text-[#E4B441] 
      bg-[#0a0a0a]/50
      backdrop-blur-sm
      hover:bg-gradient-to-r hover:from-[#E4B441] hover:to-[#D4A431]
      hover:text-[#0a0a0a] 
      shadow-md shadow-[#E4B441]/20
      hover:shadow-lg hover:shadow-[#E4B441]/40
      transition-all duration-300
    `,
    
    transform: { transformStyle: "preserve-3d" }
  }
};