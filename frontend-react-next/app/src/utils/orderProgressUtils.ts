// Order progress utility functions
import {
  Upload,
  Crown,
  Settings,
  Eye,
  FileText,
  Truck,
  CheckCircle,
  Clock,
  X,
  Package,
  Zap
} from './UnifiedIcons';
import { ProgressStep, StepColors } from '../types';
import { Order } from '../types';

// Size classes for different component sizes
export const SIZE_CLASSES = {
  sm: {
    container: 'p-4',
    spacing: 'space-y-3',
    title: 'text-sm',
    text: 'text-xs',
    icon: 'w-8 h-8'
  },
  md: {
    container: 'p-6',
    spacing: 'space-y-4',
    title: 'text-lg',
    text: 'text-sm',
    icon: 'w-12 h-12'
  },
  lg: {
    container: 'p-8',
    spacing: 'space-y-6',
    title: 'text-xl',
    text: 'text-base',
    icon: 'w-16 h-16'
  }
} as const;

// Get progress steps based on order status
export const getProgressSteps = (order: Order): ProgressStep[] => {
  const steps: ProgressStep[] = [
    {
      id: '1',
      name: 'Order Received',
      description: 'Your order has been successfully placed',
      status: 'completed', // Order received step is always completed when order exists
      icon: Package,
      timestamp: order.createdAt
    },
    {
      id: '2',
      name: 'Design Review',
      description: 'Initial review of case requirements',
      status: order.status === 'Pending' ? 'active' : 
              order.status === 'In Progress' ? 'active' : 'completed',
      icon: Eye,
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    },
    {
      id: '3',
      name: 'Material Selection',
      description: `Preparing ${order.material} materials`,
      status: order.status === 'Pending' ? 'pending' :
              order.status === 'In Progress' ? 'active' : 'completed',
      icon: Crown,
      estimatedCompletion: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours
    },
    {
      id: '4',
      name: 'Manufacturing',
      description: 'Active manufacturing process',
      status: order.status === 'Pending' ? 'pending' :
              order.status === 'In Progress' ? 'active' : 'completed',
      icon: Settings,
      estimatedCompletion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days
    },
    {
      id: '5',
      name: 'Quality Check',
      description: 'Comprehensive quality assurance testing',
      status: order.status === 'Pending' ? 'pending' :
              order.status === 'In Progress' ? 'pending' :
              order.status === 'Completed' ? 'completed' : 'pending',
      icon: CheckCircle,
      estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    },
    {
      id: '6',
      name: 'Shipping',
      description: 'Preparing order for delivery',
      status: order.status === 'Pending' ? 'pending' :
              order.status === 'In Progress' ? 'pending' :
              order.status === 'Completed' ? 'completed' : 'pending',
      icon: Truck,
      estimatedCompletion: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) // 8 days
    },
    {
      id: '7',
      name: 'Delivered',
      description: 'Order successfully delivered',
      status: order.status === 'Pending' ? 'pending' :
              order.status === 'In Progress' ? 'pending' :
              order.status === 'Completed' ? 'completed' : 'pending',
      icon: CheckCircle,
      timestamp: order.status === 'Completed' ? order.updatedAt : undefined
    }
  ];

  return steps;
};

// Get step status colors
export const getStepStatusColor = (status: ProgressStep['status']): StepColors => {
  switch (status) {
    case 'completed':
      return {
        bg: 'bg-green-500',
        icon: 'text-white',
        border: 'border-green-500',
        text: 'text-green-700'
      };
    case 'active':
      return {
        bg: 'bg-blue-500',
        icon: 'text-white',
        border: 'border-blue-500',
        text: 'text-blue-700'
      };
    case 'pending':
      return {
        bg: 'bg-gray-300',
        icon: 'text-gray-600',
        border: 'border-gray-300',
        text: 'text-gray-600'
      };
    case 'rejected':
      return {
        bg: 'bg-red-500',
        icon: 'text-white',
        border: 'border-red-500',
        text: 'text-red-700'
      };
    default:
      return {
        bg: 'bg-gray-300',
        icon: 'text-gray-600',
        border: 'border-gray-300',
        text: 'text-gray-600'
      };
  }
};

// Format date utility
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

// Get status icon
export const getStatusIcon = (status: ProgressStep['status']) => {
  switch (status) {
    case 'completed':
      return CheckCircle;
    case 'active':
      return Zap;
    case 'pending':
      return Clock;
    case 'rejected':
      return X;
    default:
      return Clock;
  }
};

// Calculate overall progress percentage
export const calculateProgressPercentage = (steps: ProgressStep[]): number => {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  return Math.round((completedSteps / steps.length) * 100);
};

// Get next step to work on
export const getNextStep = (steps: ProgressStep[]): ProgressStep | undefined => {
  return steps.find(step => step.status === 'active');
};