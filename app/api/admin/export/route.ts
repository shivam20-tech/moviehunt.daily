/**
 * app/api/admin/export/route.ts
 *
 * Admin-only full catalog export endpoint — Safeguard #2.
 *
 * Returns a complete JSON backup including ALL hunts (published, draft, archived)
 * and all collections, with a timestamped filename for download.
 *
 * Requires valid admin session cookie.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, SESSION_COOKIE } from '@/lib/auth';
import { getHunts } from '@/lib/cms/getHunts';
import { getCollections } from '@/lib/cms/getCollections';

export async function GET(req: NextRequest) {
  // ── Auth guard ─────────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  // ── Fetch all data ─────────────────────────────────────────────────────────
  const [hunts, collections] = await Promise.all([
    getHunts('all'),
    getCollections(),
  ]);

  const exportedAt = new Date().toISOString();
  const published = hunts.filter((h) => h.status === 'published' || !h.status);
  const drafts = hunts.filter((h) => h.status === 'draft');
  const archived = hunts.filter((h) => h.status === 'archived');

  const exportData = {
    exportedAt,
    exportedBy: session.sub,
    summary: {
      totalHunts: hunts.length,
      published: published.length,
      drafts: drafts.length,
      archived: archived.length,
      collections: collections.length,
    },
    hunts,
    collections,
  };

  // ── Build timestamped filename ─────────────────────────────────────────────
  const ts = exportedAt.replace(/[:.]/g, '-').slice(0, 19); // e.g. 2026-08-22T20-00-00
  const filename = `moviehunt-catalog-${ts}.json`;

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
