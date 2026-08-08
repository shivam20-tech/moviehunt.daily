'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // extra delay in ms
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/**
 * ScrollReveal — Cinematic Motion System
 * Wraps children and fades them upward into view when they enter the viewport.
 * Uses IntersectionObserver (no scroll listeners, no layout thrash).
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  style,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — skip animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in-view');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay to let browser settle, then animate in
          setTimeout(() => {
            el.classList.add('in-view');
          }, delay);
          observer.unobserve(el); // Fire once only — no re-animation on scroll back
        }
      },
      {
        threshold: 0.1,   // Trigger when 10% is visible
        rootMargin: '0px 0px -40px 0px', // Slight bottom offset so it triggers just before center
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`cms-sr ${className}`} style={style}>
      {children}
    </Tag>
  );
}
