import { MetadataRoute } from 'next';
import { ISidebarItem } from '@/components/Sidebar';
import { mainSidebar } from '@/components/sidebars';

function flattenItems(items: ISidebarItem[]): string[] {
  const final = [];
  for (const item of items) {
    console.log(item);
    if (item.slug)
      final.push(new URL(item.slug + (item.slug.endsWith('/') ? '' : '/'), process.env.NEXT_PUBLIC_BASE_URL).toString());

    if (Array.isArray(item.items)) final.push(...flattenItems(item.items));
  }

  return final;
}

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const items = flattenItems(mainSidebar);

  return items.map(item => ({
    url: item,
    changeFrequency: 'monthly',
    priority: 1,
  }));
}