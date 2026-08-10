'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';

export default function SmartBackButton() {
  const router = useRouter();

  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center gap-2.5 mb-6">
      {/* Smart Back to Previous Page Button */}
      <button
        type="button"
        onClick={handleGoBack}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-sm cursor-pointer"
        title="Go back to previous page"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#e5a93c]" />
        <span>Go Back</span>
      </button>

      {/* Home Link Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-zinc-400 hover:text-white transition-all shadow-sm"
        title="Return to Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
    </div>
  );
}
