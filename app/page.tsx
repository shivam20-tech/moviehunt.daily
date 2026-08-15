
import Hero from '@/components/Hero';
import TodaysHunt from '@/components/TodaysHunt';
import ManifestoSection from '@/components/ManifestoSection';
import FeaturedCollections from '@/components/FeaturedCollections';
import HuntWizard from '@/components/HuntWizard';
import HuntArchiveTimeline from '@/components/HuntArchiveTimeline';
import Footer from '@/components/Footer';
import RecentlyExplored from '@/components/RecentlyExplored';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>

      {/* Chapter 1 — The Opening Frame */}
      <Hero />

      {/* Chapter 2 — Today's Story */}
      <TodaysHunt />

      {/* Phase 4 — Recently Explored (only visible to returning visitors with ≥ 2 hunts) */}
      <RecentlyExplored />

      {/* Chapter 3 — The Manifesto Moment */}
      <ManifestoSection />

      {/* Chapter 4 — The Discovery Layer */}
      <FeaturedCollections />

      {/* Chapter 4b — Find Your Story (Conversational Engine) */}
      <HuntWizard />

      {/* Chapter 5 — The Archive (Reason to Return) */}
      <HuntArchiveTimeline />

      {/* Footer */}
      <Footer />
    </main>
  );
}
