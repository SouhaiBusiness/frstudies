import type { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import './globals.css';
import Aos from '@/components/Aos';
import ScrollToTopBtn from '@/components/ScrollToTopBtn';
import { NotificationProvider } from '@/components/notification';
import NavigationEvents from '@/components/navigation-events';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ETUDESFRANÇAISES - Ressources pour les étudiants de français',
  description:
    'Une plateforme destinée aux étudiants en études de français pour accéder aux cours, quiz et examens.',
  keywords: [
    'études françaises',
    'linguistique',
    'littérature',
    'français',
    'cours de français',
    'ressources pédagogiques',
    'communication',
    'didactique',
    'traduction',
    'philosophie',
    'commentaire composé',
    'essai',
    'dissertation',
    'sociologie',
    'psychologie',
  ],
  openGraph: {
    title: 'ETUDESFRANÇAISES',
    description: 'Ressources pour les étudiants de français',
    url: 'https://frstudies.vercel.app',
    siteName: 'ETUDESFRANÇAISES',
    locale: 'fr_FR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '240x240', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <ClerkProvider>
      <html lang="fr">
        <head>
          {/* Google Search Console Verification */}
          <meta
            name="google-site-verification"
            content="4opBcAx8n5wHOMKSA5OXCPnhfzrkehvplBlaic-wSMU"
          />

          {/* Favicon & PWA Icons */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            type="image/png"
            sizes="240x240"
            href="/favicon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#ffffff" />

          {/* Google Analytics */}
          {gaMeasurementId && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}');
                `}
              </Script>
            </>
          )}

          {/* Consent Manager */}
          <script
            type="text/javascript"
            data-cmp-ab="1"
            src="https://cdn.consentmanager.net/delivery/autoblocking/9f720568e26c6.js"
            data-cmp-host="c.delivery.consentmanager.net"
            data-cmp-cdn="cdn.consentmanager.net"
            data-cmp-codesrc="16"
          ></script>
        </head>

        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <NotificationProvider>
            <Navbar />
            <Aos>
              <main className="flex-grow">{children}</main>
            </Aos>
            <ScrollToTopBtn />
            <Footer />
            <NavigationEvents />
          </NotificationProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
