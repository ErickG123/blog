import { describe, expect, it } from 'vitest';
import { validateContentIntegrity, type ContentBundle } from '@features/content/content.validator';
import { reviewSchema } from '@features/content/content.schema';

function createBaseBundle(): ContentBundle {
  return {
    works: [
      {
        id: 'w1',
        slug: 'obra-teste',
        title: 'Obra Teste',
        kind: 'manga',
        format: 'series',
        publicationStatus: 'ongoing',
        synopsis: 'Sinopse sintética.',
        credits: [{ creatorId: 'c1', role: 'author' }],
        publisherIds: ['p1'],
        genreIds: ['g1'],
        isFixture: true,
      },
    ],
    editions: [
      {
        id: 'e1',
        slug: 'edicao-teste',
        workId: 'w1',
        publisherId: 'p1',
        title: 'Edição Teste',
        language: 'pt-BR',
        isFixture: true,
      },
    ],
    creators: [{ id: 'c1', slug: 'criador-teste', name: 'Criador Teste', isFixture: true }],
    publishers: [{ id: 'p1', slug: 'editora-teste', name: 'Editora Teste', isFixture: true }],
    studios: [],
    genres: [{ id: 'g1', slug: 'drama', name: 'Drama' }],
    tags: [{ id: 't1', slug: 'tag-teste', name: 'Tag Teste' }],
    authors: [{ id: 'a1', slug: 'autor-blog', name: 'Autor Blog', bio: 'Bio' }],
    relationships: [],
    reviews: [
      {
        id: 'r1',
        slug: 'review-teste',
        title: 'Review Teste',
        summary: 'Resumo',
        authorId: 'a1',
        status: 'published',
        publishedAt: '2026-10-01',
        spoilerLevel: 'none',
        tagIds: ['t1'],
        workId: 'w1',
        scope: 'volume',
        rating: 4.5,
        isFixture: true,
      },
    ],
    articles: [],
    recommendations: [],
    collecting: [],
  };
}

describe('Integridade transversal de Content Collections (Fase 03)', () => {
  it('aprova um bundle consistente sem erros', () => {
    expect(validateContentIntegrity(createBaseBundle())).toEqual([]);
  });

  it('rejeita slugs duplicados, referências quebradas e escopo incompatível com tipo de obra', () => {
    const base = createBaseBundle();
    const broken: ContentBundle = {
      ...base,
      reviews: [
        ...base.reviews,
        {
          ...base.reviews[0],
          id: 'r2',
          slug: 'review-teste', // slug duplicado
          workId: 'w1',
          scope: 'season', // incompatível com manga
          authorId: 'autor-inexistente', // referência quebrada
          rating: 4.3, // fora da escala 0.5
        },
      ],
    };

    const issues = validateContentIntegrity(broken);
    expect(issues.some((i) => i.field === 'slug')).toBe(true);
    expect(issues.some((i) => i.field === 'scope')).toBe(true);
    expect(issues.some((i) => i.field === 'authorId')).toBe(true);
    expect(issues.some((i) => i.field === 'rating')).toBe(true);
  });

  it('valida schema Zod de review rejeitando nota fora de 0..5 em passos de 0.5', () => {
    const invalid = reviewSchema.safeParse({
      id: 'r-bad',
      slug: 'Slug Invalido!',
      title: 'Teste',
      summary: 'Resumo',
      authorId: 'a1',
      status: 'published',
      publishedAt: '2026-10-01',
      spoilerLevel: 'none',
      tagIds: [],
      workId: 'w1',
      scope: 'work',
      rating: 5.5,
    });
    expect(invalid.success).toBe(false);
  });
});
