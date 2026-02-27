import { MetadataRoute } from 'next';
import { ISidebarItem } from '@/components/sidebar/Sidebar';
import { mainSidebar, developersSidebar } from '@/components/sidebar/sidebars';
import { execSync } from 'node:child_process';
import { stat } from 'fs/promises';

async function flattenItems(items: ISidebarItem[]): Promise<{
  url: string;
  lastModified: Date;
}[]> {
  const final = [];
  for (const item of items) {
    if (item.slug) {
      const url = new URL(item.slug + (item.slug.endsWith('/') ? '' : '/'), process.env.NEXT_PUBLIC_BASE_URL).toString();
      const lastModified = await getLastModificationDate(item.slug);
      final.push({ url, lastModified });
    }

    if (Array.isArray(item.items)) final.push(...await flattenItems(item.items));
  }

  return final;
}

async function getLastModificationDate(slug: string) {
  let filePath = `content${slug}.mdx`;
  try {
    await stat(filePath);
  } catch {
    filePath = `content${slug}/index.mdx`;
  }
  const dateStr = execSync(`git log -1 --pretty="format:%ci" -- ${filePath}`, {
    cwd: process.cwd(),
  }).toString();
  return new Date(dateStr.trim());
}

export const dynamic = 'force-static';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mainItems = await flattenItems(mainSidebar);
  const devItems = await flattenItems(developersSidebar);

  return [...mainItems, ...devItems].map(item => ({
    url: item.url,
    changeFrequency: 'weekly',
    priority: 1,
    lastModified: item.lastModified,
  }));
}