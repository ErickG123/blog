export type WorkMediaType = 'anime' | 'manga';
export type WorkSeason = 'winter' | 'spring' | 'summer' | 'fall';

export interface FilterableWork {
  id: string;
  title: string;
  originalTitle?: string;
  synopsis: string;
  mediaType: WorkMediaType;
  releaseYear?: number;
  season?: WorkSeason;
  genres: string[];
  genreIds: string[];
}

export interface WorkFilters {
  query: string;
  mediaType: WorkMediaType | '';
  genre: string;
  year: string;
  season: WorkSeason | '';
}

export const emptyWorkFilters: WorkFilters = {
  query: '', mediaType: '', genre: '', year: '', season: '',
};

export function normalizeSearchText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}

export function taxonomyId(value: string): string {
  return normalizeSearchText(value).replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
}

export function filterWorks<T extends FilterableWork>(works: T[], filters: WorkFilters): T[] {
  const query = normalizeSearchText(filters.query);
  return works.filter((work) => {
    if (filters.mediaType && work.mediaType !== filters.mediaType) return false;
    if (filters.genre && !work.genreIds.includes(filters.genre) && !work.genres.some((genre) => taxonomyId(genre) === filters.genre)) return false;
    if (filters.year && String(work.releaseYear ?? '') !== filters.year) return false;
    if (filters.season && work.season !== filters.season) return false;
    if (query) {
      const searchable = normalizeSearchText([work.title, work.originalTitle, work.synopsis, ...work.genres].filter(Boolean).join(' '));
      if (!searchable.includes(query)) return false;
    }
    return true;
  });
}

export interface SearchableItem {
  id: string;
  kind: 'post' | 'work';
  categoryLabel: string;
  title: string;
  description: string;
  href: string;
  tags: string[];
  works?: string[];
}

export function filterSearchableItems<T extends SearchableItem>(items: T[], rawQuery: string): T[] {
  const query = normalizeSearchText(rawQuery);
  if (!query) return items;
  return items.filter((item) => {
    const searchable = normalizeSearchText(
      [item.title, item.description, item.categoryLabel, ...item.tags, ...(item.works ?? [])].filter(Boolean).join(' '),
    );
    return searchable.includes(query);
  });
}
