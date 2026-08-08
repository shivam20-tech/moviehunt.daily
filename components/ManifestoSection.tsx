'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';

/**
 * ManifestoSection — Chapter 3: The Editorial Trust Moment
 *
 * Design principle: Earn trust before asking for action.
 *
 * This section does nothing. It doesn't convert. It doesn't show cards.
 * It simply says something true, with enough space to be believed.
 *
 * Warm paper background (#f5f2ed) — a single section that breaks the dark
 * monotony and proves the site has tonal range: it can be dark AND light.
 * The color shift signals: "something different is being said here."
 *
 * No button. No badge. No border. Just the statement.
 */
export default function ManifestoSection() {
  return (
    <section
      aria-label="Our philosophy"
      className="manifesto-section"
      style={{
        padding: 'clamp(72px, 10vw, 128px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top and bottom borders for section separation */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: 'var(--bg-paper-edge)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: 'var(--bg-paper-edge)',
        }}
      />

      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '0 var(--space-6)',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          {/* The statement */}
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              lineHeight: 1.65,
              color: 'var(--text-paper)',
              margin: '0 0 var(--space-12)',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}
          >
            Every recommendation here has been personally watched.
            Not ranked by an algorithm.
            Not filtered by popularity.{' '}
            <span
              style={{
                fontStyle: 'normal',
                color: 'var(--text-paper-mid)',
              }}
            >
              Chosen because it was genuinely worth someone&apos;s evening.
            </span>
          </blockquote>

          {/* Three sparse labels */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--space-6)',
              flexWrap: 'wrap',
            }}
          >
            {['Human-curated', 'Zero algorithmic filler', 'Updated daily'].map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      backgroundColor: 'var(--text-paper-dim)',
                      flexShrink: 0,
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    color: 'var(--text-paper-mid)',
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
