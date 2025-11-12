export const componentStyles = {
  layout: {
    containerDefault: 'max-w-7xl mx-auto px-6',
    containerExtended: 'max-w-6xl mx-auto px-6',
    spacingSection: 'py-24',
    relative: 'relative',
  },
  
  background: {
    sectionDark: 'bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A] text-white',
    sectionWhite: 'bg-white',
  },
  
  text: {
    textLight: 'text-gray-400',
  },
  
  buttons: {
    // hover effects
    primary: `
      inline-block px-8 py-4 rounded-lg
      bg-gradient-to-r from-[#E4B441] to-[#D4A431] 
      text-white font-bold 
      transition-all duration-200 ease-out
      hover:from-[#FFD700] hover:to-[#E4B441]
      shadow-lg hover:shadow-xl 
      transform hover:scale-105
      font-inter
    `,
    
    // hover effects
    secondary: `
      inline-block px-8 py-4 rounded-lg
      bg-gradient-to-r from-[#D4AF37] to-[#B8960A] 
      text-white font-bold 
      transition-all duration-200 ease-out
      hover:from-[#FFD700] hover:to-[#D4AF37]
      shadow-lg hover:shadow-xl 
      transform hover:scale-105
      font-inter
    `,
    
    // hover effects
    fullWidth: `
      w-full px-8 py-4 rounded-lg
      bg-gradient-to-r from-[#E4B441] to-[#D4A431] 
      text-white font-bold 
      transition-all duration-200 ease-out
      hover:from-[#FFD700] hover:to-[#E4B441]
      shadow-lg hover:shadow-xl 
      transform hover:scale-110
      font-inter
    `,

    // hover effects
    whiteBlackHover: `
      inline-block px-8 py-4 rounded-lg border border-black
      bg-white text-black font-bold
      transition-all duration-200 ease-out
      hover:bg-black hover:text-white
      shadow-lg hover:shadow-xl
      transform hover:scale-105
    `,
    
    // hover effects -scale
    yellowTextHoverBlack: `
      inline-block px-8 py-4 rounded-lg bg-yellow-500 border border-yellow-500
      text-black font-bold
      transition-all duration-200 ease-out
      hover:bg-yellow-600 hover:text-white
      shadow-lg hover:shadow-xl
    `,
    
    // borderhover effects - scale
    whiteBgYellowTextHoverBlack: `
      inline-block px-8 py-4 rounded-lg bg-white border-2 border-yellow-500
      text-yellow-500 font-bold
      transition-all duration-200 ease-out
      hover:bg-yellow-500 hover:text-white
      shadow-lg hover:shadow-xl
    `,

    // Beige hover effects 
    beigeSolid: `
      inline-block px-8 py-4 rounded-lg
      bg-[#cabeb2] text-[#1c1715] font-bold 
      transition-all duration-200 ease-out
      hover:bg-[#b5a594] hover:text-black
      shadow-lg hover:shadow-xl 
      transform hover:scale-105
    `,
    
    // Beige Outline  
    beigeOutline: `
      inline-block px-8 py-4 rounded-lg border border-[#cabeb2] bg-transparent
      text-[#1c1715] font-semibold
      transition-all duration-200 ease-out
      hover:bg-[#e9e4df] hover:border-[#b5a594] hover:text-black
      shadow-lg hover:shadow-xl
      transform hover:scale-105
    `,
  },
} as const;

export type ComponentStyles = typeof componentStyles;
