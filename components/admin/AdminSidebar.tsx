'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileCode2, BarChart3, LogOut, Clapperboard, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin/overview', icon: LayoutDashboard, exact: true },
  { label: 'Content Parser', href: '/admin/parser', icon: FileCode2 },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string, exact?: boolean) {
    if (href === '/admin/overview' && (pathname === '/admin' || pathname === '/admin/overview')) {
      return true;
    }
    return exact ? pathname === href : pathname.startsWith(href);
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  }

  return (
    <>
      {/* ── Mobile Header Bar (< 768px) ── */}
      <div className="md:hidden sticky top-0 z-50 w-full bg-[#0d0d12] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#e5a93c]/10 border border-[#e5a93c]/30 flex items-center justify-center">
            <Clapperboard size={16} className="text-[#e5a93c]" />
          </div>
          <div>
            <div className="font-serif text-sm font-bold text-white tracking-wide leading-none">
              MOVIE<span className="text-[#e5a93c]">HUNT</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-sans mt-0.5">
              Admin Panel
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-white/10 rounded-lg transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile Navigation Drawer (< 768px Overlay) ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 p-5 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="space-y-2">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-3">
              Navigation
            </div>
            {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
              const active = isActive(href, exact);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#e5a93c]/10 text-[#e5a93c] border border-[#e5a93c]/30 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-[#e5a93c]' : 'text-zinc-400'} />
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-zinc-400 font-medium">Logged in as</span>
              <span className="text-[10px] font-bold text-[#e5a93c] bg-[#e5a93c]/10 border border-[#e5a93c]/30 px-2 py-0.5 rounded uppercase tracking-wider">
                Admin
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-semibold hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ── Desktop Fixed Left Sidebar (>= 768px) ── */}
      <aside className="hidden md:flex w-60 min-h-screen bg-[#0d0d12] border-r border-white/10 flex-col py-7 flex-shrink-0 sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e5a93c]/10 border border-[#e5a93c]/30 flex items-center justify-center">
              <Clapperboard size={18} className="text-[#e5a93c]" />
            </div>
            <div>
              <div className="font-serif text-base font-bold text-white tracking-wide">
                MOVIE<span className="text-[#e5a93c]">HUNT</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-sans mt-0.5">
                Admin Panel
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                  active
                    ? 'bg-[#e5a93c]/10 text-[#e5a93c] font-semibold border-l-2 border-[#e5a93c]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                {label}
              </a>
            );
          })}
        </nav>

        {/* Footer Role & Logout */}
        <div className="px-3 pt-4 border-t border-white/5 mt-auto space-y-3">
          <div className="px-2">
            <span className="text-[10px] font-bold text-[#e5a93c] bg-[#e5a93c]/10 border border-[#e5a93c]/25 px-2 py-0.5 rounded uppercase tracking-wider">
              Admin
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-left"
          >
            <LogOut size={15} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
