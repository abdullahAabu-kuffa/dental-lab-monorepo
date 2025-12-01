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

export const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-001",
    patientName: "Ahmed Hassan",
    orderType: "Crown",
    status: "Completed",
    date: "2024-01-15",
    totalAmount: 2500,
    urgency: "Medium",
    material: "Zirconia",
    notes: "Upper left molar, color A2",
    createdAt: new Date("2024-01-15T09:00:00Z"),
    updatedAt: new Date("2024-01-18T16:30:00Z"),
    lab: "Precision Dental Labs",
    shippingCarrier: "FedEx",
    trackingNumber: "FX123456789EG",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    paymentDate: new Date("2024-01-15T09:15:00Z"),
    transactionId: "TXN123456789",
    stages: {
      orderPlaced: { completed: true, completedAt: "2024-01-15" },
      digitalDesign: { completed: true, completedAt: "2024-01-16" },
      manufacturing: { completed: true, completedAt: "2024-01-17" },
      qualityControl: { completed: true, completedAt: "2024-01-18" },
      shipped: { completed: true, completedAt: "2024-01-18" },
    },
  },
  {
    id: "ORD-002",
    patientName: "Fatima Ali",
    orderType: "Bridge",
    status: "In Progress",
    date: "2024-01-16",
    totalAmount: 4200,
    urgency: "High",
    material: "PFM",
    notes: "3-unit bridge, front teeth",
    createdAt: new Date("2024-01-16T10:15:00Z"),
    updatedAt: new Date("2024-01-20T14:20:00Z"),
    lab: "Elite Dental Solutions",
    shippingCarrier: "DHL",
    trackingNumber: "DH987654321EG",
    paymentStatus: "unpaid",
    paymentMethod: "Bank Transfer",
    stages: {
      orderPlaced: { completed: true, completedAt: "2024-01-16" },
      digitalDesign: { completed: true, completedAt: "2024-01-18" },
      manufacturing: { completed: false, completedAt: "In Progress" },
      qualityControl: { completed: false, completedAt: "Pending" },
      shipped: { completed: false, completedAt: "Pending" },
    },
  },
  {
    id: "ORD-003",
    patientName: "Mohamed Khaled",
    orderType: "Implant",
    status: "Completed",
    date: "2024-01-17",
    totalAmount: 3500,
    urgency: "Low",
    material: "Titanium",
    notes: "Lower right premolar",
    createdAt: new Date("2024-01-17T11:30:00Z"),
    updatedAt: new Date("2024-01-22T09:45:00Z"),
    lab: "Advanced Dental Arts",
    shippingCarrier: "UPS",
    trackingNumber: "1Z999AA10123456784",
    paymentStatus: "paid",
    paymentMethod: "Cash",
    paymentDate: new Date("2024-01-17T11:45:00Z"),
    transactionId: "TXN987654321",
    stages: {
      orderPlaced: { completed: true, completedAt: "2024-01-17" },
      digitalDesign: { completed: true, completedAt: "2024-01-19" },
      manufacturing: { completed: true, completedAt: "2024-01-21" },
      qualityControl: { completed: true, completedAt: "2024-01-22" },
      shipped: { completed: true, completedAt: "2024-01-22" },
    },
  },
  {
    id: "ORD-004",
    patientName: "Sara Mahmoud",
    orderType: "Denture",
    status: "Completed",
    date: "2024-01-18",
    totalAmount: 1800,
    urgency: "Medium",
    material: "Acrylic",
    notes: "Complete upper denture",
    createdAt: new Date("2024-01-18T13:00:00Z"),
    updatedAt: new Date("2024-01-25T11:15:00Z"),
    lab: "Precision Dental Labs",
    shippingCarrier: "Aramex",
    trackingNumber: "AR1234567890",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    paymentDate: new Date("2024-01-18T13:15:00Z"),
    transactionId: "TXN456789123",
    stages: {
      orderPlaced: { completed: true, completedAt: "2024-01-18" },
      digitalDesign: { completed: true, completedAt: "2024-01-20" },
      manufacturing: { completed: true, completedAt: "2024-01-23" },
      qualityControl: { completed: true, completedAt: "2024-01-24" },
      shipped: { completed: true, completedAt: "2024-01-25" },
    },
  },
  {
    id: "ORD-005",
    patientName: "Omar Ahmed",
    orderType: "Crown",
    status: "In Progress",
    date: "2024-01-19",
    totalAmount: 2200,
    urgency: "High",
    material: "E-max",
    notes: "Lower left canine",
    createdAt: new Date("2024-01-19T14:30:00Z"),
    updatedAt: new Date("2024-01-21T16:00:00Z"),
    lab: "Elite Dental Solutions",
    paymentStatus: "unpaid",
    stages: {
      orderPlaced: { completed: true, completedAt: "2024-01-19" },
      digitalDesign: { completed: true, completedAt: "2024-01-21" },
      manufacturing: { completed: false, completedAt: "In Progress" },
      qualityControl: { completed: false, completedAt: "Pending" },
      shipped: { completed: false, completedAt: "Pending" },
    },
  },
  {
    id: "ORD-006",
    patientName: "Layla Mohamed",
    orderType: "Bridge",
    status: "Completed",
    date: "2024-01-20",
    totalAmount: 3800,
    urgency: "Medium",
    material: "Zirconia",
    notes: "4-unit posterior bridge",
    createdAt: new Date("2024-01-20T08:45:00Z"),
    updatedAt: new Date("2024-01-23T13:30:00Z"),
    lab: "Advanced Dental Arts",
    shippingCarrier: "FedEx",
    trackingNumber: "FX987654321EG",
    paymentStatus: "paid",
    paymentMethod: "Bank Transfer",
    paymentDate: new Date("2024-01-20T09:00:00Z"),
    transactionId: "TXN789123456",
    stages: {
      orderPlaced: { completed: true, completedAt: "2024-01-20" },
      digitalDesign: { completed: true, completedAt: "2024-01-21" },
      manufacturing: { completed: true, completedAt: "2024-01-22" },
      qualityControl: { completed: true, completedAt: "2024-01-23" },
      shipped: { completed: true, completedAt: "2024-01-23" },
    },
  },
  {
    id: "ORD-007",
    patientName: "Youssef Ibrahim",
    orderType: "Crown",
    status: "Pending",
    date: "2024-01-21",
    totalAmount: 1900,
    urgency: "Low",
    material: "Gold",
    notes: "Lower right molar, requires adjustment",
    createdAt: new Date("2024-01-21T11:00:00Z"),
    updatedAt: new Date("2024-01-21T11:00:00Z"),
    lab: "Precision Dental Labs",
    paymentStatus: "unpaid",
    stages: {
      orderPlaced: { completed: true, completedAt: "2024-01-21" },
      digitalDesign: { completed: false, completedAt: "Pending" },
      manufacturing: { completed: false, completedAt: "Pending" },
      qualityControl: { completed: false, completedAt: "Pending" },
      shipped: { completed: false, completedAt: "Pending" },
    },
  },
  {
    id: "ORD-008",
    patientName: "Nadia Sayed",
    orderType: "Veneers",
    status: "Pending",
    date: "2024-01-22",
    totalAmount: 3200,
    urgency: "High",
    material: "Porcelain",
    notes: "8-unit veneers for cosmetic enhancement",
    createdAt: new Date("2024-01-22T14:30:00Z"),
    updatedAt: new Date("2024-01-22T14:30:00Z"),
    lab: "Elite Dental Solutions",
    paymentStatus: "unpaid",
    paymentMethod: "Credit Card",
    stages: {
      orderPlaced: { completed: true, completedAt: "2024-01-22" },
      digitalDesign: { completed: false, completedAt: "In Queue" },
      manufacturing: { completed: false, completedAt: "Pending" },
      qualityControl: { completed: false, completedAt: "Pending" },
      shipped: { completed: false, completedAt: "Pending" },
    },
  },
];

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

// Helper function to get count for a specific status
export const getStatusCount = (orders: Order[], status: string): number => {
  if (status === "all-orders") return orders.length;
  if(!orders|| !Array.isArray(orders)) return 0;
  return orders.filter((order) => order.status === status).length;
};

// Filter orders by status
export const filterOrdersByStatus = (
  orders: Order[],
  status: string
): Order[] => {
  if (status === "all-orders") return orders;
  console.log("orders : " ,orders);
  if(!orders|| !Array.isArray(orders)) return [];
  return orders.filter((order) => order.status === status);
};

// Get detailed stage information for an order
// export const getOrderStages = (order: Order) => {
//   const stages = [
//     {
//       key: "orderPlaced",
//       label: "Order Placed",
//       icon: Package,
//       status: order?.status === "PENDING" ,
//       date: order.stages?.orderPlaced?.completedAt || "---",
//     },
//     {
//       key: "digitalDesign",
//       label: "Digital Design & Planning",
//       icon: Eye,
//       status: order.stages?.digitalDesign?.completed
//         ? "completed"
//         : order.stages?.orderPlaced?.completed
//         ? "active"
//         : "pending",
//       date: order.stages?.digitalDesign?.completedAt || "---",
//     },
//     {
//       key: "manufacturing",
//       label: "Manufacturing & Fabrication",
//       icon: Settings,
//       status: order.stages?.manufacturing?.completed
//         ? "completed"
//         : order.stages?.digitalDesign?.completed
//         ? "active"
//         : "pending",
//       date: order.stages?.manufacturing?.completedAt || "---",
//     },
//     {
//       key: "qualityControl",
//       label: "Quality Control & Inspection",
//       icon: Microscope,
//       status: order.stages?.qualityControl?.completed
//         ? "completed"
//         : order.stages?.manufacturing?.completed
//         ? "active"
//         : "pending",
//       date: order.stages?.qualityControl?.completedAt || "---",
//     },
//     {
//       key: "shipped",
//       label: "Packaged & Shipped",
//       icon: Truck,
//       status: order.stages?.shipped?.completed
//         ? "completed"
//         : order.stages?.qualityControl?.completed
//         ? "active"
//         : "pending",
//       date: order.stages?.shipped?.completedAt || "---",
//     },
//   ];

//   return stages;
// };

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
