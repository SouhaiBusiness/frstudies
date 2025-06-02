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
    keywords: ['études françaises', 'linguistique', 'littérature', 'français', 'cours de français', 'ressources pédagogiques', 
      'communication', 'didactique', 'traduction', 'philosophie', 'commentaire composé', 'essai', 'dissertation', 'sociologie', 'psychologie'],
      openGraph: {
    title: 'ETUDESFRANÇAISES',
    description: 'Ressources pour les étudiants de français',
    url: 'https://frstudies.vercel.app',
    siteName: 'ETUDESFRANÇAISES',
    images: [
      {
        url: 'https://frstudies.vercel.app/og-image.png', // You'll need to create this image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
   
  icons: {
    icon: '/favicon.png', // or favicon.png if you want to use PNG
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;


  return (
    <ClerkProvider>
      <html lang='fr'>
      <head>

          
          {/* Google Analytics Script */}
          {gaMeasurementId && (
            <>
              <Script
                strategy='afterInteractive'
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              />
              <Script id='google-analytics' strategy='afterInteractive'>
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
              <main className='flex-grow'>{children}</main>
            </Aos>
            <ScrollToTopBtn />
            <Footer />
            {/*  Navigation Events for Google analytics */}
            <NavigationEvents />
          </NotificationProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
