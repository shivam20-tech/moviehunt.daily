/**
 * StorageAdapter — abstract interface for Movie Hunt analytics counters.
 *
 * All analytics code talks to this interface only.
 * To switch from Upstash to any other backend, update lib/storage/index.ts
 * to export a different implementation — callers do not change.
 */
export interface StorageAdapter {
  /**
   * Atomically increment a counter by `by` (default 1).
   * Creates the key if it does not exist.
   * Returns the new value after increment.
   */
  increment(key: string, by?: number): Promise<number>;

  /**
   * Get the current numeric value of a key.
   * Returns null if the key does not exist.
   */
  get(key: string): Promise<number | null>;

  /**
   * Get values for multiple keys in one round-trip.
   * Returns null for keys that do not exist.
   */
  getMany(keys: string[]): Promise<(number | null)[]>;

  /**
   * Scan all keys matching `prefix:*` and return the top N
   * sorted by value descending.
   */
  top(prefix: string, count: number): Promise<{ key: string; value: number }[]>;
}
