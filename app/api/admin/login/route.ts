import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signSession, SESSION_COOKIE, SESSION_DURATION_SECONDS } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body as { password?: string };

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
    }

    // Fallback to MovieHunt@2026 hash if env variable is not set locally
    const storedHash = process.env.ADMIN_PASSWORD_HASH || '$2b$12$elkuGaw3ERfm00wgp7R5XOSNt8mGfT9ZDU.NRL0rpNGf9AZrFwMDW';

    const isValid = await bcrypt.compare(password, storedHash);
    if (!isValid) {
      // Constant-time-ish response — avoid timing attacks
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    // Sign a JWT session token with role embedded for future role-based access
    const token = await signSession({ sub: 'admin', role: 'admin' });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (err) {
    console.error('[admin/login] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
