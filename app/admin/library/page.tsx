'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Film,
  Tv,
  Star,
  ExternalLink,
  Sparkles,
  Eye,
  Copy,
  Check,
  X,
  Play,
  ArrowUpDown,
  BookOpen,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { HUNTS_DATA, HuntItem } from '@/data/hunts';

export default function AdminLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'movie' | 'series'>('all');
  const [sortBy, setSortBy] = useState<'day-desc' | 'day-asc' | 'rating-desc' | 'title-asc' | 'year-desc'>('day-desc');
  const [selectedHuntForPreview, setSelectedHuntForPreview] = useState<HuntItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered and sorted hunts list
  const filteredHunts = useMemo(() => {
    return HUNTS_DATA.filter((hunt) => {
      // Type filter
      if (typeFilter !== 'all' && hunt.type !== typeFilter) return false;

      // Search query filter (title, day, director, cast)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = hunt.title.toLowerCase().includes(q);
        const matchesDay = `day ${hunt.day}`.includes(q) || `${hunt.day}` === q;
        const matchesDirector = hunt.director.toLowerCase().includes(q);
        const matchesCast = hunt.cast.some((c) => c.toLowerCase().includes(q));
        const matchesPlatform = hunt.availableOn.name.toLowerCase().includes(q);
        return matchesTitle || matchesDay || matchesDirector || matchesCast || matchesPlatform;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'day-desc') return b.day - a.day;
      if (sortBy === 'day-asc') return a.day - b.day;
      if (sortBy === 'rating-desc') return b.imdbRating - a.imdbRating;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0;
    });
  }, [searchQuery, typeFilter, sortBy]);

  const totalCount = HUNTS_DATA.length;
  const movieCount = HUNTS_DATA.filter((h) => h.type === 'movie').length;
  const seriesCount = HUNTS_DATA.filter((h) => h.type === 'series').length;

  const handleQuickCopy = (hunt: HuntItem) => {
    const code = `  {
    id: '${hunt.id}',
    day: ${hunt.day},
    type: '${hunt.type}',
    title: '${hunt.title.replace(/'/g, "\\'")}',
    year: ${hunt.year},
    tagline: '${hunt.tagline.replace(/'/g, "\\'")}',
    hook: '${hunt.hook.replace(/'/g, "\\'")}',
    imdbRating: ${hunt.imdbRating},
    cast: ${JSON.stringify(hunt.cast)},
    director: '${hunt.director.replace(/'/g, "\\'")}',
    duration: '${hunt.duration || (hunt.type === 'series' ? '8 Episodes' : '110 min')}',
    language: '${hunt.language || 'Hindi'}',
    availableOn: {
      name: '${hunt.availableOn.name.replace(/'/g, "\\'")}',
      url: '${hunt.availableOn.url.replace(/'/g, "\\'")}'
    },
    storySummary: '${hunt.storySummary.replace(/'/g, "\\'")}',
    whyWatch: '${hunt.whyWatch.replace(/'/g, "\\'")}',
    shouldYouWatch: '${hunt.shouldYouWatch.replace(/'/g, "\\'")}',
    bestFor: ${JSON.stringify(hunt.bestFor)},
    afterCreditsEmotion: '${hunt.afterCreditsEmotion || 'Speechless'}',
    emotionalLines: ${JSON.stringify(hunt.emotionalLines)},
    bestScenes: ${JSON.stringify(hunt.bestScenes)},
    moodTags: ${JSON.stringify(hunt.moodTags)},
    genres: ${JSON.stringify(hunt.genres)},
    musicVibe: '${hunt.musicVibe.replace(/'/g, "\\'")}',
    coverImage: '${hunt.coverImage}',
    images: ${JSON.stringify(hunt.images, null, 4)}${hunt.trailerYoutubeId ? `,\n    trailerYoutubeId: '${hunt.trailerYoutubeId}'` : ''}${hunt.hindiTrailerYoutubeId ? `,\n    hindiTrailerYoutubeId: '${hunt.hindiTrailerYoutubeId}'` : ''},
    featured: true
  }`;

    navigator.clipboard.writeText(code);
    setCopiedId(hunt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#e5a93c] text-xs font-semibold uppercase tracking-widest mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            Content Catalog
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
            Movie Hunt Library
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Browse, search, inspect, and export all {totalCount} published recommendations.
          </p>
        </div>

        <Link
          href="/admin/publish"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] transition-all shadow-lg shadow-[#e5a93c]/10"
        >
          <Sparkles className="w-4 h-4 fill-[#0a0a0f]" />
          + Publish New Hunt
        </Link>
      </div>

      {/* ── Architecture Info Note ── */}
      <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#e5a93c] flex-shrink-0" />
          <span>
            Library is sourced directly from <code className="text-[#e5a93c]">data/hunts.ts</code>. Click <strong>Load into Publisher</strong> to edit or regenerate code for any recommendation.
          </span>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="p-4 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, day number (e.g. Day 78), director, or cast..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:border-[#e5a93c] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0a0a0f] border border-white/10 w-full md:w-auto">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === 'all'
                  ? 'bg-[#e5a93c] text-[#0a0a0f]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setTypeFilter('movie')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                typeFilter === 'movie'
                  ? 'bg-[#e5a93c] text-[#0a0a0f]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3 h-3" /> Movies ({movieCount})
            </button>
            <button
              onClick={() => setTypeFilter('series')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                typeFilter === 'series'
                  ? 'bg-[#e5a93c] text-[#0a0a0f]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Tv className="w-3 h-3" /> Series ({seriesCount})
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-zinc-300 focus:border-[#e5a93c] outline-none w-full md:w-auto"
            >
              <option value="day-desc">Sort by Day (Highest First)</option>
              <option value="day-asc">Sort by Day (Lowest First)</option>
              <option value="rating-desc">Sort by Rating (Highest First)</option>
              <option value="year-desc">Sort by Year (Newest First)</option>
              <option value="title-asc">Sort by Title (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Filter stats bar */}
        <div className="text-[11px] text-zinc-500 flex items-center justify-between px-1">
          <span>Showing <strong>{filteredHunts.length}</strong> of {totalCount} total recommendations</span>
          {searchQuery && (
            <span>Filtered for: &quot;{searchQuery}&quot;</span>
          )}
        </div>
      </div>

      {/* ── Hunt Items List ── */}
      {filteredHunts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 mx-auto flex items-center justify-center text-zinc-500">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-white">No recommendations matched your filter</p>
          <p className="text-xs text-zinc-500">Try changing your search term or resetting the filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setTypeFilter('all');
            }}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors mt-2"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHunts.map((hunt) => (
            <div
              key={hunt.id}
              className="p-4 rounded-2xl bg-[#0d0d12] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Left Details */}
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                {/* Poster Thumbnail */}
                <div className="w-14 h-20 rounded-xl bg-zinc-950 border border-white/10 overflow-hidden flex-shrink-0 relative shadow-md">
                  <img
                    src={hunt.coverImage}
                    alt={hunt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Text Content */}
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e5a93c]/10 text-[#e5a93c] border border-[#e5a93c]/30 text-xs font-bold font-mono">
                      Day {hunt.day}
                    </span>
                    <h3 className="text-base font-serif font-bold text-white truncate">
                      {hunt.title}
                    </h3>
                    <span className="text-xs text-zinc-400">({hunt.year})</span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {hunt.type}
                    </span>
                    <span className="flex items-center gap-1 text-[#e5a93c] text-xs font-semibold ml-1">
                      <Star className="w-3 h-3 fill-[#e5a93c]" />
                      {hunt.imdbRating}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-1 italic">
                    &quot;{hunt.hook}&quot;
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 flex-wrap">
                    <span>Dir: <strong className="text-zinc-400">{hunt.director}</strong></span>
                    <span>•</span>
                    <span>Cast: <span className="text-zinc-400">{hunt.cast.slice(0, 3).join(', ')}</span></span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400">
                      {hunt.availableOn.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center flex-wrap">
                {/* Preview Button */}
                <button
                  onClick={() => setSelectedHuntForPreview(hunt)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  title="Inspect Full Details"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  Preview
                </button>

                {/* Load into Publisher */}
                <Link
                  href={`/admin/publish?id=${hunt.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-[#e5a93c]/10 hover:bg-[#e5a93c] text-[#e5a93c] hover:text-[#0a0a0f] border border-[#e5a93c]/30 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Load into Publisher
                </Link>

                {/* Quick Copy Code */}
                <button
                  onClick={() => handleQuickCopy(hunt)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="Copy TypeScript Snippet"
                >
                  {copiedId === hunt.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                {/* Open Public Page */}
                <Link
                  href={`/hunt/${hunt.id}`}
                  target="_blank"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="Open Live Public Breakdown"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PREVIEW MODAL ── */}
      {selectedHuntForPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0d0d12] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedHuntForPreview(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-5">
              <div className="w-24 h-36 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden flex-shrink-0 shadow-lg">
                <img src={selectedHuntForPreview.coverImage} alt={selectedHuntForPreview.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e5a93c]/10 text-[#e5a93c] border border-[#e5a93c]/30 text-xs font-bold">
                    Day {selectedHuntForPreview.day}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] uppercase font-bold">
                    {selectedHuntForPreview.type}
                  </span>
                  <span className="text-zinc-400 text-xs font-semibold">({selectedHuntForPreview.year})</span>
                  <span className="flex items-center gap-1 text-[#e5a93c] text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#e5a93c]" />
                    {selectedHuntForPreview.imdbRating} / 10
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {selectedHuntForPreview.title}
                </h2>

                <p className="text-xs text-[#e5a93c] font-semibold italic">
                  &quot;{selectedHuntForPreview.hook}&quot;
                </p>

                <div className="text-xs text-zinc-400 flex items-center gap-4 flex-wrap pt-1">
                  <span><strong>Director:</strong> {selectedHuntForPreview.director}</span>
                  <span>•</span>
                  <span><strong>Cast:</strong> {selectedHuntForPreview.cast.join(', ')}</span>
                  <span>•</span>
                  <span><strong>Platform:</strong> {selectedHuntForPreview.availableOn.name}</span>
                </div>
              </div>
            </div>

            {/* Story Summary */}
            <div className="space-y-1.5 p-4 rounded-xl bg-[#0a0a0f] border border-white/5">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Story Summary
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedHuntForPreview.storySummary}
              </p>
            </div>

            {/* Why Watch */}
            <div className="space-y-1.5 p-4 rounded-xl bg-[#0a0a0f] border border-white/5">
              <div className="text-[11px] font-bold text-[#e5a93c] uppercase tracking-wider">
                Why You Should Watch It
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                {selectedHuntForPreview.whyWatch}
              </p>
            </div>

            {/* Emotional Lines & Best Scenes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/5 space-y-1.5">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Emotional Quotes
                </div>
                <ul className="text-xs text-zinc-300 space-y-1 list-disc pl-4">
                  {selectedHuntForPreview.emotionalLines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/5 space-y-1.5">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Moods & Atmosphere
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedHuntForPreview.moodTags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 text-[11px] border border-white/5">
                      {tag}
                    </span>
                  ))}
                  {selectedHuntForPreview.genres.map((g, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#e5a93c]/10 text-[#e5a93c] text-[11px]">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <Link
                href={`/hunt/${selectedHuntForPreview.id}`}
                target="_blank"
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5"
              >
                Open Live Public Page <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuickCopy(selectedHuntForPreview)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Code Snippet
                </button>
                <Link
                  href={`/admin/publish?id=${selectedHuntForPreview.id}`}
                  className="px-4 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Load into Publisher
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
