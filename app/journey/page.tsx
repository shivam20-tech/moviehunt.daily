/**
 * app/journey/page.tsx — Server Component Wrapper
 *
 * Fetches published hunts from Vercel Blob on the server side,
 * then renders the interactive JourneyClient component with data as props.
 *
 * This pattern keeps server-side data fetching (async) separate from
 * client-side interactivity (useState, useMemo).
 */

import { getHunts } from '@/lib/cms/getHunts';
import JourneyClient from './JourneyClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'The Hunt Archive — Movie Hunt',
  description: 'Every curated Movie Hunt recommendation, from Day 1 to the latest — browse the full archive.',
};

export default async function JourneyPage() {
  const hunts = await getHunts('published');
  return <JourneyClient hunts={hunts} />;
}
