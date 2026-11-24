export type SortOption = 'recent' | 'oldest' | 'title-asc' | 'title-desc' | 'rating-desc';

export interface PaginationWindowItem {
  readonly type: 'page' | 'ellipsis';
  readonly page?: number;
}

export interface PaginationModel<T> {
  readonly items: readonly T[];
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly pageSize: number;
  readonly startIndex: number;
  readonly endIndex: number;
  readonly hasPrev: boolean;
  readonly hasNext: boolean;
  readonly isOutOfRange: boolean;
  readonly pages: readonly PaginationWindowItem[];
  readonly summaryLabel: string;
}

export function buildPageWindow(currentPage: number, totalPages: number): PaginationWindowItem[] {
  if (totalPages <= 1) return [];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => ({ type: 'page', page: i + 1 }));
  }

  const items: PaginationWindowItem[] = [{ type: 'page', page: 1 }];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) items.push({ type: 'ellipsis' });
  for (let p = left; p <= right; p++) {
    items.push({ type: 'page', page: p });
  }
  if (right < totalPages - 1) items.push({ type: 'ellipsis' });
  items.push({ type: 'page', page: totalPages });

  return items;
}

export function paginateCollection<T>(
  allItems: readonly T[],
  requestedPage: number,
  pageSize: number,
  nounPlural = 'publicações',
): PaginationModel<T> {
  const safeSize = Math.max(1, pageSize);
  const totalItems = allItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeSize));
  const isOutOfRange =
    !Number.isInteger(requestedPage) || requestedPage < 1 || requestedPage > totalPages;
  const currentPage = isOutOfRange ? 1 : requestedPage;
  const start = (currentPage - 1) * safeSize;
  const items = allItems.slice(start, start + safeSize);
  const startIndex = totalItems === 0 ? 0 : start + 1;
  const endIndex = start + items.length;

  const summaryLabel =
    totalItems === 0
      ? `Nenhum resultado encontrado`
      : `Mostrando ${startIndex}–${endIndex} de ${totalItems} ${nounPlural}`;

  return {
    items,
    currentPage,
    totalPages,
    totalItems,
    pageSize: safeSize,
    startIndex,
    endIndex,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    isOutOfRange,
    pages: buildPageWindow(currentPage, totalPages),
    summaryLabel,
  };
}

export interface SortableEntry {
  readonly title: string;
  readonly slug: string;
  readonly publishedAt?: string;
  readonly releaseYear?: number;
  readonly rating?: number;
}

export function sortEntries<T extends SortableEntry>(items: readonly T[], sort: SortOption): T[] {
  const copy = [...items];
  copy.sort((a, b) => {
    let diff = 0;
    switch (sort) {
      case 'recent': {
        const ta = a.publishedAt ? Date.parse(a.publishedAt) : (a.releaseYear ?? 0);
        const tb = b.publishedAt ? Date.parse(b.publishedAt) : (b.releaseYear ?? 0);
        diff = tb - ta;
        break;
      }
      case 'oldest': {
        const ta = a.publishedAt ? Date.parse(a.publishedAt) : (a.releaseYear ?? 0);
        const tb = b.publishedAt ? Date.parse(b.publishedAt) : (b.releaseYear ?? 0);
        diff = ta - tb;
        break;
      }
      case 'title-asc':
        diff = a.title.localeCompare(b.title, 'pt-BR');
        break;
      case 'title-desc':
        diff = b.title.localeCompare(a.title, 'pt-BR');
        break;
      case 'rating-desc':
        diff = (b.rating ?? -1) - (a.rating ?? -1);
        break;
    }
    if (diff !== 0) return diff;
    return a.slug.localeCompare(b.slug, 'pt-BR');
  });
  return copy;
}
