import { Redis } from '@upstash/redis';
import type { StorageAdapter } from './StorageAdapter';

/**
 * UpstashAdapter — implements StorageAdapter using Upstash Redis.
 *
 * Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 * from environment variables (set in Vercel dashboard, never committed to git).
 *
 * Free tier limits are an external service detail — this code does not
 * hard-code or assume any specific limits.
 */
export class UpstashAdapter implements StorageAdapter {
  private _redis: Redis | null = null;

  private get redis(): Redis {
    if (!this._redis) {
      this._redis = Redis.fromEnv();
    }
    return this._redis;
  }

  async increment(key: string, by: number = 1): Promise<number> {
    if (by === 1) {
      return await this.redis.incr(key);
    }
    return await this.redis.incrby(key, by);
  }

  async get(key: string): Promise<number | null> {
    const val = await this.redis.get<string>(key);
    if (val === null || val === undefined) return null;
    const num = parseInt(String(val), 10);
    return isNaN(num) ? null : num;
  }

  async getMany(keys: string[]): Promise<(number | null)[]> {
    if (keys.length === 0) return [];
    const values = await this.redis.mget<string[]>(...keys);
    return values.map((v) => {
      if (v === null || v === undefined) return null;
      const num = parseInt(String(v), 10);
      return isNaN(num) ? null : num;
    });
  }

  async top(prefix: string, count: number): Promise<{ key: string; value: number }[]> {
    // Scan all keys matching the prefix pattern
    const keys: string[] = [];
    let cursor = 0;
    do {
      const [nextCursor, batch] = await this.redis.scan(cursor, {
        match: `${prefix}:*`,
        count: 100,
      });
      cursor = Number(nextCursor);
      keys.push(...(batch as string[]));
    } while (cursor !== 0);

    if (keys.length === 0) return [];

    const values = await this.getMany(keys);
    const entries: { key: string; value: number }[] = keys
      .map((k, i) => ({ key: k, value: values[i] ?? 0 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, count);

    return entries;
  }
}
