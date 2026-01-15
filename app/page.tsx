import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Page() {
  return (
    <main className="container px-4 py-8 mx-auto">
      <section className="mt-12">
        <h1 className="font-semibold text-5xl">Miwa.lol Help</h1>

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