import { describe, expect, it } from 'vitest';
import { estimateReadingMinutes, formatSpoilerLabel, paginateItems } from '@shared/utils/editorial';

describe('Utilitários editoriais e paginação (Fases 09 e 13)', () => {
  it('formata rótulos de spoiler em pt-BR', () => {
    expect(formatSpoilerLabel('none')).toBe('Sem spoilers');
    expect(formatSpoilerLabel('light')).toBe('Spoilers leves');
    expect(formatSpoilerLabel('heavy')).toBe('Contém spoilers');
  });

  it('estima tempo de leitura mínimo de 1 minuto', () => {
    expect(estimateReadingMinutes('texto curto')).toBe(1);
    expect(estimateReadingMinutes('palavra '.repeat(450))).toBe(3);
  });

  it('pagina coleções deterministicamente com limites seguros', () => {
    const items = [1, 2, 3, 4, 5];
    const p1 = paginateItems(items, 1, 2);
    expect(p1.items).toEqual([1, 2]);
    expect(p1.totalPages).toBe(3);
    expect(p1.hasPrev).toBe(false);
    expect(p1.hasNext).toBe(true);

    const p3 = paginateItems(items, 99, 2);
    expect(p3.page).toBe(3);
    expect(p3.items).toEqual([5]);
    expect(p3.hasNext).toBe(false);
  });
});
