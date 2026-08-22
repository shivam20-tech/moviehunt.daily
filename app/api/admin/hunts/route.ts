/**
 * app/api/admin/hunts/route.ts
 *
 * Admin Hunts API:
 *   - GET  /api/admin/hunts -> list all hunts (admin only, filter by ?status=)
 *   - POST /api/admin/hunts -> create new Hunt or Draft
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/cms/authHelper';
import { readBlob, writeBlob, ConflictError } from '@/lib/cms/blobClient';
import { getHunts, getNextDayNumber, isDayNumberTaken, HuntStatus } from '@/lib/cms/getHunts';
import { validateHuntPayload } from '@/lib/cms/validation';
import { revalidatePublicHunts } from '@/lib/cms/revalidate';
import { HuntItem } from '@/data/hunts';

export async function GET(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const statusParam = (searchParams.get('status') || 'all') as HuntStatus;
    const hunts = await getHunts(statusParam);

    return NextResponse.json({
      success: true,
      count: hunts.length,
      hunts,
    });
  } catch (err) {
    console.error('[GET /api/admin/hunts] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hunts' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<HuntItem>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const isDraft = body.status === 'draft';

  // 1. Auto-assign next Day number if not supplied
  if (body.day === undefined || body.day === null) {
    body.day = await getNextDayNumber();
  }

  // 2. Validate payload
  const validation = validateHuntPayload(body, isDraft);
  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json(
      { success: false, error: validation.errors?.join(', ') || 'Validation failed' },
      { status: 400 },
    );
  }

  const newHunt = validation.sanitized;

  // 3. Read current catalog with version tracking (Optimistic Concurrency)
  let liveHunts: HuntItem[] = [];
  let version = '';
  try {
    const res = await readBlob<HuntItem[]>('hunts.json');
    liveHunts = res.data;
    version = res.version;
  } catch (err) {
    console.error('[POST /api/admin/hunts] Read error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to read current catalog from storage' },
      { status: 500 },
    );
  }

  // 4. Check for duplicate ID
  if (liveHunts.some((h) => h.id === newHunt.id)) {
    return NextResponse.json(
      { success: false, error: `Hunt ID "${newHunt.id}" already exists. Please choose a different ID or title.` },
      { status: 400 },
    );
  }

  // 5. Check for duplicate Day number (Safeguard #6)
  if (liveHunts.some((h) => h.day === newHunt.day)) {
    return NextResponse.json(
      { success: false, error: `Day ${newHunt.day} already exists. Please choose another Day number.` },
      { status: 400 },
    );
  }

  // 6. Append and safely write with version check
  const updatedCatalog = [...liveHunts, newHunt];

  try {
    await writeBlob('hunts.json', updatedCatalog, version);
  } catch (err) {
    if (err instanceof ConflictError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Catalog changed since you loaded it. Please refresh and try again.',
        },
        { status: 409 },
      );
    }
    console.error('[POST /api/admin/hunts] Write error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to save hunt to storage' },
      { status: 500 },
    );
  }

  // 7. Trigger on-demand cache revalidation if published
  if (newHunt.status === 'published') {
    revalidatePublicHunts(newHunt.id);
  }

  return NextResponse.json(
    {
      success: true,
      hunt: newHunt,
    },
    { status: 201 },
  );
}
