'use client';

import SidebarItem from '@/components/sidebar/SidebarItem';
import React, { useLayoutEffect, useRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { developersSidebar, mainSidebar } from '@/components/sidebar/sidebars';

let savedScroll = 0;

export default function Sidebar({ sidebar }: Readonly<{ sidebar: 'main' | 'dev' }>) {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current!;
    nav.scrollTop = savedScroll;
    const onScroll = () => { savedScroll = nav.scrollTop; };
    nav.addEventListener('scroll', onScroll, { passive: true });

    return () => nav.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="absolute inset-0 top-16 max-h-screen w-full overflow-auto border-r border-border p-4 shadow backdrop-blur max-md:z-40 max-md:hidden max-md:data-[open=true]:block md:sticky md:top-0 md:w-72"
      id="sidebar"
      data-open="false"
      aria-label="Documentation navigation"
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
