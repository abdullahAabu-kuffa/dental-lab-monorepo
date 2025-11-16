import type { Order, OrderStats } from '../../../User/Order/types';

// Sample orders data
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
    notes: 'Upper left molar, color A2'
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
    notes: '3-unit bridge, front teeth'
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
    notes: 'Lower right premolar'
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
    notes: 'Complete upper denture'
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
    notes: 'Lower left canine'
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
    notes: '4-unit posterior bridge'
  },

  
];

// Calculate stats from orders data
export const calculateOrderStats = (orders: Order[]): OrderStats => {
  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    inProgress: orders.filter(o => o.status === 'In Progress').length,
    completed: orders.filter(o => o.status === 'Completed').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
  };
};

// Default stats using sample data
export const DEFAULT_ORDER_STATS: OrderStats = calculateOrderStats(SAMPLE_ORDERS);