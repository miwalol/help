import { MetadataRoute } from 'next';
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { findContentPages } from '@/lib/content';

// A page that isn't committed yet — a new one being written locally — has no git
// history, and `git log` answers with an empty string. Falling back to the file's
// own mtime keeps the build working instead of throwing on an invalid date.
function getLastModificationDate(filePath: string) {
  try {
    const dateStr = execFileSync('git', ['log', '-1', '--pretty=format:%ci', '--', filePath], { cwd: process.cwd() })
      .toString().trim();

    const date = new Date(dateStr);
    if (dateStr && !Number.isNaN(date.getTime())) return date;
  } catch {
    // Fall through to the mtime below.
  }

  return statSync(filePath).mtime;
}

export const dynamic = 'force-static';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await findContentPages();

  return pages.map(page => ({
    url: new URL(`${page.slug}/`, process.env.NEXT_PUBLIC_BASE_URL).toString(),
    changeFrequency: 'weekly',
    lastModified: getLastModificationDate(page.filePath),
  }));
}