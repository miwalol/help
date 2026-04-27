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
import { Heading } from '@/components/mdx/Heading';
import Tabs, { Tab } from '@/components/mdx/Tabs';

const components: MDXComponents = {
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  h4: ({ children }) => <Heading level={4}>{children}</Heading>,
  pre: ({ children }) => (
    <pre className="mt-1 overflow-auto whitespace-pre-wrap rounded-md bg-gray-700 p-0.5">{children}</pre>
  ),
  code: ({ children }) => (
    <code className="rounded-md bg-gray-700 p-0.5">{children}</code>
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
  Tabs,
  Tab,
};

export function useMDXComponents(): MDXComponents {
  return components;
}