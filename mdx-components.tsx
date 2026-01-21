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

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-bold mb-3 mt-6">{children}</h4>
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