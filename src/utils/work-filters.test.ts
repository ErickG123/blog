import { describe, expect, it } from 'vitest';
import { emptyWorkFilters, filterWorks, type FilterableWork } from './work-filters';

const works: FilterableWork[] = [
  { id: 'mock-a', title: 'Fixture Áĺpha', originalTitle: 'OriginalLabelA', synopsis: 'FixtureSummaryA', mediaType: 'anime', releaseYear: 2099, season: 'spring', genres: ['MockDrama'], genreIds: ['mock-drama'] },
  { id: 'mock-b', title: 'Fixture Alpha', synopsis: 'FixtureSummaryB', mediaType: 'manga', releaseYear: 2097, genres: ['MockDrama', 'MockSlice'], genreIds: ['mock-drama', 'mock-slice'] },
  { id: 'mock-c', title: 'Fixture Beta', synopsis: 'FixtureSummaryC', mediaType: 'anime', releaseYear: 2099, season: 'winter', genres: ['MockAdventure'], genreIds: ['mock-adventure'] },
];

describe('work filters', () => {
  it('combines type, genre, year, season and accent-insensitive text search', () => {
    expect(filterWorks(works, { query: 'fixture alpha', mediaType: 'anime', genre: 'mock-drama', year: '2099', season: 'spring' }).map((work) => work.id)).toEqual(['mock-a']);
  });

  it('searches titles, original scripts, synopsis and genre labels', () => {
    expect(filterWorks(works, { ...emptyWorkFilters, query: 'originallabela' }).map((work) => work.id)).toEqual(['mock-a']);
    expect(filterWorks(works, { ...emptyWorkFilters, query: 'mockslice' }).map((work) => work.id)).toEqual(['mock-b']);
  });

  it('returns an empty result when no combination matches', () => {
    expect(filterWorks(works, { query: '', mediaType: 'manga', genre: 'mock-adventure', year: '2099', season: 'spring' })).toEqual([]);
  });

  it('clears all filters when reset to the empty filter model', () => {
    expect(filterWorks(works, emptyWorkFilters)).toEqual(works);
  });
});
