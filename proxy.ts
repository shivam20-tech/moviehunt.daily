import { NextRequest, NextResponse } from 'next/server';
import { verifySession, SESSION_COOKIE } from '@/lib/auth';

// Protect all /admin/* routes except /admin/login
export const config = {
  matcher: ['/admin/:path*'],
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow the login page through
  if (pathname === '/admin/login') {
    // If already authenticated, redirect to overview
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (token) {
      const session = await verifySession(token);
      if (session) {
        return NextResponse.redirect(new URL('/admin/overview', req.url));
      }
    }
    return NextResponse.next();
  }

  // All other /admin/* routes require a valid session
  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const session = await verifySession(token);
  if (!session) {
    // Token exists but is invalid or expired — clear it and redirect
    const response = NextResponse.redirect(new URL('/admin/login', req.url));
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  // Valid session — allow through
  return NextResponse.next();
}
