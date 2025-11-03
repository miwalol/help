// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightUtils from '@lorenzo_lewis/starlight-utils';

const mainSidebar = [
	{
		label: 'Welcome to Miwa.lol!',
		slug: 'welcome',
		translations: {
			fr: 'Bienvenue sur Miwa.lol !'
		}
	},
	{
		label: 'Getting Started',
		items: [
			{
				label: 'Creating an Account',
				slug: 'getting-started/creating-an-account',
				translations: {
					fr: 'Créer un compte',
				},
			},
			{
				label: 'Navigating the Dashboard',
				slug: 'getting-started/navigating-the-dashboard',
				translations: {
					fr: 'Naviguer sur le tableau de bord',
				},
			},
			{
				label: 'Leaderboard',
				slug: 'getting-started/leaderboard',
				translations: {
					fr: 'Classement',
				},
			},
			{
				label: 'Pricing',
				slug: 'getting-started/pricing',
				translations: {
					fr: 'Tarifs',
				},
			},
		],
		translations: {
			fr: 'Commencez ici',
		},
	},
	{
		label: 'Account',
		items: [
			{
				label: 'Username',
				slug: 'account/username',
				translations: {
					fr: 'Nom d\'utilisateur',
				},
			},
			{
				label: 'Security',
				slug: 'account/security',
				translations: {
					fr: 'Sécurité',
				},
			},
			{
				label: 'Badges',
				slug: 'account/badges',
				translations: {
					fr: 'Badges',
				},
			},
			{
				label: 'Custom Domain',
				slug: 'account/custom-domain',
				translations: {
					fr: 'Domaine personnalisé',
				},
			},
		],
		translations: {
			fr: 'Compte',
		},
	},
	{
		label: 'Customize',
		items: [
			{
				label: 'Overview',
				slug: 'customize',
				translations: {
					fr: 'Aperçu',
				},
			},
			{
				label: 'Assets',
				slug: 'customize/assets',
				translations: {
					fr: 'Assets',
				},
			},
			{
				label: 'Colors',
				slug: 'customize/colors',
				translations: {
					fr: 'Couleurs',
				},
			},
			{
				label: 'Fonts',
				slug: 'customize/fonts',
				translations: {
					fr: 'Polices',
				},
			},
			{
				label: 'Layout',
				slug: 'customize/layout',
				translations: {
					fr: 'Mise en page',
				},
			},
			{
				label: 'Privacy',
				slug: 'customize/privacy',
				translations: {
					fr: 'Confidentialité',
				},
			},
			{
				label: 'Tab',
				slug: 'customize/tab',
				translations: {
					fr: 'Onglet',
				},
			},
			{
				label: 'Miscellaneous',
				slug: 'customize/misc',
				translations: {
					fr: 'Divers',
				},
			},
			{
				label: 'Links',
				items: [
					{
						label: 'Overview',
						slug: 'links',
						translations: {
							fr: 'Aperçu'
						},
					},
					{
						label: 'Supported Platforms',
						slug: 'links/supported-platforms',
						translations: {
							fr: 'Plateformes supportées',
						},
					},
					{
						label: 'Adding a Link',
						slug: 'links/adding-a-link',
						translations: {
							fr: 'Ajouter un lien',
						},
					},
					{
						label: 'Adding a Custom Link',
						slug: 'links/adding-a-custom-link',
						translations: {
							fr: 'Ajouter un lien personnalisé',
						},
					},
				],
			},
			{
				label: 'Cards',
				items: [
					{
						label: 'Overview',
						slug: 'cards',
						translations: {
							fr: 'Aperçu',
						},
					},
					{
						label: 'Examples',
						slug: 'cards/examples',
						translations: {
							fr: 'Exemples',
						},
					},
					{
						label: 'Settings',
						slug: 'cards/settings',
						badge: {
							text: {
								en: 'New',
								fr: 'Nouveau',
							},
						},
						translations: {
							fr: 'Paramètres',
						},
					},
				],
			},
			{
				label: 'Templates',
				items: [
					{
						label: 'Overview',
						slug: 'templates',
						translations: {
							fr: 'Aperçu',
						},
					},
					{
						label: 'Creating a Template',
						slug: 'templates/creating-a-template',
						translations: {
							fr: 'Créer un modèle',
						},
					},
				],
				translations: {
					fr: 'Modèles',
				},
			},
		],
		translations: {
			fr: 'Personnalisation',
		},
	},
	{
		label: 'How To\'s',
		items: [
			{
				label: 'Link your Discord account',
				slug: 'how-to/link-your-discord',
				translations: {
					fr: 'Lier votre compte Discord',
				},
			},
			{
				label: 'Profile Views',
				slug: 'how-to/profile-views',
				translations: {
					fr: 'Vues de profil',
				},
			},
			{
				label: 'Likes',
				slug: 'how-to/likes',
				translations: {
					fr: '"J\'aime"',
				},
			},
			{
				label: 'Verified Badge',
				slug: 'how-to/verified-badge',
				translations: {
					fr: 'Badge vérifié',
				},
			},
			{
				label: 'Bug Hunter Badge',
				slug: 'how-to/bug-hunter-badge',
				translations: {
					fr: 'Badge de chasseur de bugs',
				},
			},
		],
		translations: {
			fr: 'Tutoriels',
		},
	},
	{
		label: 'Miscellaneous',
		items: [
			{
				label: 'Contact Us',
				slug: 'misc/contact',
				translations: {
					fr: 'Nous contacter',
				},
			},
			{
				label: 'Changelog',
				slug: 'misc/changelog',
				translations: {
					fr: 'Modifications',
				},
			},
			{
				label: 'Open Source',
				slug: 'misc/open-source',
				translations: {
					fr: 'Open Source',
				},
			},
			{
				label: 'Troubleshooting',
				slug: 'misc/troubleshooting',
				translations: {
					fr: 'Dépannage',
				},
			},
			{
				label: 'Donating',
				slug: 'misc/donating',
				translations: {
					fr: 'Faire un don',
				},
			},
			{
				label: 'Bans',
				slug: 'misc/bans',
				translations: {
					fr: 'Bannissements',
				},
			},
		],
		translations: {
			fr: 'Divers',
		},
	},
];
const devSidebar = [
	{
		label: 'Developers Docs',
		translations: {
			fr: 'Documentation développeurs',
		},
		items: [
			{
				label: 'Overview',
				slug: 'developers',
				translations: {
					fr: 'Aperçu',
				},
			},
			{
				label: 'Creating an API Key',
				slug: 'developers/creating-an-api-key',
				translations: {
					fr: 'Créer une clé API',
				},
			},
			{
				label: 'Usage',
				slug: 'developers/usage',
				translations: {
					fr: 'Utilisation',
				},
			},
			{
				label: 'CDN URLs',
				slug: 'developers/cdn-urls',
				translations: {
					fr: 'URLs CDN',
				},
			},
		],
	},
	{
		label: 'Endpoints',
		translations: {
			fr: 'Points de terminaison',
		},
		items: [
			{
				label: 'Overview',
				slug: 'developers/endpoints',
				translations: {
					fr: 'Aperçu',
				},
			},
			{
				label: 'Get User',
				slug: 'developers/endpoints/get-user',
				translations: {
					fr: 'Obtenir un utilisateur',
				},
			},
		],
	},
];

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
			components: {
				ThemeProvider: './src/components/ForceDarkTheme.astro',
				ThemeSelect: './src/components/EmptyComponent.astro',
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
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				fr: { label: 'Français', lang: 'fr' },
			},
			customCss: ['/src/styles/custom.css'],
			sidebar: [
				{
					label: 'Help',
					items: mainSidebar,
					translations: {
						fr: 'Aide',
					}
				},
				{
					label: 'Developers',
					items: devSidebar,
					translations: {
						fr: 'Développeurs',
					},
				},
			],
			plugins: [
				starlightLinksValidator({
					errorOnFallbackPages: false,
					errorOnInconsistentLocale: true,
				}),
				starlightUtils({
					multiSidebar: true,
				}),
			],
		}),
	],
});
