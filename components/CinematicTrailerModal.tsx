'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, X
} from 'lucide-react';

interface CinematicTrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId: string;
  title: string;
  year?: number;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function CinematicTrailerModal({
  isOpen,
  onClose,
  youtubeId,
  title,
  year,
}: CinematicTrailerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const postCommand = (func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      postCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      postCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const handleSkip = (seconds: number) => {
    const targetTime = Math.max(0, Math.min(duration || 300, currentTime + seconds));
    postCommand('seekTo', [targetTime, true]);
    setCurrentTime(targetTime);
  };

  const handleSeekProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = pos * duration;
    postCommand('seekTo', [targetTime, true]);
    setCurrentTime(targetTime);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      postCommand('unMute');
      setIsMuted(false);
    } else {
      postCommand('mute');
      setIsMuted(true);
    }
  };

  // Lock body scroll & handle Escape / Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        handleTogglePlay();
      }
      if (e.key === 'ArrowLeft') {
        handleSkip(-10);
      }
      if (e.key === 'ArrowRight') {
        handleSkip(10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isPlaying, currentTime, duration]);

  // YouTube iFrame postMessage listener
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.currentTime === 'number') {
            setCurrentTime(data.info.currentTime);
          }
          if (typeof data.info.duration === 'number' && data.info.duration > 0) {
            setDuration(data.info.duration);
          }
          if (typeof data.info.playerState === 'number') {
            // 1 = playing, 2 = paused, 0 = ended
            if (data.info.playerState === 1) setIsPlaying(true);
            if (data.info.playerState === 2) setIsPlaying(false);
          }
        }
      } catch {
        // Ignore non-json messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen]);

  if (!isOpen || !mounted || !youtubeId) return null;

  const handleIframeLoad = () => {
    postCommand('addEventListener', ['onStateChange']);
    postCommand('listen', []);
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer player`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(5, 5, 8, 0.94)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 960,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar above video */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#f0efe8',
            padding: '0 4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
              {title}
            </span>
            {year && (
              <span style={{ fontSize: '0.8125rem', color: '#8a8a96' }}>
                ({year}) · Official Trailer
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close trailer player"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f0efe8',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            className="trailer-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Frame Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#000',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
          }}
        >
          <iframe
            ref={iframeRef}
            onLoad={handleIframeLoad}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&playsinline=1&rel=0&modestbranding=1&controls=1`}
            title={`${title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>

        {/* ── Custom Cinematic Control Bar ── */}
        <div
          style={{
            backgroundColor: 'rgba(20, 20, 26, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '14px',
            padding: '12px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Progress bar */}
          <div
            onClick={handleSeekProgress}
            style={{
              width: '100%',
              height: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 3,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            title="Click to seek"
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: 'var(--accent)',
                borderRadius: 3,
                transition: 'width 100ms linear',
              }}
            />
          </div>

          {/* Controls row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            {/* Left: Playback controls (-10s, Play/Pause, +10s) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Skip back 10s */}
              <button
                onClick={() => handleSkip(-10)}
                title="Rewind 10 seconds (Left Arrow)"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                className="ctrl-btn"
              >
                <RotateCcw size={14} />
                <span>-10s</span>
              </button>

              {/* Play / Pause toggle */}
              <button
                onClick={handleTogglePlay}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 150ms ease, background-color 150ms ease',
                }}
                className="play-btn"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: 2 }} />}
              </button>

              {/* Skip forward 10s */}
              <button
                onClick={() => handleSkip(10)}
                title="Forward 10 seconds (Right Arrow)"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                className="ctrl-btn"
              >
                <span>+10s</span>
                <RotateCw size={14} />
              </button>
            </div>

            {/* Middle: Time display */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                {formatTime(currentTime)}
              </span>
              {duration > 0 && <span> / {formatTime(duration)}</span>}
            </div>

            {/* Right: Volume Mute toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={handleToggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 13px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: isMuted ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                className="ctrl-btn"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{isMuted ? 'Muted' : 'Sound'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ctrl-btn:hover {
          background-color: rgba(255, 255, 255, 0.14) !important;
          color: var(--text-primary) !important;
          border-color: rgba(255, 255, 255, 0.28) !important;
        }
        .play-btn:hover {
          transform: scale(1.06);
          background-color: var(--accent-hover) !important;
        }
        .trailer-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.2) !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}
