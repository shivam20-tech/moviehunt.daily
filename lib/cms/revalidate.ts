/**
 * lib/cms/revalidate.ts
 *
 * Helper to trigger on-demand Next.js cache revalidation for public pages
 * after Admin mutations (create, update, publish, archive).
 */

import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Revalidates public hunt pages and catalog caches.
 *
 * @param huntId - optional ID of the specific hunt to revalidate `/hunt/[id]`
 */
export function revalidatePublicHunts(huntId?: string) {
  try {
    // Invalidate cached Blob fetch queries
    (revalidateTag as any)('hunts', 'default');
    (revalidateTag as any)('cms', 'default');

    // Invalidate rendered public pages
    revalidatePath('/');
    revalidatePath('/journey');
    revalidatePath('/collections');
    if (huntId) {
      revalidatePath(`/hunt/${huntId}`);
    }
  } catch (err) {
    console.warn('[cms/revalidate] Cache revalidation notice:', err);
  }
}

/**
 * Revalidates public collections page and caches.
 */
export function revalidatePublicCollections() {
  try {
    (revalidateTag as any)('collections', 'default');
    (revalidateTag as any)('cms', 'default');
    revalidatePath('/collections');
    revalidatePath('/');
  } catch (err) {
    console.warn('[cms/revalidate] Cache revalidation notice:', err);
  }
}
