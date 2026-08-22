'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Edit,
  Send,
  Archive,
  RotateCcw,
  Check,
  X,
  Play,
  ArrowUpDown,
  BookOpen,
  Info,
  Calendar,
  Layers,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { HuntItem } from '@/data/hunts';

export default function AdminLibraryPage() {
  const [hunts, setHunts] = useState<HuntItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'movie' | 'series'>('all');
  const [sortBy, setSortBy] = useState<'day-desc' | 'day-asc' | 'rating-desc' | 'title-asc' | 'year-desc'>('day-desc');

  const [selectedHuntForPreview, setSelectedHuntForPreview] = useState<HuntItem | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ── Fetch Hunts from CMS API ──
  const fetchHunts = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/admin/hunts?status=all');
      if (!res.ok) throw new Error('Failed to load library data');
      const data = await res.json();
      setHunts(data.hunts || []);
    } catch (err: any) {
      setLoadError(err.message || 'Could not connect to CMS database');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHunts();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ── Actions: Publish / Archive / Restore ──
  const handlePublishHunt = async (hunt: HuntItem) => {
    setActionLoadingId(hunt.id);
    try {
      const res = await fetch(`/api/admin/hunts/${hunt.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to publish');

      showToast('success', `✓ Day ${hunt.day} "${hunt.title}" published live!`);
      // Update local state
      setHunts((prev) =>
        prev.map((h) => (h.id === hunt.id ? { ...h, status: 'published' } : h)),
      );
    } catch (err: any) {
      showToast('error', err.message || 'Error publishing hunt');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleArchiveHunt = async (hunt: HuntItem) => {
    if (!confirm(`Are you sure you want to archive Day ${hunt.day} "${hunt.title}"? It will disappear from public pages but remain saved in Admin.`)) {
      return;
    }

    setActionLoadingId(hunt.id);
    try {
      const res = await fetch(`/api/admin/hunts/${hunt.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to archive');

      showToast('success', `✓ Day ${hunt.day} "${hunt.title}" archived.`);
      setHunts((prev) =>
        prev.map((h) => (h.id === hunt.id ? { ...h, status: 'archived' } : h)),
      );
    } catch (err: any) {
      showToast('error', err.message || 'Error archiving hunt');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRestoreHunt = async (hunt: HuntItem) => {
    setActionLoadingId(hunt.id);
    try {
      const res = await fetch(`/api/admin/hunts/${hunt.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to restore');

      showToast('success', `✓ Day ${hunt.day} "${hunt.title}" restored and published!`);
      setHunts((prev) =>
        prev.map((h) => (h.id === hunt.id ? { ...h, status: 'published' } : h)),
      );
    } catch (err: any) {
      showToast('error', err.message || 'Error restoring hunt');
    } finally {
      setActionLoadingId(null);
    }
  };

  // ── Filtered and sorted hunts ──
  const filteredHunts = useMemo(() => {
    return hunts
      .filter((hunt) => {
        // Status filter
        const currentStatus = hunt.status || 'published';
        if (statusFilter !== 'all' && currentStatus !== statusFilter) return false;

        // Type filter
        if (typeFilter !== 'all' && hunt.type !== typeFilter) return false;

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = (hunt.title || '').toLowerCase().includes(q);
          const matchesDay = `day ${hunt.day}`.includes(q) || `${hunt.day}` === q;
          const matchesDirector = (hunt.director || '').toLowerCase().includes(q);
          const matchesCast = (hunt.cast || []).some((c) => c.toLowerCase().includes(q));
          const matchesPlatform = (hunt.availableOn?.name || '').toLowerCase().includes(q);
          return matchesTitle || matchesDay || matchesDirector || matchesCast || matchesPlatform;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'day-desc') return b.day - a.day;
        if (sortBy === 'day-asc') return a.day - b.day;
        if (sortBy === 'rating-desc') return b.imdbRating - a.imdbRating;
        if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
        if (sortBy === 'year-desc') return b.year - a.year;
        return 0;
      });
  }, [hunts, searchQuery, statusFilter, typeFilter, sortBy]);

  // Counts
  const totalCount = hunts.length;
  const publishedCount = hunts.filter((h) => (h.status || 'published') === 'published').length;
  const draftCount = hunts.filter((h) => h.status === 'draft').length;
  const archivedCount = hunts.filter((h) => h.status === 'archived').length;

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
            Manage {totalCount} recommendations across published, drafts, and archived catalog.
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

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
            toastMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            )}
            <span>{toastMessage.text}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-zinc-400 hover:text-white text-[11px] font-bold uppercase ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── Status Tabs Bar ── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0d0d12] border border-white/5 overflow-x-auto">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            statusFilter === 'all'
              ? 'bg-[#e5a93c] text-[#0a0a0f] shadow-md shadow-[#e5a93c]/10'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          All Items
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            statusFilter === 'all' ? 'bg-[#0a0a0f]/20 text-[#0a0a0f]' : 'bg-zinc-800 text-zinc-300'
          }`}>
            {totalCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('published')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            statusFilter === 'published'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/10'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Published
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            statusFilter === 'published' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-300'
          }`}>
            {publishedCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('draft')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            statusFilter === 'draft'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Drafts
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            statusFilter === 'draft' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-300'
          }`}>
            {draftCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('archived')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            statusFilter === 'archived'
              ? 'bg-zinc-700 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Archive className="w-3.5 h-3.5" />
          Archived
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            statusFilter === 'archived' ? 'bg-black/20 text-white' : 'bg-zinc-800 text-zinc-300'
          }`}>
            {archivedCount}
          </span>
        </button>
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
              placeholder="Search by title, day number (e.g. Day 81), director, or cast..."
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
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('movie')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                typeFilter === 'movie'
                  ? 'bg-[#e5a93c] text-[#0a0a0f]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3 h-3" /> Movies
            </button>
            <button
              onClick={() => setTypeFilter('series')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                typeFilter === 'series'
                  ? 'bg-[#e5a93c] text-[#0a0a0f]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Tv className="w-3 h-3" /> Series
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
              <option value="day-desc">Sort by Day (Newest First)</option>
              <option value="day-asc">Sort by Day (Oldest First)</option>
              <option value="rating-desc">Sort by Rating (Highest First)</option>
              <option value="year-desc">Sort by Year (Newest First)</option>
              <option value="title-asc">Sort by Title (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Stats bar */}
        <div className="text-[11px] text-zinc-500 flex items-center justify-between px-1">
          <span>Showing <strong>{filteredHunts.length}</strong> of {totalCount} total recommendations</span>
          {searchQuery && (
            <span>Filtered for: &quot;{searchQuery}&quot;</span>
          )}
        </div>
      </div>

      {/* ── Loading / Error / Empty States ── */}
      {isLoading ? (
        <div className="p-16 text-center rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#e5a93c] mx-auto" />
          <p className="text-xs text-zinc-400">Loading recommendations from CMS database...</p>
        </div>
      ) : loadError ? (
        <div className="p-8 text-center rounded-2xl bg-[#0d0d12] border border-red-500/20 space-y-3">
          <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
          <p className="text-xs text-red-300">{loadError}</p>
          <button
            onClick={fetchHunts}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredHunts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 mx-auto flex items-center justify-center text-zinc-500">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-white">No recommendations found</p>
          <p className="text-xs text-zinc-500">Try changing your search term or selecting a different status filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setTypeFilter('all');
            }}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors mt-2"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* ── Hunts List ── */
        <div className="space-y-3">
          {filteredHunts.map((hunt) => {
            const status = hunt.status || 'published';
            const isRowBusy = actionLoadingId === hunt.id;

            return (
              <div
                key={hunt.id}
                className="p-4 rounded-2xl bg-[#0d0d12] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Left Details */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  {/* Poster Thumbnail */}
                  <div className="w-14 h-20 rounded-xl bg-zinc-950 border border-white/10 overflow-hidden flex-shrink-0 relative shadow-md">
                    {hunt.coverImage ? (
                      <img
                        src={hunt.coverImage}
                        alt={hunt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600">
                        No Image
                      </div>
                    )}
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

                      {/* Status Badge */}
                      {status === 'published' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                          Published
                        </span>
                      )}
                      {status === 'draft' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                          Draft
                        </span>
                      )}
                      {status === 'archived' && (
                        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-white/10 text-[10px] font-bold uppercase tracking-wider">
                          Archived
                        </span>
                      )}

                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {hunt.type}
                      </span>

                      {hunt.imdbRating > 0 && (
                        <span className="flex items-center gap-1 text-[#e5a93c] text-xs font-semibold ml-1">
                          <Star className="w-3 h-3 fill-[#e5a93c]" />
                          {hunt.imdbRating}
                        </span>
                      )}
                    </div>

                    {hunt.hook && (
                      <p className="text-xs text-zinc-400 line-clamp-1 italic">
                        &quot;{hunt.hook}&quot;
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-zinc-500 flex-wrap">
                      {hunt.director && (
                        <span>
                          Dir: <strong className="text-zinc-400">{hunt.director}</strong>
                        </span>
                      )}
                      {hunt.cast && hunt.cast.length > 0 && (
                        <>
                          <span>•</span>
                          <span>Cast: <span className="text-zinc-400">{hunt.cast.slice(0, 3).join(', ')}</span></span>
                        </>
                      )}
                      {hunt.availableOn?.name && (
                        <>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400">
                            {hunt.availableOn.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center flex-wrap">
                  {isRowBusy ? (
                    <div className="px-4 py-1.5 rounded-xl bg-zinc-900 text-xs text-zinc-400 flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e5a93c]" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      {/* Preview Button */}
                      <button
                        onClick={() => setSelectedHuntForPreview(hunt)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                        title="Inspect Full Details"
                      >
                        <Eye className="w-3.5 h-3.5 text-zinc-400" />
                        Preview
                      </button>

                      {/* Edit Button -> loads into /admin/publish */}
                      <Link
                        href={`/admin/publish?id=${hunt.id}`}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#e5a93c]" />
                        Edit
                      </Link>

                      {/* Context Action: Publish (for drafts) */}
                      {status === 'draft' && (
                        <button
                          onClick={() => handlePublishHunt(hunt)}
                          className="px-3 py-1.5 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] transition-colors flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Publish
                        </button>
                      )}

                      {/* Context Action: Archive (for published) */}
                      {status === 'published' && (
                        <button
                          onClick={() => handleArchiveHunt(hunt)}
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-red-500/10 hover:border-red-500/30 text-zinc-400 hover:text-red-300 border border-white/10 transition-colors"
                          title="Archive Hunt (soft delete)"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Context Action: Restore (for archived) */}
                      {status === 'archived' && (
                        <button
                          onClick={() => handleRestoreHunt(hunt)}
                          className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                          Restore
                        </button>
                      )}

                      {/* Live Link (for published items) */}
                      {status === 'published' && (
                        <Link
                          href={`/hunt/${hunt.id}`}
                          target="_blank"
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                          title="Open Live Public Breakdown"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
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
                {selectedHuntForPreview.coverImage ? (
                  <img
                    src={selectedHuntForPreview.coverImage}
                    alt={selectedHuntForPreview.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">
                    No Poster
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e5a93c]/10 text-[#e5a93c] border border-[#e5a93c]/30 text-xs font-bold">
                    Day {selectedHuntForPreview.day}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] uppercase font-bold">
                    {selectedHuntForPreview.type}
                  </span>
                  <span className="text-zinc-400 text-xs font-semibold">
                    ({selectedHuntForPreview.year})
                  </span>
                  <span className="flex items-center gap-1 text-[#e5a93c] text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#e5a93c]" />
                    {selectedHuntForPreview.imdbRating} / 10
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {selectedHuntForPreview.title}
                </h2>

                {selectedHuntForPreview.hook && (
                  <p className="text-xs text-[#e5a93c] font-semibold italic">
                    &quot;{selectedHuntForPreview.hook}&quot;
                  </p>
                )}

                <div className="text-xs text-zinc-400 flex items-center gap-4 flex-wrap pt-1">
                  <span><strong>Director:</strong> {selectedHuntForPreview.director}</span>
                  <span>•</span>
                  <span><strong>Cast:</strong> {(selectedHuntForPreview.cast || []).join(', ')}</span>
                  <span>•</span>
                  <span><strong>Platform:</strong> {selectedHuntForPreview.availableOn?.name}</span>
                </div>
              </div>
            </div>

            {/* Story Summary */}
            {selectedHuntForPreview.storySummary && (
              <div className="space-y-1.5 p-4 rounded-xl bg-[#0a0a0f] border border-white/5">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Story Summary
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedHuntForPreview.storySummary}
                </p>
              </div>
            )}

            {/* Why Watch */}
            {selectedHuntForPreview.whyWatch && (
              <div className="space-y-1.5 p-4 rounded-xl bg-[#0a0a0f] border border-white/5">
                <div className="text-[11px] font-bold text-[#e5a93c] uppercase tracking-wider">
                  Why You Should Watch It
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  {selectedHuntForPreview.whyWatch}
                </p>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {selectedHuntForPreview.status === 'published' ? (
                <Link
                  href={`/hunt/${selectedHuntForPreview.id}`}
                  target="_blank"
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5"
                >
                  Open Live Public Page <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="text-xs text-zinc-500 italic">Draft (Not accessible publicly)</span>
              )}

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/publish?id=${selectedHuntForPreview.id}`}
                  className="px-4 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
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
