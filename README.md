# Miwa.lol Help Website

This repository contains the help website for [Miwa.lol](https://miwa.lol), built using [Starlight](https://starlight.astro.build/).

## Translations

We welcome contributions to translate the help website into other languages. We use [Starlight's built-in internationalization (i18n)](https://starlight.astro.build/guides/i18n/) support to manage translations.

**To translate Starlight UI elements,** you can create or edit translations in the `src/content/i18n` directory. Each language has its own JSON file.

**To translate the sidebar items,** you can create the corresponding key in the `translations` object in `astro.config.mjs`.

**To translate pages,** you can create or edit `.mdx` files in the `src/content/docs` directory. Each language has its own subdirectory, except English which is using root URLs.
If a locale you want to contribute does not exist yet, you can create a new subdirectory in `src/content/docs` and a new JSON file in `src/content/i18n`. Also, don't forget to update the `locales` array in `astro.config.mjs`.