'use client';

import SidebarItem from '@/components/SidebarItem';
import React from 'react';
import { mainSidebar } from '@/components/sidebars';
import { LucideIcon } from 'lucide-react';

export default function Sidebar() {
  return (
    <div
      className="fixed inset-0 top-[65px] max-h-screen w-full overflow-auto border-r border-border p-4 shadow backdrop-blur max-md:z-40 max-md:hidden max-md:aria-expanded:block md:sticky md:top-0 md:w-72"
      id="sidebar" aria-expanded={false}
    >
      {mainSidebar.map(item => <SidebarItem key={item.label} item={item} />)}
    </div>
  );
}

export interface ISidebarItem {
  label: string;
  slug?: string;
  items?: ISidebarItem[];
  icon?: LucideIcon;
}

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
