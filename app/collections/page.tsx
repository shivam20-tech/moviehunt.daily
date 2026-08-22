import React from 'react';
import Footer from '@/components/Footer';
import { HuntItem } from '@/data/hunts';
import { getHunts } from '@/lib/cms/getHunts';
import { getCollections } from '@/lib/cms/getCollections';
import Link from 'next/link';
import { Star, ArrowRight, Film, Tv } from 'lucide-react';

export const dynamic = 'force-dynamic';

/**
 * Maps each collection ID to precise filter logic against hunt moodTags, genres, bestFor, and tagline.
 * Returns all matching hunts for a collection.
 * SAFEGUARD #7: Only receives published hunts — draft/archived never leak into collections.
 */
function getAllHuntsForCollection(collectionId: string, allHunts: HuntItem[]): HuntItem[] {
  switch (collectionId) {
    case 'rainy-night-stories':
      // Atmospheric, cozy, emotional, rainy-vibes, nostalgic romance & quiet dramas
      return allHunts.filter((h) => {
        const text = [
          h.title,
          h.tagline,
          h.hook,
          h.whyWatch,
          ...(h.moodTags ?? []),
          ...(h.bestFor ?? []),
          ...(h.genres ?? []),
        ]
          .join(' ')
          .toLowerCase();

        return (
          text.includes('rain') ||
          text.includes('atmospheric') ||
          text.includes('melancholy') ||
          text.includes('nostalgic') ||
          text.includes('cozy') ||
          text.includes('quiet') ||
          text.includes('slice of life') ||
          ['day-5-ship-of-theseus', 'day-6-a-death-in-the-gunj', 'day-8-the-lunchbox', 'day-12-kumbalangi-nights', 'day-22-ee-ma-yau', 'day-25-october', 'day-26-96', 'day-35-charlie', 'day-57-killa', 'day-60-photograph'].includes(h.id)
        );
      });

    case 'hidden-indian-gems':
      // Under-appreciated indie, art-house, & authentic village masterpieces
      return allHunts.filter((h) => {
        const text = [
          h.title,
          h.whyWatch,
          ...(h.moodTags ?? []),
          ...(h.bestFor ?? []),
          ...(h.genres ?? []),
        ]
          .join(' ')
          .toLowerCase();

        return (
          text.includes('indie') ||
          text.includes('art-house') ||
          text.includes('realism') ||
          text.includes('village') ||
          text.includes('locarno') ||
          text.includes('national award') ||
          ['day-21-thithi', 'day-29-kadaisi-vivasayi', 'day-38-eeb-allay-ooo', 'day-54-harishchandrachi-factory', 'day-56-c-o-kancharapalem', 'day-58-village-rockstars', 'day-59-fandry', 'day-62-kothanodi'].includes(h.id)
        );
      });

    case 'mind-bending-thrillers':
      // Intense, unpredictable psychological thrillers & crime mysteries
      return allHunts.filter((h) => {
        const genres = (h.genres ?? []).map((g) => g.toLowerCase());
        const tags = (h.moodTags ?? []).map((t) => t.toLowerCase());
        return (
          genres.some((g) => g.includes('thriller') || g.includes('mystery') || g.includes('crime') || g.includes('neo-noir')) ||
          tags.some((t) => t.includes('thriller') || t.includes('mind-blowing'))
        );
      });

    case 'epic-sagas-rivalries':
      // High-stakes character clashes, gangster epics & generational sagas
      return allHunts.filter((h) => {
        const text = [h.title, h.tagline, h.storySummary, h.whyWatch, ...(h.genres ?? []), ...(h.bestFor ?? [])]
          .join(' ')
          .toLowerCase();

        return (
          text.includes('epic') ||
          text.includes('rivalry') ||
          text.includes('gangster') ||
          text.includes('feud') ||
          text.includes('saga') ||
          text.includes('ego') ||
          (h.duration && parseInt(h.duration) >= 140) ||
          ['day-2-maqbool', 'day-3-black-friday', 'day-31-nayakan', 'day-32-ugramm', 'day-34-ayyappanum-koshiyum', 'day-37-kammatti-paadam', 'day-40-gangs-of-wasseypur-part-1', 'day-48-sarpatta-parambarai'].includes(h.id)
        );
      });

    case 'inspiring-life-journeys':
      // Feel-good, coming-of-age, survival & emotional liberation
      return allHunts.filter((h) => {
        const text = [h.title, h.tagline, h.whyWatch, ...(h.genres ?? []), ...(h.moodTags ?? []), ...(h.bestFor ?? [])]
          .join(' ')
          .toLowerCase();

        return (
          text.includes('coming of age') ||
          text.includes('feel good') ||
          text.includes('survival') ||
          text.includes('friendship') ||
          text.includes('freedom') ||
          text.includes('comedy') ||
          ['day-17-mard-ko-dard-nahi-hota', 'day-23-manjummel-boys', 'day-24-udaan', 'day-47-mukkabaaz', 'day-49-agent-sai-srinivasa-athreya', 'day-52-kaaka-muttai', 'day-55-sairat'].includes(h.id)
        );
      });

    case 'philosophical-meditative':
      // Deep, thought-provoking, quiet, courtroom realism
      return allHunts.filter((h) => {
        const text = [h.title, h.tagline, h.whyWatch, ...(h.genres ?? []), ...(h.bestFor ?? [])]
          .join(' ')
          .toLowerCase();

        return (
          text.includes('philosophical') ||
          text.includes('meditative') ||
          text.includes('courtroom') ||
          text.includes('poetry') ||
          text.includes('satire') ||
          ['day-15-ankhon-dekhi', 'day-19-super-deluxe', 'day-20-mukundan-unni-associates', 'day-27-the-great-indian-kitchen', 'day-30-court', 'day-44-aaranya-kaandam', 'day-45-lucia', 'day-53-the-disciple'].includes(h.id)
        );
      });

    case 'series-better-than-movies':
      return allHunts.filter((h) => h.type === 'series');

    default:
      return allHunts;
  }
}

const signaturePriorityMap: Record<string, string[]> = {
  'rainy-night-stories': ['day-12-kumbalangi-nights', 'day-26-96', 'day-25-october', 'day-35-charlie', 'day-8-the-lunchbox', 'day-22-ee-ma-yau', 'day-57-killa', 'day-60-photograph', 'day-6-a-death-in-the-gunj'],
  'hidden-indian-gems': ['day-56-c-o-kancharapalem', 'day-21-thithi', 'day-29-kadaisi-vivasayi', 'day-38-eeb-allay-ooo', 'day-58-village-rockstars', 'day-59-fandry', 'day-62-kothanodi', 'day-54-harishchandrachi-factory'],
  'mind-bending-thrillers': ['day-42-ratsasan', 'day-28-drishyam', 'day-39-visaranai', 'day-16-iratta', 'day-33-kaithi', 'day-46-anjaam-pathiraa', 'day-19-super-deluxe', 'day-36-joji', 'day-18-jallikattu', 'day-1-ugly'],
  'epic-sagas-rivalries': ['day-40-gangs-of-wasseypur-part-1', 'day-31-nayakan', 'day-34-ayyappanum-koshiyum', 'day-48-sarpatta-parambarai', 'day-2-maqbool', 'day-3-black-friday', 'day-32-ugramm', 'day-37-kammatti-paadam'],
  'inspiring-life-journeys': ['day-24-udaan', 'day-5-ship-of-theseus', 'day-15-ankhon-dekhi', 'day-23-manjummel-boys', 'day-52-kaaka-muttai', 'day-55-sairat', 'day-49-agent-sai-srinivasa-athreya', 'day-47-mukkabaaz', 'day-17-mard-ko-dard-nahi-hota'],
  'philosophical-meditative': ['day-53-the-disciple', 'day-30-court', 'day-44-aaranya-kaandam', 'day-43-maanagaram', 'day-41-kshanam', 'day-50-ulidavaru-kandanthe', 'day-45-lucia', 'day-27-the-great-indian-kitchen'],
  'series-better-than-movies': ['day-71-gullak', 'day-75-aspirants', 'day-72-yeh-meri-family', 'day-73-paatal-lok', 'day-74-delhi-crime', 'day-70-kohrra', 'day-69-tabbar']
};

function getHuntsForCollection(collectionId: string, allHunts: HuntItem[], limit = 6): HuntItem[] {
  const matches = getAllHuntsForCollection(collectionId, allHunts);
  const signatureList = signaturePriorityMap[collectionId] || [];

  const sorted = [...matches].sort((a, b) => {
    const idxA = signatureList.indexOf(a.id);
    const idxB = signatureList.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return (b.imdbRating ?? 0) - (a.imdbRating ?? 0);
  });

  return sorted.slice(0, limit);
}

export default async function CollectionsPage() {
  // Fetch published-only hunts and collections from Vercel Blob
  const [publishedHunts, collections] = await Promise.all([
    getHunts('published'),
    getCollections(),
  ]);
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Page Header */}
      <section
        style={{
          paddingTop: 'var(--space-24)',
          paddingBottom: 'var(--space-16)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <span className="badge badge-accent" style={{ marginBottom: 'var(--space-6)' }}>
            Curated Themes · Hand-Picked Recommendations
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              color: 'var(--text-primary)',
              fontWeight: 400,
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-snug)',
              margin: '0 0 var(--space-4)',
            }}
          >
            Editorial Collections
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              maxWidth: 540,
              margin: '0 auto',
              lineHeight: 'var(--leading-relaxed)',
              fontWeight: 300,
            }}
          >
            Story journeys grouped by mood, weather, and cinema impact.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section style={{ padding: 'var(--space-16) 0' }}>
        <div
          className="section-inner"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}
        >
          {collections.map((col) => {
            const allMatches = getAllHuntsForCollection(col.id, publishedHunts);
            const hunts = getHuntsForCollection(col.id, publishedHunts, 6);

            return (
              <div key={col.id} id={col.id} style={{ scrollMarginTop: 80 }}>
                {/* Collection Header */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                    paddingBottom: 'var(--space-8)',
                    borderBottom: '1px solid var(--border)',
                    marginBottom: 'var(--space-8)',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        color: 'var(--text-primary)',
                        fontWeight: 400,
                        letterSpacing: 'var(--tracking-tight)',
                        margin: '0 0 var(--space-2)',
                        lineHeight: 1.2,
                      }}
                    >
                      {col.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--text-secondary)',
                        margin: 0,
                        maxWidth: 520,
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      {col.description}
                    </p>
                  </div>
                  <span className="badge badge-accent">
                    {allMatches.length} Curated Stories
                  </span>
                </div>

                {/* Movie Grid — 2 columns on mobile */}
                <div className="collection-movie-grid">
                  {hunts.map((hunt) => (
                    <Link
                      key={hunt.id}
                      href={`/hunt/${hunt.id}`}
                      aria-label={`View details for ${hunt.title}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-3)',
                        textDecoration: 'none',
                      }}
                      className="collection-card"
                    >
                      {/* Poster */}
                      <div
                        style={{
                          position: 'relative',
                          aspectRatio: '2 / 3',
                          borderRadius: 'var(--radius-lg)',
                          overflow: 'hidden',
                          border: '1px solid var(--border)',
                          transition: `border-color var(--duration-fast) var(--ease-out)`,
                        }}
                        className="collection-card-img-wrap"
                      >
                        <img
                          src={hunt.coverImage}
                          alt={`${hunt.title} poster`}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            display: 'block',
                            transition: `transform var(--duration-image) var(--ease-out)`,
                          }}
                          className="collection-card-img"
                        />

                        {/* IMDb rating */}
                        {hunt.imdbRating && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 3,
                              backgroundColor: 'rgba(13,13,18,0.88)',
                              border: '1px solid var(--border)',
                              backdropFilter: 'blur(6px)',
                              WebkitBackdropFilter: 'blur(6px)',
                              borderRadius: 'var(--radius-full)',
                              padding: '3px 8px',
                            }}
                          >
                            <Star
                              size={9}
                              fill="var(--accent)"
                              strokeWidth={0}
                              color="var(--accent)"
                            />
                            <span
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: 'var(--text-xs)',
                                fontWeight: 500,
                                color: 'var(--text-primary)',
                              }}
                            >
                              {hunt.imdbRating}
                            </span>
                          </div>
                        )}

                        {/* Type chip */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 10,
                            left: 10,
                            backgroundColor: 'rgba(13,13,18,0.85)',
                            border: '1px solid var(--border)',
                            backdropFilter: 'blur(6px)',
                            WebkitBackdropFilter: 'blur(6px)',
                            borderRadius: 'var(--radius-full)',
                            padding: '3px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          {hunt.type === 'series' ? (
                            <Tv size={9} color="var(--text-secondary)" strokeWidth={1.5} />
                          ) : (
                            <Film size={9} color="var(--text-secondary)" strokeWidth={1.5} />
                          )}
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: 9,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {hunt.type === 'series' ? 'Series' : 'Film'}
                          </span>
                        </div>
                      </div>

                      {/* Below-poster text */}
                      <div>
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'var(--text-base)',
                            color: 'var(--text-primary)',
                            margin: '0 0 2px',
                            fontWeight: 400,
                            lineHeight: 1.3,
                            transition: `color var(--duration-fast) var(--ease-out)`,
                          }}
                          className="collection-card-title"
                        >
                          {hunt.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-tertiary)',
                            }}
                          >
                            {hunt.year}
                          </span>
                          {hunt.language && (
                            <>
                              <span style={{ color: 'var(--text-tertiary)', fontSize: 10 }}>·</span>
                              <span
                                style={{
                                  fontFamily: 'var(--font-sans)',
                                  fontSize: 'var(--text-xs)',
                                  color: 'var(--text-tertiary)',
                                }}
                              >
                                {hunt.language}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View all link for this collection */}
                {hunts.length >= 6 && (
                  <div style={{ marginTop: 'var(--space-8)', display: 'flex' }}>
                    <Link
                      href="/journey"
                      className="btn btn-ghost"
                      style={{
                        fontSize: 'var(--text-sm)',
                        gap: 6,
                        color: 'var(--accent)',
                      }}
                    >
                      See all {col.count} stories
                      <ArrowRight size={13} strokeWidth={1.5} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />

      <style>{`
        .collection-movie-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (min-width: 640px) {
          .collection-movie-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
        }

        @media (min-width: 1024px) {
          .collection-movie-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }

        .collection-card:hover .collection-card-img {
          transform: scale(1.05);
        }
        .collection-card:hover .collection-card-img-wrap {
          border-color: var(--border-focus);
        }
        .collection-card:hover .collection-card-title {
          color: var(--accent);
        }
      `}</style>
    </main>
  );
}
