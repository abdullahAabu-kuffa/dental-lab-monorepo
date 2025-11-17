// Unified Orders Data - Single source of truth for all order components

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled' | 'Manufacturing' | 'Design Review' | 'Quality Check';

export interface UnifiedOrder {
  id: string;
  patientName: string;
  orderType: string;
  tooth?: string;
  price?: string; // Display price (e.g., "EGP 550")
  totalAmount: number; // Numeric amount for calculations
  status: OrderStatus;
  date: string;
  material?: string;
  urgency?: 'Low' | 'Medium' | 'High';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const UNIFIED_SAMPLE_ORDERS: UnifiedOrder[] = [
  {
    id: 'OSD-2847',
    patientName: 'Mohamed Ali',
    orderType: 'Crown - E-Max',
    tooth: '16',
    price: 'EGP 550',
    totalAmount: 550,
    status: 'Manufacturing',
    date: '2025-10-20',
    material: 'E-Max',
    urgency: 'Medium',
    createdAt: new Date('2025-10-20T09:30:00Z'),
    updatedAt: new Date('2025-10-21T14:20:00Z'),
    notes: 'Upper right first molar, color A2'
  },
  {
    id: 'OSD-2848',
    patientName: 'Fatma Ahmed',
    orderType: 'Bridge - Zirconia',
    tooth: '14-15',
    price: 'EGP 1200',
    totalAmount: 1200,
    status: 'Design Review',
    date: '2025-10-24',
    material: 'Zirconia',
    urgency: 'High',
    createdAt: new Date('2025-10-24T10:15:00Z'),
    updatedAt: new Date('2025-10-25T16:00:00Z'),
    notes: '3-unit bridge, front teeth'
  },
  {
    id: 'OSD-2849',
    patientName: 'Ali Hassan',
    orderType: 'Veneer - E-Max',
    tooth: '11',
    price: 'EGP 800',
    totalAmount: 800,
    status: 'Quality Check',
    date: '2025-10-22',
    material: 'E-Max',
    urgency: 'Low',
    createdAt: new Date('2025-10-22T11:30:00Z'),
    updatedAt: new Date('2025-10-23T09:45:00Z'),
    notes: 'Upper left central incisor'
  },
  {
    id: 'OSD-2850',
    patientName: 'Sara Mahmoud',
    orderType: 'Implant Crown',
    tooth: '36',
    price: 'EGP 1500',
    totalAmount: 1500,
    status: 'Completed',
    date: '2025-10-18',
    material: 'Titanium',
    urgency: 'Medium',
    createdAt: new Date('2025-10-18T13:00:00Z'),
    updatedAt: new Date('2025-10-25T11:15:00Z'),
    notes: 'Lower left first molar'
  },
  {
    id: 'OSD-2851',
    patientName: 'Omar Ahmed',
    orderType: 'Complete Denture',
    tooth: 'Upper',
    price: 'EGP 1800',
    totalAmount: 1800,
    status: 'In Progress',
    date: '2025-10-26',
    material: 'Acrylic',
    urgency: 'High',
    createdAt: new Date('2025-10-26T14:30:00Z'),
    updatedAt: new Date('2025-10-27T16:00:00Z'),
    notes: 'Complete upper denture'
  },
  {
    id: 'OSD-2852',
    patientName: 'Layla Mohamed',
    orderType: 'Bridge - PFM',
    tooth: '12-13-14',
    price: 'EGP 2200',
    totalAmount: 2200,
    status: 'Pending',
    date: '2025-10-27',
    material: 'PFM',
    urgency: 'Medium',
    createdAt: new Date('2025-10-27T08:45:00Z'),
    updatedAt: new Date('2025-10-27T08:45:00Z'),
    notes: '3-unit bridge, front teeth'
  }
];

// Utility functions
export const getStatusColor = (status: string) => {
  const colors = {
    'Manufacturing': 'bg-orange-500',
    'Design Review': 'bg-purple-500',
    'Quality Check': 'bg-green-500',
    'Completed': 'bg-blue-500',
    'In Progress': 'bg-blue-500',
    'Pending': 'bg-yellow-500',
    'Cancelled': 'bg-red-500'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

export const getStatusColorClasses = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-600 border-green-200';
    case 'In Progress':
    case 'Manufacturing':
      return 'bg-blue-100 text-blue-600 border-blue-200';
    case 'Pending':
    case 'Design Review':
      return 'bg-yellow-100 text-yellow-600 border-yellow-200';
    case 'Quality Check':
      return 'bg-purple-100 text-purple-600 border-purple-200';
    case 'Cancelled':
      return 'bg-red-100 text-red-600 border-red-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

export const getBackgroundColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'border-green-200 bg-green-50';
    case 'In Progress':
    case 'Manufacturing':
      return 'border-blue-200 bg-blue-50';
    case 'Pending':
    case 'Design Review':
      return 'border-yellow-200 bg-yellow-50';
    case 'Quality Check':
      return 'border-purple-200 bg-purple-50';
    case 'Cancelled':
      return 'border-red-200 bg-red-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

// Export the main data as SAMPLE_ORDERS for backward compatibility
export const SAMPLE_ORDERS = UNIFIED_SAMPLE_ORDERS;