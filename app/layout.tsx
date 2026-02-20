import type { Metadata } from 'next';
import Header from '../components/ui/Header';
import './globals.css';
import React from 'react';
import { Outfit } from 'next/font/google';
import Footer from '@/components/ui/Footer';
import PlausibleProvider from 'next-plausible';
import SkipToContent from '@/components/SkipToContent';

const outfit = Outfit({ style: ['normal'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: 'Miwa.lol Help',
    template: '%s | Miwa.lol Help',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MiwaTeam',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${outfit.className} antialiased`}>
      <body>
        <PlausibleProvider domain="help.miwa.lol" scriptProps={{
          src: 'https://analytics.tenshii.moe/js/script.outbound-links.js',
          // @ts-ignore
          'data-api': 'https://analytics.tenshii.moe/api/record',
        }}>
          <SkipToContent />
          <Header />
          {children}
          <Footer />
        </PlausibleProvider>
      </body>
    </html>
  );
}