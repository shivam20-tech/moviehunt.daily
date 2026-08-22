/**
 * app/api/admin/collections/[id]/route.ts
 *
 * Admin Single Collection API:
 *   - PUT    /api/admin/collections/[id] -> update/reorder collection
 *   - DELETE /api/admin/collections/[id] -> delete collection
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/cms/authHelper';
import { readBlob, writeBlob, ConflictError } from '@/lib/cms/blobClient';
import { CollectionItem } from '@/lib/cms/getCollections';
import { validateCollectionPayload } from '@/lib/cms/validation';
import { revalidatePublicCollections } from '@/lib/cms/revalidate';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let body: Partial<CollectionItem>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  // 1. Read live collections with version tracking
  let liveCollections: CollectionItem[] = [];
  let version = '';
  try {
    const res = await readBlob<CollectionItem[]>('collections.json');
    liveCollections = res.data;
    version = res.version;
  } catch (err) {
    console.error(`[PUT /api/admin/collections/${id}] Read error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to read collections from storage' },
      { status: 500 },
    );
  }

  const colIndex = liveCollections.findIndex((c) => c.id === id);
  if (colIndex === -1) {
    return NextResponse.json(
      { success: false, error: `Collection with ID "${id}" not found` },
      { status: 404 },
    );
  }

  const existingCol = liveCollections[colIndex];
  const merged: CollectionItem = {
    ...existingCol,
    ...body,
    id: existingCol.id, // preserve immutable ID
  };

  const validation = validateCollectionPayload(merged);
  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json(
      { success: false, error: validation.errors?.join(', ') || 'Validation failed' },
      { status: 400 },
    );
  }

  const updatedCol = validation.sanitized;
  const updatedCatalog = [...liveCollections];
  updatedCatalog[colIndex] = updatedCol;

  // If order was modified, re-sort
  if (body.order !== undefined) {
    updatedCatalog.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }

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
    console.error(`[PUT /api/admin/collections/${id}] Write error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to update collection in storage' },
      { status: 500 },
    );
  }

  // Revalidate public pages
  revalidatePublicCollections();

  return NextResponse.json({
    success: true,
    collection: updatedCol,
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

  // 1. Read live collections with version tracking
  let liveCollections: CollectionItem[] = [];
  let version = '';
  try {
    const res = await readBlob<CollectionItem[]>('collections.json');
    liveCollections = res.data;
    version = res.version;
  } catch (err) {
    console.error(`[DELETE /api/admin/collections/${id}] Read error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to read collections from storage' },
      { status: 500 },
    );
  }

  const colIndex = liveCollections.findIndex((c) => c.id === id);
  if (colIndex === -1) {
    return NextResponse.json(
      { success: false, error: `Collection with ID "${id}" not found` },
      { status: 404 },
    );
  }

  const existingCol = liveCollections[colIndex];
  const updatedCatalog = liveCollections.filter((c) => c.id !== id);

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
    console.error(`[DELETE /api/admin/collections/${id}] Write error:`, err);
    return NextResponse.json(
      { success: false, error: 'Failed to delete collection from storage' },
      { status: 500 },
    );
  }

  // Revalidate public pages
  revalidatePublicCollections();

  return NextResponse.json({
    success: true,
    message: `Collection "${existingCol.title}" deleted.`,
  });
}
