import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import tailwind from 'eslint-plugin-tailwindcss';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/**', '.astro/**']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.astro/*.js', '**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.browser,
        astroHTML: 'readonly',
        ImageMetadata: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.astro', '**/*.mjs'],
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/indent': ['error', 2, { SwitchCase: 0 }],
    },
  },
]);

