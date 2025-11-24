// app/actions/refreshToken.ts
'use server';

import { cookies } from 'next/headers';

export async function refreshAccessToken() {
  try {
    // ✅ KEY FIX: Read cookie manually
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      console.warn('[Auth] No refresh token found');
      return { error: 'expired', status: 401 };
    }

    // ✅ KEY FIX: Forward via Cookie header
    const response = await fetch(
      `${process.env.auth_local_ip}api/auth/refreshToken`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `${refreshToken}`,  // ← Send cookie here
        },
      }
    );

    if (response.ok) {
      console.log('[Auth] ✅ Token refreshed');
      return { success: true };
    }

    if (response.status === 401) {
      console.warn('[Auth] ❌ Token expired');
      return { error: 'expired', status: 401 };
    }

    console.error('[Auth] Refresh failed:', response.status);
    return { error: 'network', status: response.status };

  } catch (error) {
    console.error('[Auth] Network error:', error);
    return { error: 'network' };
  }
}
