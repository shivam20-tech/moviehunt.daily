'use client';

import { Film, Tv, Calendar, Hash } from 'lucide-react';
import { HUNTS_DATA } from '@/data/hunts';

// Compute quick stats from the static data
function getStats() {
  const total = HUNTS_DATA.length;
  const movies = HUNTS_DATA.filter((h) => h.type === 'movie').length;
  const series = HUNTS_DATA.filter((h) => h.type === 'series').length;
  const latest = [...HUNTS_DATA].sort((a, b) => b.day - a.day)[0];
  return { total, movies, series, latest };
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div
      style={{
        padding: '22px 24px',
        backgroundColor: '#0d0d12',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          {label}
        </span>
        <Icon size={16} style={{ color: accent ?? 'rgba(255,255,255,0.2)' }} strokeWidth={1.5} />
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: accent ?? '#f4f4f0', lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{sub}</div>
      )}
    </div>
  );
}

export default function AdminOverviewPage() {
  const stats = getStats();

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.6rem',
            fontWeight: 400,
            color: '#f4f4f0',
            margin: '0 0 6px',
          }}
        >
          Overview
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Movie Hunt content at a glance.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 40,
        }}
      >
        <StatCard label="Total Hunts" value={stats.total} icon={Hash} accent="#e5a93c" />
        <StatCard label="Movies" value={stats.movies} icon={Film} />
        <StatCard label="Series" value={stats.series} icon={Tv} />
        <StatCard
          label="Latest Hunt"
          value={`Day ${stats.latest?.day ?? '—'}`}
          sub={stats.latest?.title}
          icon={Calendar}
          accent="#7dd3fc"
        />
      </div>

      {/* Quick Links */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 12px' }}>
          Quick Links
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: '→ Content Parser', href: '/admin/parser' },
            { label: '→ Analytics Dashboard', href: '/admin/analytics' },
            { label: '→ View Public Site', href: '/' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target={href === '/' ? '_blank' : undefined}
              style={{
                padding: '9px 18px',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.55)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e5a93c';
                e.currentTarget.style.borderColor = 'rgba(229,169,60,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
