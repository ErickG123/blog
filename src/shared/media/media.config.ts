export const MEDIA_CONTEXTS = [
  'works',
  'reviews',
  'articles',
  'guides',
  'collecting',
  'editions',
  'creators',
  'publishers',
  'studios',
  'placeholders',
] as const;

export type MediaContext = (typeof MEDIA_CONTEXTS)[number];

export interface MediaContextRule {
  readonly maxWidth: number;
  readonly targetMaxBytes: number;
  readonly webpQuality: number;
}

export const MEDIA_CONTEXT_RULES: Record<MediaContext, MediaContextRule> = {
  works: { maxWidth: 800, targetMaxBytes: 200 * 1024, webpQuality: 82 },
  reviews: { maxWidth: 900, targetMaxBytes: 200 * 1024, webpQuality: 82 },
  articles: { maxWidth: 1200, targetMaxBytes: 250 * 1024, webpQuality: 82 },
  guides: { maxWidth: 900, targetMaxBytes: 200 * 1024, webpQuality: 82 },
  collecting: { maxWidth: 1600, targetMaxBytes: 350 * 1024, webpQuality: 84 },
  editions: { maxWidth: 1200, targetMaxBytes: 300 * 1024, webpQuality: 84 },
  creators: { maxWidth: 600, targetMaxBytes: 150 * 1024, webpQuality: 82 },
  publishers: { maxWidth: 600, targetMaxBytes: 150 * 1024, webpQuality: 82 },
  studios: { maxWidth: 600, targetMaxBytes: 150 * 1024, webpQuality: 82 },
  placeholders: { maxWidth: 800, targetMaxBytes: 150 * 1024, webpQuality: 82 },
};

export const MEDIA_LIMITS = {
  maxInputBytes: 25 * 1024 * 1024,
  maxInputPixels: 64_000_000,
  warnSingleFileBytes: 400 * 1024,
  warnTotalAssetsBytes: 100 * 1024 * 1024,
} as const;

export type MediaVariant =
  | 'catalog-cover'
  | 'work-detail'
  | 'review-header'
  | 'thumbnail'
  | 'edition-cover'
  | 'featured'
  | 'inline'
  | 'gallery'
  | 'related';

export const MEDIA_VARIANT_CONFIG: Record<
  MediaVariant,
  { readonly widths: readonly number[]; readonly sizes: string; readonly fit: 'contain' | 'cover' }
> = {
  'catalog-cover': { widths: [200, 400], sizes: '(max-width: 48rem) 45vw, 200px', fit: 'contain' },
  'work-detail': { widths: [260, 520], sizes: '(max-width: 48rem) 65vw, 260px', fit: 'contain' },
  'review-header': { widths: [190, 380], sizes: '(max-width: 48rem) 50vw, 190px', fit: 'contain' },
  thumbnail: { widths: [240, 480], sizes: '(max-width: 48rem) 50vw, 240px', fit: 'cover' },
  'edition-cover': { widths: [160, 320], sizes: '(max-width: 48rem) 45vw, 160px', fit: 'contain' },
  featured: { widths: [420, 840], sizes: '(max-width: 48rem) 100vw, 840px', fit: 'cover' },
  inline: { widths: [480, 900], sizes: '(max-width: 48rem) 100vw, 68ch', fit: 'contain' },
  gallery: { widths: [400, 800, 1200], sizes: '(max-width: 48rem) 100vw, 800px', fit: 'contain' },
  related: { widths: [100, 200], sizes: '100px', fit: 'cover' },
};
