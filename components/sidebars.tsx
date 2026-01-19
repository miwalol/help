import {
  Archive,
  ArrowBigUpDash,
  BadgeCheck, BookDashed,
  Bug, CaseSensitive, CircleUser,
  Code, EarthLock, Eye,
  Hammer,
  HandCoins, Heart, IdCardLanyard, LinkIcon, Lock,
  Mail, Map,
  MessageCircleQuestionMark, Palette, CirclePlus,
  ScrollText, Settings,
  UserRoundPlus, Waypoints, Book, LayoutTemplate, AppWindow, Image, ListPlus, Paintbrush, Award, DollarSign, Hand,
} from 'lucide-react';
import { ISidebarItem } from '@/components/Sidebar';
import { SiDiscord } from '@icons-pack/react-simple-icons';

export const mainSidebar: ISidebarItem[] = [
  {
    label: 'Welcome to Miwa.lol!',
    slug: '/welcome',
    icon: Hand,
  },
  {
    label: 'Getting Started',
    slug: '/getting-started/',
    icon: UserRoundPlus,
    items: [
      {
        label: 'Navigating the Dashboard',
        slug: '/getting-started/navigating-the-dashboard',
        icon: Map,
      },
      {
        label: 'Leaderboard',
        slug: '/getting-started/leaderboard',
        icon: ArrowBigUpDash,
      },
      {
        label: 'Pricing',
        slug: '/getting-started/pricing',
        icon: DollarSign,
      },
    ],
  },
  {
    label: 'Account',
    icon: CircleUser,
    items: [
      {
        label: 'Username',
        slug: '/account/username',
        icon: IdCardLanyard,
      },
      {
        label: 'Security',
        slug: '/account/security',
        icon: Lock,
      },
      {
        label: 'Badges',
        slug: '/account/badges',
        icon: Award,
      },
      {
        label: 'Custom Domain',
        slug: '/account/custom-domain',
        icon: LinkIcon,
      },
    ],
  },
  {
    label: 'Customize',
    slug: '/customize',
    icon: Paintbrush,
    items: [
      {
        label: 'Assets',
        slug: '/customize/assets',
        icon: Image,
      },
      {
        label: 'Colors',
        slug: '/customize/colors',
        icon: Palette,
      },
      {
        label: 'Fonts',
        slug: '/customize/fonts',
        icon: CaseSensitive,
      },
      {
        label: 'Layout',
        slug: '/customize/layout',
        icon: LayoutTemplate,
      },
      {
        label: 'Privacy',
        slug: '/customize/privacy',
        icon: EarthLock,
      },
      {
        label: 'Tab',
        slug: '/customize/tab',
        icon: AppWindow,
      },
      {
        label: 'Miscellaneous',
        slug: '/customize/misc',
        icon: Archive,
      },
      {
        label: 'Links',
        slug: '/links',
        icon: LinkIcon,
        items: [
          {
            label: 'Supported Platforms',
            slug: '/links/supported-platforms',
            icon: Waypoints,
          },
          {
            label: 'Adding a Link',
            slug: '/links/adding-a-link',
            icon: CirclePlus,
          },
          {
            label: 'Adding a Custom Link',
            slug: '/links/adding-a-custom-link',
            icon: CirclePlus,
          },
        ],
      },
      {
        label: 'Cards',
        slug: '/cards',
        icon: ListPlus,
        items: [
          {
            label: 'Examples',
            slug: '/cards/examples',
            icon: Book,
          },
          {
            label: 'Settings',
            slug: '/cards/settings',
            icon: Settings,
          },
        ],
      },
      {
        label: 'Templates',
        slug: '/templates',
        icon: BookDashed,
        items: [
          {
            label: 'Creating a Template',
            slug: '/templates/creating-a-template',
            icon: CirclePlus,
          },
        ],
      },
    ],
  },
  {
    label: 'How To\'s',
    icon: MessageCircleQuestionMark,
    items: [
      {
        label: 'Link your Discord account',
        slug: '/how-to/link-your-discord',
        icon: SiDiscord,
      },
      {
        label: 'Profile Views',
        slug: '/how-to/profile-views',
        icon: Eye,
      },
      {
        label: 'Likes',
        slug: '/how-to/likes',
        icon: Heart,
      },
      {
        label: 'Verified Badge',
        slug: '/how-to/verified-badge',
        icon: BadgeCheck,
      },
      {
        label: 'Bug Hunter Badge',
        slug: '/how-to/bug-hunter-badge',
        icon: Bug,
      },
    ],
  },
  {
    label: 'Miscellaneous',
    icon: Archive,
    items: [
      {
        label: 'Contact Us',
        slug: '/misc/contact',
        icon: Mail,
      },
      {
        label: 'Changelog',
        slug: '/misc/changelog',
        icon: ScrollText,
      },
      {
        label: 'Open Source',
        slug: '/misc/open-source',
        icon: Code,
      },
      {
        label: 'Troubleshooting',
        slug: '/misc/troubleshooting',
        icon: Bug,
      },
      {
        label: 'Donating',
        slug: '/misc/donating',
        icon: HandCoins,
      },
      {
        label: 'Bans',
        slug: '/misc/bans',
        icon: Hammer,
      },
    ],
  },
];