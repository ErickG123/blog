import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  articleSchema,
  authorSchema,
  collectingSchema,
  creatorSchema,
  editionSchema,
  genreSchema,
  publisherSchema,
  recommendationSchema,
  relationshipSchema,
  reviewSchema,
  studioSchema,
  tagSchema,
  workSchema,
} from './features/content/content.schema';

export const collections = {
  works: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/works' }),
    schema: workSchema,
  }),
  editions: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/editions' }),
    schema: editionSchema,
  }),
  creators: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/creators' }),
    schema: creatorSchema,
  }),
  publishers: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/publishers' }),
    schema: publisherSchema,
  }),
  studios: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/studios' }),
    schema: studioSchema,
  }),
  genres: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/genres' }),
    schema: genreSchema,
  }),
  tags: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/tags' }),
    schema: tagSchema,
  }),
  authors: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
    schema: authorSchema,
  }),
  relationships: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/relationships' }),
    schema: relationshipSchema,
  }),
  reviews: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
    schema: reviewSchema,
  }),
  articles: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
    schema: articleSchema,
  }),
  recommendations: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/recommendations' }),
    schema: recommendationSchema,
  }),
  collecting: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/collecting' }),
    schema: collectingSchema,
  }),
};
