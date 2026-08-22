import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { readBlob } from '../lib/cms/blobClient';
import { getHunts, getHuntById } from '../lib/cms/getHunts';

async function checkPanchayat() {
  const { data: allHunts } = await readBlob<any[]>('hunts.json');
  console.log('Total hunts in Blob:', allHunts.length);
  const panchayat = allHunts.find((h) => h.day === 83 || h.id.includes('panchayat') || h.title.toLowerCase().includes('panchayat'));
  console.log('Panchayat record in Blob:', JSON.stringify(panchayat, null, 2));

  const published = await getHunts('published');
  console.log('Total published hunts via getHunts:', published.length);
  const inPublished = published.find((h) => h.id === panchayat?.id);
  console.log('Found in published:', !!inPublished);

  if (panchayat) {
    const single = await getHuntById(panchayat.id, true);
    console.log('getHuntById publishedOnly=true:', !!single);
  }
}

checkPanchayat().catch(console.error);
