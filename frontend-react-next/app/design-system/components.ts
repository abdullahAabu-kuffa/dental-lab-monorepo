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
    
    // Action buttons for order management
    actionPrimary: `
      inline-block px-4 py-2 rounded-lg
      bg-gradient-to-r from-[#D4AF37] to-[#B8960A]
      text-white font-bold text-sm
      transition-all duration-200 ease-out
      hover:from-[#E4B441] hover:to-[#D4AF37]
      shadow-md hover:shadow-lg
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    
    actionSecondary: `
      inline-block px-4 py-2 rounded-lg
      bg-[#F8F9FA] text-[#374151] font-bold text-sm
      border border-[#D1D5DB]
      transition-all duration-200 ease-out
      hover:bg-[#E5E7EB] hover:text-[#111827]
      shadow-sm hover:shadow-md
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    
    actionOutline: `
      inline-block px-4 py-2 rounded-lg
      bg-white text-[#D4AF37] font-bold text-sm
      border border-[#D4AF37]
      transition-all duration-200 ease-out
      hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37]
      shadow-sm hover:shadow-md
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
  },

  // Status Icons Component Styles - Enhanced Circular Design
  statusIcons: {
    container: 'flex items-center gap-2 flex-wrap',
    
    statusButton: `
      relative w-12 h-12 rounded-full flex items-center justify-center
      border-2 border-white/30 overflow-visible group cursor-pointer
      transition-all duration-200 ease-out
      hover:scale-105
      backdrop-blur-sm bg-white/10
    `,
    
    statusButtonActive: 'scale-110 ring-2 ring-white/50',
    
    newOrderButton: `
      relative w-12 h-12 rounded-full flex items-center justify-center
      border-2 border-white/30 overflow-visible group cursor-pointer
      bg-gradient-to-br from-emerald-400 to-emerald-600
      transition-all duration-200 ease-out
      hover:scale-105
      backdrop-blur-sm
    `,
    
    // All Orders Button - Special styling
    allOrdersButton: `
      relative w-12 h-12 rounded-full flex items-center justify-center
      border-2 border-white/30 overflow-visible group cursor-pointer
      bg-gradient-to-br from-red-400 to-red-600
      transition-all duration-200 ease-out
      hover:scale-105
      backdrop-blur-sm
    `,

    // Event Button - Purple styling
    eventButton: `
      relative w-12 h-12 rounded-full flex items-center justify-center
      border-2 border-white/30 overflow-visible group cursor-pointer
      bg-gradient-to-br from-purple-500 to-purple-600
      transition-all duration-200 ease-out
      hover:scale-105
      backdrop-blur-sm
    `,
    
    counterBadge: `
      absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-rose-500 to-pink-600
      text-white text-xs font-bold rounded-full flex items-center justify-center
      border-2 border-white z-20 ring-1 ring-white/50
    `,
    
    tooltip: `
      absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100
      transition-all duration-200 pointer-events-none whitespace-nowrap z-50
      bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded
      border border-gray-700
    `,
    
    // Icon styling within buttons
    icon: `
      w-5 h-5 text-white relative z-10
    `,
  },
} as const;

export type ComponentStyles = typeof componentStyles;