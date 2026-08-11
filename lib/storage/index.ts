/**
 * Active storage adapter export.
 *
 * To swap backends, change the import and instantiation here.
 * All callers (API routes, analytics dashboard) import from this file only.
 */
import { UpstashAdapter } from './UpstashAdapter';
import type { StorageAdapter } from './StorageAdapter';

export type { StorageAdapter };

// Singleton — one adapter instance per serverless function invocation
export const storage: StorageAdapter = new UpstashAdapter();
