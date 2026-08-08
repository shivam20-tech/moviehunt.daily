'use client';

import React, { useState, useEffect } from 'react';
import { Film, Clapperboard, Sparkles } from 'lucide-react';

const LOADING_QUOTES = [
  "Filtering 500,000 titles down to 1...",
  "Eliminating decision fatigue...",
  "Consulting the 100-day vault...",
  "Checking Assamese folklore & Punjabi thrillers...",
  "Finding movies actually worth your time..."
];

interface CinematicLoaderProps {
  message?: string;
}

export default function CinematicLoader({ message }: CinematicLoaderProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % LOADING_QUOTES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
      {/* Film Projector Lens Graphic */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer Spinning Gear */}
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-[#e5a93c] animate-spin"
          style={{ animationDuration: '4s' }}
        />
        {/* Inner Pulsing Core */}
        <div className="w-16 h-16 rounded-full bg-[#e5a93c]/20 border border-[#e5a93c]/50 flex items-center justify-center shadow-gold animate-pulse">
          <Clapperboard className="w-8 h-8 text-[#e5a93c]" />
        </div>
      </div>

      {/* Dynamic Loading Message */}
      <div className="space-y-2 max-w-sm">
        <span className="text-xs uppercase tracking-widest text-[#e5a93c] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-[#e5a93c]" />
          MovieHunt Engine
        </span>
        <p className="text-sm font-semibold text-white font-serif italic transition-all duration-300">
          &ldquo;{message || LOADING_QUOTES[quoteIndex]}&rdquo;
        </p>
      </div>

      {/* Film Strip Progress Bar */}
      <div className="w-48 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/10 relative">
        <div className="h-full bg-gradient-to-r from-[#e5a93c] via-[#f39c12] to-[#e74c3c] animate-pulse" />
      </div>
    </div>
  );
}
