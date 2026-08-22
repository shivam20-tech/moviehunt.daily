/**
 * app/api/admin/media/route.ts
 *
 * Media Upload API:
 *   - POST /api/admin/media -> upload image file to Vercel Blob under media/
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/cms/authHelper';
import { put } from '@vercel/blob';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES, slugify } from '@/lib/cms/validation';

export async function POST(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  if (!file || typeof file === 'string') {
    return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
  }

  // Validate MIME type
  if (!ALLOWED_IMAGE_TYPES.has(file.type.toLowerCase())) {
    return NextResponse.json(
      {
        success: false,
        error: `Unsupported file type "${file.type}". Allowed: JPG, PNG, WebP, AVIF.`,
      },
      { status: 400 },
    );
  }

  // Validate size
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return NextResponse.json(
      {
        success: false,
        error: `File size (${sizeMb}MB) exceeds the maximum limit of 8MB.`,
      },
      { status: 400 },
    );
  }

  // Generate safe filename under media/
  const originalName = file.name || 'image';
  const dotIndex = originalName.lastIndexOf('.');
  const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
  const ext = dotIndex !== -1 ? originalName.substring(dotIndex).toLowerCase() : '.jpg';
  const safeName = `${slugify(baseName)}${ext}`;
  const key = `media/${Date.now()}-${safeName}`;

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const blob = await put(key, file, {
      access: 'private',
      contentType: file.type,
      addRandomSuffix: false,
      token,
    });

    const fileUrl = (blob as any).downloadUrl || blob.url;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      pathname: blob.pathname,
      size: file.size,
      type: file.type,
    }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/admin/media] Upload error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to upload media to storage' },
      { status: 500 },
    );
  }
}
