import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', 'src/env.d.ts', 'test-results/**', 'playwright-report/**', 'docs/sdd-source/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  ...astro.configs['flat/jsx-a11y-recommended'],
  {
    files: ['**/*.{js,mjs,ts,astro}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
];
