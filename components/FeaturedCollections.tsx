'use client';

import React, { useState } from 'react';
import { COLLECTIONS } from '@/data/hunts';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import CinematicImage from './CinematicImage';

/**
 * FeaturedCollections — Chapter 4: The Discovery Layer
 *
 * Design principle: Spotify discovery — one path leads naturally to another.
 *
 * Collections are displayed as a large editorial list — not a grid.
 * Each row has generous spacing and reads like a table of contents in a
 * beautifully designed book.
 *
 * CINEMATIC MOMENT 3: Hovering a row reveals a thumbnail image that slides
 * in from the right — 200ms, ease-out. The row itself barely shifts.
 * The image emerging creates the surprise of discovery.
 */
export default function FeaturedCollections() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        padding: 'var(--space-24) 0',
      }}
    >
      <div className="section-inner">

        {/* Section header */}
        <ScrollReveal
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-16)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
            }}
          >
            Curated Journeys
          </span>
          <h2
            id="collections-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'var(--text-primary)',
              margin: 0,
              fontWeight: 400,
              lineHeight: 'var(--leading-snug)',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            Explore a collection
          </h2>
        </ScrollReveal>

        {/* Editorial list */}
        <div
          role="list"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {COLLECTIONS.map((col, idx) => {
            const isHovered = hoveredId === col.id;
            const delayClass = `cms-sr-delay-${Math.min(idx + 1, 6)}`;

            return (
              <ScrollReveal key={col.id} className={delayClass}>
                <div role="listitem">
                  <Link
                    href={`/collections#${col.id}`}
                    aria-label={`Explore ${col.title} \u2014 ${col.count} stories`}
                    onMouseEnter={() => setHoveredId(col.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="editorial-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textDecoration: 'none',
                      padding: 'var(--space-6) var(--space-4)',
                      borderBottom: '1px solid var(--border)',
                      position: 'relative',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {/* Left: index + collection info */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 'var(--space-6)',
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {/* Index number — typographic texture */}
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-tertiary)',
                          flexShrink: 0,
                          minWidth: 20,
                          fontStyle: 'italic',
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 'var(--space-4)',
                            flexWrap: 'wrap',
                          }}
                        >
                          <h3
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                              color: isHovered ? 'var(--accent)' : 'var(--text-primary)',
                              margin: 0,
                              fontWeight: 400,
                              lineHeight: 1.2,
                              letterSpacing: 'var(--tracking-tight)',
                              transition: 'color 150ms ease',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {col.title}
                          </h3>

                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-tertiary)',
                              letterSpacing: 'var(--tracking-wide)',
                              textTransform: 'uppercase',
                              flexShrink: 0,
                            }}
                          >
                            {col.count} films
                          </span>
                        </div>

                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-tertiary)',
                            margin: '4px 0 0',
                            fontWeight: 300,
                            lineHeight: 1.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {col.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: image reveal + arrow */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-4)',
                        flexShrink: 0,
                        marginLeft: 'var(--space-6)',
                      }}
                    >
                      {/* CINEMATIC MOMENT 3: Image slides in from right on hover */}
                      <div
                        className="collection-thumbnail"
                        style={{
                          width: 96,
                          height: 64,
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          flexShrink: 0,
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translateX(0)' : 'translateX(12px)',
                          transition: 'opacity 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        }}
                        aria-hidden="true"
                      >
                        <CinematicImage
                          src={col.image}
                          alt=""
                          style={{
                            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                            transition: 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          }}
                        />
                      </div>

                      {/* Arrow — appears with the image */}
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        style={{
                          color: isHovered ? 'var(--accent)' : 'var(--text-tertiary)',
                          transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)',
                          transition: 'color 150ms ease, transform 220ms ease',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Quiet footer link */}
        <ScrollReveal style={{ marginTop: 'var(--space-12)', textAlign: 'right' }}>
          <Link
            href="/collections"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-tertiary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 150ms ease',
            }}
            className="see-all-link"
          >
            See all collections
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </Link>
        </ScrollReveal>
      </div>

      <style>{`
        .see-all-link:hover { color: var(--text-secondary) !important; }
        @media (max-width: 600px) {
          .collection-thumbnail { display: none !important; }
        }
      `}</style>
    </section>
  );
}
