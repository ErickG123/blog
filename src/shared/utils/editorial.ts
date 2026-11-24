import type { SpoilerLevel } from '@features/editorial/domain/editorial.model';

export function formatSpoilerLabel(level: SpoilerLevel): string {
  switch (level) {
    case 'none':
      return 'Sem spoilers';
    case 'light':
      return 'Spoilers leves';
    case 'heavy':
      return 'Contém spoilers';
  }
}

export function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export interface PageSlice<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly hasPrev: boolean;
  readonly hasNext: boolean;
}

export function paginateItems<T>(items: readonly T[], page: number, pageSize = 10): PageSlice<T> {
  const safeSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safeSize;
  return {
    items: items.slice(start, start + safeSize),
    page: safePage,
    totalPages,
    totalItems,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  };
}
