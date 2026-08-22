'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Check,
  X,
  UploadCloud,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { CollectionItem } from '@/lib/cms/getCollections';

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<CollectionItem | null>(null);
  const [formData, setFormData] = useState<Partial<CollectionItem>>({
    id: '',
    title: '',
    description: '',
    image: '',
    count: 10,
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load Collections ──
  const loadCollections = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/admin/collections');
      if (!res.ok) throw new Error('Failed to fetch collections');
      const data = await res.json();
      setCollections(data.collections || []);
    } catch (err: any) {
      setLoadError(err.message || 'Error connecting to collections CMS');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ── Open Modal for Create or Edit ──
  const handleOpenCreate = () => {
    setEditingCollection(null);
    setFormData({
      id: '',
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
      count: 10,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (col: CollectionItem) => {
    setEditingCollection(col);
    setFormData({ ...col });
    setModalError(null);
    setIsModalOpen(true);
  };

  // ── Image Upload to Vercel Blob ──
  const handleFileUpload = async (file: File) => {
    setIsUploadingImage(true);
    setModalError(null);
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Upload failed');
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err: any) {
      setModalError(err.message || 'Image upload failed');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // ── Save Collection (Create or Edit) ──
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!formData.title?.trim()) {
      setModalError('Title is required');
      return;
    }

    // Auto slug for id if creating
    let colId = formData.id?.trim();
    if (!editingCollection && !colId) {
      colId = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-');
    }

    const payload = {
      ...formData,
      id: colId,
      title: formData.title.trim(),
      description: formData.description?.trim() || '',
      image: formData.image?.trim() || '',
      count: Number(formData.count) || 10,
    };

    try {
      let res: Response;
      if (editingCollection) {
        res = await fetch(`/api/admin/collections/${editingCollection.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/admin/collections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save collection');

      setIsModalOpen(false);
      showToast(
        'success',
        editingCollection
          ? `✓ Collection "${payload.title}" updated!`
          : `✓ Collection "${payload.title}" created!`,
      );
      loadCollections();
    } catch (err: any) {
      setModalError(err.message || 'Save failed');
    }
  };

  // ── Delete Collection ──
  const handleDelete = async (col: CollectionItem) => {
    if (!confirm(`Are you sure you want to delete collection "${col.title}"?`)) return;

    setBusyId(col.id);
    try {
      const res = await fetch(`/api/admin/collections/${col.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete');

      showToast('success', `✓ Collection "${col.title}" removed.`);
      setCollections((prev) => prev.filter((c) => c.id !== col.id));
    } catch (err: any) {
      showToast('error', err.message || 'Error deleting collection');
    } finally {
      setBusyId(null);
    }
  };

  // ── Reorder (Move Up / Move Down) ──
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= collections.length) return;

    const currentItem = collections[index];
    const targetItem = collections[targetIndex];
    setBusyId(currentItem.id);

    try {
      // Swap order values
      const res1 = await fetch(`/api/admin/collections/${currentItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: targetIndex }),
      });
      const res2 = await fetch(`/api/admin/collections/${targetItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: index }),
      });

      if (!res1.ok || !res2.ok) throw new Error('Failed to reorder collections');

      // Optimistically swap locally
      const updated = [...collections];
      updated[index] = { ...targetItem, order: index };
      updated[targetIndex] = { ...currentItem, order: targetIndex };
      setCollections(updated);
      showToast('success', '✓ Collection order updated.');
    } catch (err: any) {
      showToast('error', err.message || 'Error reordering');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />

      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#e5a93c] text-xs font-semibold uppercase tracking-widest mb-1">
            <FolderKanban className="w-3.5 h-3.5" />
            Curated Playlists
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
            Thematic Collections
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage, create, and reorder all {collections.length} curated theme playlists.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/collections"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-semibold hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Public Page
          </Link>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] transition-all shadow-lg shadow-[#e5a93c]/10 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            + New Collection
          </button>
        </div>
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

      {/* ── Collections Grid ── */}
      {isLoading ? (
        <div className="p-16 text-center rounded-2xl bg-[#0d0d12] border border-white/5 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#e5a93c] mx-auto" />
          <p className="text-xs text-zinc-400">Loading collections from database...</p>
        </div>
      ) : loadError ? (
        <div className="p-8 text-center rounded-2xl bg-[#0d0d12] border border-red-500/20 space-y-3">
          <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
          <p className="text-xs text-red-300">{loadError}</p>
          <button
            onClick={loadCollections}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white"
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((col, index) => {
            const isBusy = busyId === col.id;

            return (
              <div
                key={col.id}
                className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Image banner */}
                  <div className="w-full h-36 rounded-xl bg-zinc-900 overflow-hidden relative border border-white/10 shadow-md">
                    {col.image ? (
                      <img
                        src={col.image}
                        alt={col.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#e5a93c] text-[11px] font-bold border border-white/10">
                      {col.count || 'Playlist'}
                    </span>
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-zinc-300 text-[10px] font-mono border border-white/10">
                      Order: #{index + 1}
                    </span>
                  </div>

                  {/* Text details */}
                  <div>
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-[#e5a93c] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                      {col.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0 || isBusy}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === collections.length - 1 || isBusy}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Edit / Delete Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(col)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3 text-[#e5a93c]" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(col)}
                      disabled={isBusy}
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-red-500/10 hover:border-red-500/30 text-zinc-400 hover:text-red-300 border border-white/10 transition-colors"
                      title="Delete Collection"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── CREATE / EDIT COLLECTION MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0d0d12] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h2 className="text-xl font-serif font-bold text-white">
                {editingCollection ? 'Edit Collection' : 'Create New Collection'}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Curate a thematic playlist that connects matching movie recommendations.
              </p>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Collection Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Masterpieces of Pure Tension"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Description / Curation Note
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Stories where silence speaks louder than words..."
                  className="w-full p-3 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-zinc-200 focus:border-[#e5a93c] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Cover Image URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs text-zinc-300 flex items-center gap-1.5 flex-shrink-0"
                  >
                    {isUploadingImage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e5a93c]" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5 text-[#e5a93c]" />
                    )}
                    Upload
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Estimated Movie Count (e.g. 10)
                </label>
                <input
                  type="number"
                  value={formData.count || 10}
                  onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) || 10 })}
                  placeholder="e.g. 10"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] flex items-center gap-1.5 shadow-lg shadow-[#e5a93c]/10"
                >
                  <Check className="w-3.5 h-3.5" />
                  {editingCollection ? 'Save Changes' : 'Create Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
