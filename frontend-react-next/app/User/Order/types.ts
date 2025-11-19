// Re-export all order-related types from the consolidated types file
export type {
  Order,
  OrderStats,
  FileAttachment,
  ManufacturingStep,
  OrderFormData
} from '../../src/types';

// Also re-export any order-specific props
export type {
  WelcomePageProps
} from '../../src/types';

// OrderDetails component props
export interface OrderDetailsPanelProps {
  order: {
    id: string;
    patientName: string;
    date: string;
    totalAmount: number;
    status: string;
    urgency: string;
    orderType: string;
    material: string;
    notes?: string;
  };
}