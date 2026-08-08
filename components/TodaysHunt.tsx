'use client';

import React, { useState, useEffect } from 'react';
import { HUNTS_DATA } from '@/data/hunts';
import { Star, Film, Tv, ExternalLink, Play, ArrowRight, Shuffle } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import CinematicImage from './CinematicImage';
import CinematicTrailerModal from './CinematicTrailerModal';


function getTodayIndex(): number {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear % HUNTS_DATA.length;
}

/**
 * TodaysHunt — Chapter 2: Today's Story
 *
 * Design principle: One story, told well.
 * This section presents exactly one film with the editorial weight of a
 * magazine cover story. No tabs, no pills, no dashboard. Just the film.
 *
 * Cinematic moment 2: The large still image responds to hover with a
 * subtle 4% scale over 600ms — barely perceptible, but felt.
 */
export default function TodaysHunt() {
  const [mounted, setMounted] = useState(false);
  const [todayIndex, setTodayIndex] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string>(HUNTS_DATA[0].id);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  // Lock body scroll when trailer is open, restore on close
  useEffect(() => {
    if (trailerOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setTrailerOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [trailerOpen]);

  useEffect(() => {
    setMounted(true);
    const idx = getTodayIndex();
    setTodayIndex(idx);
    setSelectedId(HUNTS_DATA[idx]?.id || HUNTS_DATA[0].id);
  }, []);

  const hunt = HUNTS_DATA.find((h) => h.id === selectedId) || HUNTS_DATA[todayIndex] || HUNTS_DATA[0];

  const handleShuffle = () => {
    const remaining = HUNTS_DATA.filter((h) => h.id !== selectedId);
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    if (next) setSelectedId(next.id);
  };

  const todayFormatted = mounted
    ? new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    : '';

  return (
    <section
      id="todays-hunt"
      aria-labelledby="featured-heading"
      style={{
        backgroundColor: 'var(--bg)',
        padding: 'var(--space-24) 0',
      }}
    >
      <div className="section-inner">

        {/* ── Section opener: date + quiet label ── */}
        <ScrollReveal>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-16)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: 'var(--text-tertiary)',
                }}
              >
                {todayFormatted ? todayFormatted + ' \u00b7 ' : ''}Today&apos;s Pick
              </span>
              <h2
                id="featured-heading"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  color: 'var(--text-primary)',
                  margin: 0,
                  fontWeight: 400,
                  lineHeight: 'var(--leading-snug)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                A story worth tonight
              </h2>
            </div>

            {/* Shuffle — quiet, off to the side */}
            <button
              onClick={handleShuffle}
              title="Show a different pick"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 400,
                color: 'var(--text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
                transition: 'color 150ms ease',
                padding: 0,
              }}
              className="shuffle-btn"
            >
              <Shuffle size={13} strokeWidth={1.5} />
              Different pick
            </button>
          </div>
        </ScrollReveal>

        {/* ── Main editorial layout ── */}
        <article
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-12)',
          }}
          className="todays-hunt-article"
        >

          {/* ── CINEMATIC MOMENT 2: Large still image ── */}
          {/* 4% scale on hover over 600ms. Barely perceptible. Felt, not noticed. */}
          <ScrollReveal>
            <Link
              href={`/hunt/${hunt.id}`}
              aria-label={`Full breakdown for ${hunt.title}`}
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
              style={{
                display: 'block',
                position: 'relative',
                aspectRatio: '16 / 7',
                overflow: 'hidden',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  transform: imageHovered ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform',
                }}
              >
                {hunt.images?.[0] ? (
                  <img
                    src={hunt.images[0]}
                    alt={`${hunt.title} still`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 25%',
                    }}
                  />
                ) : (
                  <CinematicImage
                    src={hunt.coverImage}
                    alt={`${hunt.title} poster`}
                    objectPosition="center"
                  />
                )}
              </div>

              {/* Gradient veil at the bottom — editorial depth */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13,13,18,0.85) 0%, rgba(13,13,18,0.3) 35%, transparent 65%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Film title and tagline — overlaid on the image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'var(--space-8)',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {hunt.type === 'movie'
                    ? <Film size={13} color="var(--text-tertiary)" strokeWidth={1.5} />
                    : <Tv size={13} color="var(--text-tertiary)" strokeWidth={1.5} />
                  }
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                      letterSpacing: 'var(--tracking-wide)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {hunt.language} &middot; {hunt.year}
                    {hunt.director ? ' \u00b7 ' + hunt.director : ''}
                  </span>

                  {hunt.imdbRating && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        marginLeft: 'auto',
                      }}
                    >
                      <Star size={11} fill="var(--accent)" strokeWidth={0} />
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {hunt.imdbRating} IMDb
                      </span>
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    color: 'var(--text-primary)',
                    margin: '0 0 var(--space-2)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                >
                  {hunt.title}
                </h3>

                {hunt.tagline && (
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      fontWeight: 300,
                      fontStyle: 'italic',
                    }}
                  >
                    {hunt.tagline}
                  </p>
                )}
              </div>
            </Link>
          </ScrollReveal>

          {/* ── Editorial content below the image ── */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 'var(--space-8)',
              }}
              className="todays-hunt-body"
            >
              {/* The hook — the sentence that makes you curious */}
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: 0,
                  maxWidth: 720,
                }}
              >
                &ldquo;{hunt.hook}&rdquo;
              </p>

              {/* Why watch — the editorial recommendation */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: 0,
                  maxWidth: 680,
                  fontWeight: 300,
                }}
              >
                {hunt.whyWatch}
              </p>

              {/* Mood tags — quiet row */}
              {hunt.bestFor && hunt.bestFor.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {hunt.bestFor.map((item, i) => (
                    <span key={i} className="badge">
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* Action row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  alignItems: 'center',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--border)',
                }}
              >
                {hunt.trailerYoutubeId && (
                  <button
                    onClick={() => setTrailerOpen(true)}
                    className="btn btn-secondary"
                    style={{ fontSize: 'var(--text-sm)', gap: 6 }}
                  >
                    <Play size={13} strokeWidth={1.5} />
                    Watch Trailer
                  </button>
                )}

                {hunt.availableOn?.url && (
                  <a
                    href={hunt.availableOn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    style={{ fontSize: 'var(--text-sm)', gap: 6 }}
                  >
                    Stream on {hunt.availableOn.name}
                    <ExternalLink size={12} strokeWidth={1.5} />
                  </a>
                )}

                <Link
                  href={`/hunt/${hunt.id}`}
                  className="btn btn-ghost"
                  style={{ fontSize: 'var(--text-sm)', gap: 6, marginLeft: 'auto' }}
                >
                  Full breakdown
                  <ArrowRight size={13} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </article>
      </div>

      {/* Cinematic Trailer Player Modal with playback controls */}
      <CinematicTrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        youtubeId={hunt.trailerYoutubeId || ''}
        title={hunt.title}
        year={hunt.year}
      />

      <style>{`
        .shuffle-btn:hover { color: var(--text-secondary) !important; }
        .trailer-close-btn:hover { color: var(--text-primary) !important; border-color: rgba(255,255,255,0.35) !important; }
      `}</style>
    </section>
  );
}
