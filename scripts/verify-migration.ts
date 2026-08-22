/**
 * scripts/verify-migration.ts
 *
 * Migration verification script — Safeguard #9.
 *
 * Compares data/hunts.ts (source of truth) against hunts.json & collections.json from Vercel Blob.
 * Fails loudly if ANY discrepancy is found.
 *
 * Run with:
 *   npx tsx scripts/verify-migration.ts
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { readBlob } from '../lib/cms/blobClient';
import { HUNTS_DATA, COLLECTIONS, HuntItem } from '../data/hunts';

function check(label: string, passed: boolean, detail?: string): void {
  const icon = passed ? '✅' : '❌';
  const msg = `   ${icon} ${label}`;
  console.log(detail ? `${msg} — ${detail}` : msg);
  if (!passed) process.exitCode = 1;
}

async function verify() {
  console.log('\n🔍 Movie Hunt CMS — Migration Verification');
  console.log('══════════════════════════════════════════\n');

  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_PUBLIC_URL) {
    console.error('❌ Missing BLOB_READ_WRITE_TOKEN in .env.local');
    process.exit(1);
  }

  // ── Fetch from Blob ────────────────────────────────────────────────────────
  console.log('☁️  Fetching hunts.json from Vercel Blob...');
  let blobHunts: HuntItem[];
  try {
    const { data } = await readBlob<HuntItem[]>('hunts.json');
    blobHunts = data;
    console.log(`   ✓ Fetched ${blobHunts.length} hunts from Blob\n`);
  } catch (err) {
    console.error('❌ Failed to fetch hunts.json:', err);
    process.exit(1);
  }

  const source = HUNTS_DATA;

  // ── Check 1: Count ────────────────────────────────────────────────────────
  console.log('📊 Verification Checks');
  console.log('──────────────────────');
  check(
    'Hunt count',
    blobHunts.length === source.length,
    `Blob=${blobHunts.length}, hunts.ts=${source.length}`
  );

  // ── Check 2: All IDs present ──────────────────────────────────────────────
  const blobIds = new Set(blobHunts.map((h) => h.id));
  const missingIds = source.filter((h) => !blobIds.has(h.id)).map((h) => h.id);
  check('All IDs present in Blob', missingIds.length === 0, missingIds.length > 0 ? `Missing: ${missingIds.join(', ')}` : undefined);

  const sourceIds = new Set(source.map((h) => h.id));
  const extraIds = blobHunts.filter((h) => !sourceIds.has(h.id)).map((h) => h.id);
  check('No extra IDs in Blob', extraIds.length === 0, extraIds.length > 0 ? `Extra: ${extraIds.join(', ')}` : undefined);

  // ── Check 3: Day numbers ──────────────────────────────────────────────────
  const sourceDayById = new Map(source.map((h) => [h.id, h.day]));
  const dayMismatches = blobHunts.filter((h) => {
    const expected = sourceDayById.get(h.id);
    return expected !== undefined && expected !== h.day;
  });
  check('Day numbers match', dayMismatches.length === 0, dayMismatches.length > 0 ? `Mismatches: ${dayMismatches.map((h) => `${h.id} (blob:${h.day})`).join(', ')}` : undefined);

  // ── Check 4: Titles ───────────────────────────────────────────────────────
  const sourceTitleById = new Map(source.map((h) => [h.id, h.title]));
  const titleMismatches = blobHunts.filter((h) => {
    const expected = sourceTitleById.get(h.id);
    return expected !== undefined && expected !== h.title;
  });
  check('Titles match', titleMismatches.length === 0, titleMismatches.length > 0 ? `Mismatches: ${titleMismatches.map((h) => h.id).join(', ')}` : undefined);

  // ── Check 5: Types ────────────────────────────────────────────────────────
  const sourceTypeById = new Map(source.map((h) => [h.id, h.type]));
  const typeMismatches = blobHunts.filter((h) => {
    const expected = sourceTypeById.get(h.id);
    return expected !== undefined && expected !== h.type;
  });
  check('Types match (movie/series)', typeMismatches.length === 0, typeMismatches.length > 0 ? `Mismatches: ${typeMismatches.map((h) => h.id).join(', ')}` : undefined);

  // ── Check 6: Cover images ─────────────────────────────────────────────────
  const sourceCoverById = new Map(source.map((h) => [h.id, h.coverImage]));
  const coverMismatches = blobHunts.filter((h) => {
    const expected = sourceCoverById.get(h.id);
    return expected !== undefined && expected !== h.coverImage;
  });
  check('Cover images match', coverMismatches.length === 0, coverMismatches.length > 0 ? `Mismatches: ${coverMismatches.map((h) => h.id).join(', ')}` : undefined);

  // ── Check 7: Trailer IDs ──────────────────────────────────────────────────
  const sourceTrailerById = new Map(source.map((h) => [h.id, h.trailerYoutubeId ?? '']));
  const trailerMismatches = blobHunts.filter((h) => {
    const expected = sourceTrailerById.get(h.id);
    return expected !== undefined && expected !== (h.trailerYoutubeId ?? '');
  });
  check('Trailer IDs match', trailerMismatches.length === 0, trailerMismatches.length > 0 ? `Mismatches: ${trailerMismatches.map((h) => h.id).join(', ')}` : undefined);

  // ── Check 8: All Blob hunts have status=published ─────────────────────────
  const nonPublished = blobHunts.filter((h) => h.status !== 'published');
  check('All migrated hunts have status=published', nonPublished.length === 0, nonPublished.length > 0 ? `Non-published: ${nonPublished.map((h) => `${h.id}(${h.status})`).join(', ')}` : undefined);

  // ── Check 9: No duplicate Day numbers ─────────────────────────────────────
  const dayNums = blobHunts.map((h) => h.day);
  const dupDays = dayNums.filter((d, i) => dayNums.indexOf(d) !== i);
  check('No duplicate Day numbers', dupDays.length === 0, dupDays.length > 0 ? `Duplicates: ${[...new Set(dupDays)].join(', ')}` : undefined);

  // ── Check 10: Collections ─────────────────────────────────────────────────
  try {
    const { data: blobCollections } = await readBlob<{ id: string; title: string }[]>('collections.json');
    check('Collections count', blobCollections.length === COLLECTIONS.length, `Blob=${blobCollections.length}, hunts.ts=${COLLECTIONS.length}`);
  } catch (err) {
    check('Collections accessible from Blob', false, String(err));
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('');
  if (process.exitCode !== 1) {
    console.log('🎉 ALL 10 CHECKS PASSED! Migration is 100% verified.\n');
  } else {
    console.log('❌ Some checks failed. Do NOT proceed until all checks pass.\n');
  }
}

verify().catch((err) => {
  console.error('\n❌ Verification script failed:', err);
  process.exit(1);
});
