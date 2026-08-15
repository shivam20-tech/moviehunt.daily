'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  FileText,
  Edit3,
  Image as ImageIcon,
  Eye,
  Code,
  Copy,
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
  RefreshCw
} from 'lucide-react';
import { HUNTS_DATA, HuntItem } from '@/data/hunts';

// Default empty Hunt structure
const DEFAULT_HUNT: HuntItem = {
  id: 'day-79-movie-title',
  day: 79,
  type: 'movie',
  title: '',
  year: new Date().getFullYear(),
  tagline: 'MUST WATCH CINEMA.',
  hook: 'A movie actually worth watching this evening.',
  imdbRating: 7.5,
  cast: ['Lead Actor 1', 'Lead Actor 2'],
  director: '',
  duration: '110 min',
  language: 'Hindi',
  availableOn: {
    name: 'Netflix',
    url: 'https://netflix.com'
  },
  storySummary: '',
  whyWatch: '',
  shouldYouWatch: 'YES. If you love deep cinematic storytelling.',
  bestFor: ['🍿 Evening watch', '🎧 Headphones recommended', '🧠 Deep story'],
  afterCreditsEmotion: 'Speechless',
  emotionalLines: ['“An unforgettable experience.”', '“Grounded performances.”', '“A hidden gem.”'],
  bestScenes: ['Key climax scene', 'Atmospheric intro'],
  moodTags: ['🤯 Mind-Blowing', '😱 Thriller'],
  genres: ['Drama', 'Thriller'],
  musicVibe: 'Cinematic ambient score, slow building emotion',
  coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'
  ],
  trailerYoutubeId: '',
  featured: true
};

function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  // If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  // If it's a standard youtube url
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : trimmed;
}

function PublishHuntContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [activeStep, setActiveStep] = useState<'import' | 'review' | 'media' | 'preview' | 'code'>('import');
  const [rawText, setRawText] = useState('');
  const [hunt, setHunt] = useState<HuntItem>(DEFAULT_HUNT);
  const [copied, setCopied] = useState(false);
  const [extractionNotice, setExtractionNotice] = useState<string | null>(null);

  // Load existing hunt if ?id= query param is provided
  useEffect(() => {
    if (editId) {
      const existing = HUNTS_DATA.find((h) => h.id === editId);
      if (existing) {
        setHunt({ ...existing });
        setActiveStep('review');
        setExtractionNotice(`Loaded existing Hunt: Day ${existing.day} — ${existing.title}`);
      }
    }
  }, [editId]);

  // Robust ChatGPT Text Parser
  const parseChatGPTOutput = () => {
    if (!rawText.trim()) return;

    try {
      // 1. Day Number
      const dayMatch = rawText.match(/Day\s*(\d+)/i);
      const day = dayMatch ? parseInt(dayMatch[1]) : (HUNTS_DATA.length > 0 ? Math.max(...HUNTS_DATA.map(h => h.day)) + 1 : 1);

      // 2. Type (Series vs Movie)
      const isSeries = /Series/i.test(rawText.substring(0, 400));
      const type: 'movie' | 'series' = isSeries ? 'series' : 'movie';

      // 3. Title & Year: e.g. **Kothanodi (2015)** or **Newton (2017)** or ## Newton (2017)
      const titleMatch = rawText.match(/\*\*([^(]+)\s*\((20\d\d|19\d\d)\)\*\*/) || rawText.match(/##\s*([^(]+)\s*\((20\d\d|19\d\d)\)/);
      const title = titleMatch ? titleMatch[1].replace(/[*#]/g, '').trim() : 'Untitled Movie';
      const year = titleMatch ? parseInt(titleMatch[2]) : 2024;

      // 4. IMDb Rating
      const imdbMatch = rawText.match(/IMDb\s*Rating:\*\*?\s*\*?(\d+\.?\d*)\/10/i) || rawText.match(/(\d+\.\d+|\d+)\/10/);
      const imdbRating = imdbMatch ? parseFloat(imdbMatch[1]) : 7.5;

      // 5. Cast
      const castMatch = rawText.match(/\*\*Cast:\*\*\s*([^\n\r]+)/i);
      const cast = castMatch
        ? castMatch[1].split(/[,|•]/).map((s) => s.replace(/[*[\]]/g, '').trim()).filter(Boolean)
        : ['Lead Actor 1', 'Lead Actor 2'];

      // 6. Director
      const directorMatch = rawText.match(/\*\*Director:\*\*\s*([^\n\r]+)/i);
      const director = directorMatch ? directorMatch[1].replace(/[*[\]]/g, '').trim() : 'Director Name';

      // 7. Available On
      const platformMatch = rawText.match(/\*\*Available On:\*\*\s*\[([^\]]+)\]\(([^)]+)\)/i) || rawText.match(/\*\*Available On:\*\*\s*([^\n\r]+)/i);
      const platformName = platformMatch ? (platformMatch[1].includes('](') ? platformMatch[1].split('](')[0] : platformMatch[1].replace(/[*[\]]/g, '').trim()) : 'Streaming Platform';
      const platformUrl = platformMatch && platformMatch[2] ? platformMatch[2] : 'https://example.com';

      // 8. Hook Text
      const hookMatch = rawText.match(/\*\*Hook Text[^*]*\*\*[\s\r\n]*\*\*"?([^"\n\r]+)"?\*\*/i) || rawText.match(/Hook[^\n]*\n+"?([^\n\r"]+)"?/i);
      const hook = hookMatch ? hookMatch[1].replace(/[*"]/g, '').trim() : `${title} is a story actually worth your time.`;

      // 9. Tagline / Thumbnail text
      const taglineMatch = rawText.match(/\*\*Thumbnail Text\*\*[\s\r\n]*\*\*"?([^"\n\r]+)"?\*\*/i) || rawText.match(/Thumbnail[^\n]*\n+"?([^\n\r"]+)"?/i);
      const tagline = taglineMatch ? taglineMatch[1].replace(/[*"]/g, '').trim() : 'MUST WATCH CINEMA.';

      // 10. Story Summary
      const storyMatch = rawText.match(/##\s*Story Summary[^\n]*\n([\s\S]*?)(?=##|---|Why You Should Watch|$)/i);
      const storySummary = storyMatch
        ? storyMatch[1].replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim()
        : 'An engaging, human cinematic story.';

      // 11. Why You Should Watch It
      const whyMatch = rawText.match(/##\s*(?:\d+\.\s*)?Why You Should Watch[^\n]*\n([\s\S]*?)(?=##|---|Short Emotional Lines|$)/i);
      const whyWatch = whyMatch
        ? whyMatch[1].replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim()
        : 'A grounded masterpiece with unforgettable performances.';

      // 12. Emotional Lines
      const emotionalLinesMatch = rawText.match(/##\s*(?:\d+\.\s*)?Short Emotional Lines[\s\S]*?(?=##|---|Why|$)/i);
      let emotionalLines: string[] = [];
      if (emotionalLinesMatch) {
        const lines = emotionalLinesMatch[0].match(/\*\s*“?([^”\n\r]+)”?/g);
        if (lines) {
          emotionalLines = lines.map((l) => l.replace(/^\*\s*“?|”?$/g, '').trim()).slice(0, 5);
        }
      }
      if (emotionalLines.length === 0) {
        emotionalLines = ['“An unforgettable experience.”', '“Grounded performances.”', '“A hidden gem.”'];
      }

      // Generate ID
      const cleanSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const id = `day-${day}-${cleanSlug || 'movie'}`;

      const extracted: HuntItem = {
        ...hunt,
        id,
        day,
        type,
        title,
        year,
        tagline,
        hook,
        imdbRating,
        cast,
        director,
        duration: type === 'series' ? '8 Episodes' : '110 min',
        language: 'Hindi',
        availableOn: {
          name: platformName,
          url: platformUrl
        },
        storySummary,
        whyWatch,
        shouldYouWatch: 'YES. If you love deep cinematic storytelling.',
        emotionalLines,
        bestFor: ['🍿 Evening watch', '🎧 Headphones recommended', '🧠 Deep story'],
        moodTags: ['🤯 Mind-Blowing', '😱 Thriller'],
        genres: ['Drama', 'Thriller'],
        musicVibe: 'Cinematic ambient score, slow building emotion',
        coverImage: hunt.coverImage || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
        images: hunt.images && hunt.images.length > 0 ? hunt.images : [
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop'
        ],
        trailerYoutubeId: hunt.trailerYoutubeId || '',
        featured: true
      };

      setHunt(extracted);
      setExtractionNotice(`Successfully extracted: Day ${day} — ${title} (${year})! Review fields below.`);
      setActiveStep('review');
    } catch {
      alert('Error parsing ChatGPT text. Make sure it contains movie details.');
    }
  };

  // Generate formatted TypeScript snippet
  const generateTypeScriptCode = (): string => {
    const formattedCast = JSON.stringify(hunt.cast);
    const formattedBestFor = JSON.stringify(hunt.bestFor);
    const formattedEmotionalLines = JSON.stringify(hunt.emotionalLines);
    const formattedBestScenes = JSON.stringify(hunt.bestScenes);
    const formattedMoodTags = JSON.stringify(hunt.moodTags);
    const formattedGenres = JSON.stringify(hunt.genres);
    const formattedImages = JSON.stringify(hunt.images, null, 4);

    return `  {
    id: '${hunt.id}',
    day: ${hunt.day},
    type: '${hunt.type}',
    title: '${hunt.title.replace(/'/g, "\\'")}',
    year: ${hunt.year},
    tagline: '${hunt.tagline.replace(/'/g, "\\'")}',
    hook: '${hunt.hook.replace(/'/g, "\\'")}',
    imdbRating: ${hunt.imdbRating},
    cast: ${formattedCast},
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
    bestFor: ${formattedBestFor},
    afterCreditsEmotion: '${hunt.afterCreditsEmotion || 'Speechless'}',
    emotionalLines: ${formattedEmotionalLines},
    bestScenes: ${formattedBestScenes},
    moodTags: ${formattedMoodTags},
    genres: ${formattedGenres},
    musicVibe: '${hunt.musicVibe.replace(/'/g, "\\'")}',
    coverImage: '${hunt.coverImage}',
    images: ${formattedImages}${hunt.trailerYoutubeId ? `,\n    trailerYoutubeId: '${extractYouTubeId(hunt.trailerYoutubeId)}'` : ''}${hunt.hindiTrailerYoutubeId ? `,\n    hindiTrailerYoutubeId: '${extractYouTubeId(hunt.hindiTrailerYoutubeId)}'` : ''},
    featured: true
  }`;
  };

  const handleCopyCode = () => {
    const code = generateTypeScriptCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const addGalleryImage = () => {
    setHunt({
      ...hunt,
      images: [...hunt.images, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop']
    });
  };

  const removeGalleryImage = (index: number) => {
    setHunt({
      ...hunt,
      images: hunt.images.filter((_, i) => i !== index)
    });
  };

  const updateGalleryImage = (index: number, val: string) => {
    const newImages = [...hunt.images];
    newImages[index] = val;
    setHunt({ ...hunt, images: newImages });
  };

  const steps = [
    { id: 'import', label: '1. Import Text', icon: FileText },
    { id: 'review', label: '2. Review Fields', icon: Edit3 },
    { id: 'media', label: '3. Media & Trailer', icon: ImageIcon },
    { id: 'preview', label: '4. Live Preview', icon: Eye },
    { id: 'code', label: '5. Export Code', icon: Code },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#e5a93c] text-xs font-semibold uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Publishing Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
            Publish Recommendation
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Turn ChatGPT recommendations into production-ready Movie Hunt entries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/library"
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
          >
            ← Back to Library
          </Link>
          <button
            onClick={() => setActiveStep('code')}
            className="px-4 py-1.5 rounded-lg bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] transition-all flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5" />
            Generate Code
          </button>
        </div>
      </div>

      {/* ── Extraction Banner Notification ── */}
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

      {/* ── Progressive Step Navigation Bar ── */}
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

      {/* ── STEP 1: IMPORT TAB ── */}
      {activeStep === 'import' && (
        <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#e5a93c]" />
                Paste Raw ChatGPT Recommendation Output
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Paste the full markdown output from your Movie Hunt prompt. The parser will extract all fields automatically.
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
              Extract & Populate Fields →
            </button>
          </div>

          <textarea
            rows={18}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste raw ChatGPT text here (e.g. Day 79 of finding movies you've probably never heard of...&#10;&#10;**Kothanodi (2015)**&#10;**IMDb Rating:** **7.7/10**&#10;**Cast:** Lima Das, Adil Hussain&#10;**Director:** Bhaskar Hazarika&#10;**Available On:** [Netflix](https://netflix.com)...)"
            className="w-full p-4 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#e5a93c] resize-none"
          />

          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-zinc-500">
              💡 Tip: Already have structured data? Switch directly to <strong>2. Review Fields</strong> tab.
            </div>
            <button
              onClick={() => setActiveStep('review')}
              className="text-xs text-[#e5a93c] hover:underline font-semibold flex items-center gap-1"
            >
              Skip to Manual Form <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: REVIEW & EDIT FIELDS ── */}
      {activeStep === 'review' && (
        <div className="space-y-6">
          {/* Section A: Core Metadata */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              1. Core Recommendation Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Day # */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Day Number
                </label>
                <input
                  type="number"
                  value={hunt.day}
                  onChange={(e) => setHunt({ ...hunt, day: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                />
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
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setHunt({ ...hunt, title, id: `day-${hunt.day}-${slug || 'title'}` });
                  }}
                  placeholder="e.g. Kothanodi"
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
                  IMDb Score (e.g. 7.8)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={hunt.imdbRating}
                  onChange={(e) => setHunt({ ...hunt, imdbRating: parseFloat(e.target.value) || 7.0 })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Duration / Episodes */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Duration / Episodes
                </label>
                <input
                  type="text"
                  value={hunt.duration || ''}
                  onChange={(e) => setHunt({ ...hunt, duration: e.target.value })}
                  placeholder="e.g. 110 min or 8 Episodes"
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
                  placeholder="e.g. Hindi, Malayalam, Assamese"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-semibold text-white focus:border-[#e5a93c] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section B: Credits & Streaming */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Tv className="w-3.5 h-3.5" />
              2. Credits & Where to Watch
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Director */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Director Name
                </label>
                <input
                  type="text"
                  value={hunt.director}
                  onChange={(e) => setHunt({ ...hunt, director: e.target.value })}
                  placeholder="e.g. Bhaskar Hazarika"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Cast */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Lead Cast (comma separated)
                </label>
                <input
                  type="text"
                  value={hunt.cast.join(', ')}
                  onChange={(e) => setHunt({ ...hunt, cast: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  placeholder="e.g. Lima Das, Arghadeep Baruah"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Platform Name */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Streaming Platform Name
                </label>
                <input
                  type="text"
                  value={hunt.availableOn.name}
                  onChange={(e) => setHunt({ ...hunt, availableOn: { ...hunt.availableOn, name: e.target.value } })}
                  placeholder="e.g. Netflix, Prime Video, JioCinema, SonyLIV"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Platform URL */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Streaming Watch Link URL
                </label>
                <input
                  type="url"
                  value={hunt.availableOn.url}
                  onChange={(e) => setHunt({ ...hunt, availableOn: { ...hunt.availableOn, url: e.target.value } })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section C: Editorial Hook & Synopsis */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-3.5 h-3.5" />
              3. Editorial Hooks & Story Synopsis
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Hook */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                    Editorial Hook Line
                  </label>
                  <input
                    type="text"
                    value={hunt.hook}
                    onChange={(e) => setHunt({ ...hunt, hook: e.target.value })}
                    placeholder="e.g. India made THIS psychological masterpiece?"
                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                    Thumbnail Tagline / Badge
                  </label>
                  <input
                    type="text"
                    value={hunt.tagline}
                    onChange={(e) => setHunt({ ...hunt, tagline: e.target.value })}
                    placeholder="e.g. MUST WATCH PSYCHOLOGICAL CINEMA."
                    className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                  />
                </div>
              </div>

              {/* Story Summary */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Spoiler-Free Story Summary
                </label>
                <textarea
                  rows={4}
                  value={hunt.storySummary}
                  onChange={(e) => setHunt({ ...hunt, storySummary: e.target.value })}
                  placeholder="Write a gripping 2-3 sentence spoiler-free overview..."
                  className="w-full p-3 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-zinc-200 focus:border-[#e5a93c] outline-none resize-none"
                />
              </div>

              {/* Why Watch */}
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

              {/* Emotional Lines */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Short Emotional Quotes (one per line)
                </label>
                <textarea
                  rows={3}
                  value={hunt.emotionalLines.join('\n')}
                  onChange={(e) => setHunt({ ...hunt, emotionalLines: e.target.value.split('\n').filter(Boolean) })}
                  placeholder="“Love can become obsession.”&#10;“Desire has no limits.”"
                  className="w-full p-3 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-zinc-200 focus:border-[#e5a93c] outline-none resize-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section D: Moods & Tags */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              4. Vibes, Tags & Atmosphere
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Mood Tags */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Mood Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={hunt.moodTags.join(', ')}
                  onChange={(e) => setHunt({ ...hunt, moodTags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  placeholder="🤯 Mind-Blowing, 😱 Thriller"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Genres */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Genres (comma separated)
                </label>
                <input
                  type="text"
                  value={hunt.genres.join(', ')}
                  onChange={(e) => setHunt({ ...hunt, genres: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  placeholder="Psychological Horror, Drama"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Best For */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Best For Tags
                </label>
                <input
                  type="text"
                  value={hunt.bestFor.join(', ')}
                  onChange={(e) => setHunt({ ...hunt, bestFor: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  placeholder="🍿 Evening watch, 🧠 Deep story"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>

              {/* Music Vibe */}
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Music / Soundscape Vibe
                </label>
                <input
                  type="text"
                  value={hunt.musicVibe}
                  onChange={(e) => setHunt({ ...hunt, musicVibe: e.target.value })}
                  placeholder="e.g. Haunting ambient strings, slow synth score"
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
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

      {/* ── STEP 3: MEDIA & TRAILER TAB ── */}
      {activeStep === 'media' && (
        <div className="space-y-6">
          {/* Cover / Poster Image */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5" />
              1. Cover Poster Image URL
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              <div className="md:col-span-2 space-y-3">
                <label className="block text-[11px] font-bold text-zinc-400 uppercase">
                  Main Poster URL (TMDB / IMDb / High-Res)
                </label>
                <input
                  type="url"
                  value={hunt.coverImage}
                  onChange={(e) => setHunt({ ...hunt, coverImage: e.target.value })}
                  placeholder="https://image.tmdb.org/t/p/original/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs text-white focus:border-[#e5a93c] outline-none"
                />
                <p className="text-[11px] text-zinc-500">
                  Tip: Use TMDB or Unsplash original image links for crisp display across mobile & desktop.
                </p>
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
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                      No Poster
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500 mt-2">Live Poster Preview</span>
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" />
                2. Cinematic Gallery Stills ({hunt.images.length} Images)
              </h2>
              <button
                onClick={addGalleryImage}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-[#e5a93c] text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Image
              </button>
            </div>

            <div className="space-y-3">
              {hunt.images.map((imgUrl, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0a0a0f] border border-white/5">
                  <div className="w-14 h-10 rounded-lg bg-zinc-900 overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={imgUrl} alt={`Still ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <input
                    type="url"
                    value={imgUrl}
                    onChange={(e) => updateGalleryImage(idx, e.target.value)}
                    placeholder="https://image.tmdb.org/t/p/original/..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-transparent border border-white/10 text-xs text-zinc-200 focus:border-[#e5a93c] outline-none"
                  />
                  <button
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

          {/* YouTube Trailer */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-4">
            <h2 className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-2">
              <Play className="w-3.5 h-3.5" />
              3. YouTube Trailer Video ID / URL
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Trailer ID or Full YouTube Link
                </label>
                <input
                  type="text"
                  value={hunt.trailerYoutubeId || ''}
                  onChange={(e) => setHunt({ ...hunt, trailerYoutubeId: e.target.value })}
                  placeholder="e.g. xq1cEmhVa68 or https://youtu.be/..."
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

          {/* Navigation Buttons */}
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

      {/* ── STEP 4: LIVE PREVIEW TAB ── */}
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
                  See how this recommendation will look to visitors on Movie Hunt.
                </p>
              </div>

              <button
                onClick={() => setActiveStep('code')}
                className="px-5 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] flex items-center gap-1.5"
              >
                Proceed to Export Code →
              </button>
            </div>

            {/* Preview 1: Recommendation Hero Banner */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f] relative p-6 sm:p-8">
              <div className="absolute inset-0 z-0 opacity-20">
                <img src={hunt.coverImage} alt={hunt.title} className="w-full h-full object-cover filter blur-md" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                {/* Poster Column */}
                <div className="sm:col-span-4 md:col-span-3">
                  <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-900">
                    <img src={hunt.coverImage} alt={hunt.title} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Details Column */}
                <div className="sm:col-span-8 md:col-span-9 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e5a93c]/10 text-[#e5a93c] border border-[#e5a93c]/30 text-xs font-bold">
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
                    {hunt.title}
                  </h3>

                  <p className="text-xs text-[#e5a93c] font-semibold italic">
                    &quot;{hunt.hook}&quot;
                  </p>

                  <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
                    {hunt.storySummary}
                  </p>

                  <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400">
                    <span><strong>Director:</strong> {hunt.director}</span>
                    <span>•</span>
                    <span><strong>Cast:</strong> {hunt.cast.join(', ')}</span>
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

            {/* Preview 2: Editorial Why Watch Quote */}
            <div className="p-5 rounded-xl bg-zinc-950 border border-white/5 space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-[#e5a93c] font-bold">
                Why You Should Watch It
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                {hunt.whyWatch}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep('media')}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Media
            </button>
            <button
              onClick={() => setActiveStep('code')}
              className="px-5 py-2 rounded-xl bg-[#e5a93c] text-[#0a0a0f] text-xs font-bold hover:bg-[#d4982b] flex items-center gap-1.5 shadow-lg shadow-[#e5a93c]/10"
            >
              Generate Final TypeScript Code <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 5: EXPORT TYPESCRIPT CODE STATION ── */}
      {activeStep === 'code' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#e5a93c]" />
                  Generated TypeScript Entry for Day {hunt.day}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Ready to be added to <code className="text-[#e5a93c]">data/hunts.ts</code> in your local project.
                </p>
              </div>

              {/* Big Copy Button */}
              <button
                onClick={handleCopyCode}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                  copied
                    ? 'bg-green-500 text-black shadow-green-500/20'
                    : 'bg-[#e5a93c] text-[#0a0a0f] hover:bg-[#d4982b] shadow-[#e5a93c]/20'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '✓ Copied to Clipboard!' : 'Copy TypeScript Code'}</span>
              </button>
            </div>

            {/* Instructions box */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-[#e5a93c]/20 space-y-2">
              <div className="text-xs font-bold text-[#e5a93c] uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Next Steps to Publish:
              </div>
              <ol className="text-xs text-zinc-300 space-y-1 pl-4 list-decimal">
                <li>Click <strong>Copy TypeScript Code</strong> above.</li>
                <li>Open <code className="text-[#e5a93c]">data/hunts.ts</code> in your code editor on your PC.</li>
                <li>Paste this object at the bottom of the <code className="text-[#e5a93c]">HUNTS_DATA</code> array (right above <code className="text-zinc-400">];</code>).</li>
                <li>Run your normal Git command: <code className="text-white bg-zinc-900 px-2 py-0.5 rounded">git add . && git commit -m &quot;Add Day {hunt.day} {hunt.title}&quot; && git push</code></li>
                <li>Vercel will automatically build and deploy the new recommendation live!</li>
              </ol>
            </div>

            {/* Code Output Textarea */}
            <div className="relative">
              <textarea
                rows={22}
                readOnly
                value={generateTypeScriptCode()}
                className="w-full p-4 rounded-xl bg-[#0a0a0f] border border-white/10 text-xs font-mono text-[#e5a93c] focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep('preview')}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Preview
            </button>
            <Link
              href="/admin/library"
              className="text-xs text-[#e5a93c] hover:underline font-semibold"
            >
              Go to Content Library →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublishHuntPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400 text-xs">Loading publishing workspace...</div>}>
      <PublishHuntContent />
    </Suspense>
  );
}
