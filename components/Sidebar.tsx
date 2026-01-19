'use client';

import SidebarItem from '@/components/SidebarItem';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { mainSidebar } from '@/components/sidebars';
import { LucideProps } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="p-4 w-72 max-h-screen shadow overflow-auto border-r border-border sticky top-0">
      {mainSidebar.map(item => <SidebarItem key={item.label} item={item} />)}
    </div>
  );
}

export interface ISidebarItem {
  label: string;
  slug?: string;
  items?: ISidebarItem[];
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
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
