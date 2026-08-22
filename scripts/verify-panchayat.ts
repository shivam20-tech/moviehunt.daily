import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { getHuntById, getHunts } from '../lib/cms/getHunts';

async function test() {
  const hunts = await getHunts('published');
  console.log('Published hunts count:', hunts.length);
  const panchayat = await getHuntById('day-83-panchayat', true);
  console.log('Panchayat fetched successfully:', panchayat?.title, 'Day:', panchayat?.day, 'Type:', panchayat?.type);
}

test().catch(console.error);
