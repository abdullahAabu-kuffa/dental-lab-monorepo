import {
  FileText,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings
} from 'lucide-react';

export interface SidebarIcon {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  category: 'status' | 'action';
  gradient: string;
  onClick?: () => void;
  count?: number;
}

// Status-based icons with counts from orders data
const STATUS_ICONS: Omit<SidebarIcon, 'count'>[] = [
  {
    id: 'completed',
    Icon: CheckCircle,
    label: 'Completed',
    category: 'status',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 'in-progress',
    Icon: Clock,
    label: 'In Progress',
    category: 'status',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'pending',
    Icon: AlertCircle,
    label: 'Pending',
    category: 'status',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'cancelled',
    Icon: Settings,
    label: 'Cancelled',
    category: 'status',
    gradient: 'from-red-500 to-pink-500'
  }
];

// Action icons
const ACTION_ICONS: SidebarIcon[] = [
  {
    id: 'orders',
    Icon: FileText,
    label: 'All Orders',
    category: 'action',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'new-order',
    Icon: Plus,
    label: 'New Order',
    category: 'action',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    id: 'track',
    Icon: Search,
    label: 'Track Order',
    category: 'action',
    gradient: 'from-blue-500 to-cyan-500'
  }
];

// Status counts based on sample data
const STATUS_COUNTS = {
  'completed': 4,
  'in-progress': 2,
  'pending': 0,
  'cancelled': 0
};

// Combine status icons with counts
export const SIDEBAR_ICONS: SidebarIcon[] = [
  ...STATUS_ICONS.map(icon => ({
    ...icon,
    count: STATUS_COUNTS[icon.id as keyof typeof STATUS_COUNTS]
  })),
  ...ACTION_ICONS
];