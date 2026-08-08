'use client';

import React from 'react';
import Link from 'next/link';
import { Film, ArrowUp } from 'lucide-react';

const NAV_LINKS = [
  { href: '#todays-hunt', label: "Today's Featured Hunt" },
  { href: '#discover', label: 'Discover by Mood' },
  { href: '#collections', label: 'Curated Collections' },
  { href: '#archive', label: 'The Archive' },
];

export default function Footer() {
  return (
    <footer
      id="story"
      role="contentinfo"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: 'var(--space-16) 0 var(--space-8)',
      }}
    >
      <div className="section-inner">
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'var(--space-12)',
            paddingBottom: 'var(--space-12)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            <Link
              href="/"
              aria-label="MovieHunt home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--accent-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Film size={14} color="var(--accent)" strokeWidth={1.5} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 16,
                  color: 'var(--text-primary)',
                }}
              >
                MOVIE<span style={{ color: 'var(--accent)' }}>HUNT</span>
              </span>
            </Link>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-base)',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                margin: 0,
                maxWidth: 280,
              }}
            >
              &ldquo;Life is too short to waste on average stories.&rdquo;
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                lineHeight: 'var(--leading-relaxed)',
                margin: 0,
              }}
            >
              An independent, human-first curation platform. One recommendation, every day.
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-widest)',
                margin: 0,
              }}
            >
              Navigation
            </h4>
            <nav aria-label="Footer">
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: `color var(--duration-fast) var(--ease-out)`,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Instagram */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-widest)',
                margin: 0,
              }}
            >
              Community
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                margin: 0,
              }}
            >
              Join cinephiles on Instagram for daily breakdowns and scene analysis.
            </p>
            <a
              href="https://instagram.com/moviehunt.daily"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                fontSize: 'var(--text-xs)',
                padding: '8px 16px',
                alignSelf: 'flex-start',
              }}
            >
              @moviehunt.daily
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            paddingTop: 'var(--space-8)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} MovieHunt. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: `color var(--duration-fast) var(--ease-out)`,
              padding: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
          >
            Back to top
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUp size={12} strokeWidth={1.5} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
