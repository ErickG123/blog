import type { ImageMetadata } from 'astro';
import { resolveAssetUrl } from '@shared/domain/rules';

const LOCAL_IMAGES = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{webp,png,jpg,jpeg,avif,svg}',
  { eager: true },
);

export type ResolvedMedia =
  | { readonly kind: 'astro'; readonly metadata: ImageMetadata }
  | { readonly kind: 'url'; readonly src: string };

/**
 * Resolve uma referência de mídia local (`src/assets/images/...` ou `/src/assets/images/...`)
 * para `ImageMetadata` otimizável pelo `astro:assets`, ou faz fallback seguro para `resolveAssetUrl`.
 */
export function resolveMediaSource(rawSrc: string): ResolvedMedia {
  const normalized = rawSrc.startsWith('src/assets/images/') ? `/${rawSrc}` : rawSrc;
  const mod = LOCAL_IMAGES[normalized];
  if (mod?.default) {
    return { kind: 'astro', metadata: mod.default };
  }
  return { kind: 'url', src: resolveAssetUrl(rawSrc) };
}

export function getPlaceholderCover(): ResolvedMedia {
  return resolveMediaSource('/src/assets/images/placeholders/cover-fallback.svg');
}
