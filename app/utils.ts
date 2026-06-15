import { readFile } from 'node:fs/promises';
import React from 'react';
import path from 'node:path';
import { readdir } from 'node:fs/promises';

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node)
    return extractText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  return '';
}

export function slugify(title: string | React.ReactNode[]) {
  let res = extractText(title).toLowerCase();
  res = res.replace(/[<>[\]/:="]/g, '');
  res = res.replace(/[\s()?!,'&.]+/g, '-');
  res = res.replace(/^-+|-+$/g, '');
  return res;
}

function cleanHeadingText(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface TocElement {
  title: string;
  id: string;
  level: number;
}

export async function buildTableOfContents(path: string): Promise<TocElement[]> {
  const source = await readFile(path, 'utf8');
  const headings: TocElement[] = [];
  const regex = /^(#{1,6})\s+(.+?)\s*$/gm;
  let match;

  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length;
    const title = cleanHeadingText(match[2]);
    if (!title) continue;

    headings.push({ title, id: slugify(title), level });
  }

  return headings;
}

export async function getMdxPaths(dir: string, currentPath: string): Promise<{ slug: string[] }[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths: { slug: string[] }[] = [];

  await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(currentPath, entry.name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      const subPaths = await getMdxPaths(fullPath, relativePath);
      paths.push(...subPaths);
    } else if (entry.name.endsWith('.mdx')) {
      const slug = relativePath.slice(0, -4).split('/').filter(p => p !== 'index').filter(Boolean); // Remove .mdx, split into segments
      paths.push({ slug });
    }
  }));

  return paths;
}
