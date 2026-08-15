'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import SurpriseMeModal from './SurpriseMeModal';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#hunt-flow', label: 'Discover' },
  { href: '/collections', label: 'Collections' },
  { href: '/journey', label: 'Archive' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // Check on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (href.includes('#') && typeof window !== 'undefined') {
      const hash = href.split('#')[1];
      if (window.location.pathname === '/') {
        e.preventDefault();
        const elem = document.getElementById(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        aria-label="Site header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(13, 13, 18, 0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid transparent',
          transition: `
            background-color 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
            border-color 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
            backdrop-filter 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
          `,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 28px',
            height: scrolled ? 62 : 74,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'height 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="MovieHunt — Go home"
            className="navbar-brand-link"
            style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}
          >
            {/* 1. Projector Reel Icon with Reel Spin & Golden Halo */}
            <div className="logo-reel-frame">
              <img
                src="/logo.jpg"
                alt="MovieHunt Official Logo"
                className="logo-reel-img"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              {/* 2 & 3. 3D Jump Vault + Golden Studio Shimmer */}
              <span
                className="logo-title-group"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 17,
                  color: '#f0efe8',
                  letterSpacing: '-0.01em',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                }}
              >
                <span className="logo-word-movie">MOVIE</span>
                <span className="logo-word-hunt">HUNT</span>
              </span>

              {/* 4. Neon Sign Warm Glow */}
              <span
                className="logo-subtitle-marquee"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 8.5,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginTop: 3,
                }}
              >
                Curated Cinema
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav
            aria-label="Primary navigation"
            className="navbar-desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: 32 }}
          >
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    color: active ? '#f0efe8' : '#8a8a96',
                    textDecoration: 'none',
                    letterSpacing: '0.01em',
                    transition: 'color 150ms ease',
                    position: 'relative',
                    paddingBottom: 2,
                  }}
                  className={active ? 'nav-link nav-link-active' : 'nav-link'}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Surprise Me + CTA ── */}
          <div className="navbar-desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setSurpriseOpen(true)}
              aria-label="Surprise me with a random hunt"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 400,
                color: '#8a8a96',
                background: 'none',
                border: 'none',
                padding: '8px 4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                transition: 'color 150ms ease',
                letterSpacing: '0.01em',
              }}
              className="navbar-surprise-btn"
            >
              <Sparkles size={13} strokeWidth={1.5} />
              Surprise Me
            </button>
            <Link
              href="/#hunt-flow"
              onClick={(e) => handleNavClick(e, '/#hunt-flow')}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: '#0d0d12',
                backgroundColor: '#c9913a',
                textDecoration: 'none',
                padding: '9px 20px',
                borderRadius: 8,
                border: '1px solid transparent',
                letterSpacing: '0.01em',
                transition: 'background-color 150ms ease, transform 220ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
              }}
              className="navbar-cta-btn"
            >
              Start Hunting
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="navbar-hamburger"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#f0efe8',
              transition: 'background-color 150ms ease',
            }}
          >
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ── */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 49,
          backgroundColor: 'rgba(13,13,18,0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '96px 28px 40px',
          gap: 0,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transition: 'opacity 220ms ease',
        }}
      >
        <nav aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(2rem, 8vw, 3rem)',
                color: isActive(href) ? '#f0efe8' : '#55555f',
                textDecoration: 'none',
                padding: '10px 0',
                transition: 'color 150ms ease',
                transitionDelay: mobileOpen ? `${i * 40}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-12px)',
              }}
            >
              {label}
            </Link>
          ))}
          {/* Surprise Me mobile link */}
          <button
            onClick={() => { setMobileOpen(false); setSurpriseOpen(true); }}
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(1.5rem, 6vw, 2.2rem)',
              color: '#c9913a',
              background: 'none',
              border: 'none',
              padding: '10px 0',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              transition: 'opacity 150ms ease',
              transitionDelay: mobileOpen ? `${NAV_LINKS.length * 40}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateX(0)' : 'translateX(-12px)',
            }}
            aria-label="Surprise me with a random hunt"
          >
            <Sparkles size={20} strokeWidth={1.5} />
            Surprise Me
          </button>
        </nav>

        <div
          style={{
            marginTop: 40,
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Link
            href="/#hunt-flow"
            onClick={(e) => handleNavClick(e, '/#hunt-flow')}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              display: 'block',
              width: '100%',
              padding: '14px 24px',
              backgroundColor: '#c9913a',
              color: '#0d0d12',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'none',
              borderRadius: 10,
              textAlign: 'center',
              letterSpacing: '0.01em',
            }}
          >
            Start Hunting
          </Link>
        </div>
      </div>

      {/* Surprise Me modal — shared instance in Navbar */}
      <SurpriseMeModal isOpen={surpriseOpen} onClose={() => setSurpriseOpen(false)} />

      <style>{`
        /* Desktop vs mobile visibility */
        @media (min-width: 768px) {
          .navbar-desktop-nav { display: flex !important; }
          .navbar-desktop-cta { display: flex !important; }
          .navbar-hamburger    { display: none !important; }
        }
        @media (max-width: 767px) {
          .navbar-desktop-nav { display: none !important; }
          .navbar-desktop-cta { display: none !important; }
          .navbar-hamburger    { display: flex !important; }
        }

        /* Active nav link — subtle amber underline dot */
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: #c9913a;
          border-radius: 2px;
          opacity: 0.7;
        }

        /* Nav link hover */
        .nav-link:hover {
          color: #f0efe8 !important;
        }

        /* Surprise Me button hover */
        .navbar-surprise-btn:hover {
          color: #c9913a !important;
        }

        /* CTA button hover */
        .navbar-cta-btn:hover {
          background-color: #b8832f !important;
          transform: translateY(-1px);
        }
        .navbar-cta-btn:active {
          transform: scale(0.98);
          transition-duration: 80ms !important;
        }

        /* ── Logo Interactive Styling & Motion (Hover-only, Calm Resting State) ── */
        .logo-reel-frame {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          overflow: hidden;
          border: 1.5px solid rgba(229, 169, 60, 0.6);
          box-shadow: 0 0 12px rgba(229, 169, 60, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background-color: #0a0a0f;
          transition: transform 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 300ms ease;
        }

        .logo-reel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .logo-title-group {
          position: relative;
          display: inline-flex;
          align-items: baseline;
        }

        .logo-word-movie {
          position: relative;
          display: inline-block;
          color: #f0efe8;
          transition: color 200ms ease;
        }

        .logo-word-hunt {
          position: relative;
          display: inline-block;
          color: #c9913a;
          transition: color 200ms ease, text-shadow 250ms ease, transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .logo-subtitle-marquee {
          color: #55555f;
          transition: color 200ms ease;
        }

        /* ── Interactive Hover: Refined & Luxurious ── */
        .navbar-brand-link:hover .logo-reel-frame {
          transform: rotate(180deg);
          box-shadow: 0 0 18px rgba(229, 169, 60, 0.65), 0 0 4px rgba(255, 228, 158, 0.8);
        }
        .navbar-brand-link:hover .logo-word-hunt {
          color: #ffe49e;
          text-shadow: 0 0 12px rgba(201, 145, 58, 0.65);
          transform: translateY(-0.5px);
        }
        .navbar-brand-link:hover .logo-subtitle-marquee {
          color: #c9913a;
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-reel-frame,
          .logo-word-hunt,
          .navbar-brand-link:hover .logo-reel-frame,
          .navbar-brand-link:hover .logo-word-hunt {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
