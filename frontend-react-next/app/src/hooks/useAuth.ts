"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SessionPayload } from "../lib/dal/session";
type UserRole = "CLIENT" | "ADMIN" | "OWNER";

interface User {
  id: number;
  email: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  name: string;
}

async function fetchUser(): Promise<User | null> {



  const res = await fetch("/api/session", {
    method: "GET",
    credentials: "include",
  });


  if (!res.ok) return null;

  const sessionData: SessionPayload = await res.json();

  if (!sessionData) return null;

  return {
    id: sessionData.userId,
    email: sessionData.email,
    role: sessionData.role,
    isVerified: sessionData.isVerified,
    isActive: sessionData.isActive,
    name: sessionData.fullName
  };
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
