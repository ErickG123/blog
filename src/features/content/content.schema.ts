import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDateRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2}))?$/;

export const slugSchema = z
  .string()
  .regex(slugRegex, 'Slug deve usar apenas letras minúsculas, números e hífens.');

export const isoDateSchema = z
  .string()
  .regex(isoDateRegex, 'Data deve estar em formato ISO-8601 (YYYY-MM-DD ou timestamp ISO).');

export const imageAssetSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  credit: z.string().min(1),
  license: z.string().min(1).optional(),
});

export const officialLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const ratingSchema = z
  .number()
  .min(0, 'Nota mínima é 0.')
  .max(5, 'Nota máxima é 5.')
  .refine((value) => Number.isInteger(value * 2), 'Nota deve ser múltipla de 0.5.');

export const workSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  previousSlugs: z.array(slugSchema).optional(),
  title: z.string().min(1),
  originalTitle: z.string().min(1).optional(),
  alternativeTitles: z.array(z.string().min(1)).optional(),
  kind: z.enum(['manga', 'anime', 'manhwa']),
  format: z.enum(['series', 'oneshot', 'movie', 'ova']),
  country: z.string().min(1).optional(),
  originalLanguage: z.string().min(1).optional(),
  releaseYear: z.number().int().min(1900).max(2100).optional(),
  publicationStatus: z.enum(['ongoing', 'completed', 'hiatus', 'cancelled', 'unknown']),
  synopsis: z.string().min(1),
  cover: imageAssetSchema.optional(),
  credits: z
    .array(
      z.object({
        creatorId: z.string().min(1),
        role: z.enum(['author', 'artist', 'director', 'script', 'character_design', 'other']),
      }),
    )
    .default([]),
  publisherIds: z.array(z.string().min(1)).optional(),
  studioIds: z.array(z.string().min(1)).optional(),
  genreIds: z.array(z.string().min(1)).default([]),
  officialLinks: z.array(officialLinkSchema).optional(),
  isFixture: z.boolean().optional(),
});

export const editionSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  workId: z.string().min(1),
  publisherId: z.string().min(1),
  title: z.string().min(1),
  language: z.string().min(1),
  formatLabel: z.string().min(1).optional(),
  paperType: z.string().min(1).optional(),
  binding: z.string().min(1).optional(),
  isbn: z.string().min(1).optional(),
  releaseYear: z.number().int().min(1900).max(2100).optional(),
  volumesCount: z.number().int().positive().optional(),
  notes: z.string().min(1).optional(),
  cover: imageAssetSchema.optional(),
  isFixture: z.boolean().optional(),
});

export const creatorSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  name: z.string().min(1),
  originalName: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
  officialLinks: z.array(officialLinkSchema).optional(),
  isFixture: z.boolean().optional(),
});

export const publisherSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  name: z.string().min(1),
  country: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  officialLinks: z.array(officialLinkSchema).optional(),
  isFixture: z.boolean().optional(),
});

export const studioSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  name: z.string().min(1),
  country: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  officialLinks: z.array(officialLinkSchema).optional(),
  isFixture: z.boolean().optional(),
});

export const genreSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  name: z.string().min(1),
  description: z.string().min(1).optional(),
});

export const tagSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  name: z.string().min(1),
  description: z.string().min(1).optional(),
});

export const authorSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  name: z.string().min(1),
  bio: z.string().min(1),
  socialLinks: z.array(officialLinkSchema).optional(),
});

export const relationshipSchema = z.object({
  fromWorkId: z.string().min(1),
  toWorkId: z.string().min(1),
  type: z.enum(['adaptation', 'sequel', 'prequel', 'spin_off', 'related']),
  note: z.string().min(1).optional(),
});

const baseEditorialSchema = z.object({
  id: z.string().min(1),
  slug: slugSchema,
  previousSlugs: z.array(slugSchema).optional(),
  title: z.string().min(1),
  summary: z.string().min(1),
  authorId: z.string().min(1),
  status: z.enum(['draft', 'published', 'archived']),
  publishedAt: isoDateSchema,
  updatedAt: isoDateSchema.optional(),
  spoilerLevel: z.enum(['none', 'light', 'heavy']).default('none'),
  tagIds: z.array(z.string().min(1)).default([]),
  cover: imageAssetSchema.optional(),
  isFixture: z.boolean().optional(),
});

export const reviewSchema = baseEditorialSchema.extend({
  workId: z.string().min(1),
  scope: z.enum(['work', 'volume', 'arc', 'season', 'movie']),
  scopeLabel: z.string().min(1).optional(),
  rating: ratingSchema.optional(),
  verdict: z.string().min(1).optional(),
  criteria: z
    .array(
      z.object({
        label: z.string().min(1),
        note: z.string().min(1),
      }),
    )
    .optional(),
});

export const articleSchema = baseEditorialSchema.extend({
  category: z.enum(['analise', 'ensaio', 'industria', 'opiniao']),
  relatedWorkIds: z.array(z.string().min(1)).optional(),
});

export const recommendationSchema = baseEditorialSchema.extend({
  items: z
    .array(
      z.object({
        workId: z.string().min(1),
        order: z.number().int().positive(),
        pitch: z.string().min(1),
      }),
    )
    .min(1),
});

export const collectingSchema = baseEditorialSchema.extend({
  workIds: z.array(z.string().min(1)).default([]),
  editionIds: z.array(z.string().min(1)).default([]),
  highlight: z.string().min(1).optional(),
});
