# ADR-0002 — Arquitetura de conteúdo, domínio e regras de publicação

- **Status**: Aceito
- **Data**: 2026-11-23
- **Fase**: 02

## Contexto

O Mangá Atlas precisa relacionar dados factuais de obras, edições físicas, criadores e organizações com publicações editoriais (reviews, artigos, guias e colecionismo) sem banco de dados, mantendo URLs canônicas estáveis, isolamento de rascunhos/agendados/fixtures e ausência de duplicação de tipos.

## Decisão

1. **Separação de camadas**:
   - `src/pages/`: rotas Astro e composição de página.
   - `src/features/<area>/`: domínio (`*.model.ts`), schemas (`*.schema.ts`), seletores e componentes da área.
   - `src/shared/`: utilitários, regras transversais, tipos e componentes reutilizados por múltiplas features.
   - Funções de domínio e seletores são puras e independentes de DOM; adaptadores Astro consultam Content Collections apenas em tempo de build.
2. **Identidade e URLs canônicas**:
   - Toda entidade possui `id` estável (imutável) e `slug` canônico normalizado (`kebab-case`, ASCII sem acentos).
   - Mudanças de slug preservam `previousSlugs?: string[]` para suportar redirecionamentos estáticos (`_redirects` na Fase 22).
   - Temporadas ou filmes relevantes podem ser modelados como `Work` próprio (`kind: 'anime' | 'manga' | 'manhwa'`, `format: 'series' | 'movie' | 'ova' | 'oneshot'`) ligados por `WorkRelationship` (`sequel`, `prequel`, `adaptation`, `spin_off`, `related`).
3. **Status público e datas**:
   - `status`: `'draft' | 'published' | 'archived'`.
   - Apenas registros com `status === 'published'`, `isFixture !== true` e `publishedAt <= now` são expostos nas consultas públicas de produção.
   - Datas editoriais seguem ISO-8601 com referência de fuso `America/Sao_Paulo` (`-03:00`) e formatação `pt-BR`.
4. **Fonte única de verdade para tipos**:
   - Na Fase 03, schemas Zod das Content Collections inferirão os tipos de entrada e serão compatíveis com os contratos de domínio em `*.model.ts`, evitando interfaces duplicadas divergentes.

## Alternativas consideradas

- **Modelar tudo em um único tipo `Post`**: rejeitado porque mistura dados factuais de catálogo com opinião editorial e dificulta validação de campos específicos (ex.: nota/escopo de review, ficha de edição).

## Consequências

- **Positivas**: regras testáveis em Vitest sem depender do runtime do Astro; zero vazamento de rascunhos/fixtures.
- **Negativas / trade-offs**: exige disciplina na manutenção de IDs referenciados entre arquivos (mitigada pelo validador editorial na Fase 03 e Fase 15).
