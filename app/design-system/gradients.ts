export const gradients = {
  // Gold gradients - ACTUALLY USED
  gold: 'linear-gradient(to right, #E4B441, #D4A431)',
  goldText: 'linear-gradient(to right, #D4AF37, #F4E4A6)',
  goldUnderline: 'linear-gradient(90deg, transparent, #E4B441, #FFD700, #E4B441, transparent)',
  
  // Background gradients - ACTUALLY USED  
  darkBg: 'linear-gradient(to bottom right, #1C1C1C, #2A2A2A)',
  lightBg: 'linear-gradient(to bottom right, #F8F9FA, #E9ECEF)',
} as const;

export type Gradients = typeof gradients;