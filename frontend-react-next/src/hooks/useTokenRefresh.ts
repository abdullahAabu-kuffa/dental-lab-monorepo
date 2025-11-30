// import { useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { useQueryClient } from '@tanstack/react-query';

// const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

// export function useTokenRefresh() {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const failureCountRef = useRef(0);
//   const hasRedirectedRef = useRef(false);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     const performRefresh = async () => {
//       console.log('[Auth] Refreshing token...');

//       try {
//         // Call the Next.js Route Handler, NOT the Server Action
//         const response = await fetch('/app-api/refreshToken', {
//           method: 'POST',
//           credentials: 'include', // So browser sends cookies
//         });

//         if (response.ok) {
//           console.log('[Auth] ✅ Token refreshed successfully');
//           failureCountRef.current = 0;
//           queryClient.invalidateQueries({ queryKey: ['user'] });
//           return;
//         }

//         // Handle session expired
//         if (response.status === 401 && !hasRedirectedRef.current) {
//           console.warn('[Auth] ❌ Session expired (refresh token invalid/expired)');
//           hasRedirectedRef.current = true;
//           queryClient.removeQueries({ queryKey: ['user'] });
//           router.push('/login?reason=session_expired');
//           return;
//         }

//         // Handle network error (any other error)
//         failureCountRef.current++;
//         console.warn(
//           `[Auth] ⚠️  Refresh failed (attempt ${failureCountRef.current}/3)`
//         );
//         if (failureCountRef.current >= 3 && !hasRedirectedRef.current) {
//           console.warn('[Auth] Too many refresh failures - redirecting');
//           hasRedirectedRef.current = true;
//           queryClient.removeQueries({ queryKey: ['user'] });
//           router.push('/login?reason=connection_lost');
//         }
//       } catch (error) {
//         console.warn('[Auth] Network error:', error);
//         failureCountRef.current++;
//         if (failureCountRef.current >= 3 && !hasRedirectedRef.current) {
//           hasRedirectedRef.current = true;
//           router.push('/login?reason=connection_lost');
//         }
//       }
//     };

//     // Initial refresh immediately
//     performRefresh();

//     // Set up periodic refresh (every 15 minutes)
//     // eslint-disable-next-line prefer-const
//     interval = setInterval(performRefresh, REFRESH_INTERVAL);

//     // Cleanup on unmount
//     return () => {
//       clearInterval(interval);
//       // window.removeEventListener('focus', handleFocus);
//     };
//   }, [queryClient, router]);
// }
