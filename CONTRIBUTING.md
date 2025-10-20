# Contributing

**We welcome contributions to make Miwa.lol Help website better.** When making a Pull Request, please clearly explain what changes you did.

## Getting Started

1. Make a fork or this repository, then clone it.
   ```shell
    git clone https://github.com/yourusername/help.git
    ```
2. **Install dependencies with a package manager.** We use [Bun](https://bun.sh/), but any package manager such as yarn or pnpm works.
   ```shell
    bun install
    ```
3. **Start the development server** with `bun dev`. The server should start on http://localhost:4321/.
4. **Make your changes,** then commit and open a pull request to the `master` branch.

## Translations

If a locale you want to contribute does not exist yet, you can create a new subdirectory in `src/content/docs` and a new JSON file in `src/content/i18n`. Also, don't forget to update the `locales` array in `astro.config.mjs`.

### Translating pages

You can create or edit `.mdx` files in the `src/content/docs` directory. Each language has its own subdirectory, except English which is using root URLs (it does not really change something, and for other locales it doesn't change anything).

### Translating sidebar

You can create the corresponding key in the `translations` object in [`astro.config.mjs`](astro.config.mjs). An example below:
```js
{
  label: 'Welcome to Miwa.lol!',
  slug: 'welcome',
  translations: {
    fr: 'Bienvenue sur Miwa.lol !',
  },
}
```

### Translating UI

You can create or edit translations in the `src/content/i18n` directory. Each language has its own JSON file, such as `en.json`.
