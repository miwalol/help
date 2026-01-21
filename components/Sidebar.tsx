'use client';

import SidebarItem from '@/components/SidebarItem';
import React from 'react';
import { mainSidebar } from '@/components/sidebars';
import { LucideIcon } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="p-4 w-full md:w-72 max-h-screen shadow overflow-auto border-r border-border absolute max-md:z-40 md:sticky inset-0 top-[65px] md:top-0 max-md:hidden max-md:aria-expanded:block backdrop-blur" id="sidebar" aria-expanded={false}>
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
