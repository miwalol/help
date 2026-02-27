'use client';

import SidebarItem from '@/components/sidebar/SidebarItem';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { developersSidebar, mainSidebar } from '@/components/sidebar/sidebars';

export default function Sidebar({ sidebar }: { sidebar: 'main' | 'dev' }) {
  return (
    <div
      className="absolute inset-0 top-16 max-h-screen w-full overflow-auto border-r border-border p-4 shadow backdrop-blur max-md:z-40 max-md:hidden max-md:aria-expanded:block md:sticky md:top-0 md:w-72"
      id="sidebar" aria-expanded={false}
    >
      {(sidebar === 'main' ? mainSidebar : developersSidebar).map(item => <SidebarItem key={item.label} item={item} />)}
    </div>
  );
}

export interface ISidebarItem {
  label: string;
  slug?: string;
  items?: ISidebarItem[];
  icon?: LucideIcon;
}
