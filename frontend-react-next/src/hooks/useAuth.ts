"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/apiClient";

export interface Invoice {
  id: number;
  clientId: number;
  totalPrice: number;
  isSummary: boolean;
  status: "PENDING" | "PAID" | "CANCELLED";
  dueDate: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface UserWithInvoices {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  clinicName: string;
  clinicAddress: string;
  role: "CLIENT" | "ADMIN" | "OWNER";
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  invoices: Invoice[];
}
export interface ClientDashboardResponse {
  status: "success" | "error";
  message: string;
  data: {
    user: UserWithInvoices;
  };
}

async function fetchUser(): Promise<ClientDashboardResponse> {
  const res = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch User Data");
  const json = await res.json();
  return json;

}

export function useAuth() {
  // bootstrap state to ensure refresh runs before fetching user
  const [bootstrapDone, setBootstrapDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      try {
        // await refreshAccessToken();
      } finally {
        if (!cancelled) setBootstrapDone(true);
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 35, 
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    user,
    loading: !bootstrapDone || isLoading,
    isAuthenticated: !!user,
    role: user?.data.user.role,
  };
}
