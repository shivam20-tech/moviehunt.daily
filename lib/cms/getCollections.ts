/**
 * lib/cms/getCollections.ts
 *
 * Public API for fetching Collections from Vercel Blob.
 * Falls back to static COLLECTIONS from data/hunts.ts if Blob not configured.
 */

import { COLLECTIONS } from '@/data/hunts';
import { readBlob, readBlobCached, BlobNotFoundError } from './blobClient';

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  count: number;
  image: string;
  /** Display order — lower numbers appear first */
  order?: number;
}

export async function getCollections(fresh = false): Promise<CollectionItem[]> {
  if (!process.env.BLOB_PUBLIC_URL && !process.env.BLOB_READ_WRITE_TOKEN) {
    return COLLECTIONS as CollectionItem[];
  }

  try {
    const reader = fresh ? readBlob : readBlobCached;
    const { data } = await reader<CollectionItem[]>('collections.json', ['collections']);
    return [...data].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  } catch (err) {
    if (err instanceof BlobNotFoundError) {
      console.warn('[cms/getCollections] collections.json not found in Blob. Using static fallback.');
      return COLLECTIONS as CollectionItem[];
    }
    throw err;
  }
}
