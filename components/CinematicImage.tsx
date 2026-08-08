'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
  priority?: boolean; // skip blur-up for above-the-fold images
}

/**
 * CinematicImage — Blur-Up Loading
 * Images load blurred and sharpen when fully loaded.
 * Much more premium than a sudden pop-in.
 * Uses native loading="lazy" for performance.
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
    // If the image is already cached/complete, mark loaded immediately
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

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
        ...style,
      }}
    />
  );
}
