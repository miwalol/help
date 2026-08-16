import { MetadataRoute } from 'next';
import { execSync } from 'node:child_process';
import { findContentPages } from '@/lib/content';

function getLastModificationDate(filePath: string) {
  const dateStr = execSync(`git log -1 --pretty="format:%ci" -- ${filePath}`, {
    cwd: process.cwd(),
  }).toString();
  return new Date(dateStr.trim());
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