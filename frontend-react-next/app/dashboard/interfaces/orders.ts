
export interface Options {
  [key: string]: string | number | boolean | null | undefined;
}

export interface User {
  clinicAddress: string;
  clinicName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface Order {
  id: string;
  approvedBy: string | null;
  createdAt: string;
  type: string;
  date: string;
  options: Options;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED" | "CANCELLED";
  price: string;
  user: User;
}

export interface ApiOrder {
  id: number | string;
  approvedBy: string | null;
  createdAt: string;
  type: string;
  date: string;
  options: Options;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
  totalPrice: string;
  user: User;
}

export interface PaginatedOrdersResponse {
  data: {
    orders: ApiOrder[];
    totalPages: number;
  };
}
