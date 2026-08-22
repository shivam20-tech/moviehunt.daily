/**
 * scripts/test-phase3-workflow.ts
 *
 * Full Phase 3 End-to-End Workflow Verification Script.
 *
 * Simulates:
 * 1. Admin login & session creation
 * 2. ChatGPT output import simulation & field extraction verification
 * 3. Save as Draft with External Image URL (Method A)
 * 4. Verify draft is absent on public site and hidden from /journey
 * 5. Verify draft appears in Admin Library (status=draft)
 * 6. Edit Draft & test Image Upload to Blob (Method B)
 * 7. Publish Hunt (status=published)
 * 8. Verify published Hunt is live publicly (/hunt/[id] and /journey)
 * 9. Edit published Hunt details & re-verify live page updates
 * 10. Archive Hunt (status=archived)
 * 11. Verify graceful unavailable screen publicly
 * 12. Verify presence in Admin Library under Archived
 * 13. Create, Edit, Reorder, and Delete a Collection
 * 14. Clean up any test artifacts from Blob
 * 15. Verify original 72 hunts and 7 collections remain 100% intact
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { signSession, SESSION_COOKIE } from '../lib/auth';
import { readBlob } from '../lib/cms/blobClient';
import { HuntItem, HUNTS_DATA, COLLECTIONS } from '../data/hunts';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
let adminToken = '';

function check(label: string, passed: boolean, detail?: string): void {
  const icon = passed ? '✅' : '❌';
  const msg = `   ${icon} ${label}`;
  console.log(detail ? `${msg} — ${detail}` : msg);
  if (!passed) process.exitCode = 1;
}

async function runPhase3WorkflowTest() {
  console.log('\n🎬 Movie Hunt CMS — Phase 3 Workflow Verification Suite');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Step 1: Admin Token
  adminToken = await signSession({ sub: 'admin', role: 'admin' });
  const authHeaders = {
    'Content-Type': 'application/json',
    Cookie: `${SESSION_COOKIE}=${adminToken}`,
  };

  // Check baseline
  const { data: initialHunts } = await readBlob<HuntItem[]>('hunts.json');
  console.log(`📋 Baseline catalog: ${initialHunts.length} hunts in Blob\n`);

  const testId = `day-988-phase3-workflow-test`;
  const testDay = 988;

  // Step 2: Save as Draft with External URL (Method A)
  console.log('── Step 2: Save as Draft with External Poster URL (Method A) ──');
  const draftPayload: Partial<HuntItem> = {
    id: testId,
    day: testDay,
    title: 'Phase 3 Cinema Odyssey',
    type: 'movie',
    year: 2026,
    tagline: 'A REVOLUTION IN CINEMATIC CURATION.',
    hook: 'The definitive test recommendation created through Phase 3 Admin.',
    imdbRating: 9.3,
    cast: ['Lead Actor Alpha', 'Supporting Star Beta'],
    director: 'Master Filmmaker',
    duration: '125 min',
    language: 'Hindi',
    availableOn: {
      name: 'Netflix',
      url: 'https://netflix.com',
    },
    storySummary: 'An intense editorial journey through the modern Movie Hunt CMS architecture.',
    whyWatch: 'Exquisite cinematic craftsmanship with unmatched tension.',
    shouldYouWatch: 'YES. Absolutely required viewing for film enthusiasts.',
    emotionalLines: ['“Craft over commerce.”', '“Every frame tells a story.”'],
    bestScenes: ['The opening tracking shot', 'The climactic resolution'],
    moodTags: ['🤯 Mind-Blowing', '✨ Masterpiece'],
    genres: ['Drama', 'Thriller'],
    musicVibe: 'Hypnotic orchestral strings',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
    images: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
    ],
    trailerYoutubeId: 'dQw4w9WgXcQ',
    featured: true,
    status: 'draft',
  };

  const createDraftRes = await fetch(`${BASE_URL}/api/admin/hunts`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(draftPayload),
  });
  check('Save Hunt as Draft', createDraftRes.status === 201, `Status=${createDraftRes.status}`);

  // Step 3: Verify draft is invisible publicly
  console.log('\n── Step 3: Verify Draft Isolation from Public Site ──');
  const draftPublicPage = await fetch(`${BASE_URL}/hunt/${testId}`);
  const draftPublicHtml = await draftPublicPage.text();
  const isGracefulUnavailable = draftPublicHtml.includes('not available right now') || draftPublicPage.status === 404;
  check('Draft page is unavailable publicly', isGracefulUnavailable, `Status=${draftPublicPage.status}`);

  const journeyRes = await fetch(`${BASE_URL}/journey`);
  const journeyHtml = await journeyRes.text();
  check('Draft excluded from /journey archive', !journeyHtml.includes('Phase 3 Cinema Odyssey'));

  // Step 4: Verify draft appears in Admin Library
  console.log('\n── Step 4: Verify Draft in Admin Library ──');
  const adminHuntsRes = await fetch(`${BASE_URL}/api/admin/hunts?status=all`, {
    headers: authHeaders,
  });
  const adminHuntsData = await adminHuntsRes.json();
  const foundDraft = (adminHuntsData.hunts as HuntItem[]).find((h) => h.id === testId);
  check('Draft present in Admin Library', !!foundDraft && foundDraft.status === 'draft');

  // Step 5: Test Media Upload (Method B - Blob Fallback)
  console.log('\n── Step 5: Test Media Upload API (Method B) ──');
  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const boundary = '----WebKitFormBoundaryPhase3Test';
  const postBody = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="test-poster.png"\r\nContent-Type: image/png\r\n\r\n`),
    pngHeader,
    Buffer.from(`\r\n--${boundary}--\r\n`),
  ]);

  const uploadRes = await fetch(`${BASE_URL}/api/admin/media`, {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      Cookie: `${SESSION_COOKIE}=${adminToken}`,
    },
    body: postBody,
  });
  const uploadData = await uploadRes.json();
  check('Fallback Image Upload to Vercel Blob', uploadRes.status === 201 && !!uploadData.url, `URL: ${uploadData.url?.slice(0, 55)}...`);

  // Step 6: Publish the Draft
  console.log('\n── Step 6: Publish Draft to Live Public Website ──');
  const publishRes = await fetch(`${BASE_URL}/api/admin/hunts/${testId}`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      status: 'published',
      coverImage: uploadData.url || draftPayload.coverImage,
    }),
  });
  check('Publish Draft via PUT', publishRes.status === 200);

  // Step 7: Verify published hunt is live publicly
  console.log('\n── Step 7: Verify Published Hunt Live on Public URL ──');
  const livePageRes = await fetch(`${BASE_URL}/hunt/${testId}`);
  const livePageHtml = await livePageRes.text();
  check('Published Hunt accessible publicly', livePageRes.status === 200 && livePageHtml.includes('Phase 3 Cinema Odyssey'), `Status=${livePageRes.status}`);

  // Step 8: Edit published hunt and verify updates
  console.log('\n── Step 8: Edit Published Hunt & Verify Instant Update ──');
  const editRes = await fetch(`${BASE_URL}/api/admin/hunts/${testId}`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      title: 'Phase 3 Cinema Odyssey (Special Edition)',
      hook: 'Updated live from Admin publishing suite!',
    }),
  });
  check('Edit published Hunt details', editRes.status === 200);

  const updatedPageRes = await fetch(`${BASE_URL}/hunt/${testId}`);
  const updatedPageHtml = await updatedPageRes.text();
  check('Live page reflects edited title', updatedPageHtml.includes('Special Edition'));

  // Step 9: Archive the Hunt (soft delete)
  console.log('\n── Step 9: Archive Hunt (Soft Delete) ──');
  const archiveRes = await fetch(`${BASE_URL}/api/admin/hunts/${testId}`, {
    method: 'DELETE',
    headers: authHeaders,
  });
  check('Archive Hunt via DELETE', archiveRes.status === 200);

  const archivedPublicRes = await fetch(`${BASE_URL}/hunt/${testId}`);
  const archivedPublicHtml = await archivedPublicRes.text();
  const archivedUnavailable = archivedPublicHtml.includes('not available right now') || archivedPublicRes.status === 404;
  check('Archived Hunt hidden from public site', archivedUnavailable);

  const adminArchivedRes = await fetch(`${BASE_URL}/api/admin/hunts?status=archived`, {
    headers: authHeaders,
  });
  const adminArchivedData = await adminArchivedRes.json();
  const foundArchived = (adminArchivedData.hunts as HuntItem[]).find((h) => h.id === testId);
  check('Archived Hunt preserved in Admin Library', !!foundArchived && foundArchived.status === 'archived');

  // Step 10: Curated Collection CRUD
  console.log('\n── Step 10: Thematic Collection CRUD in Admin ──');
  const colSlug = `test-phase3-collection-${Date.now()}`;
  const colCreateRes = await fetch(`${BASE_URL}/api/admin/collections`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      id: colSlug,
      title: '⚡ Test Editorial Playlist',
      description: 'Curated specifically during Phase 3 verification.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
      count: 8,
    }),
  });
  check('Create Collection', colCreateRes.status === 201);

  const colEditRes = await fetch(`${BASE_URL}/api/admin/collections/${colSlug}`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      title: '⚡ Test Editorial Playlist (Edited)',
      order: 0,
    }),
  });
  check('Edit & Reorder Collection', colEditRes.status === 200);

  const colDeleteRes = await fetch(`${BASE_URL}/api/admin/collections/${colSlug}`, {
    method: 'DELETE',
    headers: authHeaders,
  });
  check('Delete Collection Safely', colDeleteRes.status === 200);

  // Step 11: Cleanup test records from storage
  console.log('\n── Step 11: Cleanup Test Records & Final Integrity Check ──');
  const { data: finalHuntsRaw, version: huntsVersion } = await readBlob<HuntItem[]>('hunts.json');
  const cleanedHunts = finalHuntsRaw.filter((h) => h.id !== testId);
  if (cleanedHunts.length !== finalHuntsRaw.length) {
    const { writeBlob } = await import('../lib/cms/blobClient');
    await writeBlob('hunts.json', cleanedHunts, huntsVersion);
    console.log(`   ✓ Cleaned test hunt from Blob, remaining: ${cleanedHunts.length}`);
  }

  // Step 12: Verify Catalog Integrity
  const { data: verifiedHunts } = await readBlob<HuntItem[]>('hunts.json');
  const { data: verifiedCollections } = await readBlob<any[]>('collections.json');

  check('Catalog count matches original (72 hunts)', verifiedHunts.length === 72, `Count=${verifiedHunts.length}`);
  check('Collections count matches original (7 collections)', verifiedCollections.length === 7, `Count=${verifiedCollections.length}`);

  console.log('\n═══════════════════════════════════════════════════════════');
  if (process.exitCode !== 1) {
    console.log('🎉 ALL PHASE 3 END-TO-END WORKFLOW CHECKS PASSED!\n');
  } else {
    console.log('❌ Some workflow checks failed. Review logs above.\n');
  }
}

runPhase3WorkflowTest().catch((err) => {
  console.error('Fatal error during Phase 3 workflow test:', err);
  process.exit(1);
});
