import type { WorkRelationship } from '@features/catalog/domain/catalog.model';
import type { EditorialStatus } from '@features/editorial/domain/editorial.model';

export const DEFAULT_TIMEZONE = 'America/Sao_Paulo';

const BASE_PATH = (process.env.ASTRO_BASE_PATH || '/').replace(/\/$/, '');
const withBasePath = (path: string) => `${BASE_PATH}${path}`;

export const ROUTES = {
  home: withBasePath('/'),
  works: withBasePath('/obras/'),
  work: (slug: string) => withBasePath(`/obras/${slug}/`),
  reviews: withBasePath('/reviews/'),
  review: (slug: string) => withBasePath(`/reviews/${slug}/`),
  articles: withBasePath('/artigos/'),
  article: (slug: string) => withBasePath(`/artigos/${slug}/`),
  guides: withBasePath('/guias/'),
  guide: (slug: string) => withBasePath(`/guias/${slug}/`),
  collecting: withBasePath('/colecionismo/'),
  collectingPost: (slug: string) => withBasePath(`/colecionismo/${slug}/`),
  creators: withBasePath('/criadores/'),
  creator: (slug: string) => withBasePath(`/criadores/${slug}/`),
  publishers: withBasePath('/editoras/'),
  publisher: (slug: string) => withBasePath(`/editoras/${slug}/`),
  studios: withBasePath('/estudios/'),
  studio: (slug: string) => withBasePath(`/estudios/${slug}/`),
  tags: withBasePath('/tags/'),
  tag: (slug: string) => withBasePath(`/tags/${slug}/`),
  search: withBasePath('/busca/'),
  feed: withBasePath('/rss.xml'),
  about: withBasePath('/sobre/'),
  editorialPolicy: withBasePath('/politica-editorial/'),
  contact: withBasePath('/contato/'),
} as const;

export function normalizeSlug(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface PublishableRecord {
  readonly status: EditorialStatus;
  readonly publishedAt: string;
  readonly isFixture?: boolean;
}

export function isPublicEntry(
  entry: PublishableRecord,
  options: { now?: Date; includeFixtures?: boolean } = {},
): boolean {
  const { now = new Date(), includeFixtures = false } = options;
  if (entry.status !== 'published') return false;
  if (entry.isFixture && !includeFixtures) return false;
  const publishedTime = Date.parse(entry.publishedAt);
  if (Number.isNaN(publishedTime)) return false;
  return publishedTime <= now.getTime();
}

export function isValidRating(rating: number | undefined): boolean {
  if (rating === undefined) return true;
  if (!Number.isFinite(rating)) return false;
  if (rating < 0 || rating > 5) return false;
  return Number.isInteger(rating * 2);
}

export function sortByDateDesc<T extends { readonly publishedAt: string; readonly slug: string }>(
  items: readonly T[],
): T[] {
  return [...items].sort((a, b) => {
    const diff = Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    if (diff !== 0) return diff;
    return a.slug.localeCompare(b.slug, 'pt-BR');
  });
}

export function formatDatePtBr(isoDate: string): string {
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? `${isoDate}T12:00:00-03:00` : isoDate;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Data ISO inválida: ${isoDate}`);
  }
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: DEFAULT_TIMEZONE,
  }).format(date);
}

export interface RelationshipValidationError {
  readonly code: 'SELF_LINK' | 'DUPLICATE' | 'ORPHAN' | 'HIERARCHY_CYCLE';
  readonly message: string;
}

const HIERARCHICAL_TYPES = new Set<WorkRelationship['type']>(['prequel', 'sequel']);

export function validateWorkRelationships(
  relationships: readonly WorkRelationship[],
  validWorkIds: ReadonlySet<string>,
): RelationshipValidationError[] {
  const errors: RelationshipValidationError[] = [];
  const seen = new Set<string>();
  const adjacency = new Map<string, string[]>();

  for (const rel of relationships) {
    if (rel.fromWorkId === rel.toWorkId) {
      errors.push({
        code: 'SELF_LINK',
        message: `Autolink inválido na obra "${rel.fromWorkId}".`,
      });
      continue;
    }

    if (!validWorkIds.has(rel.fromWorkId) || !validWorkIds.has(rel.toWorkId)) {
      errors.push({
        code: 'ORPHAN',
        message: `Referência órfã em relação ${rel.fromWorkId} -> ${rel.toWorkId}.`,
      });
      continue;
    }

    const key = `${rel.fromWorkId}|${rel.toWorkId}|${rel.type}`;
    if (seen.has(key)) {
      errors.push({
        code: 'DUPLICATE',
        message: `Relação duplicada: ${key}.`,
      });
      continue;
    }
    seen.add(key);

    if (HIERARCHICAL_TYPES.has(rel.type)) {
      const list = adjacency.get(rel.fromWorkId) ?? [];
      list.push(rel.toWorkId);
      adjacency.set(rel.fromWorkId, list);
    }
  }

  // Detecção de ciclo apenas em relações hierárquicas (prequel/sequel)
  const visited = new Set<string>();
  const inStack = new Set<string>();

  const hasCycle = (node: string): boolean => {
    visited.add(node);
    inStack.add(node);
    for (const next of adjacency.get(node) ?? []) {
      if (!visited.has(next) && hasCycle(next)) return true;
      if (inStack.has(next)) return true;
    }
    inStack.delete(node);
    return false;
  };

  for (const node of adjacency.keys()) {
    if (!visited.has(node) && hasCycle(node)) {
      errors.push({
        code: 'HIERARCHY_CYCLE',
        message: `Ciclo hierárquico inválido detectado envolvendo "${node}".`,
      });
      break;
    }
  }

  return errors;
}
