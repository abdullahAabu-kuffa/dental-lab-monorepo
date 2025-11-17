export const componentStyles = {
  layout: {
    containerDefault: 'max-w-7xl mx-auto px-4 sm:px-6',
    spacingSection: 'py-16 sm:py-24',
  },
  
  background: {
    sectionDark: 'bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A] text-white',
  },
  
  // Keep ONLY the button styles that are actually used
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
    
    whiteBlackHover: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg 
      border border-black bg-white text-black font-bold text-sm sm:text-base
      transition-all duration-200 ease-out
      hover:bg-black hover:text-white
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    
    serviceCard: `
      w-16 h-16 rounded-xl
      bg-gradient-to-br from-[#D4AF37] to-[#B8960A]
      flex items-center justify-center
      shadow-lg
    `,
    
    lightPrimary: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg
      bg-white text-[#D4AF37] font-bold text-sm sm:text-base
      border-2 border-[#D4AF37]
      transition-all duration-200 ease-out
      hover:bg-[#D4AF37] hover:text-white
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    
    lightSecondary: `
      inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg
      bg-white text-[#6B7280] font-bold text-sm sm:text-base
      border-2 border-[#6B7280]
      transition-all duration-200 ease-out
      hover:bg-[#6B7280] hover:text-white
      shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
  },
 } as const;

export type ComponentStyles = typeof componentStyles;