'use client';

import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface MovieTrailerPlayerProps {
  trailerYoutubeId?: string;
  hindiTrailerYoutubeId?: string;
  title: string;
  year: number;
  language?: string;
  coverImage?: string;
}

export default function MovieTrailerPlayer({
  trailerYoutubeId,
  hindiTrailerYoutubeId,
  title,
  year,
  language = 'Original',
}: MovieTrailerPlayerProps) {
  const [activeTrailer, setActiveTrailer] = useState<'original' | 'hindi'>('original');
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(encodeURIComponent(window.location.origin));
    }
  }, []);

  if (!trailerYoutubeId && !hindiTrailerYoutubeId) return null;

  const currentId = activeTrailer === 'hindi' && hindiTrailerYoutubeId ? hindiTrailerYoutubeId : trailerYoutubeId;

  // Ultra-compatible Youtube nocookie URL with playsinline=1, enablejsapi=1 & origin parameter
  const embedUrl = `https://www.youtube-nocookie.com/embed/${currentId}?controls=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1${origin ? `&origin=${origin}` : ''}`;

  return (
    <div id="official-trailer" className="space-y-4 scroll-mt-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs font-bold uppercase tracking-wider mb-2">
            <Play className="w-3.5 h-3.5 fill-[#e5a93c]" />
            Cinematic Preview
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
            Official Trailer
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Watch the trailer for {title} ({year}).
          </p>
        </div>

        {/* Dual Language Selector */}
        {hindiTrailerYoutubeId && (
          <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-white/15 p-1 rounded-xl shadow-lg self-start sm:self-center">
            <button
              type="button"
              onClick={() => setActiveTrailer('original')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTrailer === 'original'
                  ? 'bg-[#e5a93c] text-[#0a0a0f] shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🎬</span>
              <span>{language} (Original)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTrailer('hindi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTrailer === 'hindi'
                  ? 'bg-[#e5a93c] text-[#0a0a0f] shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🇮🇳</span>
              <span>Hindi Dubbed</span>
            </button>
          </div>
        )}
      </div>

      {/* Pure Native YouTube Player Embed */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black">
        <iframe
          key={currentId}
          src={embedUrl}
          title={`${title} ${activeTrailer === 'hindi' ? 'Hindi' : 'Official'} Trailer`}
          className="w-full h-full border-0 relative z-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
