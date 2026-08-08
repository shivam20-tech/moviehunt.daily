import React from 'react';
import { HUNTS_DATA } from '@/data/hunts';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Star, ExternalLink, ArrowLeft, CheckCircle2, Film, Play, Sparkles, Images } from 'lucide-react';
import { notFound } from 'next/navigation';
import MovieImageSlider from '@/components/MovieImageSlider';
import MovieTrailerPlayer from '@/components/MovieTrailerPlayer';

export async function generateStaticParams() {
  return HUNTS_DATA.map((hunt) => ({
    id: hunt.id,
  }));
}

function getSimilarPicks(currentHunt: (typeof HUNTS_DATA)[0], limit = 3) {
  const others = HUNTS_DATA.filter((h) => h.id !== currentHunt.id);

  const currentTags = [
    ...(currentHunt.moodTags ?? []),
    ...(currentHunt.genres ?? []),
    ...(currentHunt.bestFor ?? []),
  ].map((t) => t.toLowerCase());

  const scored = others.map((h) => {
    let score = 0;
    const hTags = [
      ...(h.moodTags ?? []),
      ...(h.genres ?? []),
      ...(h.bestFor ?? []),
    ].map((t) => t.toLowerCase());

    // Tag / Genre overlap
    hTags.forEach((t) => {
      if (currentTags.some((ct) => ct.includes(t) || t.includes(ct))) {
        score += 3;
      }
    });

    // Language match
    if (h.language === currentHunt.language) score += 2;

    // Type match
    if (h.type === currentHunt.type) score += 1;

    return { hunt: h, score };
  });

  scored.sort((a, b) => b.score - a.score || b.hunt.imdbRating - a.hunt.imdbRating);
  return scored.slice(0, limit).map((s) => s.hunt);
}

export default async function HuntDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hunt = HUNTS_DATA.find((h) => h.id === id);

  if (!hunt) {
    notFound();
  }

  const similarPicks = getSimilarPicks(hunt, 4);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f4f4f0] selection:bg-[#e5a93c] selection:text-[#0a0a0f]">
      {/* Hero Header Banner */}
      <div className="relative pt-24 pb-12 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={hunt.coverImage}
            alt={hunt.title}
            className="w-full h-full object-cover filter brightness-30 opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-[#e5a93c] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Poster Card */}
            <div className="md:col-span-4 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
              <img
                src={hunt.coverImage}
                alt={hunt.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0a0a0f]/90 backdrop-blur-md text-[#e5a93c] text-xs font-bold border border-[#e5a93c]/30 uppercase tracking-wider">
                {hunt.type === 'movie' ? '🎬 Feature Film' : '📺 Web Series'}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-yellow-400 text-xs font-bold border border-yellow-500/30 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <span>{hunt.imdbRating}/10</span>
              </div>
            </div>

            {/* Title & Core Details */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-zinc-300 text-xs font-semibold border border-white/10 uppercase tracking-wider">
                    {hunt.type === 'movie' ? '🎬 Feature Film' : '📺 Web Series'}
                  </span>
                  <span className="text-xs text-zinc-400">• {hunt.year}</span>
                  <span className="text-xs text-zinc-400">• {hunt.language}</span>
                  {hunt.duration && <span className="text-xs text-zinc-400">• {hunt.duration}</span>}
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
                  {hunt.title}
                </h1>
                <p className="text-xs uppercase tracking-widest text-[#e5a93c] font-bold mt-2">
                  {hunt.tagline}
                </p>
              </div>

              {/* WHY THIS MOVIE? Box */}
              <div className="p-5 rounded-2xl bg-zinc-900/90 border border-[#e5a93c]/40 backdrop-blur-xl shadow-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#e5a93c] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 fill-[#e5a93c]" />
                  🎯 Why MovieHunt Recommends This
                </div>
                <p className="text-base font-bold text-white font-serif italic">
                  &ldquo;{hunt.hook}&rdquo;
                </p>
              </div>

              {/* Best For Tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Best Experienced For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hunt.bestFor?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={hunt.availableOn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-xl bg-[#e5a93c] hover:bg-[#d4982b] text-[#0a0a0f] font-bold text-sm shadow-xl flex items-center gap-2 transition-all"
                >
                  <span>Watch on {hunt.availableOn.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {hunt.trailerYoutubeId && (
                  <a
                    href="#official-trailer"
                    className="px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm border border-white/10 flex items-center gap-2 transition-colors"
                  >
                    <Play className="w-4 h-4 text-[#e5a93c] fill-[#e5a93c]" />
                    <span>Watch Trailer Directly</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Story & Curation Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Official Embedded Trailer Section */}
        <MovieTrailerPlayer
          trailerYoutubeId={hunt.trailerYoutubeId}
          hindiTrailerYoutubeId={hunt.hindiTrailerYoutubeId}
          title={hunt.title}
          year={hunt.year}
          language={hunt.language}
          coverImage={hunt.coverImage}
        />
        {/* Story & Recommendation Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Story Summary */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <Film className="w-5 h-5 text-[#e5a93c]" />
                Spoiler-Free Story
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {hunt.storySummary}
              </p>
            </div>

            {/* Deep Analysis */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#e5a93c]" />
                The Curation Perspective
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {hunt.whyWatch}
              </p>
            </div>

            {/* Emotional Lines */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-serif">
                Short Emotional Lines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hunt.emotionalLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-300 font-medium italic flex items-center gap-2"
                  >
                    <span className="text-[#e5a93c]">✦</span>
                    <span>&ldquo;{line}&rdquo;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Meta Specs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e5a93c]">
                Film Specifications
              </h4>

              <div className="space-y-3 divide-y divide-white/5">
                <div className="pt-2 flex justify-between">
                  <span className="text-zinc-500">Director</span>
                  <span className="text-white font-semibold">{hunt.director}</span>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="text-zinc-500">Cast</span>
                  <span className="text-zinc-300 text-right max-w-[180px]">{hunt.cast.join(', ')}</span>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="text-zinc-500">Language</span>
                  <span className="text-white font-medium">{hunt.language}</span>
                </div>

                {hunt.episodes && (
                  <div className="pt-2 flex justify-between">
                    <span className="text-zinc-500">Episodes</span>
                    <span className="text-[#e5a93c] font-bold">{hunt.episodes} Episodes</span>
                  </div>
                )}

                <div className="pt-2 flex justify-between">
                  <span className="text-zinc-500">IMDb Score</span>
                  <span className="text-yellow-400 font-bold">{hunt.imdbRating} / 10</span>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="text-zinc-500">Streaming On</span>
                  <span className="text-[#e5a93c] font-semibold">{hunt.availableOn.name}</span>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="text-zinc-500">Music Vibe</span>
                  <span className="text-zinc-300 text-right italic">{hunt.musicVibe}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Stills & Gallery Slider Section */}
        {hunt.images && hunt.images.length > 0 && (
          <div className="pt-8 border-t border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
                  <Images className="w-6 h-6 text-[#e5a93c]" />
                  Cinematic Stills & Gallery
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  High-definition captures and official stills from {hunt.title}.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0f]">
              <MovieImageSlider
                images={hunt.images}
                title={`${hunt.title} Stills`}
                aspectRatio="aspect-video"
                fitMode="cover"
                className="w-full max-h-[540px]"
              />
            </div>
          </div>
        )}

        {/* Similar Picks — 2 Columns on mobile */}
        <div className="pt-8 border-t border-white/10 space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
            If You Liked This, Also Explore
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {similarPicks.map((item) => (
              <Link
                key={item.id}
                href={`/hunt/${item.id}`}
                className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-[#e5a93c]/50 transition-all space-y-2.5 flex flex-col justify-between"
              >
                <div className="relative aspect-[2/3] rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0a0a0f]/80 backdrop-blur-md text-[#e5a93c] text-[10px] font-bold border border-[#e5a93c]/30">
                    {item.type === 'movie' ? 'Film' : 'Series'}
                  </div>
                  {item.imdbRating && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 text-yellow-400 text-[10px] font-bold border border-yellow-500/30 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 stroke-none" />
                      <span>{item.imdbRating}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs sm:text-base font-bold text-white font-serif group-hover:text-[#e5a93c] transition-colors line-clamp-1">
                    {item.title} ({item.year})
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400 italic line-clamp-2 mt-0.5">&ldquo;{item.hook}&rdquo;</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
