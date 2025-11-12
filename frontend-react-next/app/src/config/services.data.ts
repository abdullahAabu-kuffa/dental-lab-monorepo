// Services configuration
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Changed to string for import compatibility
}

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Crowns & Bridges',
    description: 'High-precision ceramic and zirconia restorations with perfect fit and aesthetics',
    icon: 'Crown'
  },
  {
    id: '2',
    title: 'Dental Implants',
    description: 'Custom abutments and crowns designed for optimal implant integration',
    icon: 'Zap'
  },
  {
    id: '3',
    title: 'Veneers',
    description: 'Ultra-thin porcelain veneers for stunning smile transformations',
    icon: 'Smile'
  },
  {
    id: '4',
    title: 'Surgical Guides',
    description: '3D-printed guides for precise implant placement and predictable outcomes',
    icon: 'Microscope'
  }
];