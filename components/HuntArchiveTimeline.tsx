'use client';

import React, { useState } from 'react';
import { HUNTS_DATA } from '@/data/hunts';
import { Star, ArrowRight, Film, Tv } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import CinematicImage from './CinematicImage';

export default function HuntArchiveTimeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState<number>(10);
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'series'>('all');

  const filteredHunts = HUNTS_DATA.filter((h) => {
    if (filterType === 'movie') return h.type === 'movie';
    if (filterType === 'series') return h.type === 'series';
    return true;
  });

  const displayedHunts = filteredHunts.slice(0, displayLimit);
  const hasMore = displayLimit < filteredHunts.length;

  const movieCount = HUNTS_DATA.filter((h) => h.type === 'movie').length;
  const seriesCount = HUNTS_DATA.filter((h) => h.type === 'series').length;

  return (
    <section
      id="archive"
      aria-labelledby="archive-heading"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: 'var(--space-24) 0',
      }}
    >
      <div className="section-inner">
        {/* Header */}
        <ScrollReveal style={{ maxWidth: 640, marginBottom: 'var(--space-12)' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              display: 'block',
              marginBottom: 'var(--space-4)',
            }}
          >
            The Archive
          </span>
          <h2
            id="archive-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'var(--text-primary)',
              margin: '0 0 var(--space-4)',
              fontWeight: 400,
              lineHeight: 'var(--leading-snug)',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            Every story, in order
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              margin: 0,
              fontWeight: 300,
            }}
          >
            The hunt began on Day 1. It&apos;s ongoing.
          </p>
        </ScrollReveal>

        {/* Movies / Series Segmented Filter Buttons */}
        <ScrollReveal style={{ marginBottom: 'var(--space-10)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setFilterType('all');
                setDisplayLimit(10);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: filterType === 'all' ? 'var(--accent)' : 'transparent',
                color: filterType === 'all' ? '#000000' : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: filterType === 'all' ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            >
              All ({HUNTS_DATA.length})
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterType('movie');
                setDisplayLimit(10);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: filterType === 'movie' ? 'var(--accent)' : 'transparent',
                color: filterType === 'movie' ? '#000000' : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: filterType === 'movie' ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            >
              <Film size={12} strokeWidth={2} />
              Movies ({movieCount})
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterType('series');
                setDisplayLimit(10);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: filterType === 'series' ? 'var(--accent)' : 'transparent',
                color: filterType === 'series' ? '#000000' : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: filterType === 'series' ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            >
              <Tv size={12} strokeWidth={2} />
              Series ({seriesCount})
            </button>
          </div>
        </ScrollReveal>

        {/* Movie Grid — 2 columns on mobile */}
        <div className="archive-movie-grid">
          {displayedHunts.map((hunt, idx) => {
            const isHovered = hoveredId === hunt.id;
            const delayClass = `cms-sr-delay-${Math.min((idx % 6) + 1, 6)}`;
            return (
              <ScrollReveal
                key={hunt.id}
                className={delayClass}
                as="div"
              >
              <Link
                href={`/hunt/${hunt.id}`}
                aria-label={`View details for ${hunt.title}`}
                onMouseEnter={() => setHoveredId(hunt.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  gap: 'var(--space-3)',
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '2 / 3',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    transition: `border-color var(--duration-fast) var(--ease-out)`,
                    borderColor: isHovered ? 'var(--border-focus)' : 'var(--border)',
                  }}
                >
                  <CinematicImage
                    src={hunt.coverImage}
                    alt={`${hunt.title} poster`}
                    objectPosition="center top"
                    style={{
                      transition: `transform var(--dur-cinematic) var(--ease-out)`,
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />

                  {/* IMDb badge */}
                  {hunt.imdbRating && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        backgroundColor: 'rgba(13,13,18,0.85)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        borderRadius: 'var(--radius-full)',
                        padding: '3px 8px',
                      }}
                    >
                      <Star
                        size={10}
                        color="var(--accent)"
                        fill="var(--accent)"
                        strokeWidth={0}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {hunt.imdbRating}
                      </span>
                    </div>
                  )}

                  {/* Type indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      left: 10,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'rgba(13,13,18,0.85)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        borderRadius: 'var(--radius-full)',
                        padding: '3px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {hunt.type === 'series'
                        ? <Tv size={10} color="var(--text-secondary)" strokeWidth={1.5} />
                        : <Film size={10} color="var(--text-secondary)" strokeWidth={1.5} />
                      }
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 9,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {hunt.type === 'series' ? 'Series' : 'Film'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Below-image metadata */}
                <div>
                  <h3
                    className="archive-card-title"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-base)',
                      color: isHovered ? 'var(--accent)' : 'var(--text-primary)',
                      margin: '0 0 2px',
                      fontWeight: 400,
                      lineHeight: 1.3,
                      transition: `color var(--duration-fast) var(--ease-out)`,
                    }}
                  >
                    {hunt.title}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      {hunt.year}
                    </span>
                    {hunt.language && (
                      <>
                        <span style={{ color: 'var(--border-hover)', fontSize: 10 }}>·</span>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          {hunt.language}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* View All / Show More Actions */}
        <div
          style={{
            marginTop: 'var(--space-16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          {hasMore && (
            <button
              onClick={() => setDisplayLimit((prev) => prev + 10)}
              className="btn btn-secondary"
              style={{ gap: 8 }}
            >
              Show More ({displayedHunts.length} of {filteredHunts.length})
            </button>
          )}

          <Link
            href="/journey"
            className={hasMore ? "btn btn-ghost" : "btn btn-secondary"}
            style={{ gap: 8 }}
          >
            Explore Full Vault ({HUNTS_DATA.length} Stories)
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <style>{`
        .archive-movie-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (min-width: 640px) {
          .archive-movie-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
        }

        @media (min-width: 1024px) {
          .archive-movie-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 639px) {
          .archive-card-title {
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </section>
  );
}
