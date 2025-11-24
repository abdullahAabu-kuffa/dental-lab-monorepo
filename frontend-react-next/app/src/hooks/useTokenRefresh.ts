import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { refreshAccessToken } from '../actions/refreshToken';

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

/**
 * Hook: Automatically refresh token every 15 minutes
 * Handles all edge cases (expired, invalid, network errors)
 */
export function useTokenRefresh() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const failureCountRef = useRef(0);
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const performRefresh = async () => {
      console.log('[Auth] Refreshing token...');

      const result = await refreshAccessToken();
      console.log('[Auth] Refresh result:', result);

      // ✅ SUCCESS
      if (result.success) {
        console.log('[Auth] ✅ Token refreshed successfully');
        failureCountRef.current = 0; // Reset failure counter
        queryClient.invalidateQueries({ queryKey: ['user'] });
        return;
      }

      // ❌ SESSION EXPIRED (401 from Express)
      if (result.error === 'expired' && !hasRedirectedRef.current) {
        console.error('[Auth] ❌ Session expired (refresh token invalid/expired)');
        hasRedirectedRef.current = true;
        
        // Clear user queries
        queryClient.removeQueries({ queryKey: ['user'] });
        
        // Redirect to login with reason
        router.push('/login?reason=session_expired');
        return;
      }

      // ⚠️ NETWORK ERROR
      if (result.error === 'network') {
        failureCountRef.current++;
        console.warn(
          `[Auth] ⚠️  Refresh network error (attempt ${failureCountRef.current}/3)`
        );

        // After 3 consecutive failures, assume session is lost
        if (failureCountRef.current >= 3 && !hasRedirectedRef.current) {
          console.error('[Auth] Too many refresh failures - redirecting');
          hasRedirectedRef.current = true;
          
          queryClient.removeQueries({ queryKey: ['user'] });
          router.push('/login?reason=connection_lost');
        }
        return;
      }
    };

    // Initial refresh immediately
    performRefresh();

    // Set up periodic refresh (every 15 minutes)
     // eslint-disable-next-line prefer-const
     interval = setInterval(performRefresh, REFRESH_INTERVAL);

    // Also refresh when user returns to app
    const handleFocus = async () => {
      console.log('[Auth] Window focused - refreshing token...');
      await performRefresh();
    };

    window.addEventListener('focus', handleFocus);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [queryClient, router]);
}
