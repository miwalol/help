import { readdir } from 'node:fs/promises';
import path from 'node:path';

export const CONTENT_DIR = path.join(process.cwd(), 'src/content/docs');

export interface ContentPage {
  /** Route slug, with a leading slash and without a trailing one, e.g. `/cards/settings`. */
  slug: string;
  /** Absolute path of the MDX file backing the page. */
  filePath: string;
}

/** Every page under `src/content/docs/`, sorted by slug. */
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

      pages.push({ slug: `/${segments.join('/')}`, filePath });
    }
  }

  return pages.sort((a, b) => a.slug.localeCompare(b.slug));
}
