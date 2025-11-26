// Static data for invoice orders
import { Order } from "../../../src/types";

// Sample static orders for the invoice page
export const staticInvoiceOrders: Order[] = [
  {
    id: "INV-001",
    patientName: "أحمد محمد علي",
    orderType: "Crown - Zircon",
    status: "In Progress",
    date: "2025-11-20",
    totalAmount: 2500,
    urgency: "High",
    material: "Zirconia",
    notes: "Patient requires immediate crown placement for front tooth",
    createdAt: "2025-11-20T10:30:00Z",
    updatedAt: "2025-11-22T14:45:00Z",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    paymentDate: "2025-11-20T11:00:00Z",
    transactionId: "TXN_20251120001",
    lab: "Elite Dental Lab",
    shippingCarrier: "FedEx",
    trackingNumber: "FDX123456789",
    stages: {
      orderPlaced: { completed: true, completedAt: "2025-11-20T10:35:00Z" },
      digitalDesign: { completed: true, completedAt: "2025-11-21T09:00:00Z" },
      manufacturing: { completed: true, completedAt: "2025-11-22T16:00:00Z" },
      qualityControl: { completed: false },
      shipped: { completed: false }
    }
  },
  {
    id: "INV-002", 
    patientName: "فاطمة أحمد حسن",
    orderType: "Bridge - Emax",
    status: "Completed",
    date: "2025-11-18",
    totalAmount: 4200,
    urgency: "Medium",
    material: "IPS e.max",
    notes: "Three-unit bridge for posterior teeth",
    createdAt: "2025-11-18T14:15:00Z",
    updatedAt: "2025-11-24T10:30:00Z",
    paymentStatus: "paid",
    paymentMethod: "Bank Transfer",
    paymentDate: "2025-11-18T15:00:00Z",
    transactionId: "TXN_20251118002",
    lab: "Precision Dental Studio",
    shippingCarrier: "DHL",
    trackingNumber: "DHL987654321",
    stages: {
      orderPlaced: { completed: true, completedAt: "2025-11-18T14:20:00Z" },
      digitalDesign: { completed: true, completedAt: "2025-11-19T11:30:00Z" },
      manufacturing: { completed: true, completedAt: "2025-11-21T15:45:00Z" },
      qualityControl: { completed: true, completedAt: "2025-11-22T09:15:00Z" },
      shipped: { completed: true, completedAt: "2025-11-24T08:00:00Z" }
    }
  },
  {
    id: "INV-003",
    patientName: "محمود عبدالله",
    orderType: "Veneer - Porcelain",
    status: "Pending",
    date: "2025-11-25",
    totalAmount: 1800,
    urgency: "High",
    material: "Porcelain",
    notes: "Eight veneers for upper anterior teeth",
    createdAt: "2025-11-25T09:45:00Z",
    updatedAt: "2025-11-25T09:45:00Z",
    paymentStatus: "unpaid",
    paymentMethod: "",
    paymentDate: undefined,
    transactionId: "",
    lab: "Cosmetic Dental Arts",
    stages: {
      orderPlaced: { completed: true, completedAt: "2025-11-25T09:50:00Z" },
      digitalDesign: { completed: false },
      manufacturing: { completed: false },
      qualityControl: { completed: false },
      shipped: { completed: false }
    }
  },
  {
    id: "INV-004",
    patientName: "سارة محمد إبراهيم",
    orderType: "Implant Crown",
    status: "In Progress", 
    date: "2025-11-23",
    totalAmount: 3200,
    urgency: "Medium",
    material: "Titanium",
    notes: "Single implant crown with custom abutment",
    createdAt: "2025-11-23T16:20:00Z",
    updatedAt: "2025-11-24T13:15:00Z",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    paymentDate: "2025-11-23T16:45:00Z",
    transactionId: "TXN_20251123003",
    lab: "Advanced Implant Solutions",
    shippingCarrier: "UPS",
    trackingNumber: "UPS456789123",
    stages: {
      orderPlaced: { completed: true, completedAt: "2025-11-23T16:25:00Z" },
      digitalDesign: { completed: true, completedAt: "2025-11-24T10:00:00Z" },
      manufacturing: { completed: false },
      qualityControl: { completed: false },
      shipped: { completed: false }
    }
  },
  {
    id: "INV-005",
    patientName: "خالد أحمد",
    orderType: "Denture - Partial",
    status: "Completed",
    date: "2025-11-15",
    totalAmount: 2800,
    urgency: "Low", 
    material: "Acrylic",
    notes: "Partial denture for lower right quadrant",
    createdAt: "2025-11-15T11:00:00Z",
    updatedAt: "2025-11-20T16:30:00Z",
    paymentStatus: "paid",
    paymentMethod: "Cash",
    paymentDate: "2025-11-15T11:30:00Z",
    transactionId: "CSH_20251115004",
    lab: "Quality Denture Lab",
    shippingCarrier: "Local Delivery",
    trackingNumber: "LD20251120001",
    stages: {
      orderPlaced: { completed: true, completedAt: "2025-11-15T11:05:00Z" },
      digitalDesign: { completed: true, completedAt: "2025-11-16T14:00:00Z" },
      manufacturing: { completed: true, completedAt: "2025-11-18T11:30:00Z" },
      qualityControl: { completed: true, completedAt: "2025-11-19T09:45:00Z" },
      shipped: { completed: true, completedAt: "2025-11-20T14:00:00Z" }
    }
  },
  {
    id: "INV-006",
    patientName: "نورا حسن",
    orderType: "Night Guard",
    status: "Pending",
    date: "2025-11-25",
    totalAmount: 750,
    urgency: "Medium",
    material: "Hard Acrylic",
    notes: "Custom night guard for bruxism treatment",
    createdAt: "2025-11-25T13:15:00Z",
    updatedAt: "2025-11-25T13:15:00Z",
    paymentStatus: "unpaid",
    paymentMethod: "",
    paymentDate: undefined,
    transactionId: "",
    lab: "Sleep Dental Solutions",
    stages: {
      orderPlaced: { completed: true, completedAt: "2025-11-25T13:20:00Z" },
      digitalDesign: { completed: false },
      manufacturing: { completed: false },
      qualityControl: { completed: false },
      shipped: { completed: false }
    }
  }
];

// Helper function to get order by ID
export const getOrderById = (id: string): Order | undefined => {
  return staticInvoiceOrders.find(order => order.id === id);
};

// Helper function to get paid orders only
export const getPaidOrders = (): Order[] => {
  return staticInvoiceOrders.filter(order => order.paymentStatus === 'paid');
};

// Helper function to get unpaid orders only  
export const getUnpaidOrders = (): Order[] => {
  return staticInvoiceOrders.filter(order => order.paymentStatus === 'unpaid');
};

// Helper function to get orders by status
export const getOrdersByStatus = (status: string): Order[] => {
  return staticInvoiceOrders.filter(order => order.status === status);
};

// Get static orders statistics
export const getInvoiceStats = () => {
  const total = staticInvoiceOrders.length;
  const paid = getPaidOrders().length;
  const unpaid = getUnpaidOrders().length;
  const totalRevenue = staticInvoiceOrders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  return {
    total,
    paid,
    unpaid,
    totalRevenue
  };
};