'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileCode2, BarChart3, LogOut, Clapperboard } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Content Parser', href: '/admin/parser', icon: FileCode2 },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string, exact?: boolean) {
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
    <aside
      style={{
        width: 220,
        minHeight: '100vh',
        backgroundColor: '#0d0d12',
        borderRight: '1px solid rgba(229,169,60,0.12)',
        display: 'flex',
        flexDirection: 'column',
        padding: '28px 0 20px',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '0 20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clapperboard size={18} style={{ color: '#e5a93c' }} />
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#f4f4f0',
              letterSpacing: '0.04em',
            }}
          >
            MOVIE<span style={{ color: '#e5a93c' }}>HUNT</span>
          </span>
        </div>
        <span
          style={{
            display: 'block',
            marginTop: 4,
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          Admin Panel
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px 0' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 12px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#e5a93c' : 'rgba(255,255,255,0.55)',
                    backgroundColor: active ? 'rgba(229,169,60,0.09)' : 'transparent',
                    transition: 'all 150ms ease',
                    borderLeft: active ? '2px solid #e5a93c' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={15} strokeWidth={active ? 2 : 1.5} />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer: Role badge + Logout */}
      <div
        style={{
          padding: '16px 12px 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* Role badge */}
        <div style={{ padding: '0 4px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#e5a93c',
              backgroundColor: 'rgba(229,169,60,0.1)',
              border: '1px solid rgba(229,169,60,0.25)',
              borderRadius: 4,
              padding: '2px 7px',
            }}
          >
            Admin
          </span>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 12px',
            borderRadius: 8,
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.4)',
            width: '100%',
            textAlign: 'left',
            transition: 'all 150ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ff6b6b';
            e.currentTarget.style.backgroundColor = 'rgba(255,107,107,0.07)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut size={15} strokeWidth={1.5} />
          Logout
        </button>
      </div>
    </aside>
  );
}
