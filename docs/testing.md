# Testes e validação

- `npm test`: testes unitários Vitest para helpers de data, filtros, ordenação e URLs.
- `npm run typecheck`: diagnósticos Astro e TypeScript, inclusive em componentes `.astro`.
- `npm run lint`: ESLint para código TypeScript, scripts e componentes Astro, com regras de acessibilidade.
- `npm run test:e2e`: smoke Playwright sobre o site estático local, incluindo rotas legadas e navegação.
- `npm run audit:ui`: varre rotas geradas em desktop/tablet/mobile e claro/escuro; salva capturas ignoradas pelo Git em `test-results/phase11-visual/`.
- `npm run build`: Content Collections, rotas estáticas, RSS e sitemap.
- `npm run check:static`: valida os destinos locais no artefato e a compatibilidade com o prefixo `/blog/`.
- `npm audit --omit=dev`: verifica vulnerabilidades nas dependências de produção.
- `git diff --check`: verifica whitespace e marcadores de conflito no diff.

Playwright pode exigir a instalação de Chromium (`npx playwright install chromium`). Os testes não substituem inspeção visual, acessibilidade por teclado ou validação do deploy real no GitHub Pages. O workflow roda checks, testes e build antes do deploy.
