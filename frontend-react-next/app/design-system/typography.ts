// Typography configuration for the design system - ONLY USED STYLES
export const typography = {
  // Headings - Only used (Playfair Display for elegant headings)
  hero: 'text-3xl md:text-7xl font-black leading-tight font-playfair',
  heading: 'text-4xl md:text-5xl font-black leading-tight font-playfair',
  badge: 'text-xl md:text-2xl font-bold font-poppins',
  
  // Subheadings and descriptions - Only used (Poppins for clean text)
  subtitle: 'text-xl md:text-xl leading-relaxed font-poppins',
  description: 'text-lg leading-relaxed font-poppins',
  caption: 'text-xs font-medium font-poppins',
  
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
  fontSans: 'font-poppins',
  fontSerif: 'font-playfair',
  fontInter: 'font-poppins',
  
  // Card styles - Only used
  cardTitle: 'text-xl font-bold mb-3 font-poppins',
  cardDescription: 'text-gray-400 text-sm font-poppins',
  
  // Title gradients - Only used (Playfair for elegance)
  titleGradient: `
    text-5xl font-black mb-4
    font-playfair
    bg-gradient-to-r from-[#D4AF37] to-[#CABEB2]
    bg-clip-text text-transparent
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
  `,
  
  // Hero specific - Poppins for consistency
  heroSubtitle: 'text-white/90 text-center text-xl md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed font-poppins',
  highlightBadge: 'text-[#E4B441] font-bold text-xl md:text-2xl font-poppins',
} as const;

export type Typography = typeof typography;
