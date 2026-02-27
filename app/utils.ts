import { readFile } from 'node:fs/promises';
import React from 'react';
import path from 'node:path';
import { readdir } from 'node:fs/promises';

export function slugify(title: string | React.ReactNode[]) {
  const toReplace = /[\s()?!,'&.]+/g;
  let res: string;

  if (typeof title === 'string') {
    res = title.toLowerCase().replaceAll(toReplace, '-');
  } else {
    // Only get the first part for React components
    res = (title![0] as string)!.toLowerCase().replaceAll(toReplace, '-');
  }

  if (res.endsWith('-')) res = res.slice(0, -1);
  return res;
}

export interface TocElement {
  title: string;
  id: string;
  level: number;
}

export async function buildTableOfContents(path: string): Promise<TocElement[]> {
  const source = await readFile(path, 'utf8');
  const headings: TocElement[] = [];
  const regex = /^(#{1,6})\s+(.+?)\s*(?:<{([^}]+)})?$/gm;
  let match;

  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();

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
