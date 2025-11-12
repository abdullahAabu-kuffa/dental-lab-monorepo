// Component Props Types
export interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats?: StatItem[];
}

export interface EventsSectionProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  events?: Event[];
}

export interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo[];
}

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

// Data Types
export interface StatItem {
  number: string;
  label: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
  speaker?: {
    name: string;
    title: string;
    photo: string;
  };
  venue?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ManufacturingProcessStep {
  id: number;
  title: string;
  description: string;
  image: string;
}