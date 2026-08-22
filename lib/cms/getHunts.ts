/**
 * lib/cms/getHunts.ts
 *
 * Public API for fetching Hunts from Vercel Blob.
 *
 * SAFEGUARD #7 — Public site ONLY receives published hunts.
 * Admin paths pass 'all' (or fresh=true) to get fresh draft/archived data.
 *
 * Falls back gracefully to static data/hunts.ts if Blob is not configured.
 */

import { HuntItem, HUNTS_DATA } from '@/data/hunts';
import { readBlob, readBlobCached, BlobNotFoundError } from './blobClient';

export type HuntStatus = 'published' | 'draft' | 'archived' | 'all';

/**
 * Fetch hunts from Vercel Blob, filtered by status.
 *
 * @param status - 'published' (default), 'draft', 'archived', or 'all'
 * @param fresh - if true, bypasses Next.js cache (recommended for Admin APIs)
 * @returns Array of HuntItem objects
 */
export async function getHunts(
  status: HuntStatus = 'published',
  fresh = false,
): Promise<HuntItem[]> {
  // Fall back to static data if Blob is not configured (local dev without token)
  if (!process.env.BLOB_PUBLIC_URL && !process.env.BLOB_READ_WRITE_TOKEN) {
    const fallback = HUNTS_DATA.map((h) => ({ ...h, status: 'published' as const }));
    if (status === 'all') return fallback;
    return fallback.filter((h) => h.status === status);
  }

  try {
    const isFresh = fresh || status !== 'published';
    const { data } = isFresh
      ? await readBlob<HuntItem[]>('hunts.json')
      : await readBlobCached<HuntItem[]>('hunts.json', ['hunts']);

    const normalized = data.map((h) => ({
      ...h,
      status: h.status ?? ('published' as const),
    }));

    if (status === 'all') return normalized;
    return normalized.filter((h) => h.status === status);
  } catch (err) {
    if (err instanceof BlobNotFoundError) {
      console.warn('[cms/getHunts] hunts.json not found in Blob. Using static fallback.');
      const fallback = HUNTS_DATA.map((h) => ({ ...h, status: 'published' as const }));
      if (status === 'all') return fallback;
      return fallback.filter((h) => h.status === status);
    }
    throw err;
  }
}

/**
 * Fetch a single Hunt by ID from Blob.
 *
 * @param id - Hunt identifier
 * @param publishedOnly - if true, only returns published hunts (for public pages)
 * @param fresh - if true, bypasses cache
 */
export async function getHuntById(
  id: string,
  publishedOnly = true,
  fresh = false,
): Promise<HuntItem | null> {
  const status: HuntStatus = publishedOnly ? 'published' : 'all';
  const hunts = await getHunts(status, fresh || !publishedOnly);
  return hunts.find((h) => h.id === id) ?? null;
}

/**
 * Get the next available Day number (max existing Day + 1).
 */
export async function getNextDayNumber(): Promise<number> {
  const hunts = await getHunts('all', true);
  if (hunts.length === 0) return 1;
  return Math.max(...hunts.map((h) => h.day)) + 1;
}

/**
 * Check if a Day number is already in use.
 */
export async function isDayNumberTaken(day: number, excludeId?: string): Promise<boolean> {
  const hunts = await getHunts('all', true);
  return hunts.some((h) => h.day === day && h.id !== excludeId);
}
