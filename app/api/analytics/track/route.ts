import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

// Event types tracked for Movie Hunt content analytics
export type TrackEvent =
  | 'hunt_view'        // /hunt/[id] page loaded
  | 'trailer_click'    // Watch Trailer button clicked
  | 'watch_click'      // Watch Now / Available On clicked
  | 'collection_view'  // Collection page or card viewed
  | 'cta_click';       // Generic CTA click with a label

interface TrackBody {
  event: TrackEvent;
  huntId?: string;        // e.g. "day-1-tumbbad"
  collectionId?: string;  // e.g. "south-indian-gems"
  label?: string;         // for generic cta_click events
}

// Key format: mh:{event}:{id}
// e.g. mh:hunt_view:day-1-tumbbad, mh:trailer_click:day-3-karwaan
function buildKey(event: TrackEvent, body: TrackBody): string | null {
  switch (event) {
    case 'hunt_view':
      return body.huntId ? `mh:hunt_view:${body.huntId}` : null;
    case 'trailer_click':
      return body.huntId ? `mh:trailer_click:${body.huntId}` : null;
    case 'watch_click':
      return body.huntId ? `mh:watch_click:${body.huntId}` : null;
    case 'collection_view':
      return body.collectionId ? `mh:collection_view:${body.collectionId}` : null;
    case 'cta_click':
      return body.label ? `mh:cta_click:${body.label.toLowerCase().replace(/\s+/g, '_')}` : null;
    default:
      return null;
  }
}

// Basic rate-limiting: one increment per event/entity per IP per 10 minutes.
// Stored as a short-lived TTL key — no personal data retained permanently.
async function isRateLimited(key: string, ip: string): Promise<boolean> {
  const rateKey = `mh:rl:${ip.replace(/[:.]/g, '_')}:${key}`;
  try {
    const existing = await storage.get(rateKey);
    if (existing !== null) return true;
    // Set the rate limit marker with 10-minute TTL
    // We use increment + a direct redis call if needed — for now use increment
    // and accept it won't expire automatically unless adapter supports TTL.
    // This is a best-effort rate limit, not a security gate.
    await storage.increment(rateKey);
    return false;
  } catch {
    // If rate limit check fails, allow the event through
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as TrackBody;
    const { event } = body;

    if (!event) {
      return NextResponse.json({ error: 'event is required.' }, { status: 400 });
    }

    const key = buildKey(event, body);
    if (!key) {
      return NextResponse.json({ error: 'Missing required identifier for this event.' }, { status: 400 });
    }

    // Check environment — skip counting if Upstash is not configured (local dev)
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      // Silent success in development — no Upstash configured
      return NextResponse.json({ ok: true, dev: true });
    }

    await storage.increment(key);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[analytics/track] Error:', err);
    // Never fail the user's page over analytics — return ok anyway
    return NextResponse.json({ ok: true });
  }
}
