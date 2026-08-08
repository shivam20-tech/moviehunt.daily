import React from 'react';

import Footer from '@/components/Footer';
import { HUNTS_DATA } from '@/data/hunts';
import Link from 'next/link';
import { Film, Star, ArrowRight } from 'lucide-react';

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f4f4f0] selection:bg-[#e5a93c] selection:text-[#0a0a0f]">

      {/* Header Banner */}
      <section className="relative pt-32 pb-16 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs font-semibold uppercase tracking-wider">
            <Film className="w-4 h-4 text-[#e5a93c]" />
            Full Movie & Series Vault
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-serif tracking-tight">
            The MovieHunt Archive
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-base leading-relaxed">
            Every handpicked movie & web series recommendation stored in one clean, timeless collection.
          </p>
        </div>
      </section>

      {/* All Hunts Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-serif">Vault Archive</h2>
            <p className="text-xs text-zinc-400">All curated picks filtered for quality.</p>
          </div>
          <span className="text-xs text-[#e5a93c] font-bold">Showing {HUNTS_DATA.length} Curated Picks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUNTS_DATA.map((hunt) => (
            <Link
              key={hunt.id}
              href={`/hunt/${hunt.id}`}
              className="group p-5 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-[#e5a93c]/50 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                <img
                  src={hunt.coverImage}
                  alt={hunt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md text-[#e5a93c] text-xs font-bold border border-[#e5a93c]/30 uppercase">
                  {hunt.type === 'movie' ? '🎬 Film' : '📺 Series'}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 text-yellow-400 text-xs font-bold border border-yellow-500/30 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  <span>{hunt.imdbRating}</span>
                </div>
              </div>

              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                    {hunt.type === 'movie' ? '🎬 Feature Film' : '📺 Web Series'} · {hunt.year}
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif mt-0.5 group-hover:text-[#e5a93c] transition-colors">
                    {hunt.title}
                  </h3>
                  <p className="text-xs text-zinc-300 italic mt-1 line-clamp-2">
                    &ldquo;{hunt.hook}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#e5a93c] font-semibold">
                  <span>Explore Recommendation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
