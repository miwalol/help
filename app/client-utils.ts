import { ISidebarItem } from '@/components/sidebar/Sidebar';

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
