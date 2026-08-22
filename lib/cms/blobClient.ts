/**
 * lib/cms/blobClient.ts
 *
 * Low-level Vercel Blob read/write helpers for Movie Hunt CMS.
 *
 * CONCURRENCY SAFETY (Safeguard #3)
 * Every JSON document stored in Blob includes a `_version` SHA-256 hash.
 * On every write:
 *   1. Read current document from Blob → capture `_version`
 *   2. Apply mutations to in-memory copy
 *   3. Re-read Blob to get LIVE version
 *   4. If live `_version` !== version from step 1 → CONFLICT — reject write
 *   5. If match → write new document with new `_version`
 */

import { put, get } from '@vercel/blob';

// ── Custom Errors ─────────────────────────────────────────────────────────────

export class ConflictError extends Error {
  constructor() {
    super(
      'Blob write conflict: the document was modified by another operation. ' +
      'Please refresh and try again.'
    );
    this.name = 'ConflictError';
  }
}

export class BlobNotFoundError extends Error {
  constructor(key: string) {
    super(`Blob not found: "${key}". Has the initial migration been run?`);
    this.name = 'BlobNotFoundError';
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

/** All CMS documents are wrapped with a version hash for concurrency safety */
export interface VersionedDocument<T> {
  _version: string;
  _updatedAt: string;
  data: T;
}

// ── SHA-256 version hash ──────────────────────────────────────────────────────

async function sha256(content: string): Promise<string> {
  const buffer = new TextEncoder().encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ── Read ──────────────────────────────────────────────────────────────────────

/** Read versioned JSON document directly from storage (bypasses Blob CDN). */
export async function readBlob<T>(key: string): Promise<{ data: T; version: string }> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  const result = await get(key, {
    access: 'private',
    useCache: false,
    token,
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    throw new BlobNotFoundError(key);
  }

  const response = new Response(result.stream);
  const doc = (await response.json()) as VersionedDocument<T>;
  return { data: doc.data, version: doc._version };
}

/** Read versioned JSON document for public pages. */
export async function readBlobCached<T>(
  key: string,
  _tags: string[] = [],
): Promise<{ data: T; version: string }> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  const result = await get(key, {
    access: 'private',
    useCache: false,
    token,
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    throw new BlobNotFoundError(key);
  }

  const response = new Response(result.stream);
  const doc = (await response.json()) as VersionedDocument<T>;
  return { data: doc.data, version: doc._version };
}

// ── Write ─────────────────────────────────────────────────────────────────────

/**
 * Version-safe write to Vercel Blob.
 * Pass `expectedVersion` from the preceding readBlob() call.
 * Throws ConflictError if live document has been modified since reading.
 * Omit `expectedVersion` only for initial/migration writes.
 */
export async function writeBlob<T>(
  key: string,
  newData: T,
  expectedVersion?: string,
): Promise<{ version: string; url: string }> {
  // Conflict check
  if (expectedVersion !== undefined) {
    let liveVersion = '';
    try {
      const live = await readBlob<T>(key);
      liveVersion = live.version;
    } catch (err) {
      if (!(err instanceof BlobNotFoundError)) throw err;
    }
    if (liveVersion && liveVersion !== expectedVersion) {
      throw new ConflictError();
    }
  }

  const payload = JSON.stringify(newData, null, 2);
  const version = await sha256(payload);

  const doc: VersionedDocument<T> = {
    _version: version,
    _updatedAt: new Date().toISOString(),
    data: newData,
  };

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const blob = await put(key, JSON.stringify(doc, null, 2), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    token,
  });

  const finalUrl = (blob as any).downloadUrl || blob.url;
  return { version, url: finalUrl };
}

/** Initial write — skips version check. For migration script only. */
export async function initialWriteBlob<T>(
  key: string,
  data: T,
): Promise<{ version: string; url: string }> {
  return writeBlob(key, data);
}
