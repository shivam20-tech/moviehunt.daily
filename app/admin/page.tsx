'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, Copy, Check, Code, FileText, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  const [rawText, setRawText] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const parseChatGPTOutput = () => {
    if (!rawText.trim()) return;

    try {
      // Regex extraction logic for ChatGPT output format
      const dayMatch = rawText.match(/Day\s*(\d+)/i);
      const day = dayMatch ? parseInt(dayMatch[1]) : 70;

      const isSeries = /Series/i.test(rawText.substring(0, 300));
      const type = isSeries ? 'series' : 'movie';

      // Title & Year: e.g. **Kothanodi (2015)** or **Tabbar (2021)**
      const titleMatch = rawText.match(/\*\*([^(]+)\s*\((20\d\d|19\d\d)\)\*\*/);
      const title = titleMatch ? titleMatch[1].trim() : 'Movie Title';
      const year = titleMatch ? parseInt(titleMatch[2]) : 2024;

      // IMDb Rating: e.g. **IMDb Rating:** **7.0/10**
      const imdbMatch = rawText.match(/IMDb\s*Rating:\*\*?\s*\*?(\d+\.\d+|\d+)\/10/i);
      const imdbRating = imdbMatch ? parseFloat(imdbMatch[1]) : 7.5;

      // Cast
      const castMatch = rawText.match(/\*\*Cast:\*\*\s*(.+)/i);
      const cast = castMatch
        ? castMatch[1].split(',').map((s) => s.trim())
        : ['Main Actor 1', 'Main Actor 2'];

      // Director
      const directorMatch = rawText.match(/\*\*Director:\*\*\s*(.+)/i);
      const director = directorMatch ? directorMatch[1].trim() : 'Director Name';

      // Available On
      const platformMatch = rawText.match(/\*\*Available On:\*\*\s*\[([^\]]+)\]\(([^)]+)\)/i);
      const platformName = platformMatch ? platformMatch[1] : 'Streaming Platform';
      const platformUrl = platformMatch ? platformMatch[2] : 'https://example.com';

      // Hook
      const hookMatch = rawText.match(/\*\*Hook Text[^\*]*\*\*[\s\r\n]*\*\*"?([^"\n]+)"?\*\*/i);
      const hook = hookMatch ? hookMatch[1].trim() : `${title} is a movie actually worth watching.`;

      // Tagline / Thumbnail text
      const taglineMatch = rawText.match(/\*\*Thumbnail Text\*\*[\s\r\n]*\*\*"?([^"\n]+)"?\*\*/i);
      const tagline = taglineMatch ? taglineMatch[1].trim() : 'MUST WATCH CINEMA.';

      // Story Summary
      const storyMatch = rawText.match(/##\s*Story Summary[^\n]*\n([\s\S]*?)(?=##|\-\-\-|$)/i);
      const storySummary = storyMatch
        ? storyMatch[1].replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim()
        : 'An engaging story summary.';

      // Why You Should Watch
      const whyMatch = rawText.match(/##\s*12\.\s*Why You Should Watch It[^\n]*\n([\s\S]*?)(?=##|\-\-\-|$)/i);
      const whyWatch = whyMatch
        ? whyMatch[1].replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim()
        : 'High quality cinema worth your evening.';

      // Emotional Lines
      const emotionalLinesMatch = rawText.match(/##\s*3\.\s*Short Emotional Lines[\s\S]*?(?=##|\-\-\-|$)/i);
      let emotionalLines: string[] = [];
      if (emotionalLinesMatch) {
        const lines = emotionalLinesMatch[0].match(/\*\s*“?([^”\n]+)”?/g);
        if (lines) {
          emotionalLines = lines.map((l) => l.replace(/^\*\s*“?|”?$/g, '').trim()).slice(0, 5);
        }
      }
      if (emotionalLines.length === 0) {
        emotionalLines = ['Unforgettable experience.', 'Grounded performances.', 'A hidden gem.'];
      }

      // Id string
      const id = `day-${day}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      const generatedObj = `  {
    id: '${id}',
    day: ${day},
    type: '${type}',
    title: '${title}',
    year: ${year},
    tagline: '${tagline.replace(/'/g, "\\'")}',
    hook: '${hook.replace(/'/g, "\\'")}',
    imdbRating: ${imdbRating},
    cast: ${JSON.stringify(cast)},
    director: '${director.replace(/'/g, "\\'")}',
    duration: '${type === 'series' ? '8 Episodes' : '110 min'}',
    language: 'Hindi',
    availableOn: {
      name: '${platformName}',
      url: '${platformUrl}'
    },
    storySummary: '${storySummary.replace(/'/g, "\\'")}',
    whyWatch: '${whyWatch.replace(/'/g, "\\'")}',
    shouldYouWatch: 'YES. If you love deep cinematic storytelling.',
    bestFor: ['🍿 Evening watch', '🎧 Headphones recommended', '🧠 Deep story'],
    afterCreditsEmotion: 'Speechless',
    emotionalLines: ${JSON.stringify(emotionalLines)},
    bestScenes: ['Key climax scene', 'Atmospheric intro'],
    moodTags: ['🤯 Mind-Blowing', '😱 Thriller'],
    genres: ['Drama', 'Thriller'],
    musicVibe: 'Cinematic ambient score',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop']
  }`;

      setGeneratedCode(generatedObj);
    } catch (err) {
      alert('Error parsing ChatGPT text. Make sure it contains standard movie details.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f4f4f0] selection:bg-[#e5a93c] selection:text-[#0a0a0f]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5a93c]/10 text-[#e5a93c] text-xs font-bold border border-[#e5a93c]/30">
            <Sparkles className="w-4 h-4 fill-[#e5a93c]" />
            MovieHunt Content Parser Tool
          </div>
          <h1 className="text-3xl font-extrabold text-white font-serif">
            ChatGPT Output → TypeScript Generator
          </h1>
          <p className="text-xs text-zinc-400">
            Paste the raw markdown ChatGPT gives you for any Day X post. Click convert to format it into code for <code className="text-[#e5a93c]">data/hunts.ts</code>!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Box */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-zinc-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#e5a93c]" /> 1. Paste ChatGPT Output
              </span>
              <button
                onClick={parseChatGPTOutput}
                className="px-4 py-1.5 rounded-lg bg-[#e5a93c] text-[#0a0a0f] font-bold text-xs hover:bg-[#d4982b] transition-colors"
              >
                Convert to Code
              </button>
            </div>

            <textarea
              rows={16}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste ChatGPT prompt output here (Day 70 of finding movies...)"
              className="w-full p-4 rounded-xl bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#e5a93c] resize-none"
            />
          </div>

          {/* Output Box */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-zinc-300 flex items-center gap-2">
                <Code className="w-4 h-4 text-[#e5a93c]" /> 2. Formatted TypeScript Code
              </span>
              {generatedCode && (
                <button
                  onClick={handleCopy}
                  className="px-4 py-1.5 rounded-lg bg-zinc-800 text-white font-semibold text-xs border border-white/10 flex items-center gap-1.5 hover:bg-zinc-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              )}
            </div>

            <textarea
              rows={16}
              readOnly
              value={generatedCode}
              placeholder="Click 'Convert to Code' to generate formatted JSON entry..."
              className="w-full p-4 rounded-xl bg-zinc-950 border border-white/10 text-xs font-mono text-[#e5a93c] focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
