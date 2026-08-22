'use client';

import React, { useState } from 'react';
import { Download, Shield, CheckCircle2, AlertCircle, Loader2, Film, Archive, FileJson } from 'lucide-react';

type ExportState = 'idle' | 'loading' | 'success' | 'error';

interface ExportSummary {
  totalHunts: number;
  published: number;
  drafts: number;
  archived: number;
  collections: number;
  filename: string;
  exportedAt: string;
}

export default function AdminExportPage() {
  const [state, setState] = useState<ExportState>('idle');
  const [summary, setSummary] = useState<ExportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setState('loading');
    setError(null);
    setSummary(null);

    try {
      const res = await fetch('/api/admin/export');
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || `HTTP ${res.status}`);
      }

      const disposition = res.headers.get('content-disposition') || '';
      const filenameMatch = disposition.match(/filename="([^"]+)"/);
      const filename = filenameMatch ? filenameMatch[1] : 'moviehunt-catalog.json';

      const blob = await res.blob();
      const text = await blob.text();
      const data = JSON.parse(text);

      // Trigger file download
      const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSummary({
        totalHunts: data.summary.totalHunts,
        published: data.summary.published,
        drafts: data.summary.drafts,
        archived: data.summary.archived,
        collections: data.summary.collections,
        filename,
        exportedAt: data.exportedAt,
      });
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
      setState('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-[#e5a93c] text-xs font-semibold uppercase tracking-widest mb-1">
          <Shield className="w-3.5 h-3.5" />
          Backup & Export
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
          Export Full Catalog
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Download a complete JSON backup of all Hunts, Collections, and metadata.
        </p>
      </div>

      {/* Info card */}
      <div className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
        <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">What is included</h2>
        <ul className="space-y-2.5">
          {[
            ['Published Hunts', 'All publicly visible hunts'],
            ['Draft Hunts', 'Unpublished work-in-progress hunts'],
            ['Archived Hunts', 'Removed from public but preserved'],
            ['Collections', 'All editorial collection metadata'],
            ['All fields', 'IDs, Day numbers, media URLs, trailer IDs, status'],
            ['Timestamped filename', 'moviehunt-catalog-YYYY-MM-DDTHH-MM-SS.json'],
          ].map(([label, desc]) => (
            <li key={label} className="flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#e5a93c] flex-shrink-0 mt-0.5" />
              <span>
                <span className="font-semibold text-white">{label}</span>
                <span className="text-zinc-400"> — {desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Export button */}
      <button
        onClick={handleExport}
        disabled={state === 'loading'}
        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all ${
          state === 'loading'
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            : 'bg-[#e5a93c] text-[#0a0a0f] hover:bg-[#d4982b] shadow-lg shadow-[#e5a93c]/10 hover:scale-[1.01] active:scale-[0.99]'
        }`}
      >
        {state === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Preparing Export...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Export Full Catalog
          </>
        )}
      </button>

      {/* Success result */}
      {state === 'success' && summary && (
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            Export Downloaded Successfully
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Published', value: summary.published, icon: Film },
              { label: 'Drafts', value: summary.drafts, icon: FileJson },
              { label: 'Archived', value: summary.archived, icon: Archive },
              { label: 'Collections', value: summary.collections, icon: Shield },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="p-3 rounded-xl bg-[#0d0d12] border border-white/5 text-center">
                <Icon className="w-4 h-4 text-[#e5a93c] mx-auto mb-1.5" />
                <div className="text-lg font-bold text-white font-serif">{value}</div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wide mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 text-[11px] text-zinc-400">
            <div><span className="text-zinc-300 font-semibold">File:</span> {summary.filename}</div>
            <div><span className="text-zinc-300 font-semibold">Exported:</span> {new Date(summary.exportedAt).toLocaleString()}</div>
            <div><span className="text-zinc-300 font-semibold">Total Hunts:</span> {summary.totalHunts}</div>
          </div>
        </div>
      )}

      {/* Error */}
      {state === 'error' && error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/20 flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-red-300 mb-0.5">Export failed</div>
            <div className="text-zinc-400">{error}</div>
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/5 text-[11px] text-zinc-500 leading-relaxed">
        <strong className="text-zinc-300">Recommendation:</strong> Export a backup before bulk edits or
        after publishing significant new Hunts. The JSON file can restore the catalog if needed.
      </div>
    </div>
  );
}
