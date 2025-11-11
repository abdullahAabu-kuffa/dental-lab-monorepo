// Component styles for the design system
export const componentStyles = {
  button: {
    base: "relative overflow-hidden rounded-2xl px-8 py-4 font-semibold transition-all duration-300",
    solid: `
      bg-gradient-to-r from-[#E4B441] to-[#D4A431]
      text-[#0a0a0a] 
      hover:from-[#FFD700] hover:to-[#E4B441]
      shadow-lg shadow-[#E4B441]/40
      hover:shadow-xl hover:shadow-[#E4B441]/60
      border-2 border-[#E4B441]
      transition-all duration-300
    `,
    outline: `
      border-2 
      border-[#E4B441] 
      text-[#E4B441] 
      bg-[#0a0a0a]/50
      backdrop-blur-sm
      hover:bg-gradient-to-r hover:from-[#E4B441] hover:to-[#D4A431]
      hover:text-[#0a0a0a] 
      shadow-md shadow-[#E4B441]/20
      hover:shadow-lg hover:shadow-[#E4B441]/40
      transition-all duration-300
    `,
  }
} as const;

export type ComponentStyles = typeof componentStyles;