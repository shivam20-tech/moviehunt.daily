/**
 * lib/collectionMapping.ts — Phase 6 (Discovery Experience Upgrade)
 *
 * Deterministic, confident Collection ↔ Hunt matching.
 *
 * Design principle: "Accuracy is more important than automatic matching."
 * - We only match when there is HIGH CONFIDENCE based on specific genre/moodTag combos.
 * - Generic matches (e.g., "Thriller") are NOT sufficient alone.
 * - If no confident match → returns null → no collection section shown.
 *
 * This module is PURE (no side-effects, no async, no DB).
 * It derives matches from the same HUNTS_DATA and COLLECTIONS already in use.
 */

import { HuntItem, COLLECTIONS } from '@/data/hunts';

export type CollectionItem = (typeof COLLECTIONS)[0];

// ── Confident matching rules ──────────────────────────────────────────────
// Each rule: a collection ID + an array of required tag/genre patterns
// (ALL items in a `requires` group must match the hunt's combined tags)
// OR a `requiresAny` group (at least ONE must match).

interface MatchRule {
  collectionId: string;
  /** Hunt must match ALL of these patterns (case-insensitive substring) */
  requires?: string[];
  /** Hunt must match at least ONE of these, PLUS all in `requires` */
  requiresAny?: string[];
  /** Hunt must also match this type */
  type?: 'movie' | 'series';
}

const CONFIDENT_RULES: MatchRule[] = [
  // "Rainy Night Stories" — needs explicit rainy/atmospheric mood AND a slow-burn genre
  {
    collectionId: 'rainy-night-stories',
    requiresAny: ['rainy', 'atmospheric', 'slow-burn', 'cozy'],
  },

  // "Hidden Indian Gems" — must be an Indian regional language film (not Hindi blockbuster mainstream)
  // and not from a major Hindi blockbuster genre
  {
    collectionId: 'hidden-indian-gems',
    requiresAny: ['malayalam', 'tamil', 'assamese', 'punjabi', 'indie', 'regional', 'under-rated', 'hidden gem', 'art house'],
  },

  // "Edge-of-Seat Thrillers" — must combine thriller with psychological/crime AND mind-blowing
  {
    collectionId: 'mind-bending-thrillers',
    requires: ['thriller'],
    requiresAny: ['psychological', 'crime', 'neo-noir', 'suspense', 'mind-blowing', 'edge'],
  },

  // "Masterclass Sagas & Rivalries" — must have saga/rivalry/generational or epic scale
  {
    collectionId: 'epic-sagas-rivalries',
    requiresAny: ['saga', 'rivalry', 'generational', 'period drama', 'epic', 'historical'],
  },

  // "Inspiring Coming-of-Age" — must have feel-good/coming-of-age/inspirational themes
  {
    collectionId: 'inspiring-life-journeys',
    requiresAny: ['coming-of-age', 'inspirational', 'feel-good', 'hopeful', 'dream', 'self-discovery', 'inspiring'],
    requires: [], // no additional requirement
  },

  // "Meditative & Philosophical" — must combine philosophy/existential with slow/quiet
  {
    collectionId: 'philosophical-meditative',
    requiresAny: ['philosophical', 'existential', 'meditative', 'slow cinema', 'poetic', 'contemplative', 'meaningful'],
  },

  // "Web Series Worth Binging" — must be a series
  {
    collectionId: 'series-better-than-movies',
    requires: [],
    requiresAny: ['series', 'binge'],
    type: 'series',
  },
];

/**
 * Returns the best-matching collection for a Hunt, or null if no confident match.
 * Only ONE collection is returned — the most specific match.
 */
export function getCollectionForHunt(hunt: HuntItem): CollectionItem | null {
  // Build a combined lowercase tag set from all available taxonomy fields
  const huntTags = [
    ...(hunt.moodTags ?? []),
    ...(hunt.genres ?? []),
    ...(hunt.bestFor ?? []),
    hunt.language,
    hunt.type,
    hunt.afterCreditsEmotion ?? '',
  ]
    .map((t) => t.toLowerCase())
    .join(' ');

  const hasTag = (pattern: string) => huntTags.includes(pattern.toLowerCase());

  for (const rule of CONFIDENT_RULES) {
    // Type gate (only for series collection)
    if (rule.type && hunt.type !== rule.type) continue;

    // All required patterns must match
    const requiresMet = !rule.requires || rule.requires.every(hasTag);
    if (!requiresMet) continue;

    // At least one "requiresAny" pattern must match
    const anyMet =
      !rule.requiresAny ||
      rule.requiresAny.length === 0 ||
      rule.requiresAny.some(hasTag);
    if (!anyMet) continue;

    // Match found — return the collection object
    const collection = COLLECTIONS.find((c) => c.id === rule.collectionId);
    if (collection) return collection;
  }

  return null; // No confident match → section will not render
}

/**
 * Returns up to `limit` other hunts from the same collection context,
 * excluding the current hunt. Uses the same tag-based scoring as getSimilarPicks
 * but biased toward collection-specific patterns.
 */
export function getCollectionHunts(
  collection: CollectionItem,
  currentHuntId: string,
  allHunts: HuntItem[],
  limit = 3
): HuntItem[] {
  // Find the rule that matched this collection
  const rule = CONFIDENT_RULES.find((r) => r.collectionId === collection.id);
  if (!rule) return [];

  const patterns = [...(rule.requires ?? []), ...(rule.requiresAny ?? [])];

  const others = allHunts.filter((h) => h.id !== currentHuntId);

  const scored = others.map((h) => {
    const hTags = [
      ...(h.moodTags ?? []),
      ...(h.genres ?? []),
      ...(h.bestFor ?? []),
      h.language,
      h.type,
    ]
      .map((t) => t.toLowerCase())
      .join(' ');

    let score = 0;
    for (const p of patterns) {
      if (hTags.includes(p.toLowerCase())) score += 2;
    }
    // Type gate for series collection
    if (rule.type && h.type === rule.type) score += 3;
    // Bonus for high IMDb rating
    if (h.imdbRating >= 8.5) score += 1;

    return { hunt: h, score };
  });

  return scored
    .filter((s) => s.score > 0) // Only genuinely matching hunts
    .sort((a, b) => b.score - a.score || b.hunt.imdbRating - a.hunt.imdbRating)
    .slice(0, limit)
    .map((s) => s.hunt);
}
