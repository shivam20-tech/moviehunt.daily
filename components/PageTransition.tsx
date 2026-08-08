'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * PageTransition — Cinematic Motion System
 * Every page entrance: fade + 10px upward lift over 280ms.
 * Like turning the page of a beautiful magazine.
 * Triggered on pathname change (Next.js App Router).
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    setKey(pathname);
  }, [pathname]);

  return (
    <div key={key} className="cms-page">
      {children}
    </div>
  );
}
