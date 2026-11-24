import { getCollection } from 'astro:content';
import { isPublicEntry, sortByDateDesc } from '@shared/domain/rules';

export function shouldIncludeFixtures(): boolean {
  return process.env.INCLUDE_FIXTURES === 'true';
}

export function shouldIncludeDrafts(): boolean {
  return process.env.INCLUDE_DRAFTS === 'true';
}

function isCatalogVisible(
  entry: { readonly isFixture?: boolean; readonly status?: 'draft' | 'published' },
  includeFixtures: boolean,
  includeDrafts: boolean,
): boolean {
  if (entry.isFixture && !includeFixtures) return false;
  if (entry.status === 'draft' && !includeDrafts) return false;
  return true;
}

export async function getPublicWorks() {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('works');
  return entries
    .map((e) => e.data)
    .filter((w) => isCatalogVisible(w, includeFixtures, includeDrafts))
    .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
}

export async function getPublicEditions() {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('editions');
  return entries
    .map((e) => e.data)
    .filter((ed) => isCatalogVisible(ed, includeFixtures, includeDrafts));
}

export async function getPublicCreators() {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('creators');
  return entries
    .map((e) => e.data)
    .filter((c) => isCatalogVisible(c, includeFixtures, includeDrafts))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export async function getPublicPublishers() {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('publishers');
  return entries
    .map((e) => e.data)
    .filter((p) => isCatalogVisible(p, includeFixtures, includeDrafts))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export async function getPublicStudios() {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('studios');
  return entries
    .map((e) => e.data)
    .filter((s) => isCatalogVisible(s, includeFixtures, includeDrafts))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export async function getPublicGenres() {
  const entries = await getCollection('genres');
  return entries.map((e) => e.data).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export async function getPublicTags() {
  const entries = await getCollection('tags');
  return entries.map((e) => e.data).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export async function getPublicAuthors() {
  const entries = await getCollection('authors');
  return entries.map((e) => e.data);
}

export async function getPublicRelationships() {
  const entries = await getCollection('relationships');
  return entries.map((e) => e.data);
}

export async function getPublicReviews(now = new Date()) {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('reviews');
  return sortByDateDesc(
    entries
      .filter((entry) => isPublicEntry(entry.data, { now, includeFixtures, includeDrafts }))
      .map((entry) => ({ ...entry.data, entry })),
  );
}

export async function getPublicArticles(now = new Date()) {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('articles');
  return sortByDateDesc(
    entries
      .filter((entry) => isPublicEntry(entry.data, { now, includeFixtures, includeDrafts }))
      .map((entry) => ({ ...entry.data, entry })),
  );
}

export async function getPublicRecommendations(now = new Date()) {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('recommendations');
  return sortByDateDesc(
    entries
      .filter((entry) => isPublicEntry(entry.data, { now, includeFixtures, includeDrafts }))
      .map((entry) => ({ ...entry.data, entry })),
  );
}

export async function getPublicCollectingPosts(now = new Date()) {
  const includeFixtures = shouldIncludeFixtures();
  const includeDrafts = shouldIncludeDrafts();
  const entries = await getCollection('collecting');
  return sortByDateDesc(
    entries
      .filter((entry) => isPublicEntry(entry.data, { now, includeFixtures, includeDrafts }))
      .map((entry) => ({ ...entry.data, entry })),
  );
}
