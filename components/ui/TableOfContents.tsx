'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TocElement } from '@/app/utils';
import BackToTop from './BackToTop';

export default function TableOfContents({ contents }: {contents: TocElement[]}) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!contents.length) return;

    const elements = contents
      .map(c => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (!visible.length) return;

        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b);
        setActiveId(topmost.target.id);
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [contents]);

  if (!contents.length) {
    return <aside aria-label="On this page" className="sticky top-20 hidden max-h-[calc(100vh-6rem)] min-w-64 max-w-64 overflow-x-hidden md:block"></aside>;
  }

  return (
    <aside aria-label="On this page" className="sticky top-20 ml-8 hidden max-h-[calc(100vh-6rem)] min-w-64 max-w-64 overflow-x-hidden overflow-y-auto md:block">
      <span className="mb-1 block font-bold">On this page</span>

      <ul className="space-y-1">
        {contents.map(c => {
          const isActive = c.id === activeId;
          return (
            <li key={c.id} className="truncate">
              <a
                href={`#${c.id}`} title={c.title}
                aria-current={isActive ? 'location' : undefined}
                className={twMerge('block truncate transition-colors duration-100', isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200')}
                style={{ paddingLeft: `${c.level - 2}rem` }}
              >{c.title}</a>
            </li>
          );
        })}
      </ul>

      <BackToTop />
    </aside>
  );
}
