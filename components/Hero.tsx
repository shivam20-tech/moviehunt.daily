'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SurpriseMeModal from './SurpriseMeModal';

export default function Hero() {
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      const t = setTimeout(() => setTextVisible(true), 220);
      return () => clearTimeout(t);
    }
  }, [imageLoaded]);

  useEffect(() => {
    const t = setTimeout(() => setImageLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  const sectionHeight = sectionRef.current?.offsetHeight ?? 800;
  const parallaxProgress = Math.min(scrollY / sectionHeight, 1);
  const contentOpacity = Math.max(1 - parallaxProgress * 1.4, 0);

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Movie Hunt — Stories worth your time"
        className="hero-section"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            transform: `translateY(${parallaxProgress * 60}px)`,
            willChange: 'transform',
          }}
        >
          <img
            src="/hero-bg.jpg"
            alt="MovieHunt Official Cinema Theater"
            onLoad={() => setImageLoaded(true)}
            style={{
              width: '100%',
              height: '110%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              opacity: imageLoaded ? Math.max(0.1, 0.58 - parallaxProgress * 0.25) : 0,
              transition: 'opacity 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom,
                rgba(13, 13, 18, 0.55) 0%,
                rgba(13, 13, 18, 0.15) 40%,
                rgba(13, 13, 18, 0.72) 80%,
                rgba(13, 13, 18, 1.0) 100%
              )`,
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 720,
            margin: '0 auto',
            padding: '0 var(--space-6)',
            textAlign: 'center',
            opacity: contentOpacity,
            transform: `translateY(${-parallaxProgress * 20}px)`,
            transition: 'opacity 80ms linear, transform 80ms linear',
            willChange: 'opacity, transform',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: 'var(--space-6)',
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'none' : 'translateY(8px)',
              transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            Human-curated · No algorithm
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 8.5vw, 5.25rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              margin: '0 0 var(--space-6)',
              fontWeight: 400,
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'none' : 'translateY(12px)',
              transition: 'opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 80ms, transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 80ms',
            }}
          >
            Stories worth{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)', display: 'block' }}>
              your time.
            </em>
          </h1>

          <p
            className="hero-subtitle"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: 440,
              margin: '0 auto var(--space-10)',
              fontWeight: 300,
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'none' : 'translateY(10px)',
              transition: 'opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 160ms, transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 160ms',
            }}
          >
            Handpicked films and series. Every single one personally watched.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'none' : 'translateY(8px)',
              transition: 'opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 240ms, transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 240ms',
            }}
          >
            <Link
              href="#todays-hunt"
              className="btn btn-primary"
              style={{ fontSize: 'var(--text-sm)', padding: '12px 28px' }}
            >
              Begin Exploring
            </Link>
            <button
              onClick={() => setSurpriseOpen(true)}
              className="btn btn-secondary"
              style={{ fontSize: 'var(--text-sm)', padding: '12px 24px' }}
            >
              Surprise Me
            </button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hero-scroll-indicator"
          style={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: textVisible ? Math.max(0.6 - parallaxProgress * 3, 0) : 0,
            transition: 'opacity 400ms ease',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 9,
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
            }}
          >
            Explore
          </span>
          <div
            style={{
              width: 1,
              height: 36,
              backgroundColor: 'var(--text-tertiary)',
              animation: 'scrollLineAnim 2s ease-in-out infinite',
              transformOrigin: 'top',
              borderRadius: 1,
            }}
          />
        </div>
      </section>

      <SurpriseMeModal isOpen={surpriseOpen} onClose={() => setSurpriseOpen(false)} />

      <style>{`
        .hero-section {
          min-height: 100vh;
        }
        @media (max-width: 767px) {
          .hero-section {
            min-height: auto !important;
            padding-top: 105px !important;
            padding-bottom: 48px !important;
          }
          .hero-title {
            margin-bottom: 12px !important;
          }
          .hero-subtitle {
            font-size: 0.95rem !important;
            margin-bottom: 20px !important;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
      `}</style>
    </>
  );
}
