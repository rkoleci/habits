import { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google'
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import UserProvider from '@/components/context/UserProvider';
import SupabaseClientProvider from '@/components/context/SupabaseClient';
import '../../globals.css'
import Navbar from '@/components/ui/Navbar';
import PlausibleProvider from 'next-plausible'
import getSeoTags from '@utils/seo'
import { appName, domain } from '@/utils/config';
import Script from 'next/script';

const seoTags = getSeoTags({
  title: `Don't give up good
  habits,reward yourself | ${appName}`
})

const meta = {
  title: seoTags.title,
  description: seoTags.appDescription,
  cardImage: '/hero.webp',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: getURL(),
  canonicalUrlRelative: '/'
};

const font = Bricolage_Grotesque({
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['Vercel', 'Supabase', 'Next.js', 'Stripe', 'Subscription'],
    authors: [{ name: 'Rei Koleci', url: 'https://github.com/rkoleci' }],
    creator: 'Vercel',
    publisher: 'Vercel',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Vercel',
      creator: '@Vercel',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage]
    },
    alternates: {
      canonical: meta.canonicalUrlRelative
    }
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {

  return (
    <html lang="en" data-theme="shipfast">
      <head>
        <PlausibleProvider domain="yourdomain.com" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TXVC25NF9H"></Script>
        <Script id="google-analytics" dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TXVC25NF9H');`
        }}>
          
        </Script>
      </head>
      <link rel="canonical" href={`${domain}${meta.canonicalUrlRelative}`} />
      <body>
        <SupabaseClientProvider>
          <UserProvider>
            <Suspense>
              <Navbar />
            </Suspense>
            <main
              id="skip"
              className={`min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)] ${font.className}`}
            >
              {children}
            </main>
            <Suspense>
              <Toaster />
            </Suspense>
          </UserProvider>
        </SupabaseClientProvider>
      </body>
    </html>
  );
}
