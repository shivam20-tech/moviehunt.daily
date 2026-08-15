'use client';

import React, { useState, useMemo } from 'react';
import Footer from '@/components/Footer';
import { HUNTS_DATA } from '@/data/hunts';
import Link from 'next/link';
import { Film, Tv, Star, ArrowRight, Search } from 'lucide-react';

// ── Dynamic stats (all derived from HUNTS_DATA — never hardcoded) ──────────
const TOTAL = HUNTS_DATA.length;
const MOVIE_COUNT = HUNTS_DATA.filter((h) => h.type === 'movie').length;
const SERIES_COUNT = HUNTS_DATA.filter((h) => h.type === 'series').length;
const FIRST_DAY = Math.min(...HUNTS_DATA.map((h) => h.day));
const LATEST_DAY = Math.max(...HUNTS_DATA.map((h) => h.day));

// Milestone days to mark (dynamic — includes current latest)
const BASE_MILESTONES = [1, 10, 25, 50, 75];
const MILESTONE_DAYS = new Set(
  [...BASE_MILESTONES, LATEST_DAY].filter((d) => d <= LATEST_DAY)
);

export default function JourneyPage() {
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'series'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort: newest first (chronological descending)
  const sortedHunts = useMemo(
    () => [...HUNTS_DATA].sort((a, b) => b.day - a.day),
    []
  );

  const filteredHunts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sortedHunts.filter((h) => {
      const matchType =
        filterType === 'all' ||
        (filterType === 'movie' && h.type === 'movie') ||
        (filterType === 'series' && h.type === 'series');
      if (!matchType) return false;
      if (!q) return true;
      return (
        h.title.toLowerCase().includes(q) ||
        h.director.toLowerCase().includes(q) ||
        h.language.toLowerCase().includes(q) ||
        h.genres?.some((g) => g.toLowerCase().includes(q))
      );
    });
  }, [sortedHunts, filterType, searchQuery]);

  // Show milestones only when browsing unfiltered, unsearched list
  const showMilestones = !searchQuery && filterType === 'all';

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f4f4f0] selection:bg-[#e5a93c] selection:text-[#0a0a0f]">

      {/* ── Phase 5: Editorial Opening ── */}
      <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 border-b border-white/10 overflow-hidden">
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(201,145,58,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#e5a93c]/50" aria-hidden />
            <span className="text-[#e5a93c] text-xs font-semibold uppercase tracking-widest">
              The Full Archive
            </span>
          </div>

          {/* Heading — dynamic */}
          <h1 className="text-5xl sm:text-8xl font-extrabold text-white font-serif tracking-tight leading-none mb-2">
            The Hunt
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base font-light mb-8">
            Day {FIRST_DAY} &rarr; Day {LATEST_DAY} &mdash; every recommendation, in order.
          </p>

          {/* Dynamic stat pills */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { value: TOTAL.toString(), label: 'Curated Picks' },
              { value: `${MOVIE_COUNT}`, label: 'Feature Films' },
              { value: `${SERIES_COUNT}`, label: 'Web Series' },
              { value: `Day ${LATEST_DAY}`, label: 'Latest Hunt' },
            ].map((s) => (
              <div
                key={s.value}
                className="flex flex-col items-center px-5 py-3 rounded-xl bg-white/[0.04] border border-white/8 min-w-[80px]"
              >
                <span className="text-white text-lg sm:text-xl font-bold font-serif leading-none">
                  {s.value}
                </span>
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1.5 text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vault Grid Section ── */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5 mb-6 sm:mb-10">
          {/* Filter pills */}
          <div className="inline-flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            {[
              { id: 'all', label: `All (${TOTAL})`, icon: null },
              { id: 'movie', label: `Films (${MOVIE_COUNT})`, icon: <Film className="w-3.5 h-3.5" /> },
              { id: 'series', label: `Series (${SERIES_COUNT})`, icon: <Tv className="w-3.5 h-3.5" /> },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilterType(id as 'all' | 'movie' | 'series')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterType === id
                    ? 'bg-[#e5a93c] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            <input
              type="search"
              placeholder="Title, director, language…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search hunts"
              className="journey-search"
            />
          </div>
        </div>

        {/* Result count (only when filtering) */}
        {(searchQuery || filterType !== 'all') && (
          <p className="text-xs text-zinc-500 mb-6">
            {filteredHunts.length === 0
              ? 'No results. Try a different search.'
              : `${filteredHunts.length} hunt${filteredHunts.length !== 1 ? 's' : ''} found`}
          </p>
        )}

        {/* ── Content: milestone groups or flat grid ── */}
        {filteredHunts.length === 0 ? (
          <div className="text-center py-24 text-zinc-600 text-sm italic">
            No hunts match your search.
          </div>
        ) : showMilestones ? (
          <MilestoneLayout hunts={filteredHunts} />
        ) : (
          <FlatGrid hunts={filteredHunts} />
        )}
      </section>

      <Footer />

      <style>{`
        .journey-search {
          width: 100%;
          padding: 8px 12px 8px 34px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 9999px;
          color: #f4f4f0;
          font-size: 12px;
          font-family: 'Inter', system-ui, sans-serif;
          outline: none;
          transition: border-color 180ms ease;
        }
        .journey-search::placeholder { color: #55555f; }
        .journey-search:focus { border-color: rgba(229,169,60,0.5); }
        .journey-search::-webkit-search-cancel-button { display: none; }
      `}</style>
    </main>
  );
}

// ── Milestone layout: groups hunts and shows golden dividers at milestones ──
function MilestoneLayout({ hunts }: { hunts: typeof HUNTS_DATA }) {
  // We chunk by milestone boundaries. Hunts are sorted descending (newest → oldest).
  // Build segments: each segment is (optional milestone marker) + grid chunk until next milestone.

  const segments: Array<{
    milestoneDay: number | null;
    cards: typeof HUNTS_DATA;
  }> = [];

  let currentSegment: (typeof HUNTS_DATA) = [];
  let currentMilestone: number | null = null;

  for (const hunt of hunts) {
    if (MILESTONE_DAYS.has(hunt.day) && !segments.some(s => s.milestoneDay === hunt.day)) {
      // Flush current batch before inserting milestone
      if (currentSegment.length > 0 || currentMilestone !== null) {
        segments.push({ milestoneDay: currentMilestone, cards: currentSegment });
      }
      currentMilestone = hunt.day;
      currentSegment = [hunt];
    } else {
      currentSegment.push(hunt);
    }
  }
  // Flush last segment
  if (currentSegment.length > 0 || currentMilestone !== null) {
    segments.push({ milestoneDay: currentMilestone, cards: currentSegment });
  }

  return (
    <div className="space-y-10">
      {segments.map((seg, i) => (
        <div key={i}>
          {/* Milestone marker */}
          {seg.milestoneDay !== null && (
            <div
              className="flex items-center gap-4 mb-6"
              aria-label={`Day ${seg.milestoneDay} milestone marker`}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-[#e5a93c]/35 to-transparent" />
              <span className="inline-flex items-center gap-2 text-[#e5a93c] text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#e5a93c]/30 bg-[#e5a93c]/5 whitespace-nowrap">
                ✦{' '}
                {seg.milestoneDay === LATEST_DAY
                  ? `Day ${seg.milestoneDay} — Latest`
                  : `Day ${seg.milestoneDay}`}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#e5a93c]/35 to-transparent" />
            </div>
          )}

          {seg.cards.length > 0 && <HuntCardGrid cards={seg.cards} />}
        </div>
      ))}
    </div>
  );
}

// ── Flat grid (used when searching or filtering) ──
function FlatGrid({ hunts }: { hunts: typeof HUNTS_DATA }) {
  return <HuntCardGrid cards={hunts} />;
}

// ── Shared card grid ──
function HuntCardGrid({ cards }: { cards: typeof HUNTS_DATA }) {
  return (
    <div className="journey-card-grid">
      {cards.map((hunt) => (
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
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            />
            {/* Day badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0a0a0f]/88 backdrop-blur-md text-[#e5a93c] text-[9px] sm:text-[10px] font-bold border border-[#e5a93c]/35 uppercase tracking-wider">
              Day {hunt.day}
            </div>
            {hunt.imdbRating && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 text-yellow-400 text-[10px] font-bold border border-yellow-500/30 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 stroke-none" />
                <span>{hunt.imdbRating}</span>
              </div>
            )}
            {/* Type indicator */}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md text-zinc-400 text-[9px] font-semibold border border-white/10 uppercase tracking-wider">
              {hunt.type === 'movie' ? 'Film' : 'Series'}
            </div>
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

      <style>{`
        .journey-card-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) {
          .journey-card-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
        @media (min-width: 1024px) {
          .journey-card-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
        }
      `}</style>
    </div>
  );
}
