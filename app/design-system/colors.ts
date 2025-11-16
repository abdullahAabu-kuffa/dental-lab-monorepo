export const colors = {
  text: {
    white: '#FFFFFF',
    gray: {
      400: '#9CA3AF',
      600: '#4B5563',
    }
  },
  gold: {
    light: '#FFD700',
    DEFAULT: '#E4B441',
    dark: '#D4A431',
    vintage: '#D4AF37',
  },
  beige: {
    light: '#E9E4DF',
    DEFAULT: '#CABEB2',
    dark: '#B5A594',
  },
  background: {
    dark: '#1C1C1C',
    darker: '#2A2A2A',
  }
} as const;

export type Colors = typeof colors;