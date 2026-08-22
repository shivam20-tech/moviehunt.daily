/**
 * app/api/admin/collections/route.ts
 *
 * Admin Collections API:
 *   - GET  /api/admin/collections -> list all collections
 *   - POST /api/admin/collections -> create a new collection
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/cms/authHelper';
import { readBlob, writeBlob, ConflictError } from '@/lib/cms/blobClient';
import { getCollections, CollectionItem } from '@/lib/cms/getCollections';
import { validateCollectionPayload } from '@/lib/cms/validation';
import { revalidatePublicCollections } from '@/lib/cms/revalidate';

export async function GET(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const collections = await getCollections();
    return NextResponse.json({
      success: true,
      count: collections.length,
      collections,
    });
  } catch (err) {
    console.error('[GET /api/admin/collections] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collections' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<CollectionItem>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const validation = validateCollectionPayload(body);
  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json(
      { success: false, error: validation.errors?.join(', ') || 'Validation failed' },
      { status: 400 },
    );
  }

  const newCollection = validation.sanitized;

  // 1. Read live collections with version tracking
  let liveCollections: CollectionItem[] = [];
  let version = '';
  try {
    const res = await readBlob<CollectionItem[]>('collections.json');
    liveCollections = res.data;
    version = res.version;
  } catch (err) {
    console.error('[POST /api/admin/collections] Read error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to read collections from storage' },
      { status: 500 },
    );
  }

  // 2. Check for duplicate ID
  if (liveCollections.some((c) => c.id === newCollection.id)) {
    return NextResponse.json(
      { success: false, error: `Collection ID "${newCollection.id}" already exists.` },
      { status: 400 },
    );
  }

  // 3. Set order if not set
  if (newCollection.order === 99) {
    newCollection.order = liveCollections.length;
  }

  const updatedCatalog = [...liveCollections, newCollection];

  try {
    await writeBlob('collections.json', updatedCatalog, version);
  } catch (err) {
    if (err instanceof ConflictError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Collections changed since you loaded them. Please refresh and try again.',
        },
        { status: 409 },
      );
    }
    console.error('[POST /api/admin/collections] Write error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to save collection to storage' },
      { status: 500 },
    );
  }

  // 4. Revalidate public pages
  revalidatePublicCollections();

  return NextResponse.json(
    {
      success: true,
      collection: newCollection,
    },
    { status: 201 },
  );
}
