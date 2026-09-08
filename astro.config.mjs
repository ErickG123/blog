import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ErickG123.github.io',
  base: '/blog',
  integrations: [sitemap()],
});