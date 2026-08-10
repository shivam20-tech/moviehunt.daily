'use client';

import React, { useState, useEffect } from 'react';
import { HUNTS_DATA } from '@/data/hunts';
import { Star, Film, Tv, ExternalLink, Play, ArrowRight, Shuffle, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const imagesList = (hunt.images && hunt.images.length > 0)
    ? hunt.images
    : [hunt.coverImage];

  // Reset slide index when hunt changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [hunt.id]);

  // Auto-slide every 4.5s when not hovered
  useEffect(() => {
    if (imagesList.length <= 1 || imageHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [imagesList.length, imageHovered, hunt.id]);

  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 500);
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
      className="relative scroll-mt-24 overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        padding: 'var(--space-24) 0',
      }}
    >
      {/* ── Atmospheric Spotlight Stage Background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/todays-pick-bg.jpg"
          alt="Spotlight Stage"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, #0a0a0f 0%, rgba(10, 10, 15, 0.4) 40%, rgba(10, 10, 15, 0.7) 75%, #0a0a0f 100%)',
          }}
        />
      </div>

      <div className="section-inner" style={{ position: 'relative', zIndex: 10 }}>

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

            {/* Shuffle — Sleek glassmorphism pill button with spin animation */}
            <button
              onClick={handleShuffle}
              title="Show a different pick"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#f0efe8',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '24px',
                padding: '8px 16px',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="different-pick-btn"
            >
              <Shuffle
                size={14}
                strokeWidth={2}
                style={{
                  color: 'var(--accent)',
                  transform: isShuffling ? 'rotate(360deg)' : 'rotate(0deg)',
                  transition: 'transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
              <span>Different pick</span>
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
              className="todays-hunt-cover-link"
            >
              {/* Image Carousel Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                {imagesList.map((imgSrc, i) => (
                  <img
                    key={imgSrc + i}
                    src={imgSrc}
                    alt={`${hunt.title} still ${i + 1}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 25%',
                      opacity: i === currentImageIndex ? 1 : 0,
                      transform: imageHovered ? 'scale(1.04)' : 'scale(1)',
                      transition: 'opacity 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      willChange: 'opacity, transform',
                    }}
                  />
                ))}
              </div>

              {/* Prev / Next Slider Arrows */}
              {imagesList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
                    }}
                    aria-label="Previous still image"
                    style={{
                      position: 'absolute',
                      left: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(13, 13, 18, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      opacity: imageHovered ? 1 : 0,
                      transition: 'all 200ms ease',
                    }}
                    className="slider-nav-btn"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
                    }}
                    aria-label="Next still image"
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(13, 13, 18, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      opacity: imageHovered ? 1 : 0,
                      transition: 'all 200ms ease',
                    }}
                    className="slider-nav-btn"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Top Left: IMDb Score Pill Badge */}
              {hunt.imdbRating && (
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    zIndex: 10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '5px 12px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(229, 169, 60, 0.18)',
                    border: '1px solid rgba(229, 169, 60, 0.5)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#f5c518',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Star size={13} fill="#f5c518" strokeWidth={0} />
                  <span>{hunt.imdbRating} IMDb</span>
                </div>
              )}

              {/* Slide Indicator Dots */}
              {imagesList.length > 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: 'rgba(13, 13, 18, 0.65)',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  {imagesList.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(i);
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                      style={{
                        width: i === currentImageIndex ? 18 : 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: i === currentImageIndex ? 'var(--accent)' : 'rgba(255, 255, 255, 0.4)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 250ms ease',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Gradient veil at the bottom — rich contrast overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 8, 12, 0.95) 0%, rgba(8, 8, 12, 0.65) 45%, rgba(8, 8, 12, 0.15) 75%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Film title and tagline — overlaid on the image */}
              <div
                className="todays-hunt-overlay-box"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'var(--space-8)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {/* Metadata Pill Row */}
                <div
                  className="todays-hunt-badge-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Type badge */}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#ffffff',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {hunt.type === 'movie'
                      ? <Film size={11} color="#ffffff" strokeWidth={2} />
                      : <Tv size={11} color="#ffffff" strokeWidth={2} />
                    }
                    {hunt.type === 'series' ? 'Series' : 'Film'}
                  </span>

                  {/* Language badge */}
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {hunt.language}
                  </span>

                  {/* Year badge */}
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {hunt.year}
                  </span>

                  {/* Director */}
                  {hunt.director && (
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        marginLeft: 4,
                      }}
                    >
                      Dir. {hunt.director}
                    </span>
                  )}
                </div>

                {/* Film Title */}
                <h3
                  className="todays-hunt-title"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
                    color: '#ffffff',
                    margin: 0,
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {hunt.title}
                </h3>

                {/* Tagline quote */}
                {hunt.tagline && (
                  <p
                    className="todays-hunt-tagline"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      color: 'var(--accent)',
                      margin: 0,
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    &ldquo;{hunt.tagline.replace(/^"(.*)"$/, '$1')}&rdquo;
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

              {/* Action row — Unified, cohesive button bar */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  alignItems: 'center',
                  paddingTop: 'var(--space-6)',
                  borderTop: '1px solid var(--border)',
                }}
                className="todays-hunt-actions-row"
              >
                <Link
                  href={`/hunt/${hunt.id}`}
                  className="btn btn-primary"
                  style={{ fontSize: 'var(--text-sm)', gap: 8, padding: '10px 22px' }}
                >
                  <span>Full Breakdown</span>
                  <ArrowRight size={14} strokeWidth={2} />
                </Link>

                {hunt.trailerYoutubeId && (
                  <button
                    type="button"
                    onClick={() => setTrailerOpen(true)}
                    className="btn btn-secondary"
                    style={{ fontSize: 'var(--text-sm)', gap: 6, padding: '10px 18px' }}
                  >
                    <Play size={13} strokeWidth={2} fill="var(--accent)" color="var(--accent)" />
                    <span>Watch Trailer</span>
                  </button>
                )}

                {hunt.availableOn?.url && (
                  <a
                    href={hunt.availableOn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: 'var(--text-sm)', gap: 6, padding: '10px 18px' }}
                  >
                    <span>Stream on {hunt.availableOn.name}</span>
                    <ExternalLink size={13} strokeWidth={1.5} />
                  </a>
                )}
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
        .todays-hunt-cover-link {
          display: block;
          position: relative;
          aspect-ratio: 16 / 10.5;
          overflow: hidden;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          text-decoration: none;
        }

        @media (min-width: 640px) {
          .todays-hunt-cover-link {
            aspect-ratio: 16 / 8.5;
          }
        }

        @media (min-width: 1024px) {
          .todays-hunt-cover-link {
            aspect-ratio: 16 / 7;
          }
        }

        @media (max-width: 639px) {
          .todays-hunt-overlay-box {
            padding: 12px 14px 14px !important;
            gap: 6px !important;
          }
          .todays-hunt-title {
            font-size: 1.45rem !important;
            line-height: 1.15 !important;
          }
          .todays-hunt-tagline {
            font-size: 0.85rem !important;
          }
          .todays-hunt-badge-row {
            gap: 4px !important;
          }
          .todays-hunt-badge-row span {
            font-size: 10px !important;
            padding: 2px 7px !important;
          }
        }

        .different-pick-btn:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(229, 169, 60, 0.4) !important;
          color: #ffffff !important;
          box-shadow: 0 6px 20px rgba(229, 169, 60, 0.15) !important;
          transform: translateY(-1px);
        }
        .different-pick-btn:active {
          transform: translateY(0px) scale(0.98);
        }
        .trailer-close-btn:hover { color: var(--text-primary) !important; border-color: rgba(255,255,255,0.35) !important; }
      `}</style>
    </section>
  );
}
