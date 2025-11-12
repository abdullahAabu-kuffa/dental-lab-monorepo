export const componentStyles = {
  layout: {
    containerDefault: 'max-w-7xl mx-auto px-4 sm:px-6',
    containerExtended: 'max-w-6xl mx-auto px-4 sm:px-6',
    spacingSection: 'py-16 sm:py-24',
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
    primary: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg
      bg-gradient-to-r from-[#E4B441] to-[#D4A431] 
      text-white font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:from-[#FFD700] hover:to-[#E4B441]
      shadow-lg hover:shadow-xl 
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    
    secondary: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg
      bg-gradient-to-r from-[#D4AF37] to-[#B8960A] 
      text-white font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:from-[#FFD700] hover:to-[#D4AF37]
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    
    fullWidth: `
      w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg
      bg-gradient-to-r from-[#E4B441] to-[#D4A431] 
      text-white font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:from-[#FFD700] hover:to-[#E4B441]
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,

    whiteBlackHover: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg 
      border border-black bg-white text-black font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:bg-black hover:text-white
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    
    yellowTextHoverBlack: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg 
      bg-yellow-500 border border-yellow-500
      text-black font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:bg-yellow-600 hover:text-white
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    
    whiteBgYellowTextHoverBlack: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg 
      bg-white border-2 border-yellow-500
      text-yellow-500 font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:bg-yellow-500 hover:text-white
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,

    beigeSolid: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg
      bg-[#CABEB2] text-[#1C1715] font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:bg-[#B5A594] hover:text-black
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    
    beigeOutline: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg 
      border border-[#CABEB2] bg-transparent
      text-[#1C1715] font-semibold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:bg-[#E9E4DF] hover:border-[#B5A594] hover:text-black
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
      lightPrimary: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-xl
      bg-[#D4C4B0] text-gray-800 font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:bg-[#C4B4A0] hover:shadow-lg
      shadow-md
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    
    lightSecondary: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-xl
      bg-transparent border-2 border-gray-400 text-gray-700 font-semibold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:bg-gray-100 hover:border-gray-500 hover:shadow-lg
      shadow-sm
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
  },
} as const;

export type ComponentStyles = typeof componentStyles;