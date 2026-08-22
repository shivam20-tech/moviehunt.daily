'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  Copy,
  Check,
  Search,
  ExternalLink,
  Film,
  Sparkles,
  Layers,
  UploadCloud,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Grid,
  List,
  Edit,
  Eye
} from 'lucide-react';
import { HuntItem } from '@/data/hunts';

interface MediaAsset {
  url: string;
  type: 'poster' | 'still';
  stillIndex?: number;
  totalStills?: number;
  huntTitle: string;
  huntDay: number;
  huntId: string;
  isBlob: boolean;
}

export default function AdminMediaPage() {
  const [hunts, setHunts] = useState<HuntItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<'grouped' | 'grid'>('grouped');
  const [filterType, setFilterType] = useState<'all' | 'poster' | 'still' | 'blob'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Standalone Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadToast, setUploadToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch Hunts from CMS API ──
  const fetchHunts = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/admin/hunts?status=all');
      if (!res.ok) throw new Error('Failed to load media assets');
      const data = await res.json();
      setHunts(data.hunts || []);
    } catch (err: any) {
      setLoadError(err.message || 'Error connecting to database');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHunts();
  }, []);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // ── Standalone Upload to Vercel Blob ──
  const handleStandaloneUpload = async (file: File) => {
    setIsUploading(true);
    setUploadToast(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Upload failed');

      handleCopyUrl(data.url);
      setUploadToast({
        type: 'success',
        text: `✓ Uploaded image to Vercel Blob! URL copied to clipboard.`,
      });
    } catch (err: any) {
      setUploadToast({
        type: 'error',
        text: err.message || 'Error uploading file',
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadToast(null), 6000);
    }
  };

  // ── Flattened Media Assets ──
  const allMediaAssets = useMemo(() => {
    const assets: MediaAsset[] = [];
    const seen = new Set<string>();

    hunts.forEach((hunt) => {
      // Cover Poster
      if (hunt.coverImage && !seen.has(hunt.coverImage)) {
        seen.add(hunt.coverImage);
        assets.push({
          url: hunt.coverImage,
          type: 'poster',
          huntTitle: hunt.title,
          huntDay: hunt.day,
          huntId: hunt.id,
          isBlob: hunt.coverImage.includes('blob.vercel-storage.com'),
        });
      }

      // Gallery Stills
      const stillsCount = hunt.images?.length || 0;
      hunt.images?.forEach((imgUrl, idx) => {
        if (imgUrl && !seen.has(imgUrl)) {
          seen.add(imgUrl);
          assets.push({
            url: imgUrl,
            type: 'still',
            stillIndex: idx + 1,
            totalStills: stillsCount,
            huntTitle: hunt.title,
            huntDay: hunt.day,
            huntId: hunt.id,
            isBlob: imgUrl.includes('blob.vercel-storage.com'),
          });
        }
      });
    });

    return assets;
  }, [hunts]);

  // ── Filtered Media Assets ──
  const filteredAssets = useMemo(() => {
    return allMediaAssets.filter((asset) => {
      if (filterType === 'poster' && asset.type !== 'poster') return false;
      if (filterType === 'still' && asset.type !== 'still') return false;
      if (filterType === 'blob' && !asset.isBlob) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          asset.huntTitle.toLowerCase().includes(q) ||
          `day ${asset.huntDay}`.includes(q) ||
          asset.url.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allMediaAssets, filterType, searchQuery]);

  // ── Filtered Hunts for Grouped View ──
  const filteredHunts = useMemo(() => {
    if (!searchQuery.trim()) return hunts;
    const q = searchQuery.toLowerCase().trim();
    return hunts.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        `day ${h.day}`.includes(q) ||
        h.director.toLowerCase().includes(q),
    );
  }, [hunts, searchQuery]);

  const postersCount = allMediaAssets.filter((a) => a.type === 'poster').length;
  const stillsCount = allMediaAssets.filter((a) => a.type === 'still').length;
  const blobCount = allMediaAssets.filter((a) => a.isBlob).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleStandaloneUpload(file);
        }}
      />

      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#e5a93c] text-xs font-semibold uppercase tracking-widest mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            Media Asset Index
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
            Media Library
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Browse and manage all {allMediaAssets.length} posters and stills across {hunts.length} recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 rounded-xl bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] transition-all shadow-lg shadow-[#e5a93c]/10 flex items-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0a0a0f]" />
                Uploading to Blob...
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                Upload Standalone Image
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Toast Notification ── */}
      {uploadToast && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
            uploadToast.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {uploadToast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            )}
            <span>{uploadToast.text}</span>
          </div>
          <button
            onClick={() => setUploadToast(null)}
            className="text-zinc-400 hover:text-white text-[11px] font-bold uppercase ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── Controls Bar (Search, View Mode, Filter) ── */}
      <div className="p-4 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full md:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by movie title or day..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:border-[#e5a93c] outline-none"
            />
          </div>

          {/* View Mode Toggle: Grouped by Movie vs All Assets */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0a0a0f] border border-white/10">
              <button
                onClick={() => setViewMode('grouped')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grouped'
                    ? 'bg-[#e5a93c] text-[#0a0a0f]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Grouped by Movie
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-[#e5a93c] text-[#0a0a0f]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                All Asset Cards
              </button>
            </div>
          </div>

          {/* Filter Pills (for Grid mode) */}
          {viewMode === 'grid' && (
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0a0a0f] border border-white/10 overflow-x-auto w-full md:w-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === 'all' ? 'bg-[#e5a93c] text-[#0a0a0f]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All ({allMediaAssets.length})
              </button>
              <button
                onClick={() => setFilterType('poster')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === 'poster' ? 'bg-[#e5a93c] text-[#0a0a0f]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Posters ({postersCount})
              </button>
              <button
                onClick={() => setFilterType('still')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === 'still' ? 'bg-[#e5a93c] text-[#0a0a0f]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Stills ({stillsCount})
              </button>
              {blobCount > 0 && (
                <button
                  onClick={() => setFilterType('blob')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    filterType === 'blob' ? 'bg-purple-500 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Blob ({blobCount})
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Content View ── */}
      {isLoading ? (
        <div className="p-16 text-center rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#e5a93c] mx-auto" />
          <p className="text-xs text-zinc-400">Loading media library from database...</p>
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
      ) : viewMode === 'grouped' ? (
        /* ════════════════════════════════════════════════════════════════ */
        /* ── VIEW 1: GROUPED BY MOVIE (Clean & Un-duplicated) ── */
        /* ════════════════════════════════════════════════════════════════ */
        <div className="space-y-4">
          {filteredHunts.map((hunt) => (
            <div
              key={hunt.id}
              className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 hover:border-white/10 transition-all space-y-4 group"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e5a93c]/10 text-[#e5a93c] border border-[#e5a93c]/30 text-xs font-bold font-mono">
                    Day {hunt.day}
                  </span>
                  <h3 className="text-base font-serif font-bold text-white">
                    {hunt.title}
                  </h3>
                  <span className="text-xs text-zinc-400">({hunt.year})</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {hunt.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/publish?id=${hunt.id}`}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#e5a93c]" />
                    Edit Media in Publisher
                  </Link>
                  <Link
                    href={`/hunt/${hunt.id}`}
                    target="_blank"
                    className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                    title="Open Live Page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Media Strips: Poster + Gallery Stills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {/* 1. Cover Poster Card */}
                {hunt.coverImage && (
                  <div className="rounded-xl overflow-hidden bg-zinc-950 border border-[#e5a93c]/30 flex flex-col justify-between group/card relative">
                    <div className="w-full aspect-[2/3] relative overflow-hidden bg-zinc-900">
                      <img
                        src={hunt.coverImage}
                        alt={hunt.title}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-[#e5a93c] text-[#0a0a0f] text-[10px] font-bold uppercase tracking-wider">
                        Poster
                      </span>
                    </div>
                    <div className="p-2 flex items-center gap-1 bg-[#0a0a0f]">
                      <button
                        onClick={() => handleCopyUrl(hunt.coverImage)}
                        className="flex-1 py-1 rounded bg-zinc-900 hover:bg-[#e5a93c] text-zinc-300 hover:text-[#0a0a0f] text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
                        title="Copy Poster URL"
                      >
                        {copiedUrl === hunt.coverImage ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUrl === hunt.coverImage ? 'Copied' : 'Copy'}</span>
                      </button>
                      <a
                        href={hunt.coverImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                        title="Open image"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 2. Gallery Stills Cards */}
                {hunt.images?.map((stillUrl, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden bg-zinc-950 border border-white/10 flex flex-col justify-between group/card relative"
                  >
                    <div className="w-full aspect-[2/3] relative overflow-hidden bg-zinc-900">
                      <img
                        src={stillUrl}
                        alt={`Still ${idx + 1}`}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-zinc-300 text-[10px] font-bold uppercase">
                        Still {idx + 1}
                      </span>
                    </div>
                    <div className="p-2 flex items-center gap-1 bg-[#0a0a0f]">
                      <button
                        onClick={() => handleCopyUrl(stillUrl)}
                        className="flex-1 py-1 rounded bg-zinc-900 hover:bg-[#e5a93c] text-zinc-300 hover:text-[#0a0a0f] text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
                        title="Copy Still URL"
                      >
                        {copiedUrl === stillUrl ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUrl === stillUrl ? 'Copied' : 'Copy'}</span>
                      </button>
                      <a
                        href={stillUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                        title="Open still"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ════════════════════════════════════════════════════════════════ */
        /* ── VIEW 2: ALL ASSET CARDS GRID (With Clear Badges) ── */
        /* ════════════════════════════════════════════════════════════════ */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map((asset, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0d0d12] border border-white/5 overflow-hidden flex flex-col justify-between group hover:border-white/15 transition-all"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/5] bg-zinc-950 overflow-hidden relative">
                <img
                  src={asset.url}
                  alt={asset.huntTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  {asset.type === 'poster' ? (
                    <span className="px-2 py-0.5 rounded-md bg-[#e5a93c] text-[#0a0a0f] text-[10px] uppercase font-bold">
                      Poster
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-zinc-300 text-[10px] uppercase font-bold border border-white/10">
                      Still {asset.stillIndex}/{asset.totalStills}
                    </span>
                  )}
                  {asset.isBlob && (
                    <span className="px-1.5 py-0.5 rounded-md bg-purple-500 text-white text-[9px] font-bold">
                      Blob
                    </span>
                  )}
                </div>
              </div>

              {/* Meta & Copy Button */}
              <div className="p-3 space-y-2">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white truncate">
                    Day {asset.huntDay} — {asset.huntTitle}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono truncate mt-0.5">
                    {asset.url}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    onClick={() => handleCopyUrl(asset.url)}
                    className="flex-1 px-2 py-1.5 rounded-lg bg-zinc-900 hover:bg-[#e5a93c] text-zinc-300 hover:text-[#0a0a0f] text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedUrl === asset.url ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUrl === asset.url ? 'Copied' : 'Copy URL'}</span>
                  </button>
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                    title="Open original image"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
