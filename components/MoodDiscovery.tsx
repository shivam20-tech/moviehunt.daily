'use client';

import React, { useState } from 'react';
import { MOODS, HUNTS_DATA, HuntItem } from '@/data/hunts';
import { Sparkles, Film, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export default function MoodDiscovery() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<HuntItem | null>(null);

  const handleSelectMood = (moodId: string) => {
    setSelectedMood(moodId);
    if (moodId === 'surprise-me') {
      const randomIndex = Math.floor(Math.random() * HUNTS_DATA.length);
      setRecommendation(HUNTS_DATA[randomIndex]);
    } else {
      const matched = HUNTS_DATA.find((h) =>
        h.moodTags.some((t) => t.toLowerCase().includes(moodId.replace('-', ' ')))
      );
      setRecommendation(matched || HUNTS_DATA[0]);
    }
  };

  const handleReset = () => {
    setSelectedMood(null);
    setRecommendation(null);
  };

  return (
    <section id="discover" className="py-20 bg-[#0a0a0f] relative overflow-hidden">
      <div id="hunt-flow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 fill-[#e5a93c]" />
            The Hunt Flow · Mood Curation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
            What are you in the mood for tonight?
          </h2>
          <p className="text-zinc-400 text-base mt-3">
            Select your emotion below. We don&apos;t make you search through 100,000 titles — we give you one confident recommendation.
          </p>
        </div>

        {/* Interactive Step 1: Mood Grid */}
        {!selectedMood ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleSelectMood(mood.id)}
                className="group relative p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#e5a93c]/60 hover:bg-zinc-900 transition-all duration-300 text-left flex flex-col justify-between shadow-lg hover:shadow-gold"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#e5a93c] transition-colors">
                    {mood.label}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{mood.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Find story
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#e5a93c] group-hover:text-[#0a0a0f] text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Interactive Step 2: Single Recommendation Reveal */
          <div className="max-w-4xl mx-auto bg-zinc-900/90 border border-[#e5a93c]/40 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#e5a93c] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Matched Pick For Your Mood
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Change Mood
              </button>
            </div>

            {recommendation && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                  <img
                    src={recommendation.coverImage}
                    alt={recommendation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-[#e5a93c] text-xs font-bold border border-[#e5a93c]/30">
                    DAY {recommendation.day}
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                      {recommendation.type === 'movie' ? '🎬 Movie' : '📺 Web Series'} · {recommendation.year}
                    </span>
                    <h3 className="text-3xl font-extrabold text-white font-serif mt-1">
                      {recommendation.title}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                    <p className="text-sm font-semibold text-[#e5a93c] italic">
                      &ldquo;{recommendation.hook}&rdquo;
                    </p>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {recommendation.storySummary}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <a
                      href={recommendation.availableOn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-[#e5a93c] text-[#0a0a0f] font-bold text-sm hover:bg-[#d4982b] transition-colors"
                    >
                      Watch on {recommendation.availableOn.name}
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold text-sm hover:bg-zinc-700 transition-colors"
                    >
                      Try Another Hunt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
