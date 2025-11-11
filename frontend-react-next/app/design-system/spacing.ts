// Spacing configuration for the design system
export const spacing = {
  section: 'py-20',
  container: 'container mx-auto px-4',
  gap: {
    small: 'gap-2',
    medium: 'gap-6',
    large: 'gap-8',
  }
} as const;

export type Spacing = typeof spacing;