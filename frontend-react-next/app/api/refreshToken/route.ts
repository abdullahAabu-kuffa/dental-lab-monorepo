import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const HostIP = process.env.auth_local_ip;

export async function POST(req: Request) {
  try {
    // 1. Read refreshToken from browser cookies
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }
          const userAgent = req.headers.get('user-agent') || 'unknown';


    // 2. Forward to Express (WITHOUT credentials: 'include')
    const upstream = await fetch(`${HostIP}api/auth/refreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-agent': userAgent,
        'Cookie': `refreshToken=${refreshToken}`,
      },
      credentials:"include",
      body: JSON.stringify({ clientType: 'web' }),
    });

    // 3. Extract and forward Set-Cookie headers
    const setCookies = upstream.headers.getSetCookie?.() ?? [];
    const response = NextResponse.json({ success: true });
    console.log('[Route] Set-Cookie headers:', setCookies);
    setCookies.forEach(cookie => {
      response.headers.append('Set-Cookie', cookie);
    });

    return response;

  } catch (error) {
    console.error('[Route] Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
