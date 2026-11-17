import { describe, expect, it } from 'vitest';
import { basePath, formatDate, isPublicPost, isPublicWork, postDate, postUpdatedDate, readingTime, sortPosts, type BlogPost, type BlogWork } from './content';

describe('content helpers', () => {
  it('estimates at least one minute and rounds up every 200 words', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime(Array(201).fill('palavra').join(' '))).toBe(2);
  });

  it('formats ISO dates in Brazilian Portuguese without timezone drift', () => {
    expect(formatDate('2026-09-08')).toBe('08 de setembro de 2026');
  });

  it('keeps legacy date metadata and prefers current field names', () => {
    const legacy = { data: { date: '2026-01-02', updatedDate: '2026-02-03' } } as unknown as BlogPost;
    const current = { data: { date: '2026-01-02', publishedAt: '2026-03-04', updatedAt: '2026-04-05' } } as unknown as BlogPost;
    expect(postDate(legacy)).toBe('2026-01-02');
    expect(postUpdatedDate(legacy)).toBe('2026-02-03');
    expect(postDate(current)).toBe('2026-03-04');
    expect(postUpdatedDate(current)).toBe('2026-04-05');
  });

  it('excludes drafts and sorts deterministically by date then id', () => {
    const entry = (id: string, date: string, status = 'published') => ({ id, data: { date, status } }) as unknown as BlogPost;
    const posts = [entry('z', '2026-01-01'), entry('draft', '2026-03-01', 'draft'), entry('a', '2026-01-01')];
    expect(posts.filter(isPublicPost).map((post) => post.id)).toEqual(['z', 'a']);
    expect(sortPosts(posts).map((post) => post.id)).toEqual(['draft', 'a', 'z']);
  });

  it('keeps work drafts out of public catalogs and relations', () => {
    const draft = { data: { publicationStatus: 'draft' } } as unknown as BlogWork;
    const published = { data: { publicationStatus: 'published' } } as unknown as BlogWork;
    expect(isPublicWork(draft)).toBe(false);
    expect(isPublicWork(published)).toBe(true);
  });

  it('prefixes internal links with the project base path', () => {
    expect(basePath('/posts/a/', '/blog')).toBe('/blog/posts/a/');
  });
});
