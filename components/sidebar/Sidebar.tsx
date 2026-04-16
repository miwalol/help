'use client';

import SidebarItem from '@/components/sidebar/SidebarItem';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { developersSidebar, mainSidebar } from '@/components/sidebar/sidebars';

export default function Sidebar({ sidebar }: { sidebar: 'main' | 'dev' }) {
  return (
    <nav
      className="absolute inset-0 top-16 max-h-screen w-full overflow-auto border-r border-border p-4 shadow backdrop-blur max-md:z-40 max-md:hidden max-md:data-[open=true]:block md:sticky md:top-0 md:w-72"
      id="sidebar" data-open="false" aria-label="Documentation navigation"
    >
      {(sidebar === 'main' ? mainSidebar : developersSidebar).map(item => <SidebarItem key={item.label} item={item} />)}
    </nav>
  );
}

export interface ISidebarItem {
  label: string;
  slug?: string;
  items?: ISidebarItem[];
  icon?: LucideIcon;
}
