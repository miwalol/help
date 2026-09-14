import type { ISidebarItem } from '@/lib/types';

export function findPathBySlug(items: ISidebarItem[], targetSlug: string): ISidebarItem[] | null {
  for (const item of items) {
    if (item.slug === targetSlug) {
      return [item];
    }

    if (item.items?.length) {
      const childPath = findPathBySlug(item.items, targetSlug);
      if (childPath) {
        return [item, ...childPath];
      }
    }
  }

  return null;
}

/** Flattens a sidebar into the slugs of the pages it links to, in navigation order. */
export function flattenSidebar(items: ISidebarItem[]): string[] {
  return items.flatMap(item => [
    ...(item.slug ? [normalizeSlug(item.slug)] : []),
    ...flattenSidebar(item.items ?? []),
  ]);
}

export function normalizeSlug(slug: string): string {
  return `/${slug.replace(/^\/+|\/+$/g, '')}`;
}
