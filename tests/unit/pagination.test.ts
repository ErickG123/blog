import { describe, expect, it } from 'vitest';
import {
  buildPageWindow,
  paginateCollection,
  sortEntries,
  type SortableEntry,
} from '@shared/utils/pagination';
import {
  formatArticleCategory,
  formatRatingPtBr,
  formatWorkFormat,
  formatWorkKind,
} from '@shared/utils/i18n';

function makeItems(count: number): SortableEntry[] {
  return Array.from({ length: count }, (_, i) => ({
    title: `Item ${String(i + 1).padStart(2, '0')}`,
    slug: `item-${String(i + 1).padStart(2, '0')}`,
    publishedAt: `2026-10-${String((i % 28) + 1).padStart(2, '0')}`,
    rating: ((i % 5) + 1) * 1,
  }));
}

describe('Paginação e ordenação determinística (Fase 40)', () => {
  it('trata zero registros, um registro e abaixo/igual/acima do limite', () => {
    const zero = paginateCollection([], 1, 12);
    expect(zero.totalPages).toBe(1);
    expect(zero.items).toEqual([]);
    expect(zero.summaryLabel).toBe('Nenhum resultado encontrado');

    const one = paginateCollection(makeItems(1), 1, 12);
    expect(one.totalPages).toBe(1);
    expect(one.pages).toEqual([]);
    expect(one.summaryLabel).toBe('Mostrando 1–1 de 1 publicações');

    const exact = paginateCollection(makeItems(12), 1, 12);
    expect(exact.totalPages).toBe(1);

    const plusOne = paginateCollection(makeItems(13), 2, 12);
    expect(plusOne.totalPages).toBe(2);
    expect(plusOne.items.length).toBe(1);
    expect(plusOne.summaryLabel).toBe('Mostrando 13–13 de 13 publicações');
  });

  it('garante que a união de todas as páginas equivale exatamente ao conjunto original sem duplicatas nem perdas', () => {
    const all = makeItems(37);
    const collected: string[] = [];
    const totalPages = paginateCollection(all, 1, 12).totalPages;
    expect(totalPages).toBe(4);

    for (let p = 1; p <= totalPages; p++) {
      const slice = paginateCollection(all, p, 12);
      for (const item of slice.items) collected.push(item.slug);
    }

    expect(collected).toEqual(all.map((i) => i.slug));
    expect(new Set(collected).size).toBe(37);
  });

  it('marca página inexistente como outOfRange e faz fallback seguro para página 1', () => {
    const all = makeItems(25);
    const outHigh = paginateCollection(all, 99, 12);
    expect(outHigh.isOutOfRange).toBe(true);
    expect(outHigh.currentPage).toBe(1);

    const outZero = paginateCollection(all, 0, 12);
    expect(outZero.isOutOfRange).toBe(true);
    expect(outZero.currentPage).toBe(1);
  });

  it('gera janela de páginas com reticências para coleções extensas', () => {
    const win = buildPageWindow(5, 10);
    expect(win.some((i) => i.type === 'ellipsis')).toBe(true);
    expect(win[0]).toEqual({ type: 'page', page: 1 });
    expect(win[win.length - 1]).toEqual({ type: 'page', page: 10 });
  });

  it('ordena deterministicamente por data, título A-Z/Z-A, avaliação e desempate por slug', () => {
    const sample: SortableEntry[] = [
      { title: 'Beta', slug: 'beta-2', publishedAt: '2026-05-01', rating: 4.5 },
      { title: 'Alfa', slug: 'alfa-1', publishedAt: '2026-05-01', rating: 3.0 },
      { title: 'Gama', slug: 'gama-3', publishedAt: '2026-06-01', rating: 5.0 },
    ];
    expect(sortEntries(sample, 'recent').map((i) => i.slug)).toEqual([
      'gama-3',
      'alfa-1',
      'beta-2',
    ]);
    expect(sortEntries(sample, 'oldest').map((i) => i.slug)).toEqual([
      'alfa-1',
      'beta-2',
      'gama-3',
    ]);
    expect(sortEntries(sample, 'title-asc').map((i) => i.slug)).toEqual([
      'alfa-1',
      'beta-2',
      'gama-3',
    ]);
    expect(sortEntries(sample, 'title-desc').map((i) => i.slug)).toEqual([
      'gama-3',
      'beta-2',
      'alfa-1',
    ]);
    expect(sortEntries(sample, 'rating-desc').map((i) => i.slug)).toEqual([
      'gama-3',
      'beta-2',
      'alfa-1',
    ]);
  });

  it('formata rótulos técnicos e avaliações no padrão pt-BR', () => {
    expect(formatWorkKind('manga')).toBe('Mangá');
    expect(formatWorkFormat('series')).toBe('Série');
    expect(formatWorkFormat('oneshot')).toBe('Volume único');
    expect(formatArticleCategory('analise')).toBe('Análise');
    expect(formatRatingPtBr(4.5)).toBe('4,5 / 5');
  });
});
