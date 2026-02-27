import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
};

const withMDX = createMDX({
  options: {
    jsx: true,
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',
      'remark-mdx-frontmatter',
    ],
    rehypePlugins: [
      'rehype-mdx-import-media',
      ['@shikijs/rehype', {
        theme: 'vitesse-dark',
        addLanguageClass: true,
      }],
    ],
  },
});

export default withMDX(nextConfig);