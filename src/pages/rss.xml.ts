import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { PROJECT_IDENTITY } from '@shared/utils/project';
import { ROUTES, sortByDateDesc } from '@shared/domain/rules';
import {
  getPublicArticles,
  getPublicCollectingPosts,
  getPublicRecommendations,
  getPublicReviews,
} from '@features/content/content.selectors';

export async function GET(context: APIContext) {
  const [reviews, articles, guides, collecting] = await Promise.all([
    getPublicReviews(),
    getPublicArticles(),
    getPublicRecommendations(),
    getPublicCollectingPosts(),
  ]);

  const combined = sortByDateDesc([
    ...reviews.map((r) => ({
      title: r.title,
      description: r.summary,
      link: ROUTES.review(r.slug),
      publishedAt: r.publishedAt,
      slug: r.slug,
    })),
    ...articles.map((a) => ({
      title: a.title,
      description: a.summary,
      link: ROUTES.article(a.slug),
      publishedAt: a.publishedAt,
      slug: a.slug,
    })),
    ...guides.map((g) => ({
      title: g.title,
      description: g.summary,
      link: ROUTES.guide(g.slug),
      publishedAt: g.publishedAt,
      slug: g.slug,
    })),
    ...collecting.map((c) => ({
      title: c.title,
      description: c.summary,
      link: ROUTES.collectingPost(c.slug),
      publishedAt: c.publishedAt,
      slug: c.slug,
    })),
  ]);

  return rss({
    title: PROJECT_IDENTITY.name,
    description: PROJECT_IDENTITY.tagline,
    site: context.site ?? 'https://manga-atlas.pages.dev',
    customData: '<language>pt-br</language>',
    items: combined.map((item) => ({
      title: item.title,
      description: item.description,
      link: item.link,
      pubDate: new Date(
        /^\d{4}-\d{2}-\d{2}$/.test(item.publishedAt)
          ? `${item.publishedAt}T12:00:00-03:00`
          : item.publishedAt,
      ),
    })),
  });
}
