// Services configuration
import { Crown, Activity, Smile, Microscope } from '../../utils/UnifiedIcons';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  iconType: string;
  id: string;
  title: string;
  description: string;
  icon: {
    name: 'crown' | 'tooth' | 'smile' | 'microscope' | 'creditCard';
    component: LucideIcon;
  };
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Crowns & Bridges',
    description: 'High-precision ceramic and zirconia restorations with perfect fit and aesthetics',
    icon: {
      name: 'crown',
      component: Crown
    },
    features: [
      'Custom design',
      'Precision fit',
      'Natural aesthetics'
    ],
    iconType: ''
  },
  {
    id: '2',
    title: 'Dental Implants',
    description: 'Custom abutments and crowns designed for optimal implant integration',
    icon: {
      name: 'tooth',
      component: Activity
    },
    features: [
      'Advanced materials',
      'Perfect integration',
      'Long-lasting results'
    ],
    iconType: ''
  },
  {
    id: '3',
    title: 'Veneers',
    description: 'Ultra-thin porcelain veneers for stunning smile transformations',
    icon: {
      name: 'smile',
      component: Smile
    },
    features: [
      'Minimal preparation',
      'Stunning results',
      'Durable materials'
    ],
    iconType: ''
  },
  {
    id: '4',
    title: 'Surgical Guides',
    description: '3D-printed guides for precise implant placement and predictable outcomes',
    icon: {
      name: 'microscope',
      component: Microscope
    },
    features: [
      '3D precision',
      'Predictable results',
      'Advanced technology'
    ],
    iconType: ''
  }
];