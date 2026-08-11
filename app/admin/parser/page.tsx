'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Code, FileText } from 'lucide-react';

export default function AdminParserPage() {
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
      const hookMatch = rawText.match(/\*\*Hook Text[^*]*\*\*[\s\r\n]*\*\*"?([^"\n]+)"?\*\*/i);
      const hook = hookMatch ? hookMatch[1].trim() : `${title} is a movie actually worth watching.`;

      // Tagline / Thumbnail text
      const taglineMatch = rawText.match(/\*\*Thumbnail Text\*\*[\s\r\n]*\*\*"?([^"\n]+)"?\*\*/i);
      const tagline = taglineMatch ? taglineMatch[1].trim() : 'MUST WATCH CINEMA.';

      // Story Summary
      const storyMatch = rawText.match(/##\s*Story Summary[^\n]*\n([\s\S]*?)(?=##|---|$)/i);
      const storySummary = storyMatch
        ? storyMatch[1].replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim()
        : 'An engaging story summary.';

      // Why You Should Watch
      const whyMatch = rawText.match(/##\s*12\.\s*Why You Should Watch It[^\n]*\n([\s\S]*?)(?=##|---|$)/i);
      const whyWatch = whyMatch
        ? whyMatch[1].replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim()
        : 'High quality cinema worth your evening.';

      // Emotional Lines
      const emotionalLinesMatch = rawText.match(/##\s*3\.\s*Short Emotional Lines[\s\S]*?(?=##|---|$)/i);
      let emotionalLines: string[] = [];
      if (emotionalLinesMatch) {
        const lines = emotionalLinesMatch[0].match(/\*\s*"?([^"\n]+)"?/g);
        if (lines) {
          emotionalLines = lines.map((l) => l.replace(/^\*\s*"?|"?$/g, '').trim()).slice(0, 5);
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
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.6rem',
            fontWeight: 400,
            color: '#f4f4f0',
            margin: '0 0 6px',
          }}
        >
          Content Parser
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Paste ChatGPT output and generate TypeScript for{' '}
          <code style={{ color: '#e5a93c', fontFamily: 'monospace' }}>data/hunts.ts</code>
        </p>
      </div>

      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 20,
          backgroundColor: 'rgba(229,169,60,0.1)',
          border: '1px solid rgba(229,169,60,0.3)',
          color: '#e5a93c',
          fontSize: '0.72rem',
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        <Sparkles style={{ width: 12, height: 12 }} />
        MovieHunt Content Parser Tool
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input */}
        <div
          style={{
            padding: 20,
            borderRadius: 12,
            backgroundColor: '#0d0d12',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText style={{ width: 13, height: 13, color: '#e5a93c' }} />
              1. Paste ChatGPT Output
            </span>
            <button
              onClick={parseChatGPTOutput}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                backgroundColor: '#e5a93c',
                color: '#0a0a0f',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Convert to Code
            </button>
          </div>
          <textarea
            rows={18}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste ChatGPT prompt output here (Day 70 of finding movies...)"
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 8,
              backgroundColor: '#0a0a0f',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#d4d4d0',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Output */}
        <div
          style={{
            padding: 20,
            borderRadius: 12,
            backgroundColor: '#0d0d12',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Code style={{ width: 13, height: 13, color: '#e5a93c' }} />
              2. Formatted TypeScript Code
            </span>
            {generatedCode && (
              <button
                onClick={handleCopy}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#f4f4f0',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {copied ? <Check style={{ width: 12, height: 12, color: '#4ade80' }} /> : <Copy style={{ width: 12, height: 12 }} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            )}
          </div>
          <textarea
            rows={18}
            readOnly
            value={generatedCode}
            placeholder="Click 'Convert to Code' to generate formatted JSON entry..."
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 8,
              backgroundColor: '#0a0a0f',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#e5a93c',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>
    </div>
  );
}
