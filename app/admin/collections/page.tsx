'use client';

import React from 'react';
import Link from 'next/link';
import { FolderKanban, Info, Layers, Film, ArrowRight } from 'lucide-react';
import { COLLECTIONS, HUNTS_DATA } from '@/data/hunts';

export default function AdminCollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#e5a93c] text-xs font-semibold uppercase tracking-widest mb-1">
            <FolderKanban className="w-3.5 h-3.5" />
            Curated Collections
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
            Thematic Collections
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Reference catalog of all {COLLECTIONS.length} curated theme playlists.
          </p>
        </div>

        <Link
          href="/collections"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-semibold hover:text-white hover:bg-zinc-800 transition-colors"
        >
          View Public Collections Page →
        </Link>
      </div>

      {/* ── V1 Foundation Architecture Note ── */}
      <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 flex items-start gap-3 text-xs text-zinc-400">
        <Info className="w-4 h-4 text-[#e5a93c] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-white">V1 Static Collections Reference</span>
          <p className="text-zinc-500 leading-relaxed">
            Collections are statically configured in <code className="text-[#e5a93c]">data/hunts.ts</code>. This page provides an overview of all active thematic playlists and their curation criteria.
          </p>
        </div>
      </div>

      {/* ── Collections Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COLLECTIONS.map((col) => (
          <div
            key={col.id}
            className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between space-y-4 group"
          >
            {/* Header Image & Info */}
            <div className="space-y-3">
              <div className="w-full h-36 rounded-xl bg-zinc-900 overflow-hidden relative border border-white/10">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#e5a93c] text-[11px] font-bold border border-white/10">
                  {col.count} Hunts
                </span>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#e5a93c] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                  {col.description}
                </p>
              </div>
            </div>

            {/* Bottom meta */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono text-[11px]">ID: {col.id}</span>
              <Link
                href="/collections"
                target="_blank"
                className="text-[#e5a93c] hover:underline flex items-center gap-1 font-semibold text-[11px]"
              >
                Browse <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
