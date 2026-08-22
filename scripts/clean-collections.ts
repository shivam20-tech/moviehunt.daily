import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { readBlob, writeBlob } from '../lib/cms/blobClient';
import { COLLECTIONS } from '../data/hunts';

async function resetCollections() {
  const current = await readBlob<any[]>('collections.json');
  console.log('Current collections in Blob:', current.data.length);
  const clean = COLLECTIONS.map((c, i) => ({ ...c, order: i }));
  await writeBlob('collections.json', clean, current.version);
  console.log(`Cleaned collections in Blob: now ${clean.length} collections.`);
}

resetCollections().catch(console.error);
