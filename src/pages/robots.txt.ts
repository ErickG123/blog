import type { APIContext } from 'astro';
import { withBasePath } from '@shared/domain/rules';

export function GET(context: APIContext) {
  const siteOrigin = context.site?.toString().replace(/\/$/, '') ?? '';
  const sitemapPath = withBasePath('/sitemap-index.xml');
  const sitemapUrl = siteOrigin ? `${siteOrigin}${sitemapPath}` : sitemapPath;

  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
