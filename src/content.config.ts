import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { reference } from 'astro:content';
import { z as astroZ } from 'astro/zod';

const dateSchema = astroZ.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve usar o formato YYYY-MM-DD.');
const absoluteUrlSchema = astroZ.string().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}, { message: 'URL precisa ser absoluta e usar HTTP ou HTTPS.' });

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: astroZ.object({
    title: astroZ.string(),
    description: astroZ.string(),
    // Legacy fields stay supported so existing post ids and frontmatter remain valid.
    date: dateSchema.optional(),
    publishedAt: dateSchema.optional(),
    updatedDate: dateSchema.optional(),
    updatedAt: dateSchema.optional(),
    type: astroZ.enum(['article', 'news', 'anime', 'manga', 'review', 'guide']).default('article'),
    status: astroZ.enum(['draft', 'published']).default('published'),
    tags: astroZ.array(astroZ.string()).default([]),
    cover: astroZ.string().optional(),
    coverAlt: astroZ.string().optional(),
    coverCredit: astroZ.string().optional(),
    coverSource: absoluteUrlSchema.optional(),
    author: reference('authors').optional(),
    works: astroZ.array(reference('works')).default([]),
    taxonomyRefs: astroZ.array(reference('taxonomies')).default([]),
    sources: astroZ.array(astroZ.object({ label: astroZ.string().min(1), url: absoluteUrlSchema })).default([]),
    spoilerLevel: astroZ.enum(['none', 'light', 'moderate', 'heavy']).optional(),
    featured: astroZ.boolean().default(false),
    rating: astroZ.number().min(0).max(10).optional(),
  }).superRefine((data, ctx) => {
    if (!data.date && !data.publishedAt) {
      ctx.addIssue({ code: 'custom', message: 'Post precisa de date (legado) ou publishedAt.' });
    }
    if (data.cover && (!data.coverCredit || !data.coverSource)) {
      ctx.addIssue({ code: 'custom', path: ['cover'], message: 'Capa precisa de coverCredit e coverSource.' });
    }
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: astroZ.object({
    title: astroZ.string(),
    originalTitle: astroZ.string().optional(),
    mediaType: astroZ.enum(['anime', 'manga']),
    synopsis: astroZ.string(),
    genres: astroZ.array(astroZ.string()).default([]),
    releaseYear: astroZ.number().int().optional(),
    season: astroZ.enum(['winter', 'spring', 'summer', 'fall']).optional(),
    status: astroZ.string().optional(),
    publicationStatus: astroZ.enum(['draft', 'published']).default('published'),
    cover: astroZ.string().optional(),
    coverAlt: astroZ.string().optional(),
    coverCredit: astroZ.string().optional(),
    coverSource: absoluteUrlSchema.optional(),
    genreRefs: astroZ.array(reference('taxonomies')).default([]),
    relatedWorks: astroZ.array(reference('works')).default([]),
    sources: astroZ.array(astroZ.object({ label: astroZ.string().min(1), url: absoluteUrlSchema })).default([]),
  }).superRefine((data, ctx) => {
    if (data.cover && (!data.coverCredit || !data.coverSource)) {
      ctx.addIssue({ code: 'custom', path: ['cover'], message: 'Capa precisa de coverCredit e coverSource.' });
    }
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: astroZ.object({
    name: astroZ.string(),
    bio: astroZ.string().optional(),
    avatar: astroZ.string().optional(),
    avatarAlt: astroZ.string().optional(),
    avatarCredit: astroZ.string().optional(),
    avatarSource: absoluteUrlSchema.optional(),
    links: astroZ.array(astroZ.object({ label: astroZ.string(), url: absoluteUrlSchema })).default([]),
  }),
});

const taxonomies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/taxonomies' }),
  schema: astroZ.object({
    name: astroZ.string(),
    description: astroZ.string().optional(),
    type: astroZ.enum(['genre', 'tag', 'category']),
  }),
});

export const collections = { posts, works, authors, taxonomies };
