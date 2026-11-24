// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://manga-atlas.pages.dev',
  base: process.env.ASTRO_BASE_PATH || '/',
  outDir: process.env.ASTRO_OUT_DIR || 'dist',
  output: 'static',
  integrations: [mdx(), sitemap()],
});
