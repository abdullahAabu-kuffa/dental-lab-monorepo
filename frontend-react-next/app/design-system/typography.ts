// Typography configuration for the design system
export const typography = {
  // Headings
  hero: 'text-3xl md:text-7xl font-black leading-tight font-serif',
  heading: 'text-4xl md:text-5xl font-black leading-tight font-serif',
  section: 'text-3xl md:text-4xl font-bold leading-tight font-serif',
  card: 'text-xl md:text-2xl font-bold leading-tight',
  
  // Subheadings and descriptions
  subtitle: 'text-xl md:text-xl leading-relaxed',
  description: 'text-lg leading-relaxed',
  body: 'text-base leading-relaxed',
  
  // Special elements
  badge: 'text-xl md:text-2xl font-bold',
  navLink: 'font-medium',
  button: 'font-semibold',
  small: 'text-sm font-medium',
  caption: 'text-xs font-medium',
} as const;

export type Typography = typeof typography;
