'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HUNTS_DATA } from '@/data/hunts';
import { ArrowRight, Clock } from 'lucide-react';

const STORAGE_KEY = 'mh_recent_hunts';
const MIN_TO_SHOW = 2;   // Only render if ≥ 2 hunts have been explored
const MAX_DISPLAY = 6;   // Show at most 6 cards in the strip

/**
 * RecentlyExplored — Phase 4 (Discovery Experience Upgrade)
 *
 * Reads mh_recent_hunts from localStorage and renders a horizontal
 * scroll strip of recently viewed hunt poster cards.
 *
 * - Validates all IDs against live HUNTS_DATA (ignores stale/invalid entries)
 * - Only renders if ≥ 2 valid entries exist (new visitors see nothing)
 * - Fully SSR-safe: renders null until client mount
 * - Completely local to the user's browser — no network calls
 */
export default function RecentlyExplored() {
  const [mounted, setMounted] = useState(false);
  const [recentHunts, setRecentHunts] = useState<typeof HUNTS_DATA>([]);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const ids: string[] = JSON.parse(raw);
      if (!Array.isArray(ids) || ids.length === 0) return;

      // Validate each ID against live HUNTS_DATA (removes stale ones)
      const validHunts = ids
        .map((id) => HUNTS_DATA.find((h) => h.id === id))
        .filter((h): h is (typeof HUNTS_DATA)[0] => h !== undefined)
        .slice(0, MAX_DISPLAY);

      setRecentHunts(validHunts);
    } catch {
      // localStorage unavailable — fail silently, show nothing
    }
  }, []);

  // SSR-safe: don't render until client mount
  if (!mounted) return null;

  // Need at least MIN_TO_SHOW valid entries to be worth showing
  if (recentHunts.length < MIN_TO_SHOW) return null;

  return (
    <section
      aria-label="Continue Exploring"
      style={{
        padding: 'var(--space-12) 0 var(--space-4)',
        animation: 'recentFadeIn 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      }}
    >
      <div className="section-inner">
        {/* Section label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={13} strokeWidth={1.5} color="var(--text-tertiary)" />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-widest)',
                fontWeight: 500,
              }}
            >
              Continue Exploring
            </span>
          </div>
          <button
            onClick={() => {
              try {
                localStorage.removeItem(STORAGE_KEY);
              } catch { /* ignore */ }
              setRecentHunts([]);
            }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: 'var(--text-tertiary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              letterSpacing: '0.04em',
              opacity: 0.6,
              transition: 'opacity 150ms ease',
            }}
            aria-label="Clear recently explored history"
            title="Clear history"
          >
            Clear
          </button>
        </div>

        {/* Horizontal scroll strip */}
        <div
          className="recently-explored-strip"
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 8,
            // Hide scrollbar visually while keeping it functional
            scrollbarWidth: 'none',
          }}
        >
          {recentHunts.map((hunt) => (
            <Link
              key={hunt.id}
              href={`/hunt/${hunt.id}`}
              aria-label={`View ${hunt.title}`}
              style={{
                flexShrink: 0,
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                width: 96,
              }}
              className="recently-explored-card"
            >
              {/* Poster thumbnail */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '2 / 3',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-elevated)',
                }}
              >
                <img
                  src={hunt.coverImage}
                  alt={hunt.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    transition: 'transform 320ms ease-out',
                  }}
                  className="recently-explored-img"
                />
                {/* Day badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    left: 5,
                    backgroundColor: 'rgba(13,13,18,0.88)',
                    border: '1px solid var(--accent-border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '1px 6px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 9,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.04em',
                  }}
                >
                  D{hunt.day}
                </div>
              </div>

              {/* Title */}
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                  transition: 'color 150ms ease',
                }}
                className="recently-explored-title"
              >
                {hunt.title}
              </span>
            </Link>
          ))}

          {/* "Explore All" end cap */}
          <Link
            href="/journey"
            aria-label="View the full archive"
            style={{
              flexShrink: 0,
              width: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border)',
              textDecoration: 'none',
              aspectRatio: '2 / 3',
              backgroundColor: 'var(--bg-elevated)',
              transition: 'border-color 200ms ease',
            }}
            className="recently-explored-all"
          >
            <ArrowRight size={16} strokeWidth={1.5} color="var(--text-tertiary)" />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 9,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              Full Archive
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        .recently-explored-strip::-webkit-scrollbar { display: none; }

        .recently-explored-card:hover .recently-explored-img {
          transform: scale(1.05);
        }
        .recently-explored-card:hover .recently-explored-title {
          color: var(--accent) !important;
        }
        .recently-explored-all:hover {
          border-color: var(--border-hover) !important;
        }

        @keyframes recentFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .recently-explored-strip * { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
