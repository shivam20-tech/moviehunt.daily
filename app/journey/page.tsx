'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import { HUNTS_DATA } from '@/data/hunts';
import Link from 'next/link';
import { Film, Tv, Star, ArrowRight } from 'lucide-react';

export default function JourneyPage() {
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'series'>('all');

  const filteredHunts = HUNTS_DATA.filter((h) => {
    if (filterType === 'movie') return h.type === 'movie';
    if (filterType === 'series') return h.type === 'series';
    return true;
  });

  const movieCount = HUNTS_DATA.filter((h) => h.type === 'movie').length;
  const seriesCount = HUNTS_DATA.filter((h) => h.type === 'series').length;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f4f4f0] selection:bg-[#e5a93c] selection:text-[#0a0a0f]">

      {/* Header Banner */}
      <section className="relative pt-24 sm:pt-32 pb-10 sm:pb-16 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs font-semibold uppercase tracking-wider">
            <Film className="w-4 h-4 text-[#e5a93c]" />
            Full Movie & Series Vault
          </div>
          <h1 className="text-3xl sm:text-6xl font-extrabold text-white font-serif tracking-tight">
            The MovieHunt Archive
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every handpicked movie & web series recommendation stored in one clean, timeless collection.
          </p>
        </div>
      </section>

      {/* All Hunts Grid */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-white/10 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">Vault Archive</h2>
            <p className="text-xs text-zinc-400">All curated picks filtered for quality.</p>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-[#e5a93c] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All ({HUNTS_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('movie')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === 'movie'
                  ? 'bg-[#e5a93c] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              Movies ({movieCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('series')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === 'series'
                  ? 'bg-[#e5a93c] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              Series ({seriesCount})
            </button>
          </div>
        </div>

        {/* 2-Column Mobile Grid (grid-cols-2) / 3-4 Column Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredHunts.map((hunt) => (
            <Link
              key={hunt.id}
              href={`/hunt/${hunt.id}`}
              className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-[#e5a93c]/50 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[2/3] rounded-lg sm:rounded-xl overflow-hidden mb-3">
                <img
                  src={hunt.coverImage}
                  alt={hunt.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md text-[#e5a93c] text-[10px] sm:text-xs font-bold border border-[#e5a93c]/30 uppercase">
                  {hunt.type === 'movie' ? 'Film' : 'Series'}
                </div>
                {hunt.imdbRating && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/80 text-yellow-400 text-[10px] sm:text-xs font-bold border border-yellow-500/30 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 stroke-none" />
                    <span>{hunt.imdbRating}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block">
                    {hunt.language} · {hunt.year}
                  </span>
                  <h3 className="text-sm sm:text-lg font-bold text-white font-serif mt-0.5 group-hover:text-[#e5a93c] transition-colors line-clamp-1">
                    {hunt.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 italic mt-0.5 line-clamp-2">
                    &ldquo;{hunt.hook}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] sm:text-xs text-[#e5a93c] font-semibold">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
