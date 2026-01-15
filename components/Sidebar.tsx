'use client';

import SidebarItem from '@/components/SidebarItem';

export default function Sidebar() {
  const sidebar: ISidebarItem[] = [
    {
      label: 'Welcome to Miwa.lol!',
      slug: '/welcome',
    },
    {
      label: 'Getting Started',
      items: [
        {
          label: 'Creating an Account',
          slug: '/getting-started/creating-an-account',
        },
        {
          label: 'Navigating the Dashboard',
          slug: '/getting-started/navigating-the-dashboard',
        },
        {
          label: 'Leaderboard',
          slug: '/getting-started/leaderboard',
        },
        {
          label: 'Pricing',
          slug: '/getting-started/pricing',
        },
      ],
    },
    {
      label: 'Account',
      items: [
        {
          label: 'Username',
          slug: '/account/username',
        },
        {
          label: 'Security',
          slug: '/account/security',
        },
        {
          label: 'Badges',
          slug: '/account/badges',
        },
        {
          label: 'Custom Domain',
          slug: '/account/custom-domain',
        },
      ],
    },
    {
      label: 'Customize',
      slug: '/customize',
      items: [
        {
          label: 'Assets',
          slug: '/customize/assets',
        },
        {
          label: 'Colors',
          slug: '/customize/colors',
        },
        {
          label: 'Fonts',
          slug: '/customize/fonts',
        },
        {
          label: 'Layout',
          slug: '/customize/layout',
        },
        {
          label: 'Privacy',
          slug: '/customize/privacy',
        },
        {
          label: 'Tab',
          slug: '/customize/tab',
        },
        {
          label: 'Miscellaneous',
          slug: '/customize/misc',
        },
        {
          label: 'Links',
          slug: '/links',
          items: [
            {
              label: 'Supported Platforms',
              slug: '/links/supported-platforms',
            },
            {
              label: 'Adding a Link',
              slug: '/links/adding-a-link',
            },
            {
              label: 'Adding a Custom Link',
              slug: '/links/adding-a-custom-link',
            },
          ],
        },
        {
          label: 'Cards',
          slug: '/cards',
          items: [
            {
              label: 'Examples',
              slug: '/cards/examples',
            },
            {
              label: 'Settings',
              slug: '/cards/settings',
            },
          ],
        },
        {
          label: 'Templates',
          slug: '/templates',
          items: [
            {
              label: 'Creating a Template',
              slug: '/templates/creating-a-template',
            },
          ],
        },
      ],
    },
    {
      label: 'How To\'s',
      items: [
        {
          label: 'Link your Discord account',
          slug: '/how-to/link-your-discord',
        },
        {
          label: 'Profile Views',
          slug: '/how-to/profile-views',
        },
        {
          label: 'Likes',
          slug: '/how-to/likes',
        },
        {
          label: 'Verified Badge',
          slug: '/how-to/verified-badge',
        },
        {
          label: 'Bug Hunter Badge',
          slug: '/how-to/bug-hunter-badge',
        },
      ],
    },
    {
      label: 'Miscellaneous',
      items: [
        {
          label: 'Contact Us',
          slug: '/misc/contact',
        },
        {
          label: 'Changelog',
          slug: '/misc/changelog',
        },
        {
          label: 'Open Source',
          slug: '/misc/open-source',
        },
        {
          label: 'Troubleshooting',
          slug: '/misc/troubleshooting',
        },
        {
          label: 'Donating',
          slug: '/misc/donating',
        },
        {
          label: 'Bans',
          slug: '/misc/bans',
        },
      ],
    },
  ];

  return (
    <div className="p-4 w-72 max-h-screen shadow overflow-auto border-r border-border sticky top-0">
      {sidebar.map(item => <SidebarItem key={item.label} item={item} />)}
    </div>
  );
}

export interface ISidebarItem {
  label: string;
  slug?: string;
  items?: ISidebarItem[];
}