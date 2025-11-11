// Essential gradients only - used by 3 components
export const gradients = {
  // Used by ServiceCard
  gold: 'linear-gradient(to right, #E4B441, #D4A431)',
  
  // Used by HeroText
  goldText: 'linear-gradient(to right, #FFD700, #E4B441)',
  
  // Used by HeroLogo
  goldUnderline: 'linear-gradient(90deg, transparent, #E4B441, #FFD700, #E4B441, transparent)',
} as const;

export type Gradients = typeof gradients;