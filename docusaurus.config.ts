import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Miwa.lol Help',
  tagline: 'Help for Miwa.lol',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://help.miwa.lol',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'miwalol', // Usually your GitHub org/user name.
  projectName: 'help', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/miwalol/help/edit/master/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Miwa.lol Help',
      logo: {
        alt: 'Miwa.lol Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/miwalol/help',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Our Socials',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/miwa',
            },
            {
              label: 'X',
              href: 'https://x.com/MiwaTeam',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/miwa_lol',
            },
            {
              label: 'Threads',
              href: 'https://www.threads.net/miwa_lol',
            },
            {
              label: 'BlueSky',
              href: 'https://bsky.app/profile/miwa.lol',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Miwa.lol - Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
