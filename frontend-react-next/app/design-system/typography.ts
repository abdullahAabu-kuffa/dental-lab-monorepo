// Typography system for the design system
export const typography = {
  // Font families
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace']
  },

  // Font sizes (using Tailwind scale)
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }]
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },

  // Text styles for common use cases
  textStyles: {
    h1: {
      fontSize: ['3rem', { lineHeight: '1', fontWeight: '700' }],
      fontFamily: 'sans',
      color: 'text.black'
    },
    h2: {
      fontSize: ['2.25rem', { lineHeight: '2.5rem', fontWeight: '600' }],
      fontFamily: 'sans',
      color: 'text.black'
    },
    h3: {
      fontSize: ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
      fontFamily: 'sans',
      color: 'text.black'
    },
    body: {
      fontSize: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
      fontFamily: 'sans',
      color: 'text.gray.800'
    },
    caption: {
      fontSize: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
      fontFamily: 'sans',
      color: 'text.gray.600'
    },
    button: {
      fontSize: ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
      fontFamily: 'sans',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }
} as const;

export type Typography = typeof typography;