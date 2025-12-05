
export interface OrderOptions {
  note: string;
  age: string;
  patientName: string;
  selectedServices: SelectedService[];
}
export interface SelectedService {
  label: string;
  price: number;
}
export interface User {
    id: number,
  fullName: string,
    email: string,
    password: string,
    phoneNumber: string,
    clinicName: string,
    clinicAddress: string,
    role: string,
    isActive: boolean,
    isVerified: boolean,
    createdAt: string,
    updatedAt: string
}

export interface Order {
  id: number;
  userId: number;
  approvedBy: string | null;
  createdAt: string;
  type: string;
  date: string;
  note: string;
  options: OrderOptions;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED" | "CANCELLED";
  price: string;
  user: User;
}

export interface ApiOrder {
  id: number | string;
  approvedBy: string | null;
  createdAt: string;
  type: string;
  note: string;
  date: string;
  options: OrderOptions;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  totalPrice: string;
  user: User;
}

export interface PaginatedOrdersResponse {
  data: {
    orders: ApiOrder[];
    totalPages: number;
    totalOrders: number;
  };
}
