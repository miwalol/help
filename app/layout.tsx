import type { Metadata } from 'next';
import Header from '../components/ui/Header';
import './globals.css';
import React from 'react';
import { Outfit } from 'next/font/google';
import Footer from '@/components/ui/Footer';
import PlausibleProvider from 'next-plausible';

const outfit = Outfit({ style: ['normal'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: 'Miwa.lol Help',
    template: '%s | Miwa.lol Help',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${outfit.className} antialiased`}>
      <body>
        <PlausibleProvider customDomain="analytics.tenshii.moe" selfHosted domain="help.miwa.lol" trackOutboundLinks>
          <Header />
          {children}
          <Footer />
        </PlausibleProvider>
      </body>
    </html>
  );
}