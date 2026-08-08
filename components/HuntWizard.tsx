'use client';

import React, { useState, useEffect } from 'react';
import {
  HUNTS_DATA, MOODS, DURATION_OPTIONS, LANGUAGE_OPTIONS, AFTER_CREDITS_EMOTIONS, HuntItem,
} from '@/data/hunts';
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Star, ExternalLink, Film, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import CinematicImage from './CinematicImage';

export default function HuntWizard() {
  const [step, setStep] = useState<number>(1);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const [recommendation, setRecommendation] = useState<HuntItem | null>(null);
  // "Finding..." cinematic bridge state
  const [finding, setFinding] = useState(false);
  const [isSurprise, setIsSurprise] = useState(false);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Trigger the cinematic bridge
      setFinding(true);
    }
  };

  const handleSurpriseMe = () => {
    setIsSurprise(true);
    setFinding(true);
  };

  // After the "Finding..." state runs, reveal the recommendation
  useEffect(() => {
    if (!finding) return;

    const timer = setTimeout(() => {
      let filtered = [...HUNTS_DATA];

      if (isSurprise || selectedMood === 'dont-know') {
        const topHunts = HUNTS_DATA.filter((h) => (h.imdbRating ?? 0) >= 8.3);
        const randomMatch = topHunts[Math.floor(Math.random() * topHunts.length)] || HUNTS_DATA[0];
        setRecommendation(randomMatch);
        setFinding(false);
        setStep(5);
        return;
      }

      if (selectedLanguage && selectedLanguage !== 'all') {
        filtered = filtered.filter((h) =>
          h.language.toLowerCase().includes(selectedLanguage.toLowerCase())
        );
      }
      if (selectedDuration === 'binge') {
        filtered = filtered.filter((h) => h.type === 'series');
      }

      // Score by mood match
      if (selectedMood) {
        filtered.sort((a, b) => {
          const aMatch = a.moodTags?.some(t => t.toLowerCase().includes(selectedMood)) ? 1 : 0;
          const bMatch = b.moodTags?.some(t => t.toLowerCase().includes(selectedMood)) ? 1 : 0;
          return bMatch - aMatch;
        });
      }

      const match = filtered.length > 0 ? filtered[0] : HUNTS_DATA[0];
      setRecommendation(match);
      setFinding(false);
      setStep(5);
    }, 2200); // Bridge lasts 2.2s — enough to feel cinematic, not sluggish

    return () => clearTimeout(timer);
  }, [finding, selectedLanguage, selectedDuration, selectedMood, isSurprise]);

  const handleReset = () => {
    setStep(1);
    setSelectedMood('');
    setSelectedDuration('');
    setSelectedLanguage('all');
    setSelectedEmotion('');
    setRecommendation(null);
    setFinding(false);
    setIsSurprise(false);
  };

  // Wizard option button style
  const optionStyle = (selected: boolean): React.CSSProperties => ({
    padding: 'var(--space-6)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'left',
    border: `1px solid ${selected ? 'var(--border-focus)' : 'var(--border)'}`,
    backgroundColor: selected ? 'var(--accent-faint)' : 'var(--bg-elevated)',
    color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
    cursor: 'pointer',
    transition: `border-color var(--dur-hover) var(--ease-out),
                 background-color var(--dur-hover) var(--ease-out),
                 color var(--dur-hover) var(--ease-out),
                 transform var(--dur-move) var(--ease-out)`,
    transform: selected ? 'translateY(-1px)' : 'none',
    width: '100%',
    fontFamily: 'var(--font-sans)',
  });

  const MOOD_OPTIONS_WITH_DONT_KNOW = [
    ...MOODS,
    {
      id: 'dont-know',
      label: '🎲 I Don\'t Know Yet',
      description: 'Can\'t decide? Let us surprise you with a top masterpiece.'
    }
  ];

  return (
    <section
      id="hunt-flow"
      aria-label="Find your perfect movie"
      style={{
        backgroundColor: 'var(--bg)',
        padding: 'var(--space-24) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Very subtle ambient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,145,58,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="section-inner"
        style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}
      >
        {/* The wizard card */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            position: 'relative',
          }}
        >

          {/* Progress bar — steps 1–4 */}
          {step <= 4 && !finding && (
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-2)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  Step {step} of 4
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    fontWeight: 500,
                  }}
                >
                  {step === 1 && 'Mood'}
                  {step === 2 && 'Duration'}
                  {step === 3 && 'Language'}
                  {step === 4 && 'Feeling'}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 2,
                  backgroundColor: 'var(--border)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    backgroundColor: 'var(--accent)',
                    borderRadius: 2,
                    width: `${(step / 4) * 100}%`,
                    transition: `width var(--dur-reveal) var(--ease-out)`,
                  }}
                />
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════
              STEP 1: Mood
          ═══════════════════════════════════ */}
          {step === 1 && !finding && (
            <div className="cms-step-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-widest)',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  1. Atmospheric Mood
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                    color: 'var(--text-primary)',
                    fontWeight: 400,
                    margin: '0 0 var(--space-2)',
                    lineHeight: 1.25,
                  }}
                >
                  What are you in the mood for tonight?
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', margin: 0 }}>
                  Select the feeling you want to experience.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 'var(--space-3)',
                }}
              >
                {MOOD_OPTIONS_WITH_DONT_KNOW.map((m) => (
                  <button key={m.id} onClick={() => setSelectedMood(m.id)} style={optionStyle(selectedMood === m.id)}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 500, marginBottom: 4, color: 'inherit' }}>
                      {m.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                      {m.description}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <button
                  onClick={handleSurpriseMe}
                  className="btn"
                  style={{
                    gap: 6,
                    fontSize: 'var(--text-xs)',
                    backgroundColor: 'rgba(201, 145, 58, 0.1)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                  }}
                >
                  <Sparkles size={14} />
                  I Don&apos;t Know Yet (Surprise Me)
                </button>
                <button
                  disabled={!selectedMood}
                  onClick={() => {
                    if (selectedMood === 'dont-know') {
                      handleSurpriseMe();
                    } else {
                      handleNextStep();
                    }
                  }}
                  className="btn btn-primary"
                  style={{ gap: 8, fontSize: 'var(--text-sm)', opacity: selectedMood ? 1 : 0.35, cursor: selectedMood ? 'pointer' : 'not-allowed' }}
                >
                  Next Step
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════
              STEP 2: Duration
          ═══════════════════════════════════ */}
          {step === 2 && !finding && (
            <div className="cms-step-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontWeight: 500, display: 'block', marginBottom: 'var(--space-3)' }}>
                  2. Duration
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: 'var(--text-primary)', fontWeight: 400, margin: 0, lineHeight: 1.25 }}>
                  How much time do you have?
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                {DURATION_OPTIONS.map((d) => (
                  <button key={d.id} onClick={() => setSelectedDuration(d.id)} style={optionStyle(selectedDuration === d.id)}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 500, color: 'inherit' }}>
                      {d.label}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ gap: 6, fontSize: 'var(--text-sm)' }}>
                  <ArrowLeft size={14} strokeWidth={1.5} /> Back
                </button>
                <button
                  onClick={handleSurpriseMe}
                  className="btn"
                  style={{
                    gap: 6,
                    fontSize: 'var(--text-xs)',
                    backgroundColor: 'rgba(201, 145, 58, 0.1)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                  }}
                >
                  <Sparkles size={14} />
                  I Don&apos;t Know Yet (Surprise Me)
                </button>
                <button
                  disabled={!selectedDuration}
                  onClick={handleNextStep}
                  className="btn btn-primary"
                  style={{ gap: 8, fontSize: 'var(--text-sm)', opacity: selectedDuration ? 1 : 0.35, cursor: selectedDuration ? 'pointer' : 'not-allowed' }}
                >
                  Next Step <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════
              STEP 3: Language
          ═══════════════════════════════════ */}
          {step === 3 && !finding && (
            <div className="cms-step-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontWeight: 500, display: 'block', marginBottom: 'var(--space-3)' }}>
                  3. Language
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: 'var(--text-primary)', fontWeight: 400, margin: 0, lineHeight: 1.25 }}>
                  Which language do you prefer?
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--space-3)' }}>
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button key={lang.id} onClick={() => setSelectedLanguage(lang.id)} style={optionStyle(selectedLanguage === lang.id)}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'inherit' }}>
                      {lang.label}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <button onClick={() => setStep(2)} className="btn btn-ghost" style={{ gap: 6, fontSize: 'var(--text-sm)' }}>
                  <ArrowLeft size={14} strokeWidth={1.5} /> Back
                </button>
                <button
                  onClick={handleSurpriseMe}
                  className="btn"
                  style={{
                    gap: 6,
                    fontSize: 'var(--text-xs)',
                    backgroundColor: 'rgba(201, 145, 58, 0.1)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                  }}
                >
                  <Sparkles size={14} />
                  I Don&apos;t Know Yet (Surprise Me)
                </button>
                <button onClick={handleNextStep} className="btn btn-primary" style={{ gap: 8, fontSize: 'var(--text-sm)' }}>
                  Next Step <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════
              STEP 4: Desired Emotion
          ═══════════════════════════════════ */}
          {step === 4 && !finding && (
            <div className="cms-step-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontWeight: 500, display: 'block', marginBottom: 'var(--space-3)' }}>
                  4. The Payoff
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: 'var(--text-primary)', fontWeight: 400, margin: 0, lineHeight: 1.25 }}>
                  How do you want to feel when the credits roll?
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                {AFTER_CREDITS_EMOTIONS.map((emo) => (
                  <button key={emo.id} onClick={() => setSelectedEmotion(emo.id)} style={optionStyle(selectedEmotion === emo.id)}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'inherit' }}>
                      {emo.label}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <button onClick={() => setStep(3)} className="btn btn-ghost" style={{ gap: 6, fontSize: 'var(--text-sm)' }}>
                  <ArrowLeft size={14} strokeWidth={1.5} /> Back
                </button>
                <button
                  onClick={handleSurpriseMe}
                  className="btn"
                  style={{
                    gap: 6,
                    fontSize: 'var(--text-xs)',
                    backgroundColor: 'rgba(201, 145, 58, 0.1)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                  }}
                >
                  <Sparkles size={14} />
                  I Don&apos;t Know Yet (Surprise Me)
                </button>
                <button
                  disabled={!selectedEmotion}
                  onClick={handleNextStep}
                  className="btn btn-primary"
                  style={{ gap: 8, fontSize: 'var(--text-sm)', opacity: selectedEmotion ? 1 : 0.35, cursor: selectedEmotion ? 'pointer' : 'not-allowed' }}
                >
                  Reveal My Recommendation
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════
              FINDING BRIDGE — The cinematic moment
              Background darkens. One sentence.
              Pause. Then recommendation fades in.
          ═══════════════════════════════════ */}
          {finding && (
            <div
              className="cms-finding"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 280,
                gap: 'var(--space-4)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Finding tonight&apos;s story
                <span className="cms-dot" style={{ display: 'inline-block', marginLeft: 2 }}>.</span>
                <span className="cms-dot" style={{ display: 'inline-block', marginLeft: 1 }}>.</span>
                <span className="cms-dot" style={{ display: 'inline-block', marginLeft: 1 }}>.</span>
              </p>
              <div
                style={{
                  width: 1,
                  height: 48,
                  backgroundColor: 'var(--border)',
                  borderRadius: 1,
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-widest)',
                  margin: 0,
                }}
              >
                Matching your taste
              </p>
            </div>
          )}

          {/* ═══════════════════════════════════
              STEP 5: Recommendation Reveal
              Poster scales in. Text fades. Actions last.
          ═══════════════════════════════════ */}
          {step === 5 && recommendation && !finding && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 'var(--space-6)',
                  borderBottom: '1px solid var(--border)',
                }}
                className="cms-rec-text"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={14} color="var(--accent)" strokeWidth={2} />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--tracking-widest)',
                      fontWeight: 500,
                    }}
                  >
                    Your Perfect Match Tonight
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="btn btn-ghost"
                  style={{ fontSize: 'var(--text-xs)', gap: 5 }}
                >
                  <RotateCcw size={12} strokeWidth={1.5} />
                  Start Over
                </button>
              </div>

              {/* 2-column layout */}
              <div
                style={{
                  display: 'grid',
                  gap: 'var(--space-8)',
                  alignItems: 'start',
                }}
                className="rec-grid"
              >
                {/* Poster — scales in first */}
                <div
                  className="cms-rec-poster"
                  style={{
                    position: 'relative',
                    aspectRatio: '2 / 3',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                  }}
                >
                  <CinematicImage
                    src={recommendation.coverImage}
                    alt={`${recommendation.title} poster`}
                    objectPosition="center top"
                    priority
                  />
                  {recommendation.imdbRating && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        backgroundColor: 'rgba(13,13,18,0.88)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        borderRadius: 'var(--radius-full)',
                        padding: '4px 9px',
                      }}
                    >
                      <Star size={10} fill="var(--accent)" strokeWidth={0} />
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {recommendation.imdbRating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Text content — fades in after poster */}
                <div
                  className="cms-rec-text"
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
                      {recommendation.type === 'movie' ? 'Feature Film' : 'Web Series'} · {recommendation.year} · {recommendation.language}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        color: 'var(--text-primary)',
                        fontWeight: 400,
                        margin: 'var(--space-2) 0 0',
                        lineHeight: 1.2,
                      }}
                    >
                      {recommendation.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      padding: 'var(--space-4)',
                      backgroundColor: 'var(--accent-faint)',
                      border: '1px solid var(--accent-border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', margin: '0 0 var(--space-2)', fontWeight: 500 }}>
                      Why this?
                    </p>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text-primary)', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                      &ldquo;{recommendation.hook}&rdquo;
                    </p>
                  </div>

                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0, fontWeight: 300 }}>
                    {recommendation.storySummary}
                  </p>

                  {recommendation.bestFor && recommendation.bestFor.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {recommendation.bestFor.map((b, i) => (
                        <span key={i} className="badge">{b}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action row — last to appear */}
              <div
                className="cms-rec-actions"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  paddingTop: 'var(--space-6)',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <a
                  href={recommendation.availableOn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: 'var(--text-sm)', gap: 6 }}
                >
                  Watch on {recommendation.availableOn.name}
                  <ExternalLink size={13} strokeWidth={1.5} />
                </a>
                <Link
                  href={`/hunt/${recommendation.id}`}
                  className="btn btn-secondary"
                  style={{ fontSize: 'var(--text-sm)', gap: 6 }}
                >
                  <Film size={13} strokeWidth={1.5} />
                  Full Breakdown
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .rec-grid {
            grid-template-columns: 220px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
