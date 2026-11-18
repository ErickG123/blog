# ADR-0004: componentes Astro e tokens semânticos

- Estado: aceito
- Decisão: implementar apresentação em Astro/CSS com tokens e JavaScript nativo pequeno; sem framework SPA.
- Consequências: HTML é renderizado no build e interações progressivas; estados vazios devem ser legíveis sem inventar conteúdo.

## Revisão da Fase 12 — 17/11/2026

Mantida a decisão Astro/CSS. Os tokens foram organizados em superfícies paper/ink, contraste semântico, escala de espaçamento, tipografia fluida, largura de container e foco. Componentes compartilhados atendem a listas, artigos, obras e estados vazios; áreas específicas da home só aparecem quando há conteúdo publicado. Fallbacks de capa são padrões gráficos locais claramente identificados e não representam obras reais. A auditoria em seis larguras e dois temas é executada por `npm run audit:ui:phase12`.

## Revisão da direção visual — Fase 12.1 — 17/11/2026

Mantida a renderização Astro estática, CSS com tokens existentes e JavaScript nativo pequeno. A home agora prioriza conteúdo real e categorias legíveis; o destaque é condicional, o catálogo vazio não recebe conteúdo promocional e o artigo técnico legado fica no “Arquivo geral” sem alteração de URL ou conteúdo. Não foram adicionados dados ou imagens fictícios nem framework de UI. `npm run audit:ui:phase12-1` captura antes/depois em seis larguras, 13 rotas e dois temas; a revisão manual e as limitações estão em `docs/audits/AUDIT-PHASE-12-1-VISUAL-DIRECTION.md`.

## Reconstrução visual orientada por conteúdo — Fase 12.2 — 17/11/2026

Consolidados os tokens semânticos em `Layout.astro` (removendo duplicações legadas) com header horizontal compacto em barra única, superfícies de card delimitadas (`--surface`, `--line-subtle`), grade fechada de 6 categorias (3×2 em desktop) e página de artigo com escala tipográfica equilibrada e TOC condicional (`headings.length >= 2`). Para permitir validação visual de estados ricos sem poluir o conteúdo publicado, foi criada a camada de fixtures de desenvolvimento (`src/utils/dev-fixtures.ts`), ativada exclusivamente via `PUBLIC_USE_FIXTURES=true` e isolada do build de produção, do RSS e do sitemap. A auditoria `npm run audit:ui:phase12-2` valida 78 combinações sem fixtures e 120 combinações com fixtures em 390px, 768px e 1440px nos dois temas.

## Refinamento de navegação e busca unificada — Fases 12.3 e 12.4 — 17/11/2026

Na Fase 12.3, a aba ativa do menu deixou de usar linha inferior colorida (`box-shadow: inset 0 -2px var(--accent)`) e passou a usar superfície sutil (`--surface-soft`) com altura e peso tipográfico fixos, evitando deslocamento horizontal; também foi adicionada a rota secundária `/arquivo/` para publicações técnicas legadas. Na Fase 12.4, o popover do header e o campo duplicado da Home foram unificados em um diálogo modal nativo (`<dialog>` em `src/components/SearchDialog.astro` + `src/scripts/site-search.ts`), disponível em todas as páginas e reutilizando `normalizeSearchText` / `filterSearchableItems` de `src/utils/work-filters.ts`.
