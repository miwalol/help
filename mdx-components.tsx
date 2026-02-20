import type { MDXComponents } from 'mdx/types';
import Aside from '@/components/mdx/Aside';
import Badge from '@/components/mdx/Badge';
import Steps from '@/components/mdx/Steps';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import React from 'react';
import LinkCard from '@/components/mdx/LinkCard';
import CardGrid from '@/components/mdx/CardGrid';
import LinkButton from '@/components/mdx/LinkButton';
import { LinkIcon } from 'lucide-react';

const slugify = (title: string|React.ReactNode[]) => {
  const toReplace = /[\s()?!,'&]+/g;
  let res: string;

  if (typeof title === 'string') {
    res = title.toLowerCase().replaceAll(toReplace, '-');
  } else {
    // Only get the first part for React components
    res = (title![0] as string)!.toLowerCase().replaceAll(toReplace, '-');
  }

  if (res.endsWith('-')) res = res.slice(0, -1);
  return res;
};

const components: MDXComponents = {
  h2: ({ children }) => (
    <div className="group mb-3 mt-6 flex items-center gap-2" id={slugify(children)}>
      <h2 className="text-2xl font-bold">{children}</h2>
      <Link
        href={`#${slugify(children)}`} className="size-5 duration-100 md:opacity-0 md:group-hover:opacity-100" aria-hidden
      ><LinkIcon /></Link>
    </div>
  ),
  h3: ({ children }) => (
    <div className="group mb-3 mt-6 flex items-center gap-2" id={slugify(children)}>
      <h3 className="text-xl font-bold">{children}</h3>
      <Link
        href={`#${slugify(children)}`} className="size-5 duration-100 md:opacity-0 md:group-hover:opacity-100" aria-hidden
      ><LinkIcon /></Link>
    </div>
  ),
  h4: ({ children }) => (
    <div className="group mb-3 mt-6 flex items-center gap-2" id={slugify(children)}>
      <h4 className="text-lg font-bold">{children}</h4>
      <Link
        href={`#${slugify(children)}`} className="size-5 duration-100 md:opacity-0 md:group-hover:opacity-100" aria-hidden
      ><LinkIcon /></Link>
    </div>
  ),
  code: ({ children }) => (
    <code className="bg-gray-500 p-0.5">{children}</code>
  ),
  p: ({ children }) => (
    <p className="mt-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-2 list-inside list-disc">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-2 list-inside list-decimal">{children}</ol>
  ),
  img: (props) => (
    <a href={props.src?.src || props.src} target="_blank" rel="nofollow">
      {/* The remark plugin will automatically extract the alt text from the Markdown */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...(props as ImageProps)} className="size-full rounded-xl border border-border md:w-auto" />
    </a>
  ),
  a: ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isExternal = href.startsWith('http');
    if (!isExternal) {
      return <Link href={href} className="text-blue-500 transition-colors hover:text-blue-600">{children}</Link>;
    }
    
    return <a
      href={href} target="_blank" rel={href.startsWith('https://miwa.lol/') ? undefined : 'noreferrer'}
      className="text-blue-500 transition-colors hover:text-blue-600"
    >{children}</a>;
  },
  th: ({ children }) => <th className="p-2 text-left">{children}</th>,
  td: ({ children }) => <td className="border-y border-border p-2">{children}</td>,

  Aside,
  Badge,
  Steps,
  LinkCard,
  CardGrid,
  LinkButton,
};

export function useMDXComponents(): MDXComponents {
  return components;
}