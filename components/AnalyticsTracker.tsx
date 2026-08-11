'use client';

import { useEffect } from 'react';

export type TrackEventType =
  | 'hunt_view'
  | 'trailer_click'
  | 'watch_click'
  | 'collection_view'
  | 'cta_click';

interface TrackPayload {
  event: TrackEventType;
  huntId?: string;
  collectionId?: string;
  label?: string;
}

/**
 * Fire-and-forget analytics event.
 * Silently discards errors — analytics must never break the user experience.
 */
export async function trackEvent(payload: TrackPayload): Promise<void> {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // keepalive ensures the request completes even if the page unloads
      keepalive: true,
    });
  } catch {
    // Intentionally silent — analytics should never affect the user
  }
}

interface AnalyticsTrackerProps {
  huntId?: string;
  collectionId?: string;
}

/**
 * AnalyticsTracker — mount on a page to automatically fire a page_view event.
 *
 * For explicit event tracking (trailer clicks, watch clicks),
 * import and call `trackEvent()` directly from the component handling the action.
 */
export default function AnalyticsTracker({ huntId, collectionId }: AnalyticsTrackerProps) {
  useEffect(() => {
    if (huntId) {
      trackEvent({ event: 'hunt_view', huntId });
    } else if (collectionId) {
      trackEvent({ event: 'collection_view', collectionId });
    }
    // Run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // Renders nothing — tracking only
}
