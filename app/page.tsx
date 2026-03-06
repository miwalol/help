import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import CardGrid from '@/components/mdx/CardGrid';
import LinkCard from '@/components/mdx/LinkCard';
import { Code, HandHelping, Mail, Paintbrush } from 'lucide-react';

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 lg:px-32">
      <section className="my-12">
        <h1 className="text-5xl font-semibold">Miwa.lol Help</h1>

        <p className="my-6 text-lg">
          <strong>Need help with Miwa.lol?</strong> This website should help you!
        </p>

        <Button asChild className="inline-block">
          <Link href="/welcome">Get Started</Link>
        </Button>
      </section>

      <section>
        <div>
          <h2 className="mb-1 text-3xl font-bold">Helpful Resources</h2>
          <p className="text-gray-300">
            Here are some helpful resources to get you started with Miwa.lol.
          </p>
        </div>

        <CardGrid>
          <LinkCard 
            href="/customize/" title="Customization" icon={Paintbrush}
            description="Learn how to customize your Miwa.lol profile with fonts, colors, layouts, and more."
          />

          <LinkCard
            href="/developers/" title="API Docs" icon={Code}
            description="Explore the Miwa.lol API documentation for developers to integrate and build with our platform."
          />

          <LinkCard
            href="/misc/troubleshooting/" title="Troubleshooting" icon={HandHelping}
            description="Having issues with Miwa.lol? This page provides troubleshooting steps and solutions."
          />

          <LinkCard
            href="/misc/contact/" title="Contact Support" icon={Mail}
            description="Need further assistance? Contact our support team for help with any issues you may have."
          />
        </CardGrid>
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