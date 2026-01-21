import { Metadata, ResolvingMetadata } from 'next';
import Sidebar from '@/components/Sidebar';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Pencil, TriangleAlert } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import UsefulFeedback from '@/components/ui/UsefulFeedback';

async function find(slug: string[]) {
  try {
    return { ...await import(`@/content/${slug.join('/')}.mdx`), isIndex: false };
  } catch {
    return { ...await import(`@/content/${slug.join('/')}/index.mdx`), isIndex: true };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const { default: Component, frontmatter, isIndex } = await find(slug);

  return (
    <div className="flex">
      <Sidebar />

      <div className="container px-4 py-8 mx-auto">
        <Breadcrumb />

        <div className="mb-4">
          <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        </div>

        <main>
          <Component />
        </main>

        <div className="border border-border mt-8 mb-6 h-px w-full"></div>

        <div className="flex items-center gap-4 flex-wrap">
          <UsefulFeedback />

          <div className="grow"></div>

          <a
            href={`https://github.com/miwalol/help/edit/master/content/${slug.join('/')}${isIndex ? '/index' : ''}.mdx`}
            target="_blank" className="flex items-center gap-2" rel="nofollow"
          ><Pencil />Edit this page</a>

          <a
            href={`https://github.com/miwalol/help/issues/new?title=Issue in \`${slug.join('/')}\``}
            target="_blank" className="flex items-center gap-2" rel="nofollow"
          ><TriangleAlert />Raise an issue</a>
        </div>
      </div>
    </div>
  );
}

export const dynamicParams = false;

async function getMdxPaths(dir: string, currentPath: string): Promise<{ slug: string[] }[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const paths: { slug: string[] }[] = [];

  await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(currentPath, entry.name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      const subPaths = await getMdxPaths(fullPath, relativePath);
      paths.push(...subPaths);
    } else if (entry.name.endsWith('.mdx')) {
      const slug = relativePath.slice(0, -4).split('/').filter(p => p !== 'index').filter(Boolean); // Remove .mdx, split into segments
      paths.push({ slug });
    }
  }));

  return paths;
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content'); // Adjust if @/content resolves differently
  return await getMdxPaths(contentDir, '');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await find(slug);
  const { openGraph, twitter } = await parent;
  const url = new URL(slug.join('/'), process.env.NEXT_PUBLIC_BASE_URL);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    // @ts-ignore
    openGraph: {
      ...openGraph,
      title: frontmatter.title,
      description: frontmatter.description,
      url: url.toString(),
      type: 'article',
    },
    // @ts-ignore
    twitter: {
      ...twitter,
      title: frontmatter.title,
      description: frontmatter.description,
    },
    alternates: {
      canonical: url.toString(),
    },
  };
}