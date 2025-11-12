export const gradients = {
  // Gold gradients
  gold: 'linear-gradient(to right, #E4B441, #D4A431)',
  goldText: 'linear-gradient(to right, #FFD700, #E4B441)',
  goldUnderline: 'linear-gradient(90deg, transparent, #E4B441, #FFD700, #E4B441, transparent)',
  goldHover: 'linear-gradient(to right, #FFD700, #E4B441)',
  
  // Background gradients
  darkBg: 'linear-gradient(to bottom right, #1C1C1C, #2A2A2A)',
  
  // Title gradients
  titleGold: 'linear-gradient(to right, #D4AF37, #CABEB2)',
} as const;

export type Gradients = typeof gradients;