'use client';

import { useTokenRefresh } from '../hooks/useTokenRefresh';

export function TokenRefreshInitializer() {
  useTokenRefresh(); // This runs the hook
  return null; // Renders nothing
}
