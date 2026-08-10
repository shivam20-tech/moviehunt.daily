'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Film } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#hunt-flow', label: 'Discover' },
  { href: '/collections', label: 'Collections' },
  { href: '/journey', label: 'Archive' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
          <Link href="/" aria-label="MovieHunt — Go home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid rgba(229, 169, 60, 0.6)',
                boxShadow: '0 0 12px rgba(229, 169, 60, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                backgroundColor: '#0a0a0f',
              }}
            >
              <img
                src="/logo.jpg"
                alt="MovieHunt Official Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 17,
                  color: '#f0efe8',
                  letterSpacing: '-0.01em',
                }}
              >
                MOVIE<span style={{ color: '#c9913a' }}>HUNT</span>
              </span>
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 8.5,
                  color: '#55555f',
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

          {/* ── Desktop CTA ── */}
          <div className="navbar-desktop-cta" style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="/#hunt-flow"
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
              onClick={() => setMobileOpen(false)}
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
            onClick={() => setMobileOpen(false)}
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

        /* CTA button hover */
        .navbar-cta-btn:hover {
          background-color: #b8832f !important;
          transform: translateY(-1px);
        }
        .navbar-cta-btn:active {
          transform: scale(0.98);
          transition-duration: 80ms !important;
        }
      `}</style>
    </>
  );
}
