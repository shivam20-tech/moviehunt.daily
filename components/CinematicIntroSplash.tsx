'use client';

import React, { useState, useEffect } from 'react';
import { Film, Play, Sparkles } from 'lucide-react';

export default function CinematicIntroSplash() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('moviehunt_intro_seen');
    if (hasSeenIntro) {
      setShowSplash(false);
    }
  }, []);

  const handleEnterSite = () => {
    setIsFadingOut(true);
    sessionStorage.setItem('moviehunt_intro_seen', 'true');
    setTimeout(() => {
      setShowSplash(false);
    }, 800);
  };

  if (!showSplash) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050508] flex flex-col items-center justify-center p-6 transition-all duration-800 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Glow & Film Vignette */}
      <div className="absolute inset-0 z-0 bg-radial-vignette opacity-80" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e5a93c]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Cinematic Content Wrapper */}
      <div className="relative z-10 max-w-2xl text-center space-y-8 animate-fadeIn">
        {/* Animated Film Reel Icon with Official Logo */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#e5a93c]/60 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e5a93c] to-[#c0392b] p-[2px] shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[#0a0a0f] rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="MovieHunt Official Logo"
                className="w-full h-full object-cover animate-pulse"
              />
            </div>
          </div>
        </div>

        {/* Title Branding */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#e5a93c]" />
            A Curated Cinema Experience
          </span>

          <h1 className="text-5xl sm:text-7xl font-extrabold text-white font-serif tracking-tight leading-none">
            MOVIE<span className="text-[#e5a93c]">HUNT</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto font-serif italic pt-2">
            &ldquo;Finding your next favorite movie shouldn&apos;t take an hour. Only stories worth your time.&rdquo;
          </p>
        </div>

        {/* Enter CTA Button */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={handleEnterSite}
            className="group relative px-10 py-4 rounded-2xl bg-[#e5a93c] hover:bg-[#d4982b] text-[#0a0a0f] font-extrabold text-base tracking-wider uppercase shadow-2xl shadow-[#e5a93c]/20 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-[#0a0a0f]" />
            <span>ENTER THE HUNT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
