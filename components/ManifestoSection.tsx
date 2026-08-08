'use client';

import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { Sparkles, RotateCcw } from 'lucide-react';

const FULL_TEXT = "Every recommendation here has been personally watched. Not ranked by an algorithm. Not filtered by popularity. Chosen because it was genuinely worth someone's evening.";

const PART1_TEXT = "Every recommendation here has been personally watched. Not ranked by an algorithm. Not filtered by popularity. ";

/**
 * ManifestoSection — Chapter 3: The Editorial Trust Moment (AI Typewriter Edition)
 *
 * Streams manifesto text letter-by-letter with a blinking golden AI cursor
 * when the user scrolls into view.
 */
export default function ManifestoSection() {
  const [displayedIndex, setDisplayedIndex] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger typing when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // AI Streaming effect (26ms per character)
  useEffect(() => {
    if (!hasStarted) return;

    if (displayedIndex < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedIndex((prev) => prev + 1);
      }, 26);
      return () => clearTimeout(timeout);
    }
  }, [hasStarted, displayedIndex]);

  const handleReplay = () => {
    setDisplayedIndex(0);
    setHasStarted(true);
  };

  const currentText = FULL_TEXT.slice(0, displayedIndex);
  const part1Typed = currentText.slice(0, PART1_TEXT.length);
  const part2Typed = currentText.slice(PART1_TEXT.length);
  const isTypingComplete = displayedIndex >= FULL_TEXT.length;

  return (
    <section
      ref={sectionRef}
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
          {/* AI Manifesto Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: 'rgba(201, 145, 58, 0.1)',
              border: '1px solid rgba(201, 145, 58, 0.25)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <Sparkles size={13} color="var(--accent, #c9913a)" />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent, #c9913a)',
                fontWeight: 600,
              }}
            >
              Editorial Manifesto
            </span>
          </div>

          {/* AI Typewriter Statement */}
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              lineHeight: 1.65,
              color: 'var(--text-paper)',
              margin: '0 0 var(--space-8)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              minHeight: '120px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontStyle: 'italic' }}>
              {part1Typed}
            </span>
            {part2Typed && (
              <span style={{ fontStyle: 'normal', color: 'var(--text-paper-mid)' }}>
                {part2Typed}
              </span>
            )}
            {/* Blinking AI Cursor */}
            <span
              className={`ai-typewriter-cursor ${isTypingComplete ? 'complete' : 'typing'}`}
              aria-hidden="true"
            >
              |
            </span>
          </blockquote>

          {/* Optional Replay Button when typing finishes */}
          {isTypingComplete && (
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <button
                type="button"
                onClick={handleReplay}
                title="Replay typing animation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  color: 'var(--text-paper-mid)',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--bg-paper-edge)',
                  borderRadius: '16px',
                  padding: '4px 12px',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                className="manifesto-replay-btn"
              >
                <RotateCcw size={12} />
                <span>Replay declaration</span>
              </button>
            </div>
          )}

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

      <style>{`
        .ai-typewriter-cursor {
          display: inline-block;
          color: var(--accent, #c9913a);
          font-weight: 600;
          margin-left: 2px;
          animation: cursorBlink 0.65s infinite alternate ease-in-out;
        }
        .ai-typewriter-cursor.complete {
          opacity: 0.35;
          animation: cursorBlinkSlow 1.5s infinite alternate ease-in-out;
        }
        @keyframes cursorBlink {
          0% { opacity: 1; transform: scaleY(1.1); }
          100% { opacity: 0.15; transform: scaleY(0.95); }
        }
        @keyframes cursorBlinkSlow {
          0% { opacity: 0.5; }
          100% { opacity: 0; }
        }
        .manifesto-replay-btn:hover {
          color: var(--text-paper) !important;
          border-color: var(--accent, #c9913a) !important;
        }
      `}</style>
    </section>
  );
}
