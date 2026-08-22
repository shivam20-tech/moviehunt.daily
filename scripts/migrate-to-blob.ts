/**
 * scripts/migrate-to-blob.ts
 *
 * One-time migration script: converts data/hunts.ts → Vercel Blob JSON.
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { put } from '@vercel/blob';
import { HUNTS_DATA, COLLECTIONS } from '../data/hunts';
import * as crypto from 'crypto';

const REQUIRED_ENV = ['BLOB_READ_WRITE_TOKEN'];

function checkEnv(): void {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    console.error('\n❌ Missing required environment variables:');
    missing.forEach((k) => console.error(`   ${k}`));
    process.exit(1);
  }
}

function sha256(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

async function uploadDocument<T>(key: string, data: T): Promise<{ url: string; downloadUrl?: string }> {
  const payload = JSON.stringify(data, null, 2);
  const version = sha256(payload);
  const timestamp = new Date().toISOString();

  const doc = {
    _version: version,
    _updatedAt: timestamp,
    data,
  };

  const blob = await put(key, JSON.stringify(doc, null, 2), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
  });

  return { url: blob.url, downloadUrl: (blob as any).downloadUrl };
}

async function migrate() {
  console.log('\n🎬 Movie Hunt CMS — Migration Script');
  console.log('════════════════════════════════════\n');

  checkEnv();

  console.log('📚 Reading from data/hunts.ts...');
  console.log(`   Found ${HUNTS_DATA.length} hunts`);

  const migrated = HUNTS_DATA.map((hunt) => ({
    ...hunt,
    status: hunt.status ?? ('published' as const),
  }));

  const issues: string[] = [];
  migrated.forEach((h) => {
    if (!h.id) issues.push(`Hunt missing id: Day ${h.day} "${h.title}"`);
    if (!h.day) issues.push(`Hunt missing day: "${h.title}"`);
    if (!h.title) issues.push(`Hunt missing title: id "${h.id}"`);
  });

  if (issues.length > 0) {
    console.error('\n❌ Data integrity issues found:');
    issues.forEach((i) => console.error(`   ${i}`));
    process.exit(1);
  }

  console.log(`   ✓ All ${migrated.length} hunts validated\n`);

  console.log('☁️  Uploading hunts.json to Vercel Blob...');
  const huntsResult = await uploadDocument('hunts.json', migrated);
  console.log('   ✓ hunts.json uploaded');
  console.log(`   URL: ${huntsResult.url}`);
  if (huntsResult.downloadUrl) {
    console.log(`   Download URL: ${huntsResult.downloadUrl}`);
  }
  console.log('');

  console.log('📂 Uploading collections.json to Vercel Blob...');
  const collectionsWithOrder = COLLECTIONS.map((c, i) => ({ ...c, order: i }));
  const collectionsResult = await uploadDocument('collections.json', collectionsWithOrder);
  console.log('   ✓ collections.json uploaded');
  console.log(`   URL: ${collectionsResult.url}`);
  if (collectionsResult.downloadUrl) {
    console.log(`   Download URL: ${collectionsResult.downloadUrl}`);
  }
  console.log('');

  const movies = migrated.filter((h) => h.type === 'movie').length;
  const series = migrated.filter((h) => h.type === 'series').length;
  const maxDay = Math.max(...migrated.map((h) => h.day));

  console.log('✅ Migration Complete!');
  console.log('═══════════════════════');
  console.log(`   Total Hunts : ${migrated.length}`);
  console.log(`   Movies      : ${movies}`);
  console.log(`   Series      : ${series}`);
  console.log(`   Max Day     : Day ${maxDay}`);
  console.log(`   Collections : ${COLLECTIONS.length}`);
  console.log('');
}

migrate().catch((err) => {
  console.error('\n❌ Migration failed:', err);
  process.exit(1);
});
