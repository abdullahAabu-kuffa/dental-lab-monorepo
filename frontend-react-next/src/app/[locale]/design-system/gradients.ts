// Design system gradients - ONLY USED GRADIENTS
export const gradients = {
  gold: 'linear-gradient(135deg, #FFD700 0%, #E4B441 50%, #D4A431 100%)',
  goldLight: 'linear-gradient(135deg, #FFD700 0%, #E4B441 100%)',
  goldDark: 'linear-gradient(135deg, #E4B441 0%, #D4A431 50%, #B8960A 100%)',
  goldVintage: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
  
  // Special gradients for specific use cases
  goldText: 'linear-gradient(135deg, #FFD700 0%, #E4B441 50%, #D4A431 100%)',
  goldUnderline: 'linear-gradient(90deg, #FFD700 0%, #E4B441 50%, #D4A431 100%)',
  darkBg: 'linear-gradient(135deg, #1C1C1C 0%, #2A2A2A 50%, #141414 100%)',
  lightBg: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 0%, #F1F5F9 100%)',
} as const;

export type Gradients = typeof gradients;