'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'mh_recent_hunts';
const MAX_STORED = 8;

/**
 * HuntViewTracker — Phase 4 (Recently Explored)
 *
 * Silently persists the current hunt ID to localStorage when the hunt page
 * is mounted. Stores up to 8 IDs, newest first, no duplicates.
 *
 * - Does NOT call any analytics API.
 * - Does NOT render any UI.
 * - SSR-safe: localStorage is only accessed inside useEffect.
 */
export default function HuntViewTracker({ huntId }: { huntId: string }) {
  useEffect(() => {
    if (!huntId || typeof window === 'undefined') return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing: string[] = raw ? JSON.parse(raw) : [];

      // Remove duplicate of current hunt (will be re-inserted at front)
      const filtered = existing.filter((id) => id !== huntId);

      // Insert current hunt at the front, cap at MAX_STORED
      const updated = [huntId, ...filtered].slice(0, MAX_STORED);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // localStorage may be unavailable in private browsing — fail silently
    }
  }, [huntId]);

  return null;
}
