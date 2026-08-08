'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HUNTS_DATA, HuntItem } from '@/data/hunts';
import { Sparkles, X, ExternalLink, Star, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import CinematicLoader from './CinematicLoader';
import CinematicImage from './CinematicImage';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SurpriseMeModal({ isOpen, onClose }: SurpriseMeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isRevealing, setIsRevealing] = useState(true);
  const [selectedPick, setSelectedPick] = useState<HuntItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rollDice = () => {
    setIsRevealing(true);
    // Pick a random hunt
    const randomIndex = Math.floor(Math.random() * HUNTS_DATA.length);
    setSelectedPick(HUNTS_DATA[randomIndex]);

    // Fast 800ms reveal — snappy & responsive, doesn't force user to wait long
    const timer = setTimeout(() => {
      setIsRevealing(false);
    }, 800);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (isOpen) {
      // Lock scroll while modal is open
      document.body.style.overflow = 'hidden';
      rollDice();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="surprise-modal-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999, // Ensure top-most stacking over fixed Navbar & Hero
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(9, 9, 13, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'cms-fade 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      }}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 640,
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--accent-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(201, 145, 58, 0.15)',
          animation: 'cms-modal-in 220ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 150ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        {isRevealing ? (
          <div style={{ padding: '32px 0' }}>
            <CinematicLoader message="Consulting the Vault for 1 Perfect Pick..." />
          </div>
        ) : (
          selectedPick && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Eyebrow Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={14} color="var(--accent)" />
                <span
                  id="surprise-modal-title"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--accent)',
                  }}
                >
                  Tonight&apos;s Chosen Hunt
                </span>
              </div>

              {/* Movie Grid inside Modal */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 20,
                  alignItems: 'start',
                }}
              >
                {/* Poster */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '2 / 3',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                  }}
                >
                  <CinematicImage
                    src={selectedPick.coverImage}
                    alt={`${selectedPick.title} poster`}
                    priority
                  />
                  {selectedPick.imdbRating && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        backgroundColor: 'rgba(13,13,18,0.88)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        borderRadius: 'var(--radius-full)',
                        padding: '3px 8px',
                      }}
                    >
                      <Star size={10} fill="var(--accent)" strokeWidth={0} />
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {selectedPick.imdbRating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 11,
                        color: 'var(--text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {selectedPick.type === 'movie' ? '🎬 Feature Film' : '📺 Web Series'} · {selectedPick.year} · {selectedPick.language}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 22,
                        color: 'var(--text-primary)',
                        margin: '4px 0 0',
                        fontWeight: 400,
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedPick.title}
                    </h3>
                  </div>

                  {/* Hook Quote Box */}
                  <div
                    style={{
                      padding: '10px 14px',
                      backgroundColor: 'var(--accent-faint)',
                      border: '1px solid var(--accent-border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 13,
                        color: 'var(--accent)',
                        fontStyle: 'italic',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      &ldquo;{selectedPick.hook}&rdquo;
                    </p>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {selectedPick.storySummary}
                  </p>

                  {/* Badges */}
                  {selectedPick.bestFor && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {selectedPick.bestFor.slice(0, 2).map((item, idx) => (
                        <span key={idx} className="badge">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, paddingTop: 8 }}>
                    <a
                      href={selectedPick.availableOn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: 12, padding: '8px 16px', gap: 5 }}
                    >
                      <span>Watch on {selectedPick.availableOn.name}</span>
                      <ExternalLink size={12} strokeWidth={1.5} />
                    </a>

                    <Link
                      href={`/hunt/${selectedPick.id}`}
                      onClick={onClose}
                      className="btn btn-secondary"
                      style={{ fontSize: 12, padding: '8px 14px', gap: 4 }}
                    >
                      <span>Full Page</span>
                      <ArrowRight size={12} strokeWidth={1.5} />
                    </Link>

                    <button
                      onClick={rollDice}
                      className="btn btn-ghost"
                      style={{ padding: 8 }}
                      title="Spin again for another pick"
                    >
                      <RotateCcw size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
