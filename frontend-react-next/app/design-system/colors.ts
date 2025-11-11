// Color palette for the design system
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
} as const;

export type Colors = typeof colors;