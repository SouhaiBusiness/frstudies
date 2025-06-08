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
import { headers } from 'next/headers';
import { isBot } from '@/lib/isBot';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ETUDESFRANÇAISES - Ressources pour les étudiants de français',
  description: 'Une plateforme destinée aux étudiants en études de français pour accéder aux cours, quiz et examens.',
  keywords: ['études françaises', 'linguistique', 'littérature', 'français', 'cours de français', 'ressources pédagogiques', 'communication', 'didactique', 'traduction', 'philosophie', 'commentaire composé', 'essai', 'dissertation', 'sociologie', 'psychologie'],
  openGraph: {
    title: 'ETUDESFRANÇAISES',
    description: 'Ressources pour les étudiants de français',
    url: 'https://frstudies.vercel.app',
    siteName: 'ETUDESFRANÇAISES',
    locale: 'fr_FR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  const isSearchEngineBot = isBot(userAgent);
  const isHomePage = headersList.get('x-next-url') === '/';

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const content = (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="4opBcAx8n5wHOMKSA5OXCPnhfzrkehvplBlaic-wSMU" />
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
  );

  // Ne pas inclure ClerkProvider pour Googlebot sur page d'accueil
  if (isSearchEngineBot && isHomePage) {
    return content;
  }

  return <ClerkProvider>{content}</ClerkProvider>;
}
