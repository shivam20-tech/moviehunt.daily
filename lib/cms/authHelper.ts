/**
 * lib/cms/authHelper.ts
 *
 * Session authentication helper for Admin API routes.
 * Checks both cookie (`admin_session`) and Authorization header (`Bearer <token>`).
 */

import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, SESSION_COOKIE, SessionPayload } from '@/lib/auth';

export async function requireAdminSession(req?: NextRequest): Promise<SessionPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE)?.value;
    } catch {
      // In test contexts where cookies() is unavailable
    }
  }

  if (!token) return null;

  return verifySession(token);
}
