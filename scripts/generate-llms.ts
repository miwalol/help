/**
 * Generates the llms.txt bundle served from the site root:
 *
 * - `llms.txt`      an index of every documentation page, following https://llmstxt.org
 * - `llms-full.txt` the full text of every page in a single file
 * - `<slug>.md`     a Markdown mirror of each page, linked from the index
 *
 * Everything is written into `public/`, which Next copies verbatim into the static export.
 */
import { mkdir, readdir, readFile, rm, rmdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { developersSidebar, mainSidebar } from '@/components/sidebar/sidebars';
import { findContentPages, flattenSidebar } from '@/lib/content';
import { mdxToMarkdown, type MdxToMarkdownOptions } from './mdx-to-markdown';

const SITE_TITLE = 'Miwa.lol Help';
const SUMMARY_SLUG = '/welcome';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

interface Page {
  slug: string;
  title: string;
  description: string;
  source: string;
}

interface Section {
  title: string;
  slugs: string[];
}

async function main(): Promise<void> {
  const baseUrl = readBaseUrl();
  const pages = await readPages();
  const sections = buildSections(pages);
  const options = { baseUrl, markdownSlugs: new Set(pages.keys()) };

  const markdown = new Map<string, string>();
  for (const [slug, page] of pages) {
    markdown.set(slug, renderPage(page, options));
  }

  const summary = pages.get(SUMMARY_SLUG)?.description ?? '';
  const ordered = sections.flatMap(section => section.slugs);

  await cleanGeneratedMarkdown(PUBLIC_DIR);
  for (const slug of ordered) {
    const file = path.join(PUBLIC_DIR, `${slug.slice(1)}.md`);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, markdown.get(slug)!);
  }

  await writeFile(path.join(PUBLIC_DIR, 'llms.txt'), renderIndex(sections, pages, baseUrl, summary));
  await writeFile(
    path.join(PUBLIC_DIR, 'llms-full.txt'),
    renderFull(ordered.map(slug => markdown.get(slug)!), summary),
  );

  console.log(`Generated llms.txt, llms-full.txt and ${ordered.length} Markdown pages in public/.`);
}

function readBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set.');
  return baseUrl.replace(/\/+$/, '');
}

async function readPages(): Promise<Map<string, Page>> {
  const pages = new Map<string, Page>();

  for (const { slug, filePath } of await findContentPages()) {
    const { data, content } = matter(await readFile(filePath, 'utf8'));

    if (typeof data.title !== 'string') throw new Error(`${filePath} has no title in its frontmatter.`);

    pages.set(slug, {
      slug,
      title: data.title,
      description: typeof data.description === 'string' ? data.description : '',
      source: content,
    });
  }

  return pages;
}

/**
 * Mirrors the sidebars so the index keeps the same grouping and ordering as the site navigation.
 * Pages reachable only through in-page links are slotted in right after their parent page.
 */
function buildSections(pages: Map<string, Page>): Section[] {
  const sections: Section[] = [];
  const standalone: string[] = [];

  for (const item of mainSidebar) {
    if (item.items?.length) sections.push({ title: item.label, slugs: flattenSidebar([item]) });
    else standalone.push(...flattenSidebar([item]));
  }

  if (standalone.length > 0) sections.unshift({ title: 'Overview', slugs: standalone });
  sections.push({ title: 'Developers', slugs: flattenSidebar(developersSidebar) });

  const missing = sections.flatMap(section => section.slugs).filter(slug => !pages.has(slug));
  if (missing.length > 0) throw new Error(`The sidebar links to pages that don't exist: ${missing.join(', ')}.`);

  addUnlistedPages(sections, pages);
  return sections;
}

function addUnlistedPages(sections: Section[], pages: Map<string, Page>): void {
  const listed = new Set(sections.flatMap(section => section.slugs));
  const orphans: string[] = [];

  for (const slug of [...pages.keys()].sort()) {
    if (listed.has(slug)) continue;

    const parent = findParent(sections, slug);
    if (parent) parent.section.slugs.splice(parent.index + 1, 0, slug);
    else orphans.push(slug);
  }

  if (orphans.length > 0) sections.push({ title: 'Other', slugs: orphans });
}

function findParent(sections: Section[], slug: string): { section: Section; index: number } | null {
  let best: { section: Section; index: number } | null = null;
  let bestLength = 0;

  for (const section of sections) {
    for (let index = 0; index < section.slugs.length; index++) {
      const candidate = section.slugs[index];
      if (!slug.startsWith(`${candidate}/`) || candidate.length <= bestLength) continue;

      best = { section, index };
      bestLength = candidate.length;
    }
  }

  return best;
}

function renderPage(page: Page, options: MdxToMarkdownOptions): string {
  const parts = [`# ${page.title}`];
  if (page.description) parts.push(`> ${page.description}`);
  parts.push(`Source: ${options.baseUrl}${page.slug}/`, mdxToMarkdown(page.source, options).trim());

  return `${parts.join('\n\n')}\n`;
}

function renderIndex(sections: Section[], pages: Map<string, Page>, baseUrl: string, summary: string): string {
  const lines = [`# ${SITE_TITLE}`, '', `> ${summary}`, ''];

  lines.push(
    '- Every page below is also available as HTML at the same URL without the `.md` suffix.',
    `- [llms-full.txt](${baseUrl}/llms-full.txt) holds the full text of every page in a single file.`,
    '',
  );

  for (const section of sections) {
    lines.push(`## ${section.title}`, '');

    for (const slug of section.slugs) {
      const page = pages.get(slug)!;
      const link = `- [${page.title}](${baseUrl}${slug}.md)`;
      lines.push(page.description ? `${link}: ${page.description}` : link);
    }

    lines.push('');
  }

  return `${lines.join('\n').trim()}\n`;
}

function renderFull(pages: string[], summary: string): string {
  const header = [
    `# ${SITE_TITLE}`,
    '',
    `> ${summary}`,
    '',
    'This file contains the full text of every page of the Miwa.lol help center.',
  ].join('\n');

  return `${[header, ...pages.map(page => page.trim())].join('\n\n---\n\n')}\n`;
}

/** Removes the Markdown mirrors of a previous run so renamed or deleted pages don't linger. */
async function cleanGeneratedMarkdown(dir: string): Promise<void> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await cleanGeneratedMarkdown(full);
      if ((await readdir(full)).length === 0) await rmdir(full);
    } else if (entry.name.endsWith('.md')) {
      await rm(full);
    }
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
