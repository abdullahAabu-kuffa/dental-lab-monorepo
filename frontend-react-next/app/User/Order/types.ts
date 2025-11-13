export interface Order {
  id: string;
  patientName: string;
  orderType: 'Crown' | 'Bridge' | 'Denture' | 'Implant' | 'Other';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  date: string;
  totalAmount: number;
  urgency: 'Low' | 'Medium' | 'High';
  material: string;
  notes?: string;
}

export interface OrderStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  totalRevenue: number;
}

export interface OrderStatsCard {
  id: number;
  label: string;
  labelAr: string;
  count: number | string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
  isRevenue?: boolean;
}