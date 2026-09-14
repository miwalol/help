import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { getCollection } from 'astro:content';

function getLastModificationDate(filePath: string): Date {
  try {
    const gitArgs = ['log', '-1', '--pretty=format:%ci', '--', filePath];
    const dateStr = execFileSync('git', gitArgs, { encoding: 'utf8' }).trim();
    const date = new Date(dateStr);
    if (dateStr && !Number.isNaN(date.getTime())) return date;
  } catch {
    // Fall through to the mtime below.
  }

  return statSync(filePath).mtime;
}

export const GET: APIRoute = async ({ site }) => {
  const entries = await getCollection('docs');

  const urls = entries.map((entry) => {
    const loc = new URL(`${entry.id}/`, site).toString();
    const lastmod = getLastModificationDate(entry.filePath!).toISOString();

    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      '  </url>',
    ].join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.join('\n'),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
