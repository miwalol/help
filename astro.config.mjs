import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { unified } from '@astrojs/markdown-remark';
import { loadEnv } from 'vite';
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

// `astro.config.mjs` runs before Vite's own env-file loading, so `.env` has to
// be read explicitly here to make `SITE_URL` available for `site` below.
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

function getLastModificationDate(filePath) {
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

const docsDir = 'src/content/docs';
// Pathname -> lastmod, keyed the same way content.config.ts's `generateId` builds doc URLs.
const lastmodByPathname = new Map(
  readdirSync(docsDir, { recursive: true })
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const id = file.replace(/\.mdx$/, '').split('/').filter((segment) => segment !== 'index').join('/');
      return [`/${id}/`, getLastModificationDate(path.join(docsDir, file))];
    }),
);

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // Docs pages only, matching the old hand-rolled sitemap.xml.ts (no homepage, no 404).
      filter: (page) => lastmodByPathname.has(new URL(page).pathname),
      serialize: (item) => ({
        ...item,
        lastmod: lastmodByPathname.get(new URL(item.url).pathname)?.toISOString(),
        changefreq: 'weekly',
      }),
    }),
    pagefind(),
  ],
  markdown: {
    // The default `satteri` processor mis-parses JSX tags whose first
    // attribute starts on its own line (used throughout our MDX content).
    processor: unified(),
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
});
