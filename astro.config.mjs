// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://help.miwa.lol',
	integrations: [
		starlight({
			title: 'Miwa.lol Help',
			credits: true,
			lastUpdated: true,
			editLink: {
				baseUrl: 'https://github.com/miwalol/help/edit/master/',
			},
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://analytics.tenshii.moe/js/script.outbound-links.js',
						'data-domain': 'help.miwa.lol',
						defer: true,
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'og:image',
						content: 'https://help.miwa.lol/og.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://help.miwa.lol/og.png',
					},
				}
			],
			social: [
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/miwa' },
				{ icon: 'twitter', label: 'Twitter', href: 'https://x.com/MiwaTeam' },
				{ icon: 'blueSky', label: 'BlueSky', href: 'https://bsky.app/profile/miwa.lol' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/miwalol/help' },
			],
			favicon: '/favicon.ico',
			logo: {
				src: '/src/assets/miwa-48.png',
			},
			customCss: ['/src/styles/custom.css'],
			sidebar: [
				{ label: 'Welcome to Miwa.lol!', slug: 'welcome' },
				{
					label: 'Getting Started',
					items: [
						{ label: 'Creating an Account', slug: 'getting-started/creating-an-account' },
						{ label: 'Navigating the Dashboard', slug: 'getting-started/navigating-the-dashboard' },
						{ label: 'Leaderboard', slug: 'getting-started/leaderboard' },
						{ label: 'Pricing', slug: 'getting-started/pricing' },
					],
				},
				{
					label: 'Account',
					items: [
						{ label: 'Username', slug: 'account/username' },
						{ label: 'Security', slug: 'account/security' },
						{ label: 'Badges', slug: 'account/badges' },
						{ label: 'Custom Domain', slug: 'account/custom-domain' },
					],
				},
				{
					label: 'Customize',
					items: [
						{ label: 'Overview', slug: 'customize' },
						{ label: 'Assets', slug: 'customize/assets' },
						{ label: 'Colors', slug: 'customize/colors' },
						{ label: 'Fonts', slug: 'customize/fonts' },
						{ label: 'Layout', slug: 'customize/layout' },
						{ label: 'Privacy', slug: 'customize/privacy' },
						{ label: 'Tab', slug: 'customize/tab' },
						{ label: 'Miscellaneous', slug: 'customize/misc' },
						{
							label: 'Links',
							items: [
								{ label: 'Overview', slug: 'links' },
								{ label: 'Supported Platforms', slug: 'links/supported-platforms' },
								{ label: 'Adding a Link', slug: 'links/adding-a-link' },
								{ label: 'Adding a Custom Link', slug: 'links/adding-a-custom-link' },
							],
						},
						{
							label: 'Cards',
							items: [
								{ label: 'Overview', slug: 'cards' },
								{ label: 'Examples', slug: 'cards/examples' },
								{ label: 'Settings', slug: 'cards/settings', badge: { text: 'New' } },
							],
						},
						{
							label: 'Templates',
							items: [
								{ label: 'Overview', slug: 'templates' },
							],
						},
					],
				},
				{
					label: 'How To\'s',
					items: [
						{ label: 'Link your Discord account', slug: 'how-to/link-your-discord' },
						{ label: 'Profile Views', slug: 'how-to/profile-views' },
						{ label: 'Likes', slug: 'how-to/likes' },
						{ label: 'Verified Badge', slug: 'how-to/verified-badge' },
						{ label: 'Bug Hunter Badge', slug: 'how-to/bug-hunter-badge' },
					],
				},
				{
					label: 'Miscellaneous',
					items: [
						{ label: 'Contact Us', slug: 'misc/contact' },
						{ label: 'Open Source', slug: 'misc/open-source' },
						{ label: 'Troubleshooting', slug: 'misc/troubleshooting' },
						{ label: 'Donating', slug: 'misc/donating' },
						{ label: 'Bans', slug: 'misc/bans' },
					],
				},
			],
		}),
	],
});
