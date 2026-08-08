'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
} from 'lucide-react';

interface MovieTrailerPlayerProps {
  trailerYoutubeId?: string;
  hindiTrailerYoutubeId?: string;
  title: string;
  year: number;
  language?: string;
  coverImage?: string;
}

export default function MovieTrailerPlayer({
  trailerYoutubeId,
  hindiTrailerYoutubeId,
  title,
  year,
  language = 'Original',
  coverImage,
}: MovieTrailerPlayerProps) {
  const [activeTrailer, setActiveTrailer] = useState<'original' | 'hindi'>('original');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [origin, setOrigin] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(encodeURIComponent(window.location.origin));
    }
  }, []);

  // Track fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFS = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement
      );
      setIsFullscreen(isFS);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Listen to postMessage currentTime events from YouTube iframe
  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.event === 'infoDelivery' && data.info && typeof data.info.currentTime === 'number') {
            setCurrentTime(data.info.currentTime);
          }
        }
      } catch (e) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, []);

  // Soft timer fallback for seeking
  useEffect(() => {
    if (!isPlaying || isPaused) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  if (!trailerYoutubeId && !hindiTrailerYoutubeId) return null;

  const currentId = activeTrailer === 'hindi' && hindiTrailerYoutubeId ? hindiTrailerYoutubeId : trailerYoutubeId;

  // Embedded URL with autoplay=1, playsinline=1, controls=1, enablejsapi=1 & origin parameter
  const embedUrl = `https://www.youtube-nocookie.com/embed/${currentId}?autoplay=1&controls=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1${origin ? `&origin=${origin}` : ''}`;

  const sendCommand = (func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const handleTogglePause = () => {
    if (isPaused) {
      sendCommand('playVideo');
      setIsPaused(false);
    } else {
      sendCommand('pauseVideo');
      setIsPaused(true);
    }
  };

  const handleRewind10 = () => {
    const target = Math.max(0, currentTime - 10);
    setCurrentTime(target);
    sendCommand('seekTo', [target, true]);
  };

  const handleFastForward10 = () => {
    const target = currentTime + 10;
    setCurrentTime(target);
    sendCommand('seekTo', [target, true]);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      sendCommand('unMute');
      setIsMuted(false);
    } else {
      sendCommand('mute');
      setIsMuted(true);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any)?.webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  return (
    <div id="official-trailer" className="space-y-4 scroll-mt-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5a93c]/10 border border-[#e5a93c]/30 text-[#e5a93c] text-xs font-bold uppercase tracking-wider mb-2">
            <Play className="w-3.5 h-3.5 fill-[#e5a93c]" />
            Direct Video Stream
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] font-serif tracking-tight">
            Official Trailer
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Watch the official trailer for {title} ({year}) directly inside the site.
          </p>
        </div>

        {/* Dual Language Selector */}
        {hindiTrailerYoutubeId && (
          <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-white/15 p-1 rounded-xl shadow-lg self-start sm:self-center">
            <button
              type="button"
              onClick={() => {
                setActiveTrailer('original');
                setIsPlaying(false);
                setIsPaused(false);
                setCurrentTime(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTrailer === 'original'
                  ? 'bg-[#e5a93c] text-[#0a0a0f] shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🎬</span>
              <span>{language} (Original)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTrailer('hindi');
                setIsPlaying(false);
                setIsPaused(false);
                setCurrentTime(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTrailer === 'hindi'
                  ? 'bg-[#e5a93c] text-[#0a0a0f] shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🇮🇳</span>
              <span>Hindi Dubbed</span>
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Outer Wrapper Container */}
      <div
        ref={containerRef}
        className={`relative w-full rounded-2xl overflow-hidden bg-black transition-all ${
          isFullscreen ? 'fixed inset-0 z-[999999] rounded-none p-4 flex flex-col justify-between' : 'space-y-3'
        }`}
      >
        {/* Video Box */}
        <div className={`relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-black ${isFullscreen ? 'flex-1 max-h-[85vh] my-auto' : ''}`}>
          {isPlaying ? (
            <>
              <iframe
                ref={iframeRef}
                key={currentId}
                src={embedUrl}
                title={`${title} ${activeTrailer === 'hindi' ? 'Hindi' : 'Official'} Trailer`}
                className="w-full h-full border-0 relative z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />

              {/* Explicit Exit Fullscreen Floating Pill when in Fullscreen */}
              {isFullscreen && (
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="absolute top-4 right-4 z-50 px-4 py-2 rounded-full bg-[#0a0a0f]/90 border border-[#e5a93c]/50 text-[#e5a93c] text-xs font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md"
                >
                  <Minimize className="w-4 h-4" />
                  <span>Exit Fullscreen</span>
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsPlaying(true);
                setIsPaused(false);
              }}
              className="group relative w-full h-full text-left focus:outline-none block cursor-pointer"
              aria-label={`Play ${title} trailer directly in site`}
            >
              {/* Background Cover Art */}
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={`${title} trailer poster`}
                  className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black" />
              )}

              {/* Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

              {/* Glowing Center Play Button Trigger */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#e5a93c] text-black flex items-center justify-center shadow-[0_0_40px_rgba(229,169,60,0.6)] group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-black translate-x-0.5" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider bg-black/70 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                    ▶ Tap to Play Trailer In-Site
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Includes Play, Pause, Rewind (-10s), Fast-Forward (+10s) & Fullscreen Exit
                  </span>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Interactive Control Bar */}
        {isPlaying && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-zinc-900/95 border border-white/15 backdrop-blur-xl shadow-xl z-50">
            <div className="flex items-center gap-2">
              {/* Play / Pause */}
              <button
                type="button"
                onClick={handleTogglePause}
                className="px-3.5 py-2 rounded-xl bg-[#e5a93c] text-black font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d4982b] transition-all"
                title={isPaused ? "Play Video" : "Pause Video"}
              >
                {isPaused ? <Play className="w-4 h-4 fill-black" /> : <Pause className="w-4 h-4 text-black fill-black" />}
                <span>{isPaused ? 'Play' : 'Pause'}</span>
              </button>

              {/* -10s Rewind */}
              <button
                type="button"
                onClick={handleRewind10}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center gap-1 transition-all border border-white/10"
                title="Rewind 10 seconds"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>-10s</span>
              </button>

              {/* +10s Fast Forward */}
              <button
                type="button"
                onClick={handleFastForward10}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center gap-1 transition-all border border-white/10"
                title="Fast Forward 10 seconds"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#e5a93c]" />
                <span>+10s</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Mute / Unmute */}
              <button
                type="button"
                onClick={handleToggleMute}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center gap-1.5 transition-all border border-white/10"
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-zinc-300" />}
              </button>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={handleToggleFullscreen}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center gap-1.5 transition-all border border-white/10"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize className="w-4 h-4 text-[#e5a93c]" /> : <Maximize className="w-4 h-4 text-[#e5a93c]" />}
              </button>

              {/* Close & Reset */}
              <button
                type="button"
                onClick={() => {
                  if (isFullscreen) handleToggleFullscreen();
                  setIsPlaying(false);
                  setIsPaused(false);
                  setCurrentTime(0);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs transition-all border border-white/10"
                title="Close video & reset cover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
