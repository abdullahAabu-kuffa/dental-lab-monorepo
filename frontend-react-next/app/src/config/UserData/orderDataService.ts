
 

import type { Order, OrderStats } from '../../types';
import {
  Check, Zap, Clock, X, Truck, AlertCircle,
  Package, Eye, Settings, Microscope,
  CheckCircle, Crown, FileText,
  Search, Plus, Filter

} from '../../utils/UnifiedIcons';

// ORDERS DATA

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    patientName: 'Ahmed Hassan',
    orderType: 'Crown',
    status: 'Completed',
    date: '2024-01-15',
    totalAmount: 2500,
    urgency: 'Medium',
    material: 'Zirconia',
    notes: 'Upper left molar, color A2',
    createdAt: new Date('2024-01-15T09:00:00Z'),
    updatedAt: new Date('2024-01-18T16:30:00Z'),
    lab: 'Precision Dental Labs',
    shippingCarrier: 'FedEx',
    trackingNumber: 'FX123456789EG',
    stages: {
      orderPlaced: { completed: true, completedAt: '2024-01-15' },
      digitalDesign: { completed: true, completedAt: '2024-01-16' },
      manufacturing: { completed: true, completedAt: '2024-01-17' },
      qualityControl: { completed: true, completedAt: '2024-01-18' },
      shipped: { completed: true, completedAt: '2024-01-18' }
    }
  },
  {
    id: 'ORD-002',
    patientName: 'Fatima Ali',
    orderType: 'Bridge',
    status: 'In Progress',
    date: '2024-01-16',
    totalAmount: 4200,
    urgency: 'High',
    material: 'PFM',
    notes: '3-unit bridge, front teeth',
    createdAt: new Date('2024-01-16T10:15:00Z'),
    updatedAt: new Date('2024-01-20T14:20:00Z'),
    lab: 'Elite Dental Solutions',
    shippingCarrier: 'DHL',
    trackingNumber: 'DH987654321EG',
    stages: {
      orderPlaced: { completed: true, completedAt: '2024-01-16' },
      digitalDesign: { completed: true, completedAt: '2024-01-18' },
      manufacturing: { completed: false, completedAt: 'In Progress' },
      qualityControl: { completed: false, completedAt: 'Pending' },
      shipped: { completed: false, completedAt: 'Pending' }
    }
  },
  {
    id: 'ORD-003',
    patientName: 'Mohamed Khaled',
    orderType: 'Implant',
    status: 'Completed',
    date: '2024-01-17',
    totalAmount: 3500,
    urgency: 'Low',
    material: 'Titanium',
    notes: 'Lower right premolar',
    createdAt: new Date('2024-01-17T11:30:00Z'),
    updatedAt: new Date('2024-01-22T09:45:00Z'),
    lab: 'Advanced Dental Arts',
    shippingCarrier: 'UPS',
    trackingNumber: '1Z999AA10123456784',
    stages: {
      orderPlaced: { completed: true, completedAt: '2024-01-17' },
      digitalDesign: { completed: true, completedAt: '2024-01-19' },
      manufacturing: { completed: true, completedAt: '2024-01-21' },
      qualityControl: { completed: true, completedAt: '2024-01-22' },
      shipped: { completed: true, completedAt: '2024-01-22' }
    }
  },
  {
    id: 'ORD-004',
    patientName: 'Sara Mahmoud',
    orderType: 'Denture',
    status: 'Completed',
    date: '2024-01-18',
    totalAmount: 1800,
    urgency: 'Medium',
    material: 'Acrylic',
    notes: 'Complete upper denture',
    createdAt: new Date('2024-01-18T13:00:00Z'),
    updatedAt: new Date('2024-01-25T11:15:00Z'),
    lab: 'Precision Dental Labs',
    shippingCarrier: 'Aramex',
    trackingNumber: 'AR1234567890',
    stages: {
      orderPlaced: { completed: true, completedAt: '2024-01-18' },
      digitalDesign: { completed: true, completedAt: '2024-01-20' },
      manufacturing: { completed: true, completedAt: '2024-01-23' },
      qualityControl: { completed: true, completedAt: '2024-01-24' },
      shipped: { completed: true, completedAt: '2024-01-25' }
    }
  },
  {
    id: 'ORD-005',
    patientName: 'Omar Ahmed',
    orderType: 'Crown',
    status: 'In Progress',
    date: '2024-01-19',
    totalAmount: 2200,
    urgency: 'High',
    material: 'E-max',
    notes: 'Lower left canine',
    createdAt: new Date('2024-01-19T14:30:00Z'),
    updatedAt: new Date('2024-01-21T16:00:00Z'),
    lab: 'Elite Dental Solutions',
    stages: {
      orderPlaced: { completed: true, completedAt: '2024-01-19' },
      digitalDesign: { completed: true, completedAt: '2024-01-21' },
      manufacturing: { completed: false, completedAt: 'In Progress' },
      qualityControl: { completed: false, completedAt: 'Pending' },
      shipped: { completed: false, completedAt: 'Pending' }
    }
  },
  {
    id: 'ORD-006',
    patientName: 'Layla Mohamed',
    orderType: 'Bridge',
    status: 'Completed',
    date: '2024-01-20',
    totalAmount: 3800,
    urgency: 'Medium',
    material: 'Zirconia',
    notes: '4-unit posterior bridge',
    createdAt: new Date('2024-01-20T08:45:00Z'),
    updatedAt: new Date('2024-01-23T13:30:00Z'),
    lab: 'Advanced Dental Arts',
    shippingCarrier: 'FedEx',
    trackingNumber: 'FX987654321EG',
    stages: {
      orderPlaced: { completed: true, completedAt: '2024-01-20' },
      digitalDesign: { completed: true, completedAt: '2024-01-21' },
      manufacturing: { completed: true, completedAt: '2024-01-22' },
      qualityControl: { completed: true, completedAt: '2024-01-23' },
      shipped: { completed: true, completedAt: '2024-01-23' }
    }
  },
  {
    id: 'ORD-007',
    patientName: 'Youssef Ibrahim',
    orderType: 'Crown',
    status: 'Pending',
    date: '2024-01-21',
    totalAmount: 1900,
    urgency: 'Low',
    material: 'Gold',
    notes: 'Lower right molar, requires adjustment',
    createdAt: new Date('2024-01-21T11:00:00Z'),
    updatedAt: new Date('2024-01-21T11:00:00Z'),
    lab: 'Precision Dental Labs',
    stages: {
      orderPlaced: { completed: true, completedAt: '2024-01-21' },
      digitalDesign: { completed: false, completedAt: 'Pending' },
      manufacturing: { completed: false, completedAt: 'Pending' },
      qualityControl: { completed: false, completedAt: 'Pending' },
      shipped: { completed: false, completedAt: 'Pending' }
    }
  },
  {
    id: 'ORD-008',
    patientName: 'Nadia Sayed',
    orderType: 'Veneers',
    status: 'Pending',
    date: '2024-01-22',
    totalAmount: 3200,
    urgency: 'High',
    material: 'Porcelain',
    notes: '8-unit veneers for cosmetic enhancement',
    createdAt: new Date('2024-01-22T14:30:00Z'),
    updatedAt: new Date('2024-01-22T14:30:00Z'),
    lab: 'Elite Dental Solutions',
    stages: {
      orderPlaced: { completed: true, completedAt: '2024-01-22' },
      digitalDesign: { completed: false, completedAt: 'In Queue' },
      manufacturing: { completed: false, completedAt: 'Pending' },
      qualityControl: { completed: false, completedAt: 'Pending' },
      shipped: { completed: false, completedAt: 'Pending' }
    }
  }
];

// STATUS CONFIGURATION

export const STATUS_CONFIG = {
  completed: {
    icon: Check,
    label: 'Completed',
    color: {
      bg: 'bg-green-500',
      text: 'text-white',
      border: 'border-green-500',
      light: 'bg-green-100',
      darkText: 'text-green-700'
    },
    gradient: ['#10B981', '#059669'],
    manufacturingColors: {
      bg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      text: 'text-white',
      border: 'border-emerald-400',
      connector: 'bg-gradient-to-r from-emerald-400 to-emerald-500'
    }
  },
  inProgress: {
    icon: Zap,
    label: 'In Progress',
    color: {
      bg: 'bg-blue-500',
      text: 'text-white',
      border: 'border-blue-500',
      light: 'bg-blue-100',
      darkText: 'text-blue-700'
    },
    gradient: ['#3B82F6', '#2563EB'],
    manufacturingColors: {
      bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
      text: 'text-white',
      border: 'border-blue-400',
      connector: 'bg-gradient-to-r from-blue-400 to-blue-500'
    }
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    color: {
      bg: 'bg-orange-500',
      text: 'text-white',
      border: 'border-orange-500',
      light: 'bg-orange-100',
      darkText: 'text-orange-700'
    },
    gradient: ['#F59E0B', '#D97706'],
    manufacturingColors: {
      bg: 'bg-gradient-to-br from-amber-400 to-amber-600',
      text: 'text-white',
      border: 'border-amber-400',
      connector: 'bg-gradient-to-r from-amber-400 to-amber-500'
    }
  },
  rejected: {
    icon: X,
    label: 'Needs Attention',
    color: {
      bg: 'bg-red-500',
      text: 'text-white',
      border: 'border-red-500',
      light: 'bg-red-100',
      darkText: 'text-red-700'
    },
    gradient: ['#EF4444', '#DC2626'],
    manufacturingColors: {
      bg: 'bg-gradient-to-br from-red-400 to-red-600',
      text: 'text-white',
      border: 'border-red-400',
      connector: 'bg-gradient-to-r from-red-400 to-red-500'
    }
  },
  shipped: {
    icon: Truck,
    label: 'Shipped',
    color: {
      bg: 'bg-cyan-500',
      text: 'text-white',
      border: 'border-cyan-500',
      light: 'bg-cyan-100',
      darkText: 'text-cyan-700'
    },
    gradient: ['#06B6D4', '#0891B2'],
    manufacturingColors: {
      bg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      text: 'text-white',
      border: 'border-cyan-400',
      connector: 'bg-gradient-to-r from-cyan-400 to-cyan-500'
    }
  },
  waiting: {
    icon: AlertCircle,
    label: 'Unknown',
    color: {
      bg: 'bg-gray-400',
      text: 'text-white',
      border: 'border-gray-400',
      light: 'bg-gray-100',
      darkText: 'text-gray-700'
    },
    gradient: ['#9CA3AF', '#6B7280'],
    manufacturingColors: {
      bg: 'bg-gradient-to-br from-gray-300 to-gray-500',
      text: 'text-gray-600',
      border: 'border-gray-300',
      connector: 'bg-gradient-to-r from-gray-300 to-gray-400'
    }
  }
} as const;

// Status configuration items for components (consolidated from statusData.ts)
export const STATUS_ITEMS = [
  {
    id: "all-orders",
    Icon: Package,
    label: "All Orders",
    gradient: ["#f65c5cff", "#ea1f11ff"] as [string, string],
    count: 8
  },
  {
    id: "completed",
    Icon: Check,
    label: "Completed",
    gradient: ["#10B981", "#059669"] as [string, string],
    count: 4
  },
  {
    id: "in-progress",
    Icon: Zap,
    label: "In Progress",
    gradient: ["#3B82F6", "#2563EB"] as [string, string],
    count: 2
  },
  {
    id: "pending",
    Icon: Clock,
    label: "Pending",
    gradient: ["#F59E0B", "#D97706"] as [string, string],
    count: 2
  },
  {
    id: "cancelled",
    Icon: X,
    label: "Cancelled",
    gradient: ["#EF4444", "#DC2626"] as [string, string],
    count: 0
  },
];

// Legacy export for backward compatibility
export const STATUS_FILTER_ITEMS = STATUS_ITEMS;

// Calculate dynamic counts for status filter items
export const calculateStatusCounts = (orders: Order[]) => {
  return STATUS_FILTER_ITEMS.map(item => ({
    ...item,
    count: getStatusCount(orders, item.id)
  }));
};

// Helper function to get count for a specific status
export const getStatusCount = (orders: Order[], statusId: string): number => {
  switch (statusId) {
    case "all-orders":
      return orders.length;
    case "completed":
      return orders.filter(o => o.status === 'Completed').length;
    case "in-progress":
      return orders.filter(o => o.status === 'In Progress').length;
    case "pending":
      return orders.filter(o => o.status === 'Pending').length;
    case "cancelled":
      return orders.filter(o => o.status === 'Cancelled').length;
    default:
      return 0;
  }
};

// MANUFACTURING PROCESS STEPS - Enhanced with dynamic colors

export const getManufacturingStepsForOrder = (order: Order) => {
  const statusConfig = getOrderStatusConfig(order.status);
  
  return [
    { 
      label: "Order Placed", 
      icon: Package,
      completed: true,
      active: false,
      date: new Date(order.createdAt).toLocaleDateString(),
      status: 'completed'
    },
    { 
      label: "Digital Design", 
      icon: Eye,
      completed: order.status === 'Completed' || order.status === 'In Progress',
      active: order.status === 'In Progress',
      date: order.status === 'Completed' || order.status === 'In Progress' 
        ? new Date(order.updatedAt).toLocaleDateString() 
        : 'In Progress',
      status: order.status === 'Completed' ? 'completed' : order.status === 'In Progress' ? 'active' : 'pending'
    },
    { 
      label: "Manufacturing", 
      icon: Settings,
      completed: order.status === 'Completed',
      active: order.status === 'In Progress',
      date: order.status === 'Completed' ? 'Completed' : order.status === 'In Progress' ? 'In Progress' : 'Pending',
      status: order.status === 'Completed' ? 'completed' : order.status === 'In Progress' ? 'active' : 'pending'
    },
    { 
      label: "Quality Control", 
      icon: Microscope,
      completed: false,
      active: false,
      date: order.status === 'Completed' ? 'Completed' : 'Pending',
      status: order.status === 'Completed' ? 'completed' : 'pending'
    },
    { 
      label: "Shipped", 
      icon: Truck,
      completed: order.status === 'Completed',
      active: false,
      date: order.status === 'Completed' ? 'Shipped' : 'Pending',
      status: order.status === 'Completed' ? 'completed' : 'pending'
    },
  ];
};

// UI CONFIGURATION

export const UI_CONFIG = {
  header: {
    title: "My Orders",
    subtitle: "Track and manage your dental orders",
    searchPlaceholder: "Search orders by patient name..."
  },
  actions: {
    newOrder: {
      label: "New Order",
      icon: Plus
    },
    filter: {
      label: "Filter", 
      icon: Filter
    },
    search: {
      icon: Search
    }
  },
  cards: {
    emptyState: {
      noOrders: {
        title: "No matching orders",
        description: "Try a different patient name"
      },
      selectOrder: {
        title: "Select an Order",
        description: "Click on an order card to view its detailed progress"
      },
      quickDetails: {
        title: "Quick Details", 
        description: "View order summary when selected"
      }
    }
  }
};


// CALCULATED STATS


export const calculateOrderStats = (orders: Order[]): OrderStats => {
  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    inProgress: orders.filter(o => o.status === 'In Progress').length,
    completed: orders.filter(o => o.status === 'Completed').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
  };
};

export const DEFAULT_ORDER_STATS: OrderStats = calculateOrderStats(SAMPLE_ORDERS);


// UTILITY FUNCTIONS

// Get status configuration for an order
export const getOrderStatusConfig = (status: string) => {
  const normalizedStatus = status.toLowerCase().replace(/_/g, " ");
  
  switch (normalizedStatus) {
    case "completed":
      return STATUS_CONFIG.completed;
    case "in progress":
      return STATUS_CONFIG.inProgress;
    case "pending":
      return STATUS_CONFIG.pending;
    case "rejected":
    case "needs attention":
      return STATUS_CONFIG.rejected;
    case "shipped":
      return STATUS_CONFIG.shipped;
    default:
      return STATUS_CONFIG.waiting;
  }
};

// Get progress percentage based on status
export const getProgressPercentage = (status: string): number => {
  switch (status.toLowerCase()) {
    case "completed":
      return 100;
    case "in progress":
      return 60;
    case "shipped":
      return 90;
    case "pending":
      return 20;
    case "rejected":
    case "needs attention":
      return 0;
    default:
      return 10;
  }
};

// Filter orders by status
export const filterOrdersByStatus = (orders: Order[], status: string): Order[] => {
  if (status === "all-orders") return orders;
  
  // Handle special cases for status matching
  switch (status) {
    case "COMPLETED":
      return orders.filter(order => order.status === 'Completed');
    case "IN_PROGRESS":
      return orders.filter(order => order.status === 'In Progress');
    case "PENDING":
      return orders.filter(order => order.status === 'Pending');
    case "CANCELLED":
      return orders.filter(order => order.status === 'Cancelled');
    default:
      return orders.filter(order => 
        order.status.toLowerCase().replace(/ /g, "_") === status
      );
  }
};

// Search orders by patient name
export const searchOrders = (orders: Order[], searchTerm: string): Order[] => {
  if (!searchTerm.trim()) return orders;
  return orders.filter(order =>
    order.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Manufacturing stage names - consistent across all components
export const MANUFACTURING_STAGES = {
  orderPlaced: 'Order Placed',
  upload: 'Upload & Documentation',
  digitalDesign: 'Digital Design & Planning',
  material: 'Material Selection',
  manufacturing: 'Manufacturing & Fabrication',
  qualityControl: 'Quality Control & Inspection',
  shipped: 'Packaged & Shipped',
  completion: 'Order Completed'
} as const;

// Get detailed stage information for an order
export const getOrderStages = (order: Order) => {
  const stages = [
    {
      key: 'orderPlaced',
      label: 'Order Placed',
      icon: Package,
      status: order.stages?.orderPlaced?.completed ? 'completed' : 'pending',
      date: order.stages?.orderPlaced?.completedAt || '---'
    },
    {
      key: 'digitalDesign',
      label: 'Digital Design & Planning',
      icon: Eye,
      status: order.stages?.digitalDesign?.completed ? 'completed' :
              order.stages?.orderPlaced?.completed ? 'active' : 'pending',
      date: order.stages?.digitalDesign?.completedAt || '---'
    },
    {
      key: 'manufacturing',
      label: 'Manufacturing & Fabrication',
      icon: Settings,
      status: order.stages?.manufacturing?.completed ? 'completed' :
              order.stages?.digitalDesign?.completed ? 'active' : 'pending',
      date: order.stages?.manufacturing?.completedAt || '---'
    },
    {
      key: 'qualityControl',
      label: 'Quality Control & Inspection',
      icon: Microscope,
      status: order.stages?.qualityControl?.completed ? 'completed' :
              order.stages?.manufacturing?.completed ? 'active' : 'pending',
      date: order.stages?.qualityControl?.completedAt || '---'
    },
    {
      key: 'shipped',
      label: 'Packaged & Shipped',
      icon: Truck,
      status: order.stages?.shipped?.completed ? 'completed' :
              order.stages?.qualityControl?.completed ? 'active' : 'pending',
      date: order.stages?.shipped?.completedAt || '---'
    }
  ];
  
  return stages;
};

// Digital Manufacturing Process Description
export const DIGITAL_MANUFACTURING_PROCESS_DESCRIPTION = {
  title: "Digital Manufacturing Process",
  subtitle: "Follow your dental case from upload to delivery — every stage, visible in real-time.",
  description: "All updates appear live in your client dashboard — giving you full transparency and control over your cases.",
  steps: [
    "Upload Case",
    "Material Selection",
    "Design Process", 
    "Quality Check",
    "Documentation",
    "Shipping",
    "Completion"
  ]
};

// Enhanced user process steps for landing page
export const USER_PROCESS_STEPS = [
  {
    id: 1,
    title: 'Upload Case',
    icon: Package,
    completed: true,
    description: 'Upload dental impressions and specifications'
  },
  {
    id: 2,
    title: 'Material Selection',
    icon: Crown,
    completed: true,
    description: 'Choose from premium dental materials'
  },
  {
    id: 3,
    title: 'Design Process',
    icon: Settings,
    completed: false,
    description: 'Custom design and manufacturing'
  },
  {
    id: 4,
    title: 'Quality Check',
    icon: Eye,
    completed: false,
    description: 'Thorough quality assurance'
  },
  {
    id: 5,
    title: 'Documentation',
    icon: FileText,
    completed: false,
    description: 'Case documentation and reports'
  },
  {
    id: 6,
    title: 'Shipping',
    icon: Truck,
    completed: false,
    description: 'Secure delivery to your clinic'
  },
  {
    id: 7,
    title: 'Completion',
    icon: CheckCircle,
    completed: false,
    description: 'Order completed successfully'
  }
] as const;


// MAIN SERVICE OBJECT


// Main service object - now all dependencies are declared before use
const orderDataService = {
  // Data
  SAMPLE_ORDERS,
  STATUS_CONFIG,
  STATUS_FILTER_ITEMS,
  UI_CONFIG,
  
  // Stats
  DEFAULT_ORDER_STATS,
  calculateOrderStats,
  
  // Utilities
  getOrderStatusConfig,
  getProgressPercentage,
  filterOrdersByStatus,
  searchOrders,
  calculateStatusCounts,
  getStatusCount,
  getManufacturingStepsForOrder,
  
  // Additional utilities
  MANUFACTURING_STAGES,
  getOrderStages,
  USER_PROCESS_STEPS
};

export default orderDataService;