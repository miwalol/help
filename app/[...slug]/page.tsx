import { Metadata, ResolvingMetadata } from 'next';
import Sidebar from '@/components/Sidebar';
import * as fs from 'node:fs/promises';
import path from 'node:path';

async function find(slug: string[]) {
  try {
    return await import(`@/content/${slug.join('/')}.mdx`);
  } catch {
    return import(`@/content/${slug.join('/')}/index.mdx`);
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const { default: Component, frontmatter } = await find(slug);

  return (
    <div className="flex">
      <Sidebar />

      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        </div>

        <main>
          <Component />
        </main>
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

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    // @ts-ignore
    openGraph: {
      ...openGraph,
      title: frontmatter.title,
      description: frontmatter.description,
    },
    // @ts-ignore
    twitter: {
      ...twitter,
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}