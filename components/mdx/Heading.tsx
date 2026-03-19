import Link from 'next/link';
import { LinkIcon } from 'lucide-react';
import { slugify } from '@/app/utils';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const sizeMap = { 2: 'text-2xl', 3: 'text-xl', 4: 'text-lg' } as const;

interface HeadingProps {
  level: 2 | 3 | 4;
  children: React.ReactNode;
}

export function Heading({ level, children }: Readonly<HeadingProps>) {
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  const slug = slugify(children as React.ReactNode[]);

  return (
    <div className="group mb-3 mt-6 flex items-center gap-2" id={slug}>
      <Tag className={twMerge(sizeMap[level], 'font-bold')}>{children}</Tag>

      <Link
        href={`#${slug}`} aria-hidden tabIndex={-1}
        className="size-5 duration-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <LinkIcon />
      </Link>
    </div>
  );
}
