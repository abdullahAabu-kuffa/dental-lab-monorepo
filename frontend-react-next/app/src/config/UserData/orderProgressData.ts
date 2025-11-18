import { ProgressStep, StepColors, Order } from '../../types';
import { 
  Upload, 
  Crown, 
  Settings, 
  Eye, 
  FileText, 
  Truck, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  XCircle
} from '../../utils/UnifiedIcons';

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
    title: 'text-base',
    text: 'text-sm',
    icon: 'w-10 h-10'
  },
  lg: {
    container: 'p-8',
    spacing: 'space-y-6',
    title: 'text-lg',
    text: 'text-base',
    icon: 'w-12 h-12'
  }
} as const;

// Color schemes for different step statuses
export const getStepStatusColor = (status: 'completed' | 'active' | 'pending' | 'rejected'): StepColors => {
  const colorMap = {
    completed: {
      bg: 'bg-green-500',
      icon: 'text-white',
      border: 'border-green-500',
      text: 'text-green-700'
    },
    active: {
      bg: 'bg-blue-500',
      icon: 'text-white',
      border: 'border-blue-500',
      text: 'text-blue-700'
    },
    pending: {
      bg: 'bg-gray-300',
      icon: 'text-gray-600',
      border: 'border-gray-300',
      text: 'text-gray-600'
    },
    rejected: {
      bg: 'bg-red-500',
      icon: 'text-white',
      border: 'border-red-500',
      text: 'text-red-700'
    }
  };
  
  return colorMap[status];
};

// Date formatting utility
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Base steps configuration
const BASE_STEPS = [
  {
    id: 'upload',
    name: 'Upload Case',
    description: 'Upload dental impressions and specifications',
    icon: Upload,
    defaultDuration: 1 // hours
  },
  {
    id: 'material',
    name: 'Material Selection',
    description: 'Choose from premium dental materials',
    icon: Crown,
    defaultDuration: 2 // hours
  },
  {
    id: 'design',
    name: 'Design Process',
    description: 'Custom design and manufacturing',
    icon: Settings,
    defaultDuration: 24 // hours
  },
  {
    id: 'quality',
    name: 'Quality Check',
    description: 'Thorough quality assurance',
    icon: Eye,
    defaultDuration: 4 // hours
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Case documentation and reports',
    icon: FileText,
    defaultDuration: 2 // hours
  },
  {
    id: 'shipping',
    name: 'Shipping',
    description: 'Secure delivery to your clinic',
    icon: Truck,
    defaultDuration: 48 // hours
  },
  {
    id: 'completion',
    name: 'Completion',
    description: 'Order completed successfully',
    icon: CheckCircle,
    defaultDuration: 1 // hours
  }
];

// Generate progress steps based on order status and timestamp
export const getProgressSteps = (order: Order): ProgressStep[] => {
  const steps: ProgressStep[] = [];
  const now = new Date();
  const orderDate = new Date(order.date);
  const createdAt = order.createdAt || orderDate;
  const updatedAt = order.updatedAt || now;

  // Calculate elapsed time since order creation
  const elapsedHours = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));

  // Map order status to progress
  let currentStepIndex = 0;
  switch (order.status) {
    case 'Pending':
      currentStepIndex = 0;
      break;
    case 'In Progress':
      currentStepIndex = Math.min(Math.floor(elapsedHours / 8) + 1, BASE_STEPS.length - 2);
      break;
    case 'Completed':
      currentStepIndex = BASE_STEPS.length;
      break;
    case 'Cancelled':
      currentStepIndex = -1; // Special case for cancelled orders
      break;
  }

  BASE_STEPS.forEach((step, index) => {
    let status: 'completed' | 'active' | 'pending' | 'rejected' = 'pending';
    let timestamp: Date | undefined;
    let estimatedCompletion: Date | undefined;

    if (order.status === 'Cancelled') {
      status = index === currentStepIndex ? 'rejected' : 'pending';
    } else if (index < currentStepIndex) {
      status = 'completed';
      // Simulate completion timestamps
      timestamp = new Date(createdAt.getTime() + (index * 8 * 60 * 60 * 1000));
    } else if (index === currentStepIndex) {
      status = order.status === 'Completed' ? 'completed' : 'active';
      if (status === 'active') {
        estimatedCompletion = new Date(now.getTime() + (step.defaultDuration * 60 * 60 * 1000));
      } else {
        timestamp = updatedAt;
      }
    } else {
      // Future steps
      const baseCompletionTime = new Date(createdAt.getTime() + (currentStepIndex * 8 * 60 * 60 * 1000));
      estimatedCompletion = new Date(baseCompletionTime.getTime() + ((index - currentStepIndex) * step.defaultDuration * 60 * 60 * 1000));
    }

    steps.push({
      id: step.id,
      name: step.name,
      description: step.description,
      status,
      icon: step.icon,
      timestamp,
      estimatedCompletion
    });
  });

  return steps;
};