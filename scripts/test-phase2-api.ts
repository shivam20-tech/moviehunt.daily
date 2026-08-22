/**
 * scripts/test-phase2-api.ts
 *
 * Automated verification suite for Phase 2: Admin Write API & CRUD operations.
 * Covers all 24 required test cases.
 *
 * Run with:
 *   npx tsx scripts/test-phase2-api.ts
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { signSession, SESSION_COOKIE } from '../lib/auth';
import { readBlob, writeBlob, ConflictError } from '../lib/cms/blobClient';
import { HuntItem, HUNTS_DATA, COLLECTIONS } from '../data/hunts';
import { CollectionItem } from '../lib/cms/getCollections';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
let adminToken = '';
let cookieHeader = '';

let totalTests = 0;
let passedTests = 0;

function report(testNum: number, name: string, passed: boolean, detail?: string) {
  totalTests++;
  if (passed) passedTests++;
  const icon = passed ? '✅' : '❌';
  console.log(`   ${icon} Test ${testNum.toString().padStart(2, '0')}: ${name}${detail ? ` — ${detail}` : ''}`);
  if (!passed) {
    process.exitCode = 1;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function runSuite() {
  console.log('\n🧪 Movie Hunt CMS — Phase 2 API Verification Suite');
  console.log('═════════════════════════════════════════════════════\n');

  // Setup admin auth token
  adminToken = await signSession({ sub: 'admin', role: 'admin' });
  cookieHeader = `${SESSION_COOKIE}=${adminToken}`;

  // Initial setup: clean any stray test records from previous runs
  const initialHuntsRes = await readBlob<HuntItem[]>('hunts.json');
  const cleanInitialHunts = initialHuntsRes.data.filter(
    (h) => !h.id.includes('test') && h.day < 900,
  );
  if (cleanInitialHunts.length !== initialHuntsRes.data.length) {
    await writeBlob('hunts.json', cleanInitialHunts, initialHuntsRes.version);
    console.log(`🧹 Cleaned ${initialHuntsRes.data.length - cleanInitialHunts.length} leftover test records.`);
  }

  const initialHuntsCount = cleanInitialHunts.length;
  console.log(`📋 Baseline catalog state: ${initialHuntsCount} hunts in Blob\n`);

  // ── 1. Unauthenticated POST -> 401 ───────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test' }),
    });
    report(1, 'Unauthenticated POST -> 401', res.status === 401, `Status=${res.status}`);
  } catch (err) {
    report(1, 'Unauthenticated POST -> 401', false, String(err));
  }

  // ── 2. Unauthenticated PUT -> 401 ────────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts/day-1-tumbbad`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Modified' }),
    });
    report(2, 'Unauthenticated PUT -> 401', res.status === 401, `Status=${res.status}`);
  } catch (err) {
    report(2, 'Unauthenticated PUT -> 401', false, String(err));
  }

  // ── 3. Unauthenticated DELETE -> 401 ─────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts/day-1-tumbbad`, {
      method: 'DELETE',
    });
    report(3, 'Unauthenticated DELETE -> 401', res.status === 401, `Status=${res.status}`);
  } catch (err) {
    report(3, 'Unauthenticated DELETE -> 401', false, String(err));
  }

  // ── 4. Authenticated create Draft ─────────────────────────────────────────
  const testDraftId = 'day-999-automated-draft-test';
  const testDraftDay = 999;

  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        id: testDraftId,
        day: testDraftDay,
        type: 'movie',
        title: 'Automated Draft Test',
        status: 'draft',
      }),
    });
    const json = await res.json();
    report(4, 'Authenticated create Draft', res.status === 201 && json.success === true, `Created ID=${json.hunt?.id}`);
  } catch (err) {
    report(4, 'Authenticated create Draft', false, String(err));
  }

  // ── 5. Verify Draft exists in Blob ────────────────────────────────────────
  try {
    const res = await readBlob<HuntItem[]>('hunts.json');
    const draftInBlob = res.data.find((h) => h.id === testDraftId);
    report(5, 'Verify Draft exists in Blob', !!draftInBlob && draftInBlob.status === 'draft', `Found in Blob with status=${draftInBlob?.status}`);
  } catch (err) {
    report(5, 'Verify Draft exists in Blob', false, String(err));
  }

  // ── 6. Verify Draft does NOT appear publicly ──────────────────────────────
  try {
    // A. Public detail page
    const pageRes = await fetch(`${BASE_URL}/hunt/${testDraftId}`, { cache: 'no-store' });
    const pageHtml = await pageRes.text();
    const isUnavailableMsg = pageHtml.includes('This Hunt is not available right now') || pageRes.status === 404;

    // B. Public journey page
    const journeyRes = await fetch(`${BASE_URL}/journey`, { cache: 'no-store' });
    const journeyHtml = await journeyRes.text();
    const notInJourney = !journeyHtml.includes('Automated Draft Test');

    report(6, 'Verify Draft does NOT appear publicly', isUnavailableMsg && notInJourney, 'Hidden from public route and archive');
  } catch (err) {
    report(6, 'Verify Draft does NOT appear publicly', false, String(err));
  }

  // ── 7. Publish Draft ──────────────────────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts/${testDraftId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        status: 'published',
        tagline: 'TESTING THE CMS PIPELINE',
        hook: 'A groundbreaking automated test movie.',
        storySummary: 'A test story engineered for verifying Phase 2 API.',
        whyWatch: 'Essential for ensuring rock-solid CMS operations.',
        coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
        language: 'Hindi',
        year: 2026,
        imdbRating: 9.5,
      }),
    });
    const json = await res.json();
    report(7, 'Publish Draft', res.status === 200 && json.hunt?.status === 'published', `Status updated to ${json.hunt?.status}`);
  } catch (err) {
    report(7, 'Publish Draft', false, String(err));
  }

  await sleep(400);

  // ── 8. Verify it appears publicly ─────────────────────────────────────────
  try {
    const pageRes = await fetch(`${BASE_URL}/hunt/${testDraftId}`, { cache: 'no-store' });
    const pageHtml = await pageRes.text();
    const isVisible = pageRes.status === 200 && (pageHtml.includes('Automated Draft Test') || pageHtml.includes('TESTING THE CMS PIPELINE'));
    report(8, 'Verify published Hunt appears publicly', isVisible, `HTTP ${pageRes.status} on public URL`);
  } catch (err) {
    report(8, 'Verify published Hunt appears publicly', false, String(err));
  }

  // ── 9. Edit published Hunt ────────────────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts/${testDraftId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        title: 'Automated Draft Test (Edited Title)',
        tagline: 'UPDATED TAGLINE REVALIDATED',
      }),
    });
    const json = await res.json();
    report(9, 'Edit published Hunt', res.status === 200 && json.hunt?.title === 'Automated Draft Test (Edited Title)', 'Title updated');
  } catch (err) {
    report(9, 'Edit published Hunt', false, String(err));
  }

  await sleep(400);

  // ── 10. Verify public page updates ────────────────────────────────────────
  try {
    const pageRes = await fetch(`${BASE_URL}/hunt/${testDraftId}`, { cache: 'no-store' });
    const pageHtml = await pageRes.text();
    const hasUpdatedContent = pageHtml.includes('Automated Draft Test (Edited Title)') || pageHtml.includes('UPDATED TAGLINE REVALIDATED');
    report(10, 'Verify public page updates', hasUpdatedContent, 'Live page updated with new title');
  } catch (err) {
    report(10, 'Verify public page updates', false, String(err));
  }

  // ── 11. Archive published Hunt ────────────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts/${testDraftId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    const json = await res.json();
    report(11, 'Archive published Hunt', res.status === 200 && json.hunt?.status === 'archived', 'Status changed to archived');
  } catch (err) {
    report(11, 'Archive published Hunt', false, String(err));
  }

  await sleep(400);

  // ── 12. Verify it disappears publicly ─────────────────────────────────────
  try {
    const pageRes = await fetch(`${BASE_URL}/hunt/${testDraftId}`, { cache: 'no-store' });
    const pageHtml = await pageRes.text();
    const isHidden = pageHtml.includes('This Hunt is not available right now') || !pageHtml.includes('UPDATED TAGLINE REVALIDATED');
    report(12, 'Verify it disappears publicly', isHidden, 'Public page shows graceful unavailable message');
  } catch (err) {
    report(12, 'Verify it disappears publicly', false, String(err));
  }

  // ── 13. Verify it remains in Admin data ───────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts?status=all`, {
      headers: { Cookie: cookieHeader },
    });
    const json = await res.json();
    const archivedHunt = json.hunts?.find((h: any) => h.id === testDraftId);
    report(13, 'Verify it remains in Admin data', !!archivedHunt && archivedHunt.status === 'archived', 'Present in admin catalog list with status=archived');
  } catch (err) {
    report(13, 'Verify it remains in Admin data', false, String(err));
  }

  // ── 14. Media Upload API ──────────────────────────────────────────────────
  try {
    const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const pngBuffer = Buffer.from(pngBase64, 'base64');
    const formData = new FormData();
    const blobFile = new Blob([pngBuffer], { type: 'image/png' });
    formData.append('file', blobFile, 'test-poster.png');

    const res = await fetch(`${BASE_URL}/api/admin/media`, {
      method: 'POST',
      headers: { Cookie: cookieHeader },
      body: formData,
    });
    const json = await res.json();
    const isValidUrl = json.success === true && typeof json.url === 'string' && json.url.includes('blob');
    report(14, 'Upload poster & verify valid Blob URL', isValidUrl, `URL: ${json.url?.substring(0, 50)}...`);
  } catch (err) {
    report(14, 'Upload poster & verify valid Blob URL', false, String(err));
  }

  // ── 15. Create collection ─────────────────────────────────────────────────
  const testColId = `test-col-${Date.now()}`;
  try {
    const res = await fetch(`${BASE_URL}/api/admin/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        id: testColId,
        title: '🧪 Test Curated Collection',
        description: 'Automated test collection for Phase 2 API.',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
      }),
    });
    const json = await res.json();
    report(15, 'Create collection', res.status === 201 && json.collection?.id === testColId, `Created ${json.collection?.title}`);
  } catch (err) {
    report(15, 'Create collection', false, String(err));
  }

  // ── 16. Edit collection ───────────────────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/collections/${testColId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        title: '🧪 Test Curated Collection (Edited)',
      }),
    });
    const json = await res.json();
    report(16, 'Edit collection', res.status === 200 && json.collection?.title === '🧪 Test Curated Collection (Edited)', 'Updated title');
  } catch (err) {
    report(16, 'Edit collection', false, String(err));
  }

  // ── 17. Reorder collection ────────────────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/collections/${testColId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        order: 0,
      }),
    });
    const json = await res.json();
    report(17, 'Reorder collection', res.status === 200 && json.collection?.order === 0, 'Order set to 0');
  } catch (err) {
    report(17, 'Reorder collection', false, String(err));
  }

  // ── 18. Delete collection safely ──────────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/collections/${testColId}`, {
      method: 'DELETE',
      headers: { Cookie: cookieHeader },
    });
    const json = await res.json();
    report(18, 'Delete collection safely', res.status === 200 && json.success === true, json.message);
  } catch (err) {
    report(18, 'Delete collection safely', false, String(err));
  }

  // ── 19. Duplicate Day number protection ───────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        title: 'Duplicate Day Test',
        day: 1, // Day 1 already belongs to Tumbbad
        type: 'movie',
        status: 'draft',
      }),
    });
    const json = await res.json();
    const blocked = res.status === 400 && json.error?.includes('already exists');
    report(19, 'Test duplicate Day number protection', blocked, `Error: "${json.error}"`);
  } catch (err) {
    report(19, 'Test duplicate Day number protection', false, String(err));
  }

  // ── 20. Duplicate Hunt ID protection ──────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/hunts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify({
        id: 'day-1-tumbbad', // Already exists
        title: 'Duplicate ID Test',
        day: 9999,
        type: 'movie',
        status: 'draft',
      }),
    });
    const json = await res.json();
    const blocked = res.status === 400 && json.error?.includes('already exists');
    report(20, 'Test duplicate Hunt ID protection', blocked, `Error: "${json.error}"`);
  } catch (err) {
    report(20, 'Test duplicate Hunt ID protection', false, String(err));
  }

  // ── 21. Optimistic concurrency / version conflict protection ─────────────
  try {
    const currentBlob = await readBlob<HuntItem[]>('hunts.json');
    let conflictBlocked = false;
    try {
      await writeBlob('hunts.json', currentBlob.data, 'stale-dummy-sha256-version-hash');
    } catch (err) {
      if (err instanceof ConflictError) {
        conflictBlocked = true;
      }
    }
    report(21, 'Test concurrent write / version conflict protection', conflictBlocked, 'ConflictError thrown on mismatched version hash');
  } catch (err) {
    report(21, 'Test concurrent write / version conflict protection', false, String(err));
  }

  // ── 22. Cleanup test records from Blob ──────────────────────────────────────
  try {
    const current = await readBlob<HuntItem[]>('hunts.json');
    const cleaned = current.data.filter(
      (h) => !h.id.includes('test') && h.day < 900,
    );
    await writeBlob('hunts.json', cleaned, current.version);
    report(22, 'Cleanup test records from Blob', true, `Catalog cleaned, remaining=${cleaned.length}`);
  } catch (err) {
    report(22, 'Cleanup test records from Blob', false, String(err));
  }

  // ── 23. Test export still works ───────────────────────────────────────────
  try {
    const res = await fetch(`${BASE_URL}/api/admin/export`, {
      headers: { Cookie: cookieHeader },
    });
    const json = await res.json();
    const isValidExport = res.status === 200 && json.summary?.totalHunts === initialHuntsCount;
    report(23, 'Test export catalog API still works', isValidExport, `Exported ${json.summary?.totalHunts} hunts, ${json.summary?.collections} collections`);
  } catch (err) {
    report(23, 'Test export catalog API still works', false, String(err));
  }

  // ── 24. Verify all existing 72 Hunts remain intact ────────────────────────
  try {
    const res = await readBlob<HuntItem[]>('hunts.json');
    const isExact = res.data.length === initialHuntsCount;
    report(24, 'Verify all existing 72 Hunts remain intact', isExact, `Blob catalog count = ${res.data.length} (original = ${initialHuntsCount})`);
  } catch (err) {
    report(24, 'Verify all existing 72 Hunts remain intact', false, String(err));
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n═════════════════════════════════════════════════════');
  console.log(`📊 Suite Results: ${passedTests}/${totalTests} Tests Passed`);
  if (passedTests === totalTests) {
    console.log('🎉 ALL 24 PHASE 2 VERIFICATION CHECKS PASSED!\n');
  } else {
    console.log('❌ Some tests failed. Check logs above.\n');
  }
}

runSuite().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
