// Consolidated type definitions for the entire application

import { LucideIcon } from "lucide-react";

// ORDER MANAGEMENT TYPES

export interface Order {
  id: string;
  patientName?: string;
  orderType: string;
  options?: {
    patientName?: string;
    age?: string;
    material?: string;
    note?: string;
    [key: string]: unknown;
  };
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  date: string;
  totalAmount: number;
  urgency: "Low" | "Medium" | "High";
  material: string;
  note: string;
  attachments?: FileAttachment[];
  createdAt: Date | string;
  updatedAt: Date | string;
  // Payment information
  paymentStatus?: "paid" | "unpaid";
  paymentMethod?: string;
  paymentDate?: Date | string;
  transactionId?: string;
  // Shipping and tracking information
  lab?: string;
  shippingCarrier?: string;
  trackingNumber?: string;
  // Manufacturing stages
  stages?: {
    orderPlaced?: { completed: boolean; completedAt?: string };
    digitalDesign?: { completed: boolean; completedAt?: string };
    manufacturing?: { completed: boolean; completedAt?: string };
    qualityControl?: { completed: boolean; completedAt?: string };
    shipped?: { completed: boolean; completedAt?: string };
  };
}

export interface OrderStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  totalRevenue: number;
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export interface ManufacturingStep {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  completedAt?: Date;
  icon: React.ComponentType<{ className?: string }>; // LucideIcon type
  completed: boolean;
}

export interface OrderFormData {
  patientName: string;
  age: string;
  // Service checkboxes
  zircon_preshaded?: boolean;
  zircon_multilayer?: boolean;
  zircon_ultra_multilayer?: boolean;
  zircon_cutback?: boolean;
  zircon_layering?: boolean;
  emax_press?: boolean;
  emax_cad?: boolean;
  emax_cad_ivoclar?: boolean;
  emax_cad_cutback?: boolean;
  emax_cad_layering?: boolean;
  implant_cobalt_chromium?: boolean;
  implant_nickle_chromium?: boolean;
  implant_titanium?: boolean;
  implant_gingiva?: boolean;
  implant_crown?: boolean;
  resin_tryin_printed?: boolean;
  model_printed?: boolean;
  guide_printed?: boolean;
  pmma_milled?: boolean;
  night_guard_china?: boolean;
  night_guard_brazil?: boolean;
  // Other fields
  attachment?: FileList;
  notes?: string;
}

// ORDER PROGRESS TYPES (NEW)

export interface OrderProgressProps {
  order: Order;
  showPercentage?: boolean;
  showTimeline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface ProgressStep {
  id: string;
  name: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  icon: React.ComponentType<{ className?: string }>;
  timestamp?: Date;
  estimatedCompletion?: Date;
}

export interface StepColors {
  bg: string;
  icon: string;
  border: string;
  text: string;
}

// COMPONENT PROPS TYPES

export interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats?: StatItem[];
}

export interface EventsSectionProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  events?: Event[];
}

export interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo[];
}

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

// DATA TYPES

export interface StatItem {
  number: string;
  label: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
  speaker?: {
    name: string;
    title: string;
    photo: string;
  };
  venue?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}
export interface Invoice {
  id: number | string;             
  clientId?: number;
  totalPrice: number;
  total?: number;            
  status?: "PENDING" | "PAID" | "CANCELLED" | "paid" | "unpaid" | string;
  isSummary?: boolean;
  paymentStatus?: "paid" | "unpaid"; 
  paymentMethod?: string;
  transactionId?: string;
  paymentDate?: Date;
  dueDate?: string;
  paidAt?: string | null;
  createdAt: string;
  updatedAt?: string;
}


export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ManufacturingProcessStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

// PROCESS & WORKFLOW TYPES

export interface ProcessStep {
  id: string;
  title: string;
  icon: LucideIcon;
  status: "completed" | "active" | "pending";
}

export interface WorkflowCard {
  step: string;
  title: string;
  description: string;
  iconName: "upload" | "creditCard" | "trendingUp" | "truck";
  iconComponent: React.ComponentType<{ size?: number; color?: string }>;
}

export interface Validation {
  pattern?: {
    value: string;
    message: string;
  };
  minLength?: number;
}

// FORM FIELD TYPES

export interface FormField {
  id: string;
  type: "text" | "checkbox" | "textarea" | "file" | "date" | "select";
  label: string;
  required?: boolean;
  validation?: Validation;
  options?: string[];
}

// COMPONENT-SPECIFIC TYPES

export interface PageContainerProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  onNewOrder?: () => void;
  onTrackOrder?: () => void;
  onShowOrdersTable?: () => void;
  onShowStatusOrders?: (status: string) => void;
}

export interface WelcomePageProps {
  onStartOrder: () => void;
  onViewOrders: () => void;
  onNewOrder?: () => void;
  onTrackOrder?: () => void;
  onShowOrdersTable?: () => void;
}

// RE-EXPORT TYPES FROM DESIGN SYSTEM

// Design system types
export type Typography = import("@/app/[locale]/design-system/typography").Typography;
export type ComponentStyles =
  import("@/app/[locale]/design-system/components").ComponentStyles;
export type AnimationConfig =
  import("@/app/[locale]/design-system/animations").AnimationConfig;
export type Gradients = import("@/app/[locale]/design-system/gradients").Gradients;
export type Colors = import("@/app/[locale]/design-system/colors").Colors;

// Lucide icon type
export type { LucideIcon } from "lucide-react";

// Re-export from dashboard interfaces
export type {
  ApiOrder,
  PaginatedOrdersResponse,
} from "@/app/[locale]/dashboard/interfaces/orders";
export type {
  OrderOptions,
  SelectedService,
  User,
} from "@/app/[locale]/dashboard/interfaces/orders";
