/**
 * lib/cms/validation.ts
 *
 * Validation functions for Movie Hunt CMS write operations.
 */

import { HuntItem } from '@/data/hunts';
import { CollectionItem } from './getCollections';

export interface ValidationResult<T> {
  valid: boolean;
  errors?: string[];
  sanitized?: T;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validates and sanitizes a Hunt payload for creation or update.
 */
export function validateHuntPayload(
  payload: Partial<HuntItem>,
  isDraft = false,
): ValidationResult<HuntItem> {
  const errors: string[] = [];

  // Required across all statuses
  if (!payload.title || typeof payload.title !== 'string' || !payload.title.trim()) {
    errors.push('Title is required');
  }

  const type = payload.type || 'movie';
  if (type !== 'movie' && type !== 'series') {
    errors.push('Type must be either "movie" or "series"');
  }

  const status = payload.status || (isDraft ? 'draft' : 'published');
  if (!['draft', 'published', 'archived'].includes(status)) {
    errors.push('Status must be "draft", "published", or "archived"');
  }

  // Strict validation for published hunts
  if (status === 'published') {
    if (!payload.tagline || typeof payload.tagline !== 'string' || !payload.tagline.trim()) {
      errors.push('Tagline is required for published hunts');
    }
    if (!payload.hook || typeof payload.hook !== 'string' || !payload.hook.trim()) {
      errors.push('Hook ("Why MovieHunt Recommends This") is required for published hunts');
    }
    if (!payload.storySummary || typeof payload.storySummary !== 'string' || !payload.storySummary.trim()) {
      errors.push('Story summary is required for published hunts');
    }
    if (!payload.whyWatch || typeof payload.whyWatch !== 'string' || !payload.whyWatch.trim()) {
      errors.push('The Curation Perspective ("Why Watch") is required for published hunts');
    }
    if (!payload.coverImage || typeof payload.coverImage !== 'string' || !payload.coverImage.trim()) {
      errors.push('Cover image URL is required for published hunts');
    }
    if (payload.year && (typeof payload.year !== 'number' || payload.year < 1900 || payload.year > 2100)) {
      errors.push('Year must be a valid 4-digit number');
    }
    if (payload.imdbRating !== undefined && (typeof payload.imdbRating !== 'number' || payload.imdbRating < 0 || payload.imdbRating > 10)) {
      errors.push('IMDb rating must be a number between 0 and 10');
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Sanitize and populate defaults
  const title = (payload.title || '').trim();
  const day = typeof payload.day === 'number' ? payload.day : 1;
  const id = payload.id?.trim() || `day-${day}-${slugify(title)}`;

  const sanitized: HuntItem = {
    id,
    day,
    type: type as 'movie' | 'series',
    title,
    year: typeof payload.year === 'number' ? payload.year : new Date().getFullYear(),
    tagline: (payload.tagline || '').trim(),
    hook: (payload.hook || '').trim(),
    imdbRating: typeof payload.imdbRating === 'number' ? payload.imdbRating : 8.0,
    cast: Array.isArray(payload.cast) ? payload.cast.map(String).filter(Boolean) : [],
    director: (payload.director || '').trim(),
    episodes: typeof payload.episodes === 'number' ? payload.episodes : undefined,
    duration: payload.duration?.trim() || undefined,
    language: (payload.language || 'Hindi').trim(),
    availableOn: {
      name: payload.availableOn?.name?.trim() || 'Streaming',
      url: payload.availableOn?.url?.trim() || '#',
    },
    storySummary: (payload.storySummary || '').trim(),
    whyWatch: (payload.whyWatch || '').trim(),
    shouldYouWatch: payload.shouldYouWatch?.trim() || 'YES. If you love deep cinematic storytelling.',
    bestFor: Array.isArray(payload.bestFor) ? payload.bestFor.map(String).filter(Boolean) : ['🍿 Evening watch'],
    afterCreditsEmotion: payload.afterCreditsEmotion?.trim() || 'Inspired',
    emotionalLines: Array.isArray(payload.emotionalLines) ? payload.emotionalLines.map(String).filter(Boolean) : [],
    bestScenes: Array.isArray(payload.bestScenes) ? payload.bestScenes.map(String).filter(Boolean) : [],
    moodTags: Array.isArray(payload.moodTags) ? payload.moodTags.map(String).filter(Boolean) : [],
    genres: Array.isArray(payload.genres) ? payload.genres.map(String).filter(Boolean) : ['Drama'],
    musicVibe: payload.musicVibe?.trim() || 'Cinematic score',
    coverImage: (payload.coverImage || '').trim(),
    images: Array.isArray(payload.images) ? payload.images.map(String).filter(Boolean) : [],
    trailerYoutubeId: payload.trailerYoutubeId?.trim() || undefined,
    hindiTrailerYoutubeId: payload.hindiTrailerYoutubeId?.trim() || undefined,
    featured: Boolean(payload.featured),
    status: status as 'draft' | 'published' | 'archived',
  };

  return { valid: true, sanitized };
}

/**
 * Validates a collection payload for creation or update.
 */
export function validateCollectionPayload(
  payload: Partial<CollectionItem>,
): ValidationResult<CollectionItem> {
  const errors: string[] = [];

  if (!payload.title || typeof payload.title !== 'string' || !payload.title.trim()) {
    errors.push('Collection title is required');
  }
  if (!payload.description || typeof payload.description !== 'string' || !payload.description.trim()) {
    errors.push('Collection description is required');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  const title = (payload.title || '').trim();
  const id = payload.id?.trim() || slugify(title);

  const sanitized: CollectionItem = {
    id,
    title,
    description: (payload.description || '').trim(),
    count: typeof payload.count === 'number' ? payload.count : 0,
    image: (payload.image || '').trim(),
    order: typeof payload.order === 'number' ? payload.order : 99,
  };

  return { valid: true, sanitized };
}

/**
 * Validates image upload parameters.
 */
export const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
]);

export const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB limit
