import { describe, expect, it } from 'vitest';
import { PROJECT_IDENTITY } from '@shared/utils/project';

describe('Fundação do projeto Mangá Atlas', () => {
  it('expõe identidade básica do projeto em pt-BR', () => {
    expect(PROJECT_IDENTITY.name).toBe('Mangá Atlas');
    expect(PROJECT_IDENTITY.locale).toBe('pt-BR');
    expect(PROJECT_IDENTITY.tagline.length).toBeGreaterThan(0);
  });
});
