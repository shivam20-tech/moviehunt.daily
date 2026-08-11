import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import CinematicIntroSplash from '@/components/CinematicIntroSplash';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'MovieHunt — Stop Searching. Start Watching Stories Worth Your Time.',
  description:
    'MovieHunt is a human-curated movie & series recommendation platform. Finding movies actually worth watching, one day at a time.',
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  keywords: [
    'MovieHunt',
    'Movie Recommendations',
    'Web Series Recommendations',
    'Kothanodi',
    'Tabbar',
    'Hidden Gems',
    'Curated Cinema',
    'What to watch tonight',
  ],
  openGraph: {
    title: 'MovieHunt — Curated Movies & Series Worth Your Time',
    description:
      'Eliminate decision fatigue. Handpicked daily recommendations for cinema lovers.',
    type: 'website',
    url: 'https://moviehunt.daily',
  },
};

// Microsoft Clarity Project ID — set NEXT_PUBLIC_CLARITY_ID in Vercel env vars
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased"
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Microsoft Clarity — behavioral analytics (heatmaps, sessions, scroll depth) */}
        {CLARITY_ID && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");`}
          </Script>
        )}
        <CinematicIntroSplash />
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
