import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'posts'>;
export type BlogWork = CollectionEntry<'works'>;

export function postDate(post: BlogPost): string {
  return post.data.publishedAt ?? post.data.date ?? '';
}

export function postUpdatedDate(post: BlogPost): string | undefined {
  return post.data.updatedAt ?? post.data.updatedDate;
}

export function isPublicPost(post: BlogPost): boolean {
  return post.data.status === 'published';
}

export function isPublicWork(work: BlogWork): boolean {
  return work.data.publicationStatus === 'published';
}

export function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const dateDiff = new Date(postDate(b)).getTime() - new Date(postDate(a)).getTime();
    return dateDiff || a.id.localeCompare(b.id);
  });
}

export function readingTime(body = ''): number {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 200));
}

export function formatDate(dateValue: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${dateValue}T12:00:00Z`));
}

export function basePath(path: string, baseUrl = import.meta.env.BASE_URL): string {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${base}${path.replace(/^\/+/, '')}`;
}

export function postsOfType(posts: BlogPost[], type: BlogPost['data']['type']): BlogPost[] {
  return sortPosts(posts.filter((post) => isPublicPost(post) && post.data.type === type));
}

export function publicPosts(posts: BlogPost[]): BlogPost[] {
  return sortPosts(posts.filter(isPublicPost));
}

export const typeLabels: Record<BlogPost['data']['type'], string> = {
  article: 'Artigo', news: 'Notícia', anime: 'Anime', manga: 'Mangá', review: 'Review', guide: 'Guia',
};

export const seasonLabels = {
  winter: 'Inverno', spring: 'Primavera', summer: 'Verão', fall: 'Outono',
} as const;
