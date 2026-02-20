import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import js from '@eslint/js';
import 'eslint-plugin-jsx-a11y';
import tailwind from 'eslint-plugin-tailwindcss';

export default defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  js.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mjs'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      indent: ['error', 2],
    },
  },
]);
