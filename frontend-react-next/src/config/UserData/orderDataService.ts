import type { Order } from "../../types";
import {
  Check,
  Zap,
  Clock,
  X,
  Truck,
  AlertCircle,
  Package,
  Settings,
  CheckCircle,
  User,
  Layers,
  Upload,
  Edit,
  Search,
  Cog,
  Wrench,
} from "../../utils/UnifiedIcons";
import { CheckCircle2, XCircle } from "lucide-react";

// ORDERS DATA
export enum ProcessStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export const SAMPLE_ORDERS: Order[] = [];

// STATUS CONFIGURATION
export const STATUS_CONFIG = {
  completed: {
    icon: Check,
    label: "Completed",
    gradient: ["#10B981", "#059669"],
  },
  inProgress: {
    icon: Zap,
    label: "In Progress",
    gradient: ["#3B82F6", "#2563EB"],
  },
  pending: {
    icon: Clock,
    label: "Pending",
    gradient: ["#F59E0B", "#D97706"],
  },
  rejected: {
    icon: X,
    label: "Needs Attention",
    gradient: ["#EF4444", "#DC2626"],
  },
  shipped: {
    icon: Truck,
    label: "Shipped",
    gradient: ["#06B6D4", "#0891B2"],
  },
  waiting: {
    icon: AlertCircle,
    label: "Unknown",
    gradient: ["#9CA3AF", "#6B7280"],
  },
} as const;

// Status configuration items for components (consolidated from statusData.ts)
export const STATUS_ITEMS = [
  {
    id: "all-orders",
    Icon: Package,
    label: "All Orders",
    gradient: ["#f65c5cff", "#ea1f11ff"] as [string, string],
  },
  {
    id: ProcessStatus.COMPLETED,
    Icon: Check,
    label: "Completed",
    gradient: ["#10B981", "#059669"] as [string, string],
  },
  {
    id: ProcessStatus.IN_PROGRESS,
    Icon: Zap,
    label: "In Progress",
    gradient: ["#3B82F6", "#2563EB"] as [string, string],
  },
  {
    id: ProcessStatus.PENDING,
    Icon: Clock,
    label: "Pending",
    gradient: ["#F59E0B", "#D97706"] as [string, string],
  },
  {
    id: ProcessStatus.CANCELLED,
    Icon: X,
    label: "Cancelled",
    gradient: ["#EF4444", "#DC2626"] as [string, string],
  },
] as const;
// Legacy export for backward compatibility
export const STATUS_FILTER_ITEMS = STATUS_ITEMS;

// Calculate dynamic counts for status filter items
export const calculateStatusCounts = (orders: Order[]) => {
  return STATUS_FILTER_ITEMS.map((item) => ({
    ...item,
    count: getStatusCount(orders, item.id),
  }));
};

// Helper function to normalize status values
const normalizeStatus = (status: string): string => {
  // Map enum values to actual API status values
  const statusMap: Record<string, string> = {
    "IN_PROGRESS": "In Progress",
    "COMPLETED": "Completed",
    "PENDING": "Pending",
    "CANCELLED": "Cancelled"
  };

  return statusMap[status] || status;
};

// Helper function to get count for a specific status
export const getStatusCount = (orders: Order[], status: string): number => {
  if (status === "all-orders") return orders.length;

  const normalizedStatus = normalizeStatus(status);
  return orders.filter((order) => order.status === normalizedStatus).length;
};

// Filter orders by status
export const filterOrdersByStatus = (
  orders: Order[],
  status: string
): Order[] => {
  if (status === "all-orders") return orders;

  const normalizedStatus = normalizeStatus(status);
  return orders.filter((order) => order.status === normalizedStatus);
};



export const getOrderStages = (order: Order) => {
  // const rawStatus = order.status;
  const status = order.status;

const stages = [
  {
    key: "orderPlaced",
    label: "Order Placed",
    icon: Package,
    status: "completed",
    date: order.createdAt.toString(),
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: Settings,
    status:
      status === "In Progress"
        ? "active"
        : status === "Completed"
        ? "completed"
        : "pending",
    date:
      status === "In Progress" || status === "Completed"
        ? order.updatedAt.toString()
        : "---",
  },
  {
    key: "finished",
    label: "Finished",
    icon: CheckCircle2,
    status: status === "Completed" ? "completed" : "pending",
    date: status === "Completed" ? order.updatedAt.toString() : "---",
  },
  {
    key: "canceled",
    label: "Canceled",
    icon: XCircle,
    status: status === "Cancelled" ? "active" : "pending",
    date: status === "Cancelled" ? order.updatedAt.toString() : "---",
  },
];


  return stages;
};

// Enhanced user process steps for landing page - Real dental lab workflow
export const USER_PROCESS_STEPS = [
  {
    id: 1,
    title: "New Order",
    icon: Package,
    completed: true,
    description: "Create and submit new dental case order",
  },
  {
    id: 2,
    title: "Material Selection",
    icon: Layers,
    completed: true,
    description: "Choose from premium dental materials (Zirconia, PFM, E-max)",
  },
  {
    id: 3,
    title: "Upload Case",
    icon: Upload,
    completed: true,
    description: "Upload dental impressions, photos, and specifications",
  },
  {
    id: 4,
    title: "Accept Case",
    icon: CheckCircle,
    completed: true,
    description: "Case review and acceptance confirmation",
  },
  {
    id: 5,
    title: "Scan or Cast",
    icon: Search,
    completed: false,
    description: "Digital scanning or physical cast preparation",
  },
  {
    id: 6,
    title: "Design",
    icon: Edit,
    completed: false,
    description: "CAD/CAM design and planning using ExoCAD",
  },
  {
    id: 7,
    title: "Try in",
    icon: User,
    completed: false,
    description: "Initial fit verification and adjustments",
  },
  {
    id: 8,
    title: "Milling",
    icon: Cog,
    completed: false,
    description: "Precision milling of the dental restoration",
  },
  {
    id: 9,
    title: "Finishing and Glazing",
    icon: Wrench,
    completed: false,
    description: "Surface finishing, staining, and glazing",
  },
  {
    id: 10,
    title: "Delivery",
    icon: Truck,
    completed: false,
    description: "Secure packaging and shipment to clinic",
  },
] as const;

// MAIN SERVICE OBJECT

// Main service object - now all dependencies are declared before use
const orderDataService = {
  // Data
  SAMPLE_ORDERS,
  STATUS_FILTER_ITEMS,

  // Utilities
  filterOrdersByStatus,
  calculateStatusCounts,
  getStatusCount,

  // Additional utilities
  getOrderStages,
  USER_PROCESS_STEPS,
};

export default orderDataService;
