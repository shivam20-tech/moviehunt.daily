'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
  priority?: boolean;
}

/**
 * CinematicImage — Obsidian Placeholder & Calm 300ms Fade-In
 * - Prevents white flash
 * - Guarantees zero layout shift
 * - Smooth 300ms fade-in on natural load
 * - Respects prefers-reduced-motion
 */
export default function CinematicImage({
  src,
  alt,
  className = '',
  style,
  objectPosition = 'center',
  priority = false,
}: CinematicImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If cached or already complete in memory, reveal immediately
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${priority ? '' : 'cms-img'} ${loaded ? 'loaded' : ''} ${className}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition,
        display: 'block',
        backgroundColor: '#121218',
        ...style,
      }}
    />
  );
}

