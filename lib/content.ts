import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import type { ISidebarItem } from '@/components/sidebar/Sidebar';

export const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ContentPage {
  /** Route slug, with a leading slash and without a trailing one, e.g. `/cards/settings`. */
  slug: string;
  /** The slug split into route segments, as `generateStaticParams` expects it. */
  segments: string[];
  /** Absolute path of the MDX file backing the page. */
  filePath: string;
}

export interface ContentFile {
  filePath: string;
  /** Whether the page is backed by `<slug>/index.mdx` rather than `<slug>.mdx`. */
  isIndex: boolean;
}

/** Every page under `content/`, sorted by slug. */
export async function findContentPages(dir: string = CONTENT_DIR): Promise<ContentPage[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const pages: ContentPage[] = [];

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...await findContentPages(filePath));
    } else if (entry.name.endsWith('.mdx')) {
      const segments = path.relative(CONTENT_DIR, filePath)
        .replace(/\\/g, '/')
        .replace(/\.mdx$/, '')
        .split('/')
        .filter(segment => segment !== 'index');

      pages.push({ slug: `/${segments.join('/')}`, segments, filePath });
    }
  }

  return pages.sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Resolves a slug to its MDX file, which may be either `<slug>.mdx` or `<slug>/index.mdx`. */
export async function contentFilePath(slug: string): Promise<ContentFile> {
  const flat = path.join(CONTENT_DIR, `${normalizeSlug(slug).slice(1)}.mdx`);

  try {
    await stat(flat);
    return { filePath: flat, isIndex: false };
  } catch {
    return { filePath: path.join(path.dirname(flat), path.basename(flat, '.mdx'), 'index.mdx'), isIndex: true };
  }
}

/** Flattens a sidebar into the slugs of the pages it links to, in navigation order. */
export function flattenSidebar(items: ISidebarItem[]): string[] {
  return items.flatMap(item => [
    ...(item.slug ? [normalizeSlug(item.slug)] : []),
    ...flattenSidebar(item.items ?? []),
  ]);
}

function normalizeSlug(slug: string): string {
  return `/${slug.replace(/^\/+|\/+$/g, '')}`;
}
