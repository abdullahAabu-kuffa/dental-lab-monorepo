// Component styles and reusable design patterns
export const componentStyles = {
  // Button variants
  buttons: {
    primary: {
      backgroundColor: 'gold.DEFAULT',
      color: 'text.white',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        backgroundColor: 'gold.dark',
        transform: 'translateY(-1px)'
      },
      _active: {
        transform: 'translateY(0)'
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'gold.DEFAULT',
      border: '2px solid gold.DEFAULT',
      padding: '10px 22px',
      borderRadius: '8px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        backgroundColor: 'gold.DEFAULT',
        color: 'text.white'
      }
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'text.gray.600',
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: '400',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        backgroundColor: 'beige.light',
        color: 'text.black'
      }
    }
  },

  // Card variants
  cards: {
    default: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid',
      borderColor: 'beige.DEFAULT',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-2px)'
      }
    },
    elevated: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      border: 'none',
      transition: 'all 0.3s ease-in-out',
      _hover: {
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-4px)'
      }
    },
    dark: {
      backgroundColor: 'background.darker',
      borderRadius: '12px',
      padding: '24px',
      color: 'text.white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      border: '1px solid',
      borderColor: 'gold.dark',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        boxShadow: '0 8px 25px rgba(228, 180, 65, 0.2)',
        borderColor: 'gold.DEFAULT'
      }
    }
  },

  // Input variants
  inputs: {
    default: {
      backgroundColor: 'white',
      border: '2px solid',
      borderColor: 'beige.DEFAULT',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: 'base',
      color: 'text.black',
      transition: 'all 0.2s ease-in-out',
      _focus: {
        borderColor: 'gold.DEFAULT',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(228, 180, 65, 0.1)'
      }
    },
    dark: {
      backgroundColor: 'background.darker',
      border: '2px solid',
      borderColor: 'text.gray.600',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: 'base',
      color: 'text.white',
      transition: 'all 0.2s ease-in-out',
      _focus: {
        borderColor: 'gold.DEFAULT',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(228, 180, 65, 0.2)'
      }
    }
  },

  // Container layouts
  containers: {
    section: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    narrow: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 24px'
    },
    wide: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 24px'
    }
  },

  // Spacing system
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  }
} as const;

export type ComponentStyles = typeof componentStyles;