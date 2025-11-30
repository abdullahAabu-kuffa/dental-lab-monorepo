// Workflow configuration
import { Upload, CreditCard, TrendingUp, Truck } from '../../utils/UnifiedIcons';
import { WorkflowCard } from '../../types';

// WorkflowCard interface is now imported from the consolidated types file

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
    description: "<strong>secure payments</strong> with instant digital invoicing. Flexible <strong>monthly payment </strong>",
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