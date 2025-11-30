export const colors = {
  text: {
    white: '#FFFFFF',
    title: '#1E293B',      // dark slate
    subtitle: '#475569',   // slate
    muted: '#64748B',      // muted text
    light: '#F8FAFC',      // light background
  },
  primary: {
    blue: '#2563EB',       // bright modern blue
    blueLight: '#60A5FA',  // lighter blue
    blueDark: '#1D4ED8',   // darker blue
  },
  success: {
    green: '#10B981',      // completed status green
    greenLight: '#34D399',
    greenDark: '#059669',
  },
  warning: {
    yellow: '#F59E0B',
    yellowLight: '#FBBF24',
    yellowDark: '#D97706',
  },
  danger: {
    red: '#EF4444',
    redLight: '#F87171',
    redDark: '#DC2626',
  },
  cyan: {
    DEFAULT: '#06B6D4',
    light: '#67E8F9',
    dark: '#0891B2',
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
    light: '#F8FAFC',     // light background
    lighter: '#FFFFFF',   // white
    border: '#E2E8F0',    // simple borders
    shadow: '#F1F5F9',    // subtle shadow color
  }
} as const;

export type Colors = typeof colors;