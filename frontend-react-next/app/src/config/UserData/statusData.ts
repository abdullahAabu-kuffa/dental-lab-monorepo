import React from 'react';
import { CheckCircle, Settings, AlertTriangle, XCircle, ShoppingBag } from '../../utils/UnifiedIcons';

export interface StatusItem {
  id: string;
  Icon: React.ElementType;
  label: string;
  gradient: [string, string];
  count: number;
}

// Status configuration data
export const STATUS_ITEMS: StatusItem[] = [
  { 
    id: "all-orders", 
    Icon: ShoppingBag, 
    label: "All Orders", 
    gradient: ["#f65c5cff", "#ea1f11ff"], 
    count: 6 
  },
  { 
    id: "completed", 
    Icon: CheckCircle, 
    label: "Completed", 
    gradient: ["#10B981", "#059669"], 
    count: 4 
  },
  { 
    id: "in-progress", 
    Icon: Settings, 
    label: "In Progress", 
    gradient: ["#3B82F6", "#2563EB"], 
    count: 2 
  },
  { 
    id: "pending", 
    Icon: AlertTriangle, 
    label: "Pending", 
    gradient: ["#F59E0B", "#D97706"], 
    count: 0 
  },
  { 
    id: "rejected", 
    Icon: XCircle, 
    label: "Rejected", 
    gradient: ["#EF4444", "#DC2626"], 
    count: 0 
  },
];