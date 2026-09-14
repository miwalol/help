import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/docs',
    generateId: ({ entry }) =>
      entry
        .replace(/\.mdx$/, '')
        .split('/')
        .filter(segment => segment !== 'index')
        .join('/'),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { docs };
