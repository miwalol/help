import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mt-12">
        <h1 className="text-5xl font-semibold">Miwa.lol Help</h1>

        <p className="mt-6 text-lg">
          <strong>Need help with Miwa.lol?</strong> This website should help you!
        </p>

        <Button asChild className="inline-block">
          <Link href="/welcome">Get Started</Link>
        </Button>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Miwa.lol Help',
  description: 'Need help with Miwa.lol? This website should help you!',
  alternates: {
    canonical: '/',
  },
};