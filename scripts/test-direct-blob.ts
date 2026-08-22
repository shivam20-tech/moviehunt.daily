import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { readBlob, writeBlob } from '../lib/cms/blobClient';
import { HuntItem } from '../data/hunts';

async function main() {
  console.log('Testing direct readBlob...');
  const res1 = await readBlob<HuntItem[]>('hunts.json');
  console.log('Read version:', res1.version);
  console.log('Read hunts count:', res1.data.length);

  const testHunt: HuntItem = {
    id: 'day-999-direct-test',
    day: 999,
    type: 'movie',
    title: 'Direct Test Movie',
    year: 2026,
    tagline: 'DIRECT TEST',
    hook: 'Direct test hook',
    imdbRating: 8,
    cast: [],
    director: 'Test Director',
    language: 'Hindi',
    availableOn: { name: 'Test', url: '#' },
    storySummary: 'Direct test summary',
    whyWatch: 'Direct test why watch',
    shouldYouWatch: 'YES',
    bestFor: [],
    afterCreditsEmotion: 'Inspired',
    emotionalLines: [],
    bestScenes: [],
    moodTags: [],
    genres: ['Drama'],
    musicVibe: 'Ambient',
    coverImage: 'https://example.com/test.jpg',
    images: [],
    status: 'draft',
  };

  console.log('Writing test hunt...');
  const writeRes = await writeBlob('hunts.json', [...res1.data, testHunt], res1.version);
  console.log('Write version:', writeRes.version);
  console.log('Write URL:', writeRes.url);

  console.log('Reading back immediately...');
  const res2 = await readBlob<HuntItem[]>('hunts.json');
  console.log('Read back version:', res2.version);
  console.log('Read back hunts count:', res2.data.length);
  const found = res2.data.find((h) => h.id === 'day-999-direct-test');
  console.log('Found test hunt in blob:', !!found, 'status:', found?.status);

  // Clean up
  console.log('Cleaning up...');
  const clean = res2.data.filter((h) => h.id !== 'day-999-direct-test');
  await writeBlob('hunts.json', clean, res2.version);
  console.log('Cleanup complete!');
}

main().catch(console.error);
