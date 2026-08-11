import { ExternalLink, BarChart3, Film, Tv, MousePointerClick, PlayCircle, AlertCircle } from 'lucide-react';
import { HUNTS_DATA } from '@/data/hunts';

// Resolve hunt title from ID for display
function getHuntTitle(key: string): string {
  // key format: mh:hunt_view:day-X-title
  const id = key.replace(/^mh:[^:]+:/, '');
  const hunt = HUNTS_DATA.find((h) => h.id === id);
  return hunt ? `Day ${hunt.day} — ${hunt.title}` : id;
}

// Try to load analytics from storage; gracefully degrade if not configured
async function loadTopHunts(): Promise<{ key: string; title: string; views: number; trailers: number; watches: number }[]> {
  const isConfigured = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
  if (!isConfigured) return [];

  try {
    // Dynamic import to avoid breaking the build when Upstash is not configured
    const { storage } = await import('@/lib/storage');

    const [viewEntries, trailerEntries, watchEntries] = await Promise.all([
      storage.top('mh:hunt_view', 20),
      storage.top('mh:trailer_click', 20),
      storage.top('mh:watch_click', 20),
    ]);

    // Merge by hunt ID
    const map = new Map<string, { views: number; trailers: number; watches: number }>();
    viewEntries.forEach(({ key, value }) => {
      const id = key.replace('mh:hunt_view:', '');
      map.set(id, { views: value, trailers: 0, watches: 0 });
    });
    trailerEntries.forEach(({ key, value }) => {
      const id = key.replace('mh:trailer_click:', '');
      const entry = map.get(id) ?? { views: 0, trailers: 0, watches: 0 };
      map.set(id, { ...entry, trailers: value });
    });
    watchEntries.forEach(({ key, value }) => {
      const id = key.replace('mh:watch_click:', '');
      const entry = map.get(id) ?? { views: 0, trailers: 0, watches: 0 };
      map.set(id, { ...entry, watches: value });
    });

    return Array.from(map.entries())
      .map(([id, counts]) => ({
        key: id,
        title: getHuntTitle(`mh:hunt_view:${id}`),
        ...counts,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 15);
  } catch (err) {
    console.error('[analytics] Failed to load analytics data:', err);
    return [];
  }
}

async function loadTopCollections(): Promise<{ key: string; value: number }[]> {
  const isConfigured = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
  if (!isConfigured) return [];

  try {
    const { storage } = await import('@/lib/storage');
    return await storage.top('mh:collection_view', 10);
  } catch {
    return [];
  }
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <Icon size={15} style={{ color: '#e5a93c' }} strokeWidth={1.5} />
      <h2 style={{
        fontSize: '0.72rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
        margin: 0,
      }}>
        {title}
      </h2>
    </div>
  );
}

function NotConfiguredBanner() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '14px 16px',
        borderRadius: 10,
        backgroundColor: 'rgba(229,169,60,0.07)',
        border: '1px solid rgba(229,169,60,0.2)',
        marginBottom: 32,
      }}
    >
      <AlertCircle size={16} style={{ color: '#e5a93c', flexShrink: 0, marginTop: 1 }} />
      <div>
        <p style={{ margin: '0 0 4px', fontSize: '0.82rem', color: '#f4f4f0', fontWeight: 600 }}>
          Upstash Redis not configured
        </p>
        <p style={{ margin: 0, fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
          Set <code style={{ color: '#e5a93c' }}>UPSTASH_REDIS_REST_URL</code> and{' '}
          <code style={{ color: '#e5a93c' }}>UPSTASH_REDIS_REST_TOKEN</code> in your Vercel environment
          variables to enable Movie Hunt-specific analytics tracking.
        </p>
      </div>
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  const isConfigured = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );

  const [topHunts, topCollections] = await Promise.all([
    loadTopHunts(),
    loadTopCollections(),
  ]);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: 400, color: '#f4f4f0', margin: '0 0 6px' }}>
          Analytics
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Movie Hunt-specific content analytics. Behavioral data via Microsoft Clarity.
        </p>
      </div>

      {/* Not configured warning */}
      {!isConfigured && <NotConfiguredBanner />}

      {/* Microsoft Clarity Panel */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader icon={BarChart3} title="Behavioral Analytics — Microsoft Clarity" />
        <div
          style={{
            padding: '20px 24px',
            borderRadius: 12,
            backgroundColor: '#0d0d12',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{ fontSize: '0.85rem', color: '#f4f4f0', margin: '0 0 4px', fontWeight: 500 }}>
              Heatmaps · Sessions · Scroll Depth · Click Behavior · Devices
            </p>
            <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              View full behavioral analytics in the Microsoft Clarity dashboard.
            </p>
          </div>
          <a
            href="https://clarity.microsoft.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 16px',
              borderRadius: 8,
              backgroundColor: 'rgba(229,169,60,0.1)',
              border: '1px solid rgba(229,169,60,0.25)',
              color: '#e5a93c',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Open Clarity <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Top Hunts by Views */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader icon={Film} title="Top Hunts by Page Views" />
        {isConfigured && topHunts.length === 0 ? (
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            No data yet. Views will appear here once visitors start browsing hunt pages.
          </p>
        ) : !isConfigured ? (
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            Configure Upstash to see hunt analytics.
          </p>
        ) : (
          <div
            style={{
              backgroundColor: '#0d0d12',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Hunt', 'Page Views', 'Trailer Clicks', 'Watch Clicks'].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: '10px 16px',
                        textAlign: col === 'Hunt' ? 'left' : 'right',
                        fontSize: '0.68rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)',
                        fontWeight: 500,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topHunts.map((hunt, i) => (
                  <tr
                    key={hunt.key}
                    style={{
                      borderBottom: i < topHunts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <td style={{ padding: '10px 16px', color: 'rgba(255,255,255,0.75)' }}>
                      {hunt.title}
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', color: '#e5a93c', fontWeight: 600 }}>
                      {hunt.views.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', color: 'rgba(255,255,255,0.5)' }}>
                      {hunt.trailers.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', color: 'rgba(255,255,255,0.5)' }}>
                      {hunt.watches.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Top Collections */}
      <div>
        <SectionHeader icon={Tv} title="Top Collections by Views" />
        {isConfigured && topCollections.length === 0 ? (
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            No collection view data yet.
          </p>
        ) : !isConfigured ? (
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            Configure Upstash to see collection analytics.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {topCollections.map(({ key, value }) => {
              const id = key.replace('mh:collection_view:', '');
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    backgroundColor: '#0d0d12',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 8,
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{id}</span>
                  <span style={{ fontSize: '0.8rem', color: '#e5a93c', fontWeight: 600 }}>
                    {value.toLocaleString()} views
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
