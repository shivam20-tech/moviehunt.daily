/**
 * app/api/admin/hunts/[id]/route.ts
 *
 * Admin Single Hunt API:
 *   - GET    /api/admin/hunts/[id] -> get hunt by ID (any status)
 *   - PUT    /api/admin/hunts/[id] -> update hunt (partial merge, duplicate checks, revalidation)
 *   - DELETE /api/admin/hunts/[id] -> soft-archive hunt (status = "archived")
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/cms/authHelper';
import { readBlob, writeBlob, ConflictError } from '@/lib/cms/blobClient';
import { validateHuntPayload } from '@/lib/cms/validation';
import { revalidatePublicHunts } from '@/lib/cms/revalidate';
import { HuntItem } from '@/data/hunts';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const { data: hunts } = await readBlob<HuntItem[]>('hunts.json');
    const hunt = hunts.find((h) => h.id === id);

    if (!hunt) {
      return NextResponse.json({ success: false, error: 'Hunt not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, hunt });
  } catch (err) {
    console.error(`[GET /api/admin/hunts/${id}] Error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to read hunt from storage' },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let body: Partial<HuntItem>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  // 1. Read live catalog with version tracking
  let liveHunts: HuntItem[] = [];
  let version = '';
  try {
    const res = await readBlob<HuntItem[]>('hunts.json');
    liveHunts = res.data;
    version = res.version;
  } catch (err) {
    console.error(`[PUT /api/admin/hunts/${id}] Read error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to read current catalog from storage' },
      { status: 500 },
    );
  }

  // 2. Find existing hunt
  const huntIndex = liveHunts.findIndex((h) => h.id === id);
  if (huntIndex === -1) {
    return NextResponse.json(
      { success: false, error: `Hunt with ID "${id}" not found` },
      { status: 404 },
    );
  }

  const existingHunt = liveHunts[huntIndex];

  // 3. Prevent duplicate ID change if ID was modified
  const newId = body.id || existingHunt.id;
  if (newId !== id && liveHunts.some((h) => h.id === newId)) {
    return NextResponse.json(
      { success: false, error: `Hunt ID "${newId}" already belongs to another Hunt.` },
      { status: 400 },
    );
  }

  // 4. Prevent duplicate Day number if Day was modified
  const newDay = body.day !== undefined ? body.day : existingHunt.day;
  if (newDay !== existingHunt.day && liveHunts.some((h) => h.day === newDay && h.id !== id)) {
    return NextResponse.json(
      { success: false, error: `Day ${newDay} already exists on another Hunt.` },
      { status: 400 },
    );
  }

  // 5. Merge fields and validate
  const merged: HuntItem = {
    ...existingHunt,
    ...body,
    id: newId,
    day: newDay,
  };

  const validation = validateHuntPayload(merged, merged.status === 'draft');
  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json(
      { success: false, error: validation.errors?.join(', ') || 'Validation failed' },
      { status: 400 },
    );
  }

  const sanitizedHunt = validation.sanitized;

  // 6. Update in array and write safely
  const updatedCatalog = [...liveHunts];
  updatedCatalog[huntIndex] = sanitizedHunt;

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
    console.error(`[PUT /api/admin/hunts/${id}] Write error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to update hunt in storage' },
      { status: 500 },
    );
  }

  // 7. Trigger cache revalidation if hunt was or is now published
  if (existingHunt.status === 'published' || sanitizedHunt.status === 'published') {
    revalidatePublicHunts(id);
    if (newId !== id) {
      revalidatePublicHunts(newId);
    }
  }

  return NextResponse.json({
    success: true,
    hunt: sanitizedHunt,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // 1. Read live catalog with version tracking
  let liveHunts: HuntItem[] = [];
  let version = '';
  try {
    const res = await readBlob<HuntItem[]>('hunts.json');
    liveHunts = res.data;
    version = res.version;
  } catch (err) {
    console.error(`[DELETE /api/admin/hunts/${id}] Read error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to read current catalog from storage' },
      { status: 500 },
    );
  }

  // 2. Find existing hunt
  const huntIndex = liveHunts.findIndex((h) => h.id === id);
  if (huntIndex === -1) {
    return NextResponse.json(
      { success: false, error: `Hunt with ID "${id}" not found` },
      { status: 404 },
    );
  }

  const existingHunt = liveHunts[huntIndex];

  // 3. SAFEGUARD: Soft-delete (archive). Do NOT physically remove.
  const archivedHunt: HuntItem = {
    ...existingHunt,
    status: 'archived',
  };

  const updatedCatalog = [...liveHunts];
  updatedCatalog[huntIndex] = archivedHunt;

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
    console.error(`[DELETE /api/admin/hunts/${id}] Write error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to archive hunt in storage' },
      { status: 500 },
    );
  }

  // 4. Revalidate public caches so it disappears from public pages
  revalidatePublicHunts(id);

  return NextResponse.json({
    success: true,
    message: `Hunt "${existingHunt.title}" (Day ${existingHunt.day}) has been archived.`,
    hunt: archivedHunt,
  });
}
