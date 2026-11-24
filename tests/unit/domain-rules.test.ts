import { describe, expect, it } from 'vitest';
import {
  formatDatePtBr,
  isPublicEntry,
  isValidRating,
  normalizeSlug,
  sortByDateDesc,
  validateWorkRelationships,
} from '@shared/domain/rules';

describe('Regras puras de domínio (Fase 02)', () => {
  it('normaliza slugs removendo acentos, espaços e símbolos', () => {
    expect(normalizeSlug('  Vagabond: Edição Definitiva #01!  ')).toBe(
      'vagabond-edicao-definitiva-01',
    );
    expect(normalizeSlug('Ação & Aventura')).toBe('acao-aventura');
  });

  it('filtra entradas públicas respeitando status, data futura e fixtures', () => {
    const now = new Date('2026-11-23T12:00:00-03:00');
    expect(isPublicEntry({ status: 'published', publishedAt: '2026-11-20' }, { now })).toBe(true);
    expect(isPublicEntry({ status: 'draft', publishedAt: '2026-11-20' }, { now })).toBe(false);
    expect(isPublicEntry({ status: 'archived', publishedAt: '2026-11-20' }, { now })).toBe(false);
    expect(
      isPublicEntry({ status: 'published', publishedAt: '2026-12-01T00:00:00-03:00' }, { now }),
    ).toBe(false);
    expect(
      isPublicEntry({ status: 'published', publishedAt: '2026-11-20', isFixture: true }, { now }),
    ).toBe(false);
    expect(
      isPublicEntry(
        { status: 'published', publishedAt: '2026-11-20', isFixture: true },
        { now, includeFixtures: true },
      ),
    ).toBe(true);
  });

  it('valida notas opcionais de 0 a 5 em passos de 0.5', () => {
    expect(isValidRating(undefined)).toBe(true);
    expect(isValidRating(0)).toBe(true);
    expect(isValidRating(3.5)).toBe(true);
    expect(isValidRating(5)).toBe(true);
    expect(isValidRating(3.3)).toBe(false);
    expect(isValidRating(-0.5)).toBe(false);
    expect(isValidRating(5.5)).toBe(false);
  });

  it('ordena deterministicamente por data decrescente e slug em empate', () => {
    const sorted = sortByDateDesc([
      { publishedAt: '2026-01-10', slug: 'beta' },
      { publishedAt: '2026-01-10', slug: 'alfa' },
      { publishedAt: '2026-02-01', slug: 'gama' },
    ]);
    expect(sorted.map((item) => item.slug)).toEqual(['gama', 'alfa', 'beta']);
  });

  it('formata datas ISO em pt-BR', () => {
    expect(formatDatePtBr('2026-11-23')).toBe('23 de novembro de 2026');
    expect(() => formatDatePtBr('data-invalida')).toThrow();
  });

  it('detecta autolink, duplicata, órfão e ciclo hierárquico, permitindo associação mútua', () => {
    const validIds = new Set(['w1', 'w2', 'w3']);
    const errors = validateWorkRelationships(
      [
        { fromWorkId: 'w1', toWorkId: 'w1', type: 'related' },
        { fromWorkId: 'w1', toWorkId: 'w999', type: 'related' },
        { fromWorkId: 'w1', toWorkId: 'w2', type: 'sequel' },
        { fromWorkId: 'w1', toWorkId: 'w2', type: 'sequel' },
        { fromWorkId: 'w2', toWorkId: 'w1', type: 'sequel' },
      ],
      validIds,
    );
    expect(errors.map((e) => e.code)).toEqual([
      'SELF_LINK',
      'ORPHAN',
      'DUPLICATE',
      'HIERARCHY_CYCLE',
    ]);

    const mutualRelated = validateWorkRelationships(
      [
        { fromWorkId: 'w1', toWorkId: 'w2', type: 'related' },
        { fromWorkId: 'w2', toWorkId: 'w1', type: 'related' },
      ],
      validIds,
    );
    expect(mutualRelated).toEqual([]);
  });
});
