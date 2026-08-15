'use client';

import React from 'react';
import Link from 'next/link';
import {
  Film,
  Tv,
  Calendar,
  Sparkles,
  BookOpen,
  BarChart3,
  ExternalLink,
  ArrowRight,
  Star,
  Clapperboard,
  Layers
} from 'lucide-react';
import { HUNTS_DATA, COLLECTIONS } from '@/data/hunts';

export default function AdminOverviewPage() {
  const total = HUNTS_DATA.length;
  const movies = HUNTS_DATA.filter((h) => h.type === 'movie').length;
  const series = HUNTS_DATA.filter((h) => h.type === 'series').length;
  const sortedHunts = [...HUNTS_DATA].sort((a, b) => b.day - a.day);
  const latestHunt = sortedHunts[0];
  const recentHunts = sortedHunts.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#e5a93c] text-xs font-semibold uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-pulse" />
            Editorial Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
            Movie Hunt Dashboard
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Publish recommendations, inspect library catalog, and track platform insights.
          </p>
        </div>

        {/* Hero Primary CTA */}
        <Link
          href="/admin/publish"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] transition-all shadow-lg shadow-[#e5a93c]/10"
        >
          <Sparkles className="w-4 h-4 fill-[#0a0a0f]" />
          + Publish New Hunt
        </Link>
      </div>

      {/* ── Key Metrics Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Hunts */}
        <div className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Total Hunts
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#e5a93c]/10 flex items-center justify-center">
              <Clapperboard className="w-3.5 h-3.5 text-[#e5a93c]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-serif">{total}</div>
          <div className="text-[11px] text-zinc-500">Live recommendations in catalog</div>
        </div>

        {/* Movies */}
        <div className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Movies
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Film className="w-3.5 h-3.5 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-serif">{movies}</div>
          <div className="text-[11px] text-zinc-500">Feature films ({Math.round((movies / total) * 100)}%)</div>
        </div>

        {/* Series */}
        <div className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Series
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Tv className="w-3.5 h-3.5 text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-serif">{series}</div>
          <div className="text-[11px] text-zinc-500">Curated binge-worthy series</div>
        </div>

        {/* Latest Day */}
        <div className="p-5 rounded-2xl bg-[#0d0d12] border border-[#e5a93c]/20 bg-gradient-to-br from-[#0d0d12] to-[#e5a93c]/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#e5a93c]">
              Latest Addition
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#e5a93c]/10 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-[#e5a93c]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-serif truncate">
            Day {latestHunt?.day ?? '—'}
          </div>
          <div className="text-[11px] text-zinc-400 truncate">{latestHunt?.title} ({latestHunt?.year})</div>
        </div>
      </div>

      {/* ── Quick Workspaces & Actions ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Publish Action Card */}
        <Link
          href="/admin/publish"
          className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 hover:border-[#e5a93c]/40 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#e5a93c]/10 flex items-center justify-center text-[#e5a93c]">
              <Sparkles className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#e5a93c] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="text-sm font-semibold text-white group-hover:text-[#e5a93c] transition-colors">
            Publish New Hunt
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Paste raw ChatGPT text, review fields, manage media URLs, and generate TypeScript code.
          </p>
        </Link>

        {/* Library Card */}
        <Link
          href="/admin/library"
          className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 hover:border-[#e5a93c]/40 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#e5a93c] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="text-sm font-semibold text-white group-hover:text-[#e5a93c] transition-colors">
            Browse Content Library
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Search, filter, and inspect all {total} published entries. Load any Hunt directly back into the editor.
          </p>
        </Link>

        {/* Analytics Card */}
        <Link
          href="/admin/analytics"
          className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 hover:border-[#e5a93c]/40 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#e5a93c] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="text-sm font-semibold text-white group-hover:text-[#e5a93c] transition-colors">
            View Analytics Insights
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Monitor top viewed hunts, CTA clicks, streaming platform link engagement, and Clarity heatmaps.
          </p>
        </Link>
      </div>

      {/* ── Recent Hunts Stream ── */}
      <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Recent Additions in Catalog
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Latest recommendations added to <code className="text-[#e5a93c]">data/hunts.ts</code>
            </p>
          </div>
          <Link
            href="/admin/library"
            className="text-xs text-[#e5a93c] hover:underline flex items-center gap-1 font-semibold"
          >
            View All ({total}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-white/5">
          {recentHunts.map((hunt) => (
            <div
              key={hunt.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Thumbnail */}
                <div className="w-12 h-14 rounded-lg bg-zinc-900 overflow-hidden flex-shrink-0 border border-white/10">
                  <img
                    src={hunt.coverImage}
                    alt={hunt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-[#e5a93c]/10 text-[#e5a93c] text-[10px] font-bold">
                      Day {hunt.day}
                    </span>
                    <span className="text-sm font-semibold text-white truncate">
                      {hunt.title}
                    </span>
                    <span className="text-xs text-zinc-500">({hunt.year})</span>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {hunt.type}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-3">
                    <span>Dir: {hunt.director}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#e5a93c]">
                      <Star className="w-3 h-3 fill-[#e5a93c]" />
                      {hunt.imdbRating}
                    </span>
                    <span>•</span>
                    <span className="text-zinc-500">{hunt.availableOn.name}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                <Link
                  href={`/admin/publish?id=${hunt.id}`}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-[#e5a93c] hover:text-[#0a0a0f] text-zinc-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Load into Publisher
                </Link>
                <Link
                  href={`/hunt/${hunt.id}`}
                  target="_blank"
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title="View Public Breakdown Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
