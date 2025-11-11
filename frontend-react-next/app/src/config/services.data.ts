import { Settings, Workflow, Zap, Shield, Smartphone, BarChart3 } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'ExoCAD Integration',
    description: 'Seamless integration with ExoCAD for precise dental restoration design and manufacturing.',
    icon: Settings,
    features: ['Precision Design', 'Real-time Sync', 'Cloud Storage']
  },
  {
    id: '2',
    title: 'Order Management',
    description: 'Complete order management system with tracking and status updates throughout the process.',
    icon: Workflow,
    features: ['Order Tracking', 'Status Updates', 'Digital Records']
  },
  {
    id: '3',
    title: 'Real-time Tracking',
    description: 'Monitor your orders in real-time with detailed progress tracking and notifications.',
    icon: Zap,
    features: ['Live Updates', 'Push Notifications', 'Progress Analytics']
  },
  {
    id: '4',
    title: 'Secure Payments',
    description: 'Safe and secure online payment processing with multiple payment methods supported.',
    icon: Shield,
    features: ['SSL Security', 'Multiple Payment Methods', 'Invoice Management']
  },
  {
    id: '5',
    title: 'Mobile App',
    description: 'Full-featured mobile application for managing your dental practice on the go.',
    icon: Smartphone,
    features: ['iOS & Android', 'Offline Access', 'Push Notifications']
  },
  {
    id: '6',
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics and reporting to track your practice performance.',
    icon: BarChart3,
    features: ['Performance Metrics', 'Custom Reports', 'Data Visualization']
  }
];