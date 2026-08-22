'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  FileText,
  Edit3,
  Image as ImageIcon,
  Eye,
  Send,
  Save,
  Check,
  ArrowRight,
  ArrowLeft,
  Star,
  ExternalLink,
  Plus,
  Trash2,
  Play,
  Film,
  Tv,
  Info,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Loader2,
  RefreshCw,
  Clock,
  Layers
} from 'lucide-react';
import { HuntItem } from '@/data/hunts';

const DEFAULT_HUNT: HuntItem = {
  id: '',
  day: 1,
  type: 'movie',
  title: '',
  year: new Date().getFullYear(),
  tagline: '',
  hook: '',
  imdbRating: 7.5,
  cast: [],
  director: '',
  duration: '110 min',
  language: 'Hindi',
  availableOn: {
    name: 'Netflix',
    url: 'https://netflix.com',
  },
  storySummary: '',
  whyWatch: '',
  shouldYouWatch: 'YES. If you love deep cinematic storytelling.',
  bestFor: ['🍿 Evening watch', '🎧 Headphones recommended', '🧠 Deep story'],
  afterCreditsEmotion: 'Speechless',
  emotionalLines: [],
  bestScenes: [],
  moodTags: ['🤯 Mind-Blowing', '😱 Thriller'],
  genres: ['Drama', 'Thriller'],
  musicVibe: 'Cinematic ambient score, slow building emotion',
  coverImage: '',
  images: [],
  trailerYoutubeId: '',
  hindiTrailerYoutubeId: '',
  featured: true,
  status: 'published',
};

function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  return match ? match[1] : trimmed;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function PublishHuntContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get('id');

  const [activeStep, setActiveStep] = useState<'import' | 'review' | 'media' | 'preview' | 'publish'>('import');
  const [rawText, setRawText] = useState('');
  const [hunt, setHunt] = useState<HuntItem>(DEFAULT_HUNT);
  const [isEditing, setIsEditing] = useState(false);
  const [originalId, setOriginalId] = useState<string | null>(null);

  const [allExistingHunts, setAllExistingHunts] = useState<HuntItem[]>([]);
  const [nextSuggestedDay, setNextSuggestedDay] = useState(1);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedHunt, setSavedHunt] = useState<HuntItem | null>(null);
  const [extractionNotice, setExtractionNotice] = useState<string | null>(null);

  // Upload states
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null);
  const [uploadingGalleryIndex, setUploadingGalleryIndex] = useState<number | null>(null);
  const [galleryUploadError, setGalleryUploadError] = useState<string | null>(null);

  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const targetGalleryIndexRef = useRef<number>(0);

  // ── 1. Load Initial Data (Existing hunts + next Day number or edit item) ──
  useEffect(() => {
    async function loadCatalog() {
      setIsLoadingInitial(true);
      try {
        const res = await fetch('/api/admin/hunts?status=all');
        if (res.ok) {
          const data = await res.json();
          const list: HuntItem[] = data.hunts || [];
          setAllExistingHunts(list);

          const maxDay = list.length > 0 ? Math.max(...list.map((h) => h.day)) : 0;
          const nextDay = maxDay + 1;
          setNextSuggestedDay(nextDay);

          if (editId) {
            const match = list.find((h) => h.id === editId);
            if (match) {
              setHunt({ ...match });
              setIsEditing(true);
              setOriginalId(match.id);
              setActiveStep('review');
              setExtractionNotice(`Loaded existing Hunt: Day ${match.day} — ${match.title} (${match.status || 'published'})`);
            }
          } else {
            setHunt((prev) => ({
              ...prev,
              day: nextDay,
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load initial catalog:', err);
      } finally {
        setIsLoadingInitial(false);
      }
    }
    loadCatalog();
  }, [editId]);

  // ── 2. Duplicate Day Number Check ──
  const dayConflictHunt = allExistingHunts.find(
    (h) => h.day === hunt.day && (!isEditing || h.id !== originalId),
  );

  // ── 3. ChatGPT Markdown Parser ──
  const parseChatGPTOutput = () => {
    if (!rawText.trim()) return;

    try {
      // Day Number
      const dayMatch = rawText.match(/Day\s*(\d+)/i);
      const day = dayMatch ? parseInt(dayMatch[1]) : nextSuggestedDay;

      // Type (Series vs Movie)
      let type: 'movie' | 'series' = 'movie';
      if (
        /##?\s*(?:Web\s*)?Series[:\s]/i.test(rawText) ||
        /\b(?:Web\s*)?Series\s*:\s*/i.test(rawText) ||
        /\bType\s*:\s*(?:Web\s*)?Series/i.test(rawText) ||
        /\b\d+\s*Episodes\b/i.test(rawText) ||
        /\bSeasons?\s*:\s*\d+/i.test(rawText)
      ) {
        type = 'series';
      } else if (
        /##?\s*Movie[:\s]/i.test(rawText) ||
        /\bMovie\s*:\s*/i.test(rawText) ||
        /\bType\s*:\s*Movie/i.test(rawText)
      ) {
        type = 'movie';
      }

      // Seasons & Episodes Extraction
      const seasonsMatch = rawText.match(/\bSeasons?\s*:\s*\*?(\d+)/i);
      const episodesMatch = rawText.match(/\bEpisodes?\s*:\s*\*?(\d+)/i);
      const numSeasons = seasonsMatch ? parseInt(seasonsMatch[1]) : null;
      const numEpisodes = episodesMatch ? parseInt(episodesMatch[1]) : null;

      let duration = '';
      if (numSeasons && numEpisodes) {
        duration = `${numSeasons} Season${numSeasons > 1 ? 's' : ''} · ${numEpisodes} Episodes`;
      } else if (numEpisodes) {
        duration = `${numEpisodes} Episodes`;
      } else if (numSeasons) {
        duration = `${numSeasons} Season${numSeasons > 1 ? 's' : ''}`;
      } else {
        const durationMatch =
          rawText.match(/(?:Duration|Runtime|Episodes?)[:\s]*\*?(\d+\s*(?:min|mins|Episodes|episodes|Hours?|h|hrs))/i) ||
          rawText.match(/\b(\d+\s*(?:min|mins|Episodes|episodes))\b/i);
        duration = durationMatch
          ? durationMatch[1].trim()
          : type === 'series'
          ? '8 Episodes'
          : '110 min';
      }

      // Title & Year — Smart Line-by-Line Parser
      let title = '';
      let year = new Date().getFullYear();

      const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      for (const line of lines) {
        // Skip header lines like "Day 85 of finding movies & series..." or "Series Details"
        if (/^Day\s*\d+/i.test(line) && line.toLowerCase().includes('finding')) continue;
        if (/^(?:Series|Movie|Film)\s*Details/i.test(line)) continue;

        // Pattern 1: "Series: Kota Factory (2019–2024)" or "Movie: 12th Fail (2023)"
        const prefixMatch = line.match(/^(?:Series|Movie|Title|Film)\s*:\s*\*?([^(]+?)\s*\((19\d\d|20\d\d)(?:[–—\-]\d{2,4})?\)\*?/i);
        if (prefixMatch) {
          title = prefixMatch[1].replace(/[*#]/g, '').trim();
          year = parseInt(prefixMatch[2]);
          break;
        }

        // Pattern 2: Standalone "**Kota Factory (2019–2024)**" or "Kota Factory (2019-2024)"
        const parenMatch = line.match(/^(?:##\s*|\*\*)?([^(]+?)\s*\((19\d\d|20\d\d)(?:[–—\-]\d{2,4})?\)\*?/i);
        if (parenMatch && !parenMatch[1].toLowerCase().includes('day') && !parenMatch[1].toLowerCase().includes('finding')) {
          title = parenMatch[1].replace(/[*#]/g, '').trim();
          year = parseInt(parenMatch[2]);
          break;
        }
      }

      if (!title || title === 'Untitled') {
        title = 'Untitled Recommendation';
      }

      // Director / Creators
      const creatorMatch =
        rawText.match(/(?:\*\*|##)?\s*(?:Creators?|Directors?|Directed By|Created By)[:\s]*\*?([^\n\r]+)/i);
      const director = creatorMatch
        ? creatorMatch[1].replace(/[*[\]]/g, '').replace(/\([^)]*\)/g, '').trim()
        : '';

      // Cast
      const castMatch = rawText.match(/(?:\*\*|##)?\s*Cast[:\s]*\*?([^\n\r]+)/i);
      const cast = castMatch
        ? castMatch[1].split(/[,|•]/).map((s) => s.replace(/[*[\]]/g, '').trim()).filter(Boolean)
        : [];

      // IMDb Rating
      const imdbMatch =
        rawText.match(/IMDb\s*Rating[:\s]*\*?(\d+\.?\d*)\/10/i) ||
        rawText.match(/(\d+\.\d+|\d+)\/10/);
      const imdbRating = imdbMatch ? parseFloat(imdbMatch[1]) : 7.5;

      // Available On
      const platformMatch =
        rawText.match(/(?:\*\*|##)?\s*Available On[:\s]*\[([^\]]+)\]\(([^)]+)\)/i) ||
        rawText.match(/(?:\*\*|##)?\s*Available On[:\s]*\*?([^\n\r]+)/i);
      let platformName = 'Streaming';
      let platformUrl = '#';
      if (platformMatch) {
        if (platformMatch[2]) {
          platformName = platformMatch[1].replace(/[*[\]]/g, '').trim();
          platformUrl = platformMatch[2].trim();
        } else {
          platformName = platformMatch[1].replace(/[*[\]]/g, '').trim();
        }
      }

      // Story Summary (Spoiler-Free)
      let storySummary = '';
      const storySection = rawText.match(
        /(?:#|##|\*\*|\b)?\s*Story Summary[^\n]*\n+([\s\S]*?)(?=(?:\n+---\s*\n+|\n+##|\n+\d+\.\s*Viral|\n+\d+\.\s*Hook|\n+\d+\.\s*Why|$))/i,
      );
      if (storySection && storySection[1]) {
        storySummary = storySection[1].replace(/[*#]/g, '').replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim();
      }

      // Hook
      let hook = '';
      const hookSection = rawText.match(
        /(?:\d+\.\s*)?Hook(?: Text)?[^\n]*\n+([\s\S]*?)(?=(?:\n+---\s*\n+|\n+##|\n+#|\n+\d+\.|$))/i,
      );
      if (hookSection && hookSection[1]) {
        hook = hookSection[1].replace(/[*"“”\r\n#]/g, ' ').replace(/\s+/g, ' ').trim();
      }
      if (!hook) {
        hook = `${title} is a story actually worth your evening.`;
      }

      // Tagline / Thumbnail
      let tagline = '';
      const tagSection = rawText.match(
        /(?:\d+\.\s*)?Thumbnail(?: Text)?[^\n]*\n+([\s\S]*?)(?=(?:\n+---\s*\n+|\n+##|\n+#|\n+\d+\.|$))/i,
      );
      if (tagSection && tagSection[1]) {
        tagline = tagSection[1].replace(/[*"“”\r\n#]/g, ' ').replace(/\s+/g, ' ').trim();
      }
      if (!tagline) {
        const bottomMatch = rawText.match(/Bottom Big Text[^\n]*\n+[\s\S]*?\*{1,3}"?([^"\n\r*]+)"?\*{1,3}/i);
        if (bottomMatch) tagline = bottomMatch[1].trim();
      }
      if (!tagline) tagline = 'MUST WATCH CINEMA.';

      // Why You Should Watch It
      let whyWatch = '';
      const whySection = rawText.match(
        /(?:\d+\.\s*)?Why You Should Watch[^\n]*\n+([\s\S]*?)(?=(?:\n+---\s*\n+|\n+##|\n+\d+\.\s*CTA|$))/i,
      );
      if (whySection && whySection[1]) {
        whyWatch = whySection[1].replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim();
      }

      // Emotional Lines
      let emotionalLines: string[] = [];
      const linesMatch = rawText.match(
        /(?:Short Emotional Lines|Emotional Lines)[^\n]*\n+([\s\S]*?)(?=(?:\n+---\s*\n+|\n+##|\n+\d+\.|$))/i,
      );
      if (linesMatch && linesMatch[1]) {
        const items = linesMatch[1].split(/\n/).map((l) => l.replace(/^[•\-\d.\s*"“”]+|[*"“”\r\n]+$/g, '').trim()).filter(Boolean);
        emotionalLines = items.slice(0, 6);
      }

      // Best Scenes
      let bestScenes: string[] = [];
      const scenesMatch = rawText.match(
        /(?:Best Scenes\/Clips to Use|Best Scenes)[^\n]*\n+([\s\S]*?)(?=(?:\n+---\s*\n+|\n+##|\n+\d+\.|$))/i,
      );
      if (scenesMatch && scenesMatch[1]) {
        const items = scenesMatch[1].split(/\n/).map((l) => l.replace(/^[•\-\d.\s*]+|[*#\r\n]+$/g, '').trim()).filter(Boolean);
        bestScenes = items.slice(0, 6);
      }

      // Music Vibe
      let musicVibe = '';
      const musicMatch = rawText.match(
        /(?:Music Vibe)[^\n]*\n+([\s\S]*?)(?=(?:\n+---\s*\n+|\n+##|\n+\d+\.|$))/i,
      );
      if (musicMatch && musicMatch[1]) {
        const items = musicMatch[1].split(/\n/).map((l) => l.replace(/^[•\-\d.\s*]+|[*#\r\n]+$/g, '').trim()).filter(Boolean);
        musicVibe = items.join(', ');
      }
      if (!musicVibe) musicVibe = 'Emotional piano, soft acoustic guitar, slow motivational build';

      // Auto-generated slug ID
      const cleanSlug = slugify(title);
      const generatedId = `day-${day}-${cleanSlug || 'movie'}`;

      const extracted: HuntItem = {
        ...hunt,
        id: generatedId,
        day,
        type,
        title,
        year,
        tagline,
        hook,
        imdbRating,
        cast,
        director,
        duration,
        language: 'Hindi',
        availableOn: {
          name: platformName,
          url: platformUrl,
        },
        storySummary,
        whyWatch,
        shouldYouWatch: 'YES. If you love deep cinematic storytelling.',
        emotionalLines,
        bestScenes,
        bestFor: ['🍿 Evening watch', '🎧 Headphones recommended', '🧠 Deep story'],
        moodTags: ['🤯 Mind-Blowing', '😱 Thriller'],
        genres: ['Drama', 'Thriller'],
        musicVibe,
        coverImage: hunt.coverImage || '',
        images: hunt.images || [],
        trailerYoutubeId: hunt.trailerYoutubeId || '',
        featured: true,
        status: 'published',
      };

      setHunt(extracted);
      setExtractionNotice(`✓ Extracted: Day ${day} — ${title} (${year})`);
      setActiveStep('review');
    } catch (err) {
      alert('Error parsing ChatGPT text. Check markdown structure and try again.');
    }
  };

  // ── 4. Image Upload to Vercel Blob (Fallback Option) ──
  const handleFileUpload = async (
    file: File,
    type: 'cover' | 'gallery',
    galleryIndex?: number,
  ) => {
    const formData = new FormData();
    formData.append('file', file);

    if (type === 'cover') {
      setIsUploadingCover(true);
      setCoverUploadError(null);
    } else {
      setUploadingGalleryIndex(galleryIndex ?? 0);
      setGalleryUploadError(null);
    }

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      const uploadedUrl = data.url;

      if (type === 'cover') {
        setHunt((prev) => ({ ...prev, coverImage: uploadedUrl }));
      } else if (galleryIndex !== undefined) {
        setHunt((prev) => {
          const updated = [...prev.images];
          updated[galleryIndex] = uploadedUrl;
          return { ...prev, images: updated };
        });
      }
    } catch (err: any) {
      if (type === 'cover') {
        setCoverUploadError(err.message || 'Upload failed');
      } else {
        setGalleryUploadError(err.message || 'Upload failed');
      }
    } finally {
      if (type === 'cover') {
        setIsUploadingCover(false);
      } else {
        setUploadingGalleryIndex(null);
      }
    }
  };

  // ── 5. Save as Draft or Publish ──
  const handleSave = async (targetStatus: 'draft' | 'published') => {
    setSaveError(null);
    setIsSaving(true);

    const payload: Partial<HuntItem> = {
      ...hunt,
      status: targetStatus,
      trailerYoutubeId: extractYouTubeId(hunt.trailerYoutubeId || ''),
      hindiTrailerYoutubeId: extractYouTubeId(hunt.hindiTrailerYoutubeId || ''),
    };

    // Auto-generate ID if missing
    if (!payload.id || !payload.id.trim()) {
      payload.id = `day-${payload.day}-${slugify(payload.title || 'untitled')}`;
    }

    try {
      let res: Response;
      if (isEditing && originalId) {
        res = await fetch(`/api/admin/hunts/${originalId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/admin/hunts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save hunt.');
      }

      setSavedHunt(data.hunt);
      setActiveStep('publish');
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save hunt. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // ── Gallery Helpers ──
  const addGalleryImage = () => {
    setHunt((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeGalleryImage = (index: number) => {
    setHunt((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateGalleryImage = (index: number, val: string) => {
    setHunt((prev) => {
      const updated = [...prev.images];
      updated[index] = val;
      return { ...prev, images: updated };
    });
  };

  const steps = [
    { id: 'import', label: '1. Import', icon: FileText },
    { id: 'review', label: '2. Review', icon: Edit3 },
    { id: 'media', label: '3. Media & Trailer', icon: ImageIcon },
    { id: 'preview', label: '4. Live Preview', icon: Eye },
    { id: 'publish', label: '5. Publish Controls', icon: Send },
  ];

  if (isLoadingInitial) {
    return (
      <div className="p-12 text-center text-zinc-400 text-xs flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#e5a93c]" />
        Loading publishing workspace...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#e5a93c] text-xs font-semibold uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            {isEditing ? `Editing Day ${hunt.day}` : 'Publishing Workspace'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
            {isEditing ? `Edit: ${hunt.title}` : 'Publish Recommendation'}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {isEditing
              ? 'Update details, swap media, or change publication status.'
              : 'Turn ChatGPT recommendations into production-ready Movie Hunt entries with direct CMS publishing.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/library"
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
          >
            ← Library
          </Link>
          <button
            onClick={() => setActiveStep('publish')}
            className="px-4 py-1.5 rounded-lg bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] transition-all flex items-center gap-1.5 shadow-md shadow-[#e5a93c]/10"
          >
            <Send className="w-3.5 h-3.5" />
            Publish Controls →
          </button>
        </div>
      </div>

      {/* ── Notice Banners ── */}
      {extractionNotice && (
        <div className="p-3.5 rounded-xl bg-[#e5a93c]/10 border border-[#e5a93c]/30 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#e5a93c] flex-shrink-0" />
            <span>{extractionNotice}</span>
          </div>
          <button
            onClick={() => setExtractionNotice(null)}
            className="text-zinc-400 hover:text-white text-[11px] font-bold uppercase ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Day Duplicate Warning Badge */}
      {dayConflictHunt && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Warning:</strong> Day {hunt.day} is already assigned to &quot;{dayConflictHunt.title}&quot;. Publishing will be blocked unless you change the Day number.
          </span>
        </div>
      )}

      {/* Save Error Banner */}
      {saveError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-xs text-red-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{saveError}</span>
          </div>
          <button
            onClick={() => setSaveError(null)}
            className="text-red-300 hover:text-white text-[11px] font-bold uppercase ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── Step Navigation Bar ── */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0d0d12] border border-white/5 overflow-x-auto">
        {steps.map(({ id, label, icon: Icon }) => {
          const isActive = activeStep === id;
          return (
            <button
              key={id}
              onClick={() => setActiveStep(id as typeof activeStep)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex-1 justify-center ${
                isActive
                  ? 'bg-[#e5a93c] text-[#0a0a0f] shadow-md shadow-[#e5a93c]/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ── STEP 1: IMPORT TAB ── */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {activeStep === 'import' && (
        <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#e5a93c]" />
                Paste Raw ChatGPT Recommendation Output
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Paste the markdown output from your prompt. The parser will automatically extract all fields.
              </p>
            </div>
            <button
              onClick={parseChatGPTOutput}
              disabled={!rawText.trim()}
              className={`px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 flex-shrink-0 ${
                rawText.trim()
                  ? 'bg-[#e5a93c] text-[#0a0a0f] hover:bg-[#d4982b] shadow-lg shadow-[#e5a93c]/20'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Extract Fields →
            </button>
          </div>

          <textarea
            rows={18}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste raw ChatGPT text here (e.g. Day 82 of finding movies you've probably never heard of...&#10;&#10;**12th Fail (2023)**&#10;**IMDb Rating:** **9.0/10**&#10;**Cast:** Vikrant Massey...)"
            className="w-full p-4 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#e5a93c] resize-none"
          />

          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-zinc-500">
              💡 Suggested next Day number: <strong className="text-[#e5a93c]">Day {nextSuggestedDay}</strong>
            </div>
            <button
              onClick={() => setActiveStep('review')}
              className="text-xs text-[#e5a93c] hover:underline font-semibold flex items-center gap-1"
            >
              Skip to Review Fields <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ── STEP 2: REVIEW & EDIT FIELDS ── */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {activeStep === 'review' && (
        <div className="space-y-6">
          {/* Section A: Core Metadata */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
                <Film className="w-3.5 h-3.5" />
                1. Core Recommendation Information
              </h2>
              <div className="text-[11px] text-zinc-400">
                Suggested Next: <span className="text-[#e5a93c] font-bold">Day {nextSuggestedDay}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Day # */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Day Number
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={hunt.day}
                    onChange={(e) => {
                      const newDay = parseInt(e.target.value) || 1;
                      const slug = slugify(hunt.title);
                      setHunt({ ...hunt, day: newDay, id: `day-${newDay}-${slug || 'movie'}` });
                    }}
                    className={`w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border text-xs font-semibold text-white outline-none ${
                      dayConflictHunt ? 'border-amber-500 focus:border-amber-400' : 'border-white/10 focus:border-[#e5a93c]'
                    }`}
                  />
                </div>
                {dayConflictHunt && (
                  <span className="text-[10px] text-amber-400 mt-1 block">
                    Day already taken!
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={hunt.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = slugify(title);
                    setHunt({ ...hunt, title, id: `day-${hunt.day}-${slug || 'movie'}` });
                  }}
                  placeholder="e.g. 12th Fail"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Type
                </label>
                <select
                  value={hunt.type}
                  onChange={(e) => setHunt({ ...hunt, type: e.target.value as 'movie' | 'series' })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                >
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Release Year
                </label>
                <input
                  type="number"
                  value={hunt.year}
                  onChange={(e) => setHunt({ ...hunt, year: parseInt(e.target.value) || 2024 })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* IMDb Rating */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  IMDb Score (e.g. 8.5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={hunt.imdbRating}
                  onChange={(e) => setHunt({ ...hunt, imdbRating: parseFloat(e.target.value) || 7.0 })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Duration / Format */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  {hunt.type === 'series' ? 'Series Duration / Format' : 'Movie Duration / Runtime'}
                </label>
                <input
                  type="text"
                  value={hunt.duration || ''}
                  onChange={(e) => setHunt({ ...hunt, duration: e.target.value })}
                  placeholder={hunt.type === 'series' ? 'e.g. 3 Seasons · 15 Episodes' : 'e.g. 147 min'}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Language
                </label>
                <input
                  type="text"
                  value={hunt.language || 'Hindi'}
                  onChange={(e) => setHunt({ ...hunt, language: e.target.value })}
                  placeholder="e.g. Hindi, Malayalam, Tamil"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                />
              </div>
            </div>

            {/* Series-Specific Season & Episode Quick Helper */}
            {hunt.type === 'series' && (
              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-purple-400" />
                    Series Season & Episode Details
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Live format: <strong className="text-white">{hunt.duration || 'Not specified'}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                      Total Seasons
                    </label>
                    <input
                      type="number"
                      min={1}
                      placeholder="e.g. 3"
                      value={hunt.duration?.match(/(\d+)\s*Seasons?/i)?.[1] || ''}
                      onChange={(e) => {
                        const seasons = e.target.value;
                        const epMatch = hunt.duration?.match(/(\d+)\s*Episodes?/i);
                        const eps = epMatch ? epMatch[1] : '';
                        if (seasons && eps) {
                          setHunt({ ...hunt, duration: `${seasons} Season${parseInt(seasons) > 1 ? 's' : ''} · ${eps} Episodes` });
                        } else if (seasons) {
                          setHunt({ ...hunt, duration: `${seasons} Season${parseInt(seasons) > 1 ? 's' : ''}` });
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-purple-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                      Total Episodes
                    </label>
                    <input
                      type="number"
                      min={1}
                      placeholder="e.g. 15"
                      value={hunt.duration?.match(/(\d+)\s*Episodes?/i)?.[1] || ''}
                      onChange={(e) => {
                        const eps = e.target.value;
                        const seasonMatch = hunt.duration?.match(/(\d+)\s*Seasons?/i);
                        const seasons = seasonMatch ? seasonMatch[1] : '';
                        if (seasons && eps) {
                          setHunt({ ...hunt, duration: `${seasons} Season${parseInt(seasons) > 1 ? 's' : ''} · ${eps} Episodes` });
                        } else if (eps) {
                          setHunt({ ...hunt, duration: `${eps} Episodes` });
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-purple-400 outline-none"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        const seasonMatch = hunt.duration?.match(/(\d+)\s*Seasons?/i);
                        const epMatch = hunt.duration?.match(/(\d+)\s*Episodes?/i);
                        const s = seasonMatch ? seasonMatch[1] : '1';
                        const e = epMatch ? epMatch[1] : '8';
                        setHunt({ ...hunt, duration: `${s} Season${parseInt(s) > 1 ? 's' : ''} · ${e} Episodes` });
                      }}
                      className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-[11px] font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      Sync Format
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section B: Credits & Where to Watch */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Tv className="w-3.5 h-3.5" />
              2. Credits & Where to Watch
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Director / Creator(s)
                </label>
                <input
                  type="text"
                  value={hunt.director}
                  onChange={(e) => setHunt({ ...hunt, director: e.target.value })}
                  placeholder="e.g. Saurabh Khanna, Vidhu Vinod Chopra"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Lead Cast (comma separated)
                </label>
                <input
                  type="text"
                  value={hunt.cast.join(', ')}
                  onChange={(e) =>
                    setHunt({
                      ...hunt,
                      cast: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. Vikrant Massey, Medha Shankr"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Streaming Platform Name
                </label>
                <input
                  type="text"
                  value={hunt.availableOn.name}
                  onChange={(e) =>
                    setHunt({
                      ...hunt,
                      availableOn: { ...hunt.availableOn, name: e.target.value },
                    })
                  }
                  placeholder="e.g. Disney+ Hotstar, Netflix, Prime Video"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Streaming Watch Link URL
                </label>
                <input
                  type="url"
                  value={hunt.availableOn.url}
                  onChange={(e) =>
                    setHunt({
                      ...hunt,
                      availableOn: { ...hunt.availableOn, url: e.target.value },
                    })
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section C: Editorial Hooks & Story Synopsis */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-3.5 h-3.5" />
              3. Editorial Hooks & Story Synopsis
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                    Editorial Hook Line
                  </label>
                  <input
                    type="text"
                    value={hunt.hook}
                    onChange={(e) => setHunt({ ...hunt, hook: e.target.value })}
                    placeholder="e.g. He failed 12th. Then he became an IPS officer."
                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                    Thumbnail Tagline / Badge
                  </label>
                  <input
                    type="text"
                    value={hunt.tagline}
                    onChange={(e) => setHunt({ ...hunt, tagline: e.target.value })}
                    placeholder="e.g. FAILURE IS NOT THE END."
                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Spoiler-Free Story Summary
                </label>
                <textarea
                  rows={4}
                  value={hunt.storySummary}
                  onChange={(e) => setHunt({ ...hunt, storySummary: e.target.value })}
                  placeholder="Write a gripping 2-3 sentence overview..."
                  className="w-full p-3 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-zinc-200 focus:border-[#e5a93c] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Why You Should Watch It (Curation Commentary)
                </label>
                <textarea
                  rows={4}
                  value={hunt.whyWatch}
                  onChange={(e) => setHunt({ ...hunt, whyWatch: e.target.value })}
                  placeholder="Explain why this movie is worth someone's evening..."
                  className="w-full p-3 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-zinc-200 focus:border-[#e5a93c] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Short Emotional Quotes (one per line)
                </label>
                <textarea
                  rows={3}
                  value={hunt.emotionalLines.join('\n')}
                  onChange={(e) =>
                    setHunt({
                      ...hunt,
                      emotionalLines: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  placeholder="Failure isn't the end.&#10;Your beginning doesn't define your ending."
                  className="w-full p-3 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-zinc-200 focus:border-[#e5a93c] outline-none resize-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section D: Vibes & Tags */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              4. Vibes, Tags & Atmosphere
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Mood Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={hunt.moodTags.join(', ')}
                  onChange={(e) =>
                    setHunt({
                      ...hunt,
                      moodTags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="✨ Inspiring, ❤️ Meaningful, 😊 Feel Good"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Genres (comma separated)
                </label>
                <input
                  type="text"
                  value={hunt.genres.join(', ')}
                  onChange={(e) =>
                    setHunt({
                      ...hunt,
                      genres: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Biography, Drama, Inspirational"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Best For Tags
                </label>
                <input
                  type="text"
                  value={hunt.bestFor.join(', ')}
                  onChange={(e) =>
                    setHunt({
                      ...hunt,
                      bestFor: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="🍿 Evening watch, ✨ Highly Inspiring"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Music / Soundscape Vibe
                </label>
                <input
                  type="text"
                  value={hunt.musicVibe}
                  onChange={(e) => setHunt({ ...hunt, musicVibe: e.target.value })}
                  placeholder="Emotional piano, slow motivational instrumental"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep('import')}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Import
            </button>
            <button
              onClick={() => setActiveStep('media')}
              className="px-5 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] flex items-center gap-1.5 shadow-lg shadow-[#e5a93c]/10"
            >
              Continue to Media & Trailer <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ── STEP 3: MEDIA & TRAILER TAB ── */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {activeStep === 'media' && (
        <div className="space-y-6">
          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={coverFileInputRef}
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, 'cover');
            }}
          />
          <input
            type="file"
            ref={galleryFileInputRef}
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, 'gallery', targetGalleryIndexRef.current);
            }}
          />

          {/* Cover / Poster Image Section */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" />
                1. Cover Poster (External URL or Upload)
              </h2>
              <span className="text-[11px] text-zinc-500">Method A (Paste URL) recommended to save storage</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              <div className="md:col-span-2 space-y-3">
                {/* Method A: Paste External Source URL */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">
                    Option A: Paste High-Res Image URL (TMDB / IMDb / Unsplash)
                  </label>
                  <input
                    type="url"
                    value={hunt.coverImage}
                    onChange={(e) => setHunt({ ...hunt, coverImage: e.target.value })}
                    placeholder="https://image.tmdb.org/t/p/original/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                  />
                </div>

                {/* Method B: Optional Fallback Upload Button */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase block">
                      Option B: Upload File to Vercel Blob (Fallback)
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      Supports JPG, PNG, WebP, AVIF up to 8MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => coverFileInputRef.current?.click()}
                    disabled={isUploadingCover}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isUploadingCover ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e5a93c]" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5 text-[#e5a93c]" />
                        Upload Poster
                      </>
                    )}
                  </button>
                </div>

                {coverUploadError && (
                  <div className="text-xs text-red-400 flex items-center gap-1.5 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {coverUploadError}
                  </div>
                )}
              </div>

              {/* Cover Live Preview */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-44 rounded-xl bg-zinc-950 border border-white/10 overflow-hidden relative shadow-lg">
                  {hunt.coverImage ? (
                    <img
                      src={hunt.coverImage}
                      alt={hunt.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs text-center p-2">
                      No Poster Added
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 mt-2">Live Poster Preview</span>
              </div>
            </div>
          </div>

          {/* Gallery Stills Section */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" />
                2. Cinematic Gallery Stills ({hunt.images.length} Images)
              </h2>
              <button
                type="button"
                onClick={addGalleryImage}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-[#e5a93c] text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Still
              </button>
            </div>

            {galleryUploadError && (
              <div className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {galleryUploadError}
              </div>
            )}

            <div className="space-y-3">
              {hunt.images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0a0a0f] border border-white/5"
                >
                  <div className="w-14 h-10 rounded-lg bg-zinc-900 overflow-hidden flex-shrink-0 border border-white/10">
                    {imgUrl ? (
                      <img src={imgUrl} alt={`Still ${idx + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600">
                        Empty
                      </div>
                    )}
                  </div>

                  <input
                    type="url"
                    value={imgUrl}
                    onChange={(e) => updateGalleryImage(idx, e.target.value)}
                    placeholder="Paste image URL (Option A)..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-transparent border border-white/10 text-xs text-zinc-200 focus:border-[#e5a93c] outline-none"
                  />

                  {/* Upload fallback button for this still */}
                  <button
                    type="button"
                    onClick={() => {
                      targetGalleryIndexRef.current = idx;
                      galleryFileInputRef.current?.click();
                    }}
                    disabled={uploadingGalleryIndex === idx}
                    className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center gap-1 flex-shrink-0"
                    title="Upload file to Blob instead of URL"
                  >
                    {uploadingGalleryIndex === idx ? (
                      <Loader2 className="w-3 h-3 animate-spin text-[#e5a93c]" />
                    ) : (
                      <UploadCloud className="w-3 h-3 text-[#e5a93c]" />
                    )}
                    <span className="hidden sm:inline">Upload</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    disabled={hunt.images.length <= 1}
                    className={`p-2 rounded-lg text-zinc-500 hover:text-red-400 transition-colors ${
                      hunt.images.length <= 1 ? 'opacity-30 cursor-not-allowed' : ''
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Trailer Section */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Play className="w-3.5 h-3.5" />
              3. YouTube Trailer Video ID / URL
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Main Trailer ID or Full YouTube Link
                </label>
                <input
                  type="text"
                  value={hunt.trailerYoutubeId || ''}
                  onChange={(e) => setHunt({ ...hunt, trailerYoutubeId: e.target.value })}
                  placeholder="e.g. KjbtuqENvVE or https://youtu.be/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Hindi Trailer ID (Optional)
                </label>
                <input
                  type="text"
                  value={hunt.hindiTrailerYoutubeId || ''}
                  onChange={(e) => setHunt({ ...hunt, hindiTrailerYoutubeId: e.target.value })}
                  placeholder="e.g. ykTPOyJVJdQ (optional)"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>
            </div>

            {/* Embedded Trailer Live Preview */}
            {hunt.trailerYoutubeId && extractYouTubeId(hunt.trailerYoutubeId) && (
              <div className="pt-2">
                <div className="text-[11px] text-zinc-400 font-bold uppercase mb-2">
                  Trailer Embed Test (ID: {extractYouTubeId(hunt.trailerYoutubeId)})
                </div>
                <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(hunt.trailerYoutubeId)}`}
                    title="Trailer Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep('review')}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Review
            </button>
            <button
              onClick={() => setActiveStep('preview')}
              className="px-5 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] flex items-center gap-1.5 shadow-lg shadow-[#e5a93c]/10"
            >
              View Live Preview <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ── STEP 4: LIVE PREVIEW TAB ── */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {activeStep === 'preview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#e5a93c]" />
                  Live Preview: Card & Detail Breakdown
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  See how this recommendation will appear to visitors on Movie Hunt.
                </p>
              </div>

              <button
                onClick={() => setActiveStep('publish')}
                className="px-5 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] flex items-center gap-1.5"
              >
                Proceed to Publish Controls →
              </button>
            </div>

            {/* Recommendation Hero Banner Preview */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f] relative p-6 sm:p-8">
              {hunt.coverImage && (
                <div className="absolute inset-0 z-0 opacity-20">
                  <img src={hunt.coverImage} alt={hunt.title} className="w-full h-full object-cover filter blur-md" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
                </div>
              )}

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                <div className="sm:col-span-4 md:col-span-3">
                  <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-900">
                    {hunt.coverImage ? (
                      <img src={hunt.coverImage} alt={hunt.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                        No Poster
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-8 md:col-span-9 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e5a93c]/10 text-[#e5a93c] border border-[#e5a93c]/30 text-xs font-bold font-mono">
                      Day {hunt.day}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] uppercase font-semibold">
                      {hunt.type}
                    </span>
                    <span className="text-zinc-400 text-xs">({hunt.year})</span>
                    <span className="flex items-center gap-1 text-[#e5a93c] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#e5a93c]" />
                      {hunt.imdbRating} / 10
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    {hunt.title || 'Untitled Hunt'}
                  </h3>

                  {hunt.hook && (
                    <p className="text-xs text-[#e5a93c] font-semibold italic">
                      &quot;{hunt.hook}&quot;
                    </p>
                  )}

                  <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
                    {hunt.storySummary || 'No story summary entered yet.'}
                  </p>

                  <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400 flex-wrap">
                    {hunt.director && <span><strong>Director:</strong> {hunt.director}</span>}
                    {hunt.cast.length > 0 && <span>• <strong>Cast:</strong> {hunt.cast.join(', ')}</span>}
                  </div>

                  <div className="pt-3 flex items-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold">
                      Watch on {hunt.availableOn.name}
                    </span>
                    {hunt.trailerYoutubeId && (
                      <span className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1.5">
                        <Play className="w-3 h-3" /> Watch Trailer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Why Watch Quote */}
            {hunt.whyWatch && (
              <div className="p-5 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-[#e5a93c] font-bold">
                  Why You Should Watch It
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  {hunt.whyWatch}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep('media')}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Media
            </button>
            <button
              onClick={() => setActiveStep('publish')}
              className="px-5 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] flex items-center gap-1.5 shadow-lg shadow-[#e5a93c]/10"
            >
              Proceed to Publish Controls <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ── STEP 5: PUBLISH CONTROLS TAB ── */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {activeStep === 'publish' && (
        <div className="space-y-6">
          {savedHunt ? (
            /* Polished Success State */
            <div className="p-8 rounded-2xl bg-[#0d0d12] border border-emerald-500/30 text-center space-y-5 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
                <Check className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  {savedHunt.status === 'published' ? '✓ Published Successfully' : '✓ Draft Saved Successfully'}
                </span>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Day {savedHunt.day} — {savedHunt.title}
                </h2>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  {savedHunt.status === 'published'
                    ? 'This Hunt is now live on the public Movie Hunt website with on-demand cache revalidation.'
                    : 'Saved as draft in your Admin Library. It will NOT appear publicly until published.'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3 flex-wrap">
                {savedHunt.status === 'published' && (
                  <Link
                    href={`/hunt/${savedHunt.id}`}
                    target="_blank"
                    className="px-5 py-2.5 rounded-xl bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] flex items-center gap-1.5 shadow-lg shadow-[#e5a93c]/20"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live Hunt
                  </Link>
                )}
                <Link
                  href="/admin/library"
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white font-semibold text-xs transition-colors"
                >
                  Go to Library
                </Link>
                <button
                  onClick={() => {
                    setSavedHunt(null);
                    setHunt({ ...DEFAULT_HUNT, day: nextSuggestedDay + 1 });
                    setIsEditing(false);
                    setOriginalId(null);
                    setRawText('');
                    setActiveStep('import');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#e5a93c]" />
                  Publish Another
                </button>
              </div>
            </div>
          ) : (
            /* Publish / Draft Action Panel */
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#e5a93c]" />
                  Final Publication Review
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Choose whether to make this recommendation live immediately or save it as a draft in your library.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-zinc-500 block">Day Number</span>
                  <strong className="text-white text-sm">Day {hunt.day}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Title</span>
                  <strong className="text-white truncate block">{hunt.title || 'Untitled'}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Platform</span>
                  <strong className="text-white">{hunt.availableOn.name}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Cover Status</span>
                  <strong className={hunt.coverImage ? 'text-emerald-400' : 'text-amber-400'}>
                    {hunt.coverImage ? '✓ Ready' : '⚠️ Missing Poster'}
                  </strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Save Draft Button */}
                <button
                  type="button"
                  onClick={() => handleSave('draft')}
                  disabled={isSaving || !hunt.title.trim()}
                  className="p-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-left transition-all group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Save className="w-3 h-3 text-zinc-400" />
                      Save as Draft
                    </span>
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#e5a93c] transition-colors">
                    Store in Library
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Saves to the database without publishing. Will remain invisible to public visitors.
                  </p>
                </button>

                {/* Publish Button */}
                <button
                  type="button"
                  onClick={() => handleSave('published')}
                  disabled={isSaving || !hunt.title.trim() || !!dayConflictHunt}
                  className="p-5 rounded-2xl bg-[#e5a93c] hover:bg-[#d4982b] text-[#0a0a0f] text-left transition-all shadow-lg shadow-[#e5a93c]/10 group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 rounded-md bg-black/20 text-[#0a0a0f] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Send className="w-3 h-3" />
                      {isEditing ? 'Update & Publish' : 'Publish Live'}
                    </span>
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin text-[#0a0a0f]" />}
                  </div>
                  <h4 className="text-sm font-bold text-[#0a0a0f]">
                    Make Live on Website
                  </h4>
                  <p className="text-xs text-[#0a0a0f]/80 mt-1 leading-relaxed">
                    Instantly renders to the public Movie Hunt catalog with on-demand cache revalidation.
                  </p>
                </button>
              </div>

              {/* Navigation Back */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  onClick={() => setActiveStep('preview')}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Preview
                </button>
                <Link
                  href="/admin/library"
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Cancel and Return to Library
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PublishHuntPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-zinc-400 text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#e5a93c]" />
          Loading publishing workspace...
        </div>
      }
    >
      <PublishHuntContent />
    </Suspense>
  );
}
