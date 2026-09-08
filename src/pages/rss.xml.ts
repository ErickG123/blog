import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Meu Feed de Artigos',
    description: 'Feed de artigos do meu blog minimalista',
    site: context.site ? context.site.toString() : 'https://erickg123.github.io/blog',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date + 'T12:00:00'),
      description: post.data.description,
      link: `${import.meta.env.BASE_URL}/posts/${post.id}`,
    })),
  });
}