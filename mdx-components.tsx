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
  const toReplace = /[\s()?!,]+/g;
  if (typeof title === 'string') return title.toLowerCase().replaceAll(toReplace, '-');
  return (title![0] as string)!.toLowerCase().replaceAll(toReplace, '-');
};

const components: MDXComponents = {
  h2: ({ children }) => (
    <div className="flex items-center mb-3 mt-6 gap-2 group" id={slugify(children)}>
      <h2 className="text-2xl font-bold">{children}</h2>
      <Link href={`#${slugify(children)}`} className="size-5 md:opacity-0 md:group-hover:opacity-100 duration-100"><LinkIcon /></Link>
    </div>
  ),
  h3: ({ children }) => (
    <div className="flex items-center mb-3 mt-6 gap-2 group" id={slugify(children)}>
      <h3 className="text-xl font-bold">{children}</h3>
      <Link href={`#${slugify(children)}`} className="size-5 md:opacity-0 md:group-hover:opacity-100 duration-100"><LinkIcon /></Link>
    </div>
  ),
  h4: ({ children }) => (
    <div className="flex items-center mb-3 mt-6 gap-2 group" id={slugify(children)}>
      <h4 className="text-lg font-bold">{children}</h4>
      <Link href={`#${slugify(children)}`} className="size-5 md:opacity-0 md:group-hover:opacity-100 duration-100"><LinkIcon /></Link>
    </div>
  ),
  code: ({ children }) => (
    <code className="bg-gray-500 p-0.5">{children}</code>
  ),
  p: ({ children }) => (
    <p className="mt-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-inside list-disc mt-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-inside list-decimal mt-2">{children}</ol>
  ),
  img: (props) => (
    <Image {...(props as ImageProps)} className="size-full md:w-auto" />
  ),
  a: ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isExternal = href.startsWith('http');
    if (!isExternal) {
      return <Link href={href} className="text-blue-500 hover:text-blue-600 transition-colors">{children}</Link>;
    }
    
    return <a
      href={href} target="_blank" rel={href.startsWith('https://miwa.lol/') ? undefined : 'noreferrer'}
      className="text-blue-500 hover:text-blue-600 transition-colors"
    >{children}</a>;
  },
  th: ({ children }) => <th className="p-2 text-left">{children}</th>,
  td: ({ children }) => <td className="p-2 border-y border-border">{children}</td>,

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