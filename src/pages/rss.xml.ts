import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { basePath, postDate, publicPosts } from '../utils/content';

export async function GET(context: APIContext) {
  const sortedPosts = publicPosts(await getCollection('posts'));

  return rss({
    title: 'Anime & Mangá — artigos',
    description: 'Notícias, análises, guias e descobertas de anime e mangá.',
    site: context.site ? new URL(basePath('/'), context.site).toString() : 'https://erickg123.github.io/blog/',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(postDate(post) + 'T12:00:00Z'),
      description: post.data.description,
      link: basePath(`/posts/${post.id}/`),
    })),
  });
}
