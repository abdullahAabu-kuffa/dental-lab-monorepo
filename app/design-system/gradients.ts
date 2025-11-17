// Design system gradients
export const gradients = {
  gold: 'linear-gradient(135deg, #FFD700 0%, #E4B441 50%, #D4A431 100%)',
  goldLight: 'linear-gradient(135deg, #FFD700 0%, #E4B441 100%)',
  goldDark: 'linear-gradient(135deg, #E4B441 0%, #D4A431 50%, #B8960A 100%)',
  goldVintage: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
  
  blue: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 50%, #1D4ED8 100%)',
  blueLight: 'linear-gradient(135deg, #93C5FD 0%, #60A5FA 100%)',
  blueDark: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #1E40AF 100%)',
  
  cyan: 'linear-gradient(135deg, #67E8F9 0%, #06B6D4 50%, #0891B2 100%)',
  cyanLight: 'linear-gradient(135deg, #A5F3FC 0%, #67E8F9 100%)',
  cyanDark: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #0E7490 100%)',
  
  green: 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #059669 100%)',
  greenLight: 'linear-gradient(135deg, #6EE7B7 0%, #34D399 100%)',
  greenDark: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
  
  beige: 'linear-gradient(135deg, #E9E4DF 0%, #CABEB2 50%, #B5A594 100%)',
  beigeLight: 'linear-gradient(135deg, #F3F4F6 0%, #E9E4DF 100%)',
  beigeDark: 'linear-gradient(135deg, #CABEB2 0%, #B5A594 50%, #9C8B7A 100%)',
  
  // Radial gradients for backgrounds
  radial: {
    gold: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.3) 0%, rgba(228, 180, 65, 0.2) 50%, rgba(212, 164, 49, 0.1) 100%)',
    blue: 'radial-gradient(ellipse at center, rgba(96, 165, 250, 0.3) 0%, rgba(37, 99, 235, 0.2) 50%, rgba(29, 78, 216, 0.1) 100%)',
    cyan: 'radial-gradient(ellipse at center, rgba(103, 232, 249, 0.3) 0%, rgba(6, 182, 212, 0.2) 50%, rgba(8, 145, 178, 0.1) 100%)',
    green: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.3) 0%, rgba(16, 185, 129, 0.2) 50%, rgba(5, 150, 105, 0.1) 100%)',
  },
  
  // Multi-color gradients
  sunset: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 25%, #4ECDC4 50%, #45B7D1 75%, #96CEB4 100%)',
  ocean: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 25%, #8B5CF6 50%, #EC4899 75%, #F59E0B 100%)',
  
  // Subtle background gradients
  subtle: {
    gold: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(228, 180, 65, 0.05) 100%)',
    blue: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
    cyan: 'linear-gradient(135deg, rgba(103, 232, 249, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
    green: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
  },

  // Special gradients for specific use cases
  goldText: 'linear-gradient(135deg, #FFD700 0%, #E4B441 50%, #D4A431 100%)',
  goldUnderline: 'linear-gradient(90deg, #FFD700 0%, #E4B441 50%, #D4A431 100%)',
  darkBg: 'linear-gradient(135deg, #1C1C1C 0%, #2A2A2A 50%, #141414 100%)',
  lightBg: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 50%, #F1F5F9 100%)',
} as const;

export type Gradients = typeof gradients;