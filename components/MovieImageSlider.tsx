'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieImageSliderProps {
  images: string[];
  title: string;
  className?: string;
  autoPlayInterval?: number; // ms, default 4000ms
  aspectRatio?: string; // e.g. "aspect-[3/4]" or "aspect-video"
  showControls?: boolean;
  showDots?: boolean;
  fitMode?: 'cover' | 'contain' | 'smart'; // default 'cover'
  overlayBadgeLeft?: React.ReactNode;
  overlayBadgeRight?: React.ReactNode;
  overlayBadge?: React.ReactNode;
  overlayBottom?: React.ReactNode;
}

export default function MovieImageSlider({
  images = [],
  title,
  className = '',
  autoPlayInterval = 4000,
  aspectRatio = 'aspect-[3/4]',
  showControls = true,
  showDots = true,
  fitMode: initialFitMode = 'smart',
  overlayBadgeLeft,
  overlayBadgeRight,
  overlayBadge,
  overlayBottom
}: MovieImageSliderProps) {
  // Ensure we always have at least 1 image
  const sliderImages = images && images.length > 0 ? images : ['/placeholder.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentFitMode, setCurrentFitMode] = useState<'smart' | 'cover'>(
    initialFitMode === 'cover' ? 'cover' : 'smart'
  );
  const touchStartX = useRef<number | null>(null);

  // Auto-play timer
  useEffect(() => {
    if (sliderImages.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [sliderImages.length, isHovered, autoPlayInterval]);

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden group select-none bg-[#0a0a0f] ${aspectRatio} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides track */}
      <div
        className="w-full h-full flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderImages.map((imgUrl, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative overflow-hidden bg-zinc-950 flex items-center justify-center">
            {idx === 0 || currentFitMode === 'cover' ? (
              /* Slide 1 (Cover Poster): Edge-to-Edge Full Bleed Poster */
              <img
                src={imgUrl}
                alt={`${title} - slide ${idx + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              /* Slides 2+ (Movie Scene Stills): 100% Uncropped Ambient Blur Mode */
              <>
                <img
                  src={imgUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-60 scale-125 transform pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                <img
                  src={imgUrl}
                  alt={`${title} - slide ${idx + 1}`}
                  className="relative z-10 max-w-full max-h-full object-contain p-1 group-hover:scale-105 transition-transform duration-700 shadow-2xl"
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Dark Gradient Overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/40 pointer-events-none z-10" />

      {/* TOP BAR: Left Badges & Right Badges + Fit Button */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20 gap-2">
        {/* Left Side Badges */}
        <div className="flex items-center gap-1.5 flex-wrap pointer-events-auto max-w-[65%]">
          {overlayBadgeLeft || overlayBadge}
        </div>

        {/* Right Side Controls & Rating */}
        <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto">
          {overlayBadgeRight}
        </div>
      </div>

      {/* BOTTOM BAR: Content Overlay on Left & Counter/Dots on Right */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-none z-20 flex items-end justify-between gap-2">
        <div className="flex-1 pointer-events-auto">
          {overlayBottom}
        </div>

        {/* Image Counter & Pagination Dots */}
        {sliderImages.length > 1 && (
          <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 font-medium shrink-0 mb-0.5 shadow-lg">
            {showDots && (
              <div className="flex items-center gap-1">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentIndex ? 'w-3.5 bg-[#e5a93c]' : 'w-1.5 bg-white/40 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
            <span className="text-[9px] text-zinc-300 font-mono font-bold">
              {currentIndex + 1}/{sliderImages.length}
            </span>
          </div>
        )}
      </div>

      {/* Left/Right Controls */}
      {showControls && sliderImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-[#e5a93c] text-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-30 shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-[#e5a93c] text-white hover:text-black border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-30 shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
