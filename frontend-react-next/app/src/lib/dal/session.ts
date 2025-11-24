import { cookies } from 'next/headers';
import { jwtVerify, type JWTPayload as JoseJWTPayload } from 'jose';
import { redirect } from 'next/navigation';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// This is the shape you expect your JWT to have
export interface SessionPayload extends JoseJWTPayload {
  fullName: string;
  userId: number;
  email: string;
  role: 'CLIENT' | 'OWNER' | 'ADMIN';
  isVerified: boolean;
  isActive: boolean;
  iat: number;
  exp: number;
}

/**
 * Read and verify JWT from httpOnly cookie
 * This ONLY runs on the server (Server Component or Route Handler)
 */
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();      // no need for await here
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      console.log('No access token found in cookies');
      return null;
    }

    // Tell jwtVerify what payload type we expect
    const { payload } = await jwtVerify<SessionPayload>(token, JWT_SECRET);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.log('Token expired');
      return null;
    }

    return payload;
  } catch (error) {
    console.warn('Session verification failed:', error);
    return null;
  }
}

/**
 * Require authentication
 */
export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();

  if (!session) {
    // const { redirect } = await import('next/navigation');
    redirect('/login');
  }

  return session;
}

/**
 * Require specific role
 */
export async function requireRole(allowedRoles: string[]): Promise<SessionPayload> {
  const session = await requireAuth();

  if (!allowedRoles.includes(session.role)) {
    const { redirect } = await import('next/navigation');
    redirect('/');
  }

  return session;
}
