import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { unified } from '@astrojs/markdown-remark';
import { loadEnv } from 'vite';

// `astro.config.mjs` runs before Vite's own env-file loading, so `.env` has to
// be read explicitly here to make `SITE_URL` available for `site` below.
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    react(),
    tailwind({ applyBaseStyles: false }),
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
