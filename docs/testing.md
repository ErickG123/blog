# Testes e validação

- `npm test`: testes unitários Vitest para helpers de data, filtros, ordenação e URLs.
- `npm run typecheck`: diagnósticos Astro e TypeScript, inclusive em componentes `.astro`.
- `npm run lint`: ESLint para código TypeScript, scripts e componentes Astro, com regras de acessibilidade.
- `npm run test:e2e`: smoke Playwright sobre o site estático local, incluindo rotas legadas e navegação.
- `npm run audit:ui`: varre rotas geradas em desktop/tablet/mobile e claro/escuro, incluindo axe-core WCAG 2.1 A/AA; o iframe externo Giscus é excluído. Salva capturas ignoradas pelo Git em `test-results/phase11-visual/`.
- `npm run audit:ui:phase12`: auditoria da Fase 12 em 360, 375, 390, 768, 1440 e 1920 px, temas claro/escuro, rotas estáticas geradas, tokens/foco/semântica e axe-core; exclui o iframe remoto do Giscus. As capturas ficam em `test-results/phase12-visual/after/` e os resultados detalhados em `results.json` (artefatos ignorados pelo Git).
- `npm run audit:ui:phase12-1`: comparação da Fase 12.1 em 360, 390, 768, 1280, 1440 e 1920 px, 13 rotas e temas claro/escuro, com axe-core, foco, semântica e overflow; exclui o iframe remoto do Giscus. Salva screenshots em `artifacts/phase12-1-visual/before/` quando `PHASE12_1_STAGE=before`, caso contrário em `.../after/`. Os diretórios são ignorados pelo Git.
- `npm run audit:ui:phase12-2`: auditoria da Fase 12.2 em 390, 768 e 1440 px, nos temas claro e escuro, validando tanto o cenário real (`artifacts/phase12-2-visual/real-content/`, 78 combinações) quanto o cenário com fixtures isoladas (`PUBLIC_USE_FIXTURES=true` e `FIXTURE_MODE=fixtures`, salvando 120 combinações em `artifacts/phase12-2-visual/with-fixtures/`).
- `npm run build`: Content Collections, rotas estáticas, RSS e sitemap.
- `npm run check:static`: valida os destinos locais no artefato e a compatibilidade com o prefixo `/blog/`.
- `npm audit --omit=dev`: verifica vulnerabilidades nas dependências de produção.
- `git diff --check`: verifica whitespace e marcadores de conflito no diff.

Playwright pode exigir a instalação de Chromium (`npx playwright install chromium`). Os testes não substituem inspeção visual, sessão com leitor de tela ou validação do deploy real no GitHub Pages. O workflow roda checks, auditoria das dependências de produção, testes e build antes do deploy.
