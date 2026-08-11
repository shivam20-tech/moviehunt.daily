import { SignJWT, jwtVerify } from 'jose';

// ─── Session Payload ──────────────────────────────────────────────────────────
// Role is included from v1 to support Admin / Editor / Contributor later
// without rebuilding the auth system.
export type UserRole = 'admin' | 'editor' | 'contributor';

export interface SessionPayload {
  sub: string;          // user identifier, e.g. "admin"
  role: UserRole;
  iat?: number;
  exp?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET || 'moviehunt_dev_session_secret_default_32chars_long';
  return new TextEncoder().encode(secret);
}

const SESSION_COOKIE = 'admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24 hours

// ─── Sign ─────────────────────────────────────────────────────────────────────
export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());
}

// ─── Verify ───────────────────────────────────────────────────────────────────
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────
export { SESSION_COOKIE, SESSION_DURATION_SECONDS };
