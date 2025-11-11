// Gradients configuration for the design system
export const gradients = {
  gold: 'linear-gradient(to right, #E4B441, #D4A431, #C39321)',
  goldReverse: 'linear-gradient(to right, #C39321, #D4A431, #E4B441)',
  goldText: 'linear-gradient(to right, #FFD700, #E4B441, #C39321)',
  goldUnderline: 'linear-gradient(90deg, transparent, #E4B441, #FFD700, #E4B441, transparent)',
  goldNavUnderline: 'linear-gradient(to right, #E4B441, #C39321)',
  goldNavBg: 'linear-gradient(to right, rgba(228, 180, 65, 0.1), rgba(195, 147, 33, 0.1))',
  darkBg: 'linear-gradient(to bottom, #0A0A0A, #151515, #0A0A0A)',
  radialGold: (opacity: number) => `radial-gradient(circle, rgba(228, 180, 65, ${opacity}), rgba(228, 180, 65, ${opacity/2}), transparent)`,
} as const;

export type Gradients = typeof gradients;