'use client';

import { findPathBySlug } from '@/components/Sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { mainSidebar } from '@/components/sidebars';

export default function Breadcrumb() {
  const pathname = usePathname();
  const path = findPathBySlug(mainSidebar, pathname.slice(0, -1));
  const links = path ?? [];
  const ldJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: links.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: !item.slug ? undefined : new URL(item.slug.endsWith('/') ? item.slug : `${item.slug}/`, process.env.NEXT_PUBLIC_BASE_URL),
    })),
  });
  if (links.length <= 1) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson }}/>;
  }
  
  return <>
    <nav aria-label="Breadcrumb" className="mb-2">
      <ol className="flex items-center gap-1 text-sm">
        {!!links.length && (
          <li className="flex items-center gap-1">
            <Home size={20} />
            <ChevronRight size={20} />
          </li>
        )}
        
        {links.map((item, i) => {
          const isLast = i === links.length - 1;

          if (isLast) {
            return (
              <li key={item.label} aria-current="page">
                {item.label}
              </li>
            );
          } else if (!item.slug) {
            return (
              <li key={item.label} className="flex items-center gap-1">
                <span>{item.label}</span>
                <ChevronRight size={20} />
              </li>
            );
          }

          return (
            <li key={item.label} className="flex items-center gap-1">
              <Link href={item.slug}>{item.label}</Link>
              <ChevronRight size={20} />
            </li>
          );
        })}
      </ol>
    </nav>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson }}/>
  </>;
}
