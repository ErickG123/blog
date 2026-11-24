import type {
  Creator,
  Edition,
  Genre,
  Publisher,
  Studio,
  Work,
  WorkRelationship,
} from '@features/catalog/domain/catalog.model';
import type {
  Article,
  BlogAuthor,
  CollectingPost,
  Recommendation,
  Review,
  Tag,
} from '@features/editorial/domain/editorial.model';
import { isValidRating, validateWorkRelationships } from '../../shared/domain/rules.ts';

export interface ContentBundle {
  readonly works: readonly Work[];
  readonly editions: readonly Edition[];
  readonly creators: readonly Creator[];
  readonly publishers: readonly Publisher[];
  readonly studios: readonly Studio[];
  readonly genres: readonly Genre[];
  readonly tags: readonly Tag[];
  readonly authors: readonly BlogAuthor[];
  readonly relationships: readonly WorkRelationship[];
  readonly reviews: readonly Review[];
  readonly articles: readonly Article[];
  readonly recommendations: readonly Recommendation[];
  readonly collecting: readonly CollectingPost[];
}

export interface IntegrityIssue {
  readonly collection: string;
  readonly id?: string;
  readonly field: string;
  readonly message: string;
}

function checkUniqueIdAndSlug(
  collection: string,
  items: readonly { readonly id: string; readonly slug: string }[],
  issues: IntegrityIssue[],
): void {
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  for (const item of items) {
    if (seenIds.has(item.id)) {
      issues.push({
        collection,
        id: item.id,
        field: 'id',
        message: `ID duplicado "${item.id}" na coleção "${collection}". Defina um ID único.`,
      });
    }
    seenIds.add(item.id);

    if (seenSlugs.has(item.slug)) {
      issues.push({
        collection,
        id: item.id,
        field: 'slug',
        message: `Slug duplicado "${item.slug}" na coleção "${collection}". Altere o slug para evitar colisão de rota.`,
      });
    }
    seenSlugs.add(item.slug);
  }
}

export function validateContentIntegrity(bundle: ContentBundle): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];

  checkUniqueIdAndSlug('works', bundle.works, issues);
  checkUniqueIdAndSlug('editions', bundle.editions, issues);
  checkUniqueIdAndSlug('creators', bundle.creators, issues);
  checkUniqueIdAndSlug('publishers', bundle.publishers, issues);
  checkUniqueIdAndSlug('studios', bundle.studios, issues);
  checkUniqueIdAndSlug('genres', bundle.genres, issues);
  checkUniqueIdAndSlug('tags', bundle.tags, issues);
  checkUniqueIdAndSlug('authors', bundle.authors, issues);
  checkUniqueIdAndSlug('reviews', bundle.reviews, issues);
  checkUniqueIdAndSlug('articles', bundle.articles, issues);
  checkUniqueIdAndSlug('recommendations', bundle.recommendations, issues);
  checkUniqueIdAndSlug('collecting', bundle.collecting, issues);

  const workMap = new Map(bundle.works.map((w) => [w.id, w]));
  const workIds = new Set(workMap.keys());
  const editionIds = new Set(bundle.editions.map((e) => e.id));
  const creatorIds = new Set(bundle.creators.map((c) => c.id));
  const publisherIds = new Set(bundle.publishers.map((p) => p.id));
  const studioIds = new Set(bundle.studios.map((s) => s.id));
  const genreIds = new Set(bundle.genres.map((g) => g.id));
  const tagIds = new Set(bundle.tags.map((t) => t.id));
  const authorIds = new Set(bundle.authors.map((a) => a.id));

  for (const work of bundle.works) {
    for (const credit of work.credits) {
      if (!creatorIds.has(credit.creatorId)) {
        issues.push({
          collection: 'works',
          id: work.id,
          field: 'credits.creatorId',
          message: `Criador "${credit.creatorId}" não encontrado para a obra "${work.id}".`,
        });
      }
    }
    for (const pubId of work.publisherIds ?? []) {
      if (!publisherIds.has(pubId)) {
        issues.push({
          collection: 'works',
          id: work.id,
          field: 'publisherIds',
          message: `Editora "${pubId}" não encontrada para a obra "${work.id}".`,
        });
      }
    }
    for (const studioId of work.studioIds ?? []) {
      if (!studioIds.has(studioId)) {
        issues.push({
          collection: 'works',
          id: work.id,
          field: 'studioIds',
          message: `Estúdio "${studioId}" não encontrado para a obra "${work.id}".`,
        });
      }
    }
    for (const genreId of work.genreIds) {
      if (!genreIds.has(genreId)) {
        issues.push({
          collection: 'works',
          id: work.id,
          field: 'genreIds',
          message: `Gênero "${genreId}" não encontrado para a obra "${work.id}".`,
        });
      }
    }
  }

  for (const edition of bundle.editions) {
    if (!workIds.has(edition.workId)) {
      issues.push({
        collection: 'editions',
        id: edition.id,
        field: 'workId',
        message: `Obra "${edition.workId}" não encontrada para a edição "${edition.id}".`,
      });
    }
    if (!publisherIds.has(edition.publisherId)) {
      issues.push({
        collection: 'editions',
        id: edition.id,
        field: 'publisherId',
        message: `Editora "${edition.publisherId}" não encontrada para a edição "${edition.id}".`,
      });
    }
  }

  for (const relError of validateWorkRelationships(bundle.relationships, workIds)) {
    issues.push({
      collection: 'relationships',
      field: 'fromWorkId/toWorkId',
      message: relError.message,
    });
  }

  const checkEditorialCommon = (
    collection: string,
    entry: { readonly id: string; readonly authorId: string; readonly tagIds: readonly string[] },
  ) => {
    if (!authorIds.has(entry.authorId)) {
      issues.push({
        collection,
        id: entry.id,
        field: 'authorId',
        message: `Autor editorial "${entry.authorId}" não encontrado em "${collection}/${entry.id}".`,
      });
    }
    for (const tagId of entry.tagIds) {
      if (!tagIds.has(tagId)) {
        issues.push({
          collection,
          id: entry.id,
          field: 'tagIds',
          message: `Tag "${tagId}" não encontrada em "${collection}/${entry.id}".`,
        });
      }
    }
  };

  for (const review of bundle.reviews) {
    checkEditorialCommon('reviews', review);
    const work = workMap.get(review.workId);
    if (!work) {
      issues.push({
        collection: 'reviews',
        id: review.id,
        field: 'workId',
        message: `Obra "${review.workId}" não encontrada para a review "${review.id}".`,
      });
    } else if (review.scope === 'season' && work.kind !== 'anime') {
      issues.push({
        collection: 'reviews',
        id: review.id,
        field: 'scope',
        message: `Escopo "season" só é compatível com obras do tipo "anime" (obra "${work.id}" é "${work.kind}").`,
      });
    } else if (review.scope === 'volume' && work.kind === 'anime') {
      issues.push({
        collection: 'reviews',
        id: review.id,
        field: 'scope',
        message: `Escopo "volume" não é compatível com obras do tipo "anime" (obra "${work.id}").`,
      });
    }

    if (!isValidRating(review.rating)) {
      issues.push({
        collection: 'reviews',
        id: review.id,
        field: 'rating',
        message: `Nota inválida "${String(review.rating)}" em "${review.id}". Use 0 a 5 em passos de 0.5.`,
      });
    }
  }

  for (const article of bundle.articles) {
    checkEditorialCommon('articles', article);
    for (const workId of article.relatedWorkIds ?? []) {
      if (!workIds.has(workId)) {
        issues.push({
          collection: 'articles',
          id: article.id,
          field: 'relatedWorkIds',
          message: `Obra relacionada "${workId}" não encontrada no artigo "${article.id}".`,
        });
      }
    }
  }

  for (const rec of bundle.recommendations) {
    checkEditorialCommon('recommendations', rec);
    for (const item of rec.items) {
      if (!workIds.has(item.workId)) {
        issues.push({
          collection: 'recommendations',
          id: rec.id,
          field: 'items.workId',
          message: `Obra "${item.workId}" não encontrada no guia "${rec.id}".`,
        });
      }
    }
  }

  for (const post of bundle.collecting) {
    checkEditorialCommon('collecting', post);
    for (const workId of post.workIds) {
      if (!workIds.has(workId)) {
        issues.push({
          collection: 'collecting',
          id: post.id,
          field: 'workIds',
          message: `Obra "${workId}" não encontrada no post de colecionismo "${post.id}".`,
        });
      }
    }
    for (const editionId of post.editionIds) {
      if (!editionIds.has(editionId)) {
        issues.push({
          collection: 'collecting',
          id: post.id,
          field: 'editionIds',
          message: `Edição "${editionId}" não encontrada no post de colecionismo "${post.id}".`,
        });
      }
    }
  }

  return issues;
}
