'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  Info,
  Copy,
  Check,
  Search,
  ExternalLink,
  Film,
  Sparkles,
  Layers
} from 'lucide-react';
import { HUNTS_DATA } from '@/data/hunts';

interface MediaAsset {
  url: string;
  type: 'poster' | 'still';
  huntTitle: string;
  huntDay: number;
  huntId: string;
}

export default function AdminMediaPage() {
  const [filterType, setFilterType] = useState<'all' | 'poster' | 'still'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Aggregate all unique media assets from HUNTS_DATA
  const mediaAssets = useMemo(() => {
    const assets: MediaAsset[] = [];
    const seen = new Set<string>();

    HUNTS_DATA.forEach((hunt) => {
      // Cover poster
      if (hunt.coverImage && !seen.has(hunt.coverImage)) {
        seen.add(hunt.coverImage);
        assets.push({
          url: hunt.coverImage,
          type: 'poster',
          huntTitle: hunt.title,
          huntDay: hunt.day,
          huntId: hunt.id
        });
      }

      // Gallery stills
      hunt.images?.forEach((imgUrl) => {
        if (imgUrl && !seen.has(imgUrl)) {
          seen.add(imgUrl);
          assets.push({
            url: imgUrl,
            type: 'still',
            huntTitle: hunt.title,
            huntDay: hunt.day,
            huntId: hunt.id
          });
        }
      });
    });

    return assets;
  }, []);

  const filteredAssets = useMemo(() => {
    return mediaAssets.filter((asset) => {
      if (filterType !== 'all' && asset.type !== filterType) return false;
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
  }, [mediaAssets, filterType, searchQuery]);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const postersCount = mediaAssets.filter((a) => a.type === 'poster').length;
  const stillsCount = mediaAssets.filter((a) => a.type === 'still').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
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
            Reference index of all {mediaAssets.length} image assets linked across recommendations.
          </p>
        </div>
      </div>

      {/* ── V1 Foundation Architecture Note ── */}
      <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 flex items-start gap-3 text-xs text-zinc-400">
        <Info className="w-4 h-4 text-[#e5a93c] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-white">V1 External Media URLs</span>
          <p className="text-zinc-500 leading-relaxed">
            Movie Hunt V1 links high-resolution posters and cinematic stills via direct CDN URLs (TMDB, IMDb, Unsplash) in <code className="text-[#e5a93c]">data/hunts.ts</code>. You can copy any image URL here to reuse it across collections or posts.
          </p>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="p-4 rounded-2xl bg-[#0d0d12] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hunt title or day..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:border-[#e5a93c] outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0a0a0f] border border-white/10 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-[#e5a93c] text-[#0a0a0f]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All ({mediaAssets.length})
          </button>
          <button
            onClick={() => setFilterType('poster')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'poster'
                ? 'bg-[#e5a93c] text-[#0a0a0f]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Posters ({postersCount})
          </button>
          <button
            onClick={() => setFilterType('still')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'still'
                ? 'bg-[#e5a93c] text-[#0a0a0f]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Stills ({stillsCount})
          </button>
        </div>
      </div>

      {/* ── Media Grid ── */}
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
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] uppercase font-bold text-zinc-300">
                {asset.type}
              </span>
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
    </div>
  );
}
