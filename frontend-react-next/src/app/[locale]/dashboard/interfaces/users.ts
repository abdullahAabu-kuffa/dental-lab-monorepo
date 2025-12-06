// interface Invoice {
//     id: number;
//     total: number;
//     status: string;
//     createdAt: string; // ISO date string
//     totalPrice:number
// }

import { Invoice } from "@/types";

interface Order {
    id: number;
    status: "Pending" | "Accepted" | "Rejected" | "In Progress";
    createdAt: string; // ISO date string
}

interface User {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    clinicName: string;
    clinicAddress: string;
    role: 'CLIENT' | 'ADMIN';
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    invoices: Invoice[];
    orders: Order[];
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface FetchUsersResponse {
    success: boolean;
    message: string;
    data: {
            users: User[];
        pagination: Pagination;
    };
}

export type { User, Invoice, Order, Pagination, FetchUsersResponse };