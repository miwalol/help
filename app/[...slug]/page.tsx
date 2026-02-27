import { Metadata, ResolvingMetadata } from 'next';
import Sidebar from '@/components/sidebar/Sidebar';
import path from 'node:path';
import { Pencil, TriangleAlert } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import UsefulFeedback from '@/components/ui/UsefulFeedback';
import { buildTableOfContents, getMdxPaths } from '../utils';
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
  const isDevDocs = slug[0] === 'developers';

  return (
    <div className="flex gap-4">
      <Sidebar sidebar={isDevDocs ? 'dev' : 'main'} />

      <div className="container mx-auto flex max-w-screen-sm justify-between px-4 py-8 xl:max-w-screen-xl">
        <div></div>

        <main>
          <Breadcrumb sidebar={isDevDocs ? 'dev' : 'main'} />

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

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');
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
