import { Metadata, ResolvingMetadata } from 'next';
import Sidebar from '@/components/Sidebar';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Pencil, TriangleAlert } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import UsefulFeedback from '@/components/ui/UsefulFeedback';
import { buildTableOfContents } from '../utils';
import TableOfContents from '@/components/ui/TableOfContents';

async function find(slug: string[]) {
  const cwd = process.cwd();
  try {
    const m = `@/content/${slug.join('/')}.mdx`;
    return { ...await import(m), path: m.replace('@', cwd), isIndex: false };
  } catch {
    const m = `@/content/${slug.join('/')}/index.mdx`;
    return { ...await import(m), path: m.replace('@', cwd), isIndex: true };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const { default: Component, frontmatter, path, isIndex } = await find(slug);
  const toc = await buildTableOfContents(path);

  return (
    <div className="flex gap-4">
      <Sidebar />

      <div className="container mx-auto flex justify-between p-8 px-4">
        <div></div>

        <main>
          <Breadcrumb />

          <div className="mb-4">
            <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
          </div>

          <article data-pagefind-body id="content" tabIndex={-1}>
            <Component />
          </article>

          <div className="mb-6 mt-8 h-px w-full border border-border"></div>

          <div className="flex flex-wrap items-center gap-4">
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
        </main>

        <TableOfContents contents={toc} />
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
