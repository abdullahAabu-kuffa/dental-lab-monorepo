// 'use client';

// import { useTokenRefresh } from '../hooks/useTokenRefresh';

// export function TokenRefreshInitializer() {
//   useTokenRefresh(); // This runs the hook
//   return null; // Renders nothing
// }

"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export function TokenRefreshInitializer() {
  const initializeAuth = useAuthStore(s => s.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return null;
}