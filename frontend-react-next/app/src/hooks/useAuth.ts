"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch, refreshAccessToken } from "../lib/apiClient";
import { useEffect, useState } from "react";
import { getAccessToken } from "../auth/tokenStore";

type UserRole = "CLIENT" | "ADMIN" | "OTHER";

interface User {
  id: number;
  email: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  name: string;
}

async function fetchUser(): Promise<User | null> {
  const token = await getAccessToken();
  const res = await apiFetch("/api/users/me", {
    method: "GET",
    retryOn401: true,
  });

  if (!res.ok) return null;

  const json = await res.json();
  const apiUser = json?.data?.user;

  if (!apiUser) return null;

  return {
    id: apiUser.id,
    email: apiUser.email,
    role: apiUser.role,
    isVerified: apiUser.isVerified,
    isActive: apiUser.isActive,
    name: apiUser.fullName,
  };
}

export function useAuth() {
  // bootstrap state to ensure refresh runs before fetching user
  const [bootstrapDone, setBootstrapDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      try {
        await refreshAccessToken();
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
    staleTime: 1000 * 60 * 5,
    enabled: bootstrapDone,
  });

  return {
    user,
    loading: !bootstrapDone || isLoading,
    isAuthenticated: !!user,
    role: user?.role,
  };
}
