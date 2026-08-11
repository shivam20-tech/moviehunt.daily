import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  // Clear the session cookie
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0, // Immediate expiry
  });
  return response;
}
