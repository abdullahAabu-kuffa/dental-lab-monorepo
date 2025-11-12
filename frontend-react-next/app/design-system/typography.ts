// Typography configuration for the design system - ONLY USED STYLES
export const typography = {
  // Headings - Only used (Playfair Display for elegant headings)
  hero: 'text-3xl md:text-7xl font-black leading-tight font-serif',
  heading: 'text-4xl md:text-5xl font-black leading-tight font-serif',
  badge: 'text-xl md:text-2xl font-bold font-sans',
  
  // Subheadings and descriptions - Only used (Poppins for clean text)
  subtitle: 'text-xl md:text-xl leading-relaxed font-sans',
  description: 'text-lg leading-relaxed font-sans',
  caption: 'text-xs font-medium font-sans',
  
  // Color text - Only used
  textGray: 'text-gray-800',
  textLight: 'text-gray-300',
  
  // Layout - Only used
  contentCentered: 'text-center mb-16',
  contentMaxWidth: 'max-w-2xl mx-auto',
  contentMaxWidth4xl: 'max-w-4xl mx-auto',
  maxWidth4xl: 'max-w-4xl',
  mxAuto: 'mx-auto',
  textCenter: 'text-center',
  maxWidth: 'max-w-[120px]',
  
  // Font families - Updated to use Poppins and Playfair
  fontSans: 'font-sans',
  fontSerif: 'font-serif',
  fontInter: 'font-sans',
  
  // Card styles - Only used
  cardTitle: 'text-xl font-bold mb-3 font-sans',
  cardDescription: 'text-gray-400 text-sm font-sans',
  
  // Title gradients - Only used (Playfair for elegance)
  titleGradient: `
    text-5xl font-black mb-4
    font-serif
    bg-gradient-to-r from-[#D4AF37] to-[#CABEB2]
    bg-clip-text text-transparent
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
  `,
  
  // Hero specific - Poppins for consistency
  heroSubtitle: 'text-white/90 text-center text-xl md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed font-sans',
  highlightBadge: 'text-[#E4B441] font-bold text-xl md:text-2xl font-sans',
} as const;

export type Typography = typeof typography;
