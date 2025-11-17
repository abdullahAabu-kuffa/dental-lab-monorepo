// Status configuration data for order process component

import { Clock, CheckCircle } from 'lucide-react';

export interface StatusConfig {
  bg: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  'Completed': { 
    bg: 'bg-green-100 text-green-600', 
    badge: 'bg-green-100 text-green-600',
    icon: CheckCircle,
    label: 'Complete' 
  },
  'In Progress': { 
    bg: 'bg-blue-100 text-blue-600', 
    badge: 'bg-blue-100 text-blue-600',
    icon: Clock,
    label: 'Active' 
  },
  'Manufacturing': { 
    bg: 'bg-blue-100 text-blue-600', 
    badge: 'bg-blue-100 text-blue-600',
    icon: Clock,
    label: 'Active' 
  },
  'Design Review': { 
    bg: 'bg-yellow-100 text-yellow-600', 
    badge: 'bg-yellow-100 text-yellow-600',
    icon: Clock,
    label: 'Active' 
  },
  'Quality Check': { 
    bg: 'bg-purple-100 text-purple-600', 
    badge: 'bg-purple-100 text-purple-600',
    icon: Clock,
    label: 'Active' 
  },
  'Pending': { 
    bg: 'bg-gray-100 text-gray-600', 
    badge: 'bg-gray-100 text-gray-600',
    icon: Clock,
    label: 'Pending' 
  },
  'Cancelled': { 
    bg: 'bg-red-100 text-red-600', 
    badge: 'bg-red-100 text-red-600',
    icon: Clock,
    label: 'Cancelled' 
  }
};

export const getStatusConfig = (status: string): StatusConfig => {
  return STATUS_CONFIG[status] || STATUS_CONFIG['Pending'];
};