// Workflow configuration
import { Upload, CreditCard, TrendingUp, Truck } from 'lucide-react';

export interface WorkflowCard {
  step: string;
  title: string;
  description: string;
  iconName: 'upload' | 'creditCard' | 'trendingUp' | 'truck';
  iconComponent: React.ComponentType<{ size?: number; color?: string }>;
}

export const WORKFLOW_CARDS: WorkflowCard[] = [
  {
    step: "1.",
    title: "Secure Upload",
    description: "Directly upload your <strong>ExoCAD</strong> files through our secure cloud platform.",
    iconName: 'upload',
    iconComponent: Upload
  },
  {
    step: "2.",
    title: "Pay Online",
    description: "Make <strong>secure online payments</strong> with instant digital invoicing.",
    iconName: 'creditCard',
    iconComponent: CreditCard
  },
  {
    step: "3.",
    title: "Live Tracking",
    description: "Monitor your case 24/7 with <strong>real-time updates</strong> during CAD/CAM fabrication.",
    iconName: 'trendingUp',
    iconComponent: TrendingUp
  },
  {
    step: "4.",
    title: "Fast Delivery",
    description: "Receive your high-precision order with our guaranteed fast turnaround.",
    iconName: 'truck',
    iconComponent: Truck
  }
];