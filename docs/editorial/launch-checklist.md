# Checklist de Lançamento e Rotina Pós-Lançamento — Mangá Atlas

Este checklist separa a **prontidão técnica**, a **prontidão editorial** e a **prontidão operacional** antes de qualquer publicação no GitHub Pages.

## 1. Prontidão técnica

- [x] Build estático reproduzível (`npm ci && npm run build`) sem erros.
- [x] `npm run format:check`, `npm run lint`, `npm run check`, `npm run test` e `npm run test:e2e` aprovados.
- [x] `npm run content:doctor` e `npm run media:validate` sem erros bloqueantes.
- [x] Isolamento comprovado (`scripts/check-isolation.mjs`): zero fixtures, zero `demo-assets`, zero rascunhos (`status: draft`) e zero marcadores `[PENDENTE]` em `dist/`.
- [x] Compatibilidade com subdiretório GitHub Pages (`ASTRO_BASE_PATH=/blog/`) validada localmente (rotas, CSS, favicon, Pagefind, RSS, sitemap, `robots.txt` e 404).
- [x] Acessibilidade WCAG 2.2 AA (contraste de botões >= `4.5:1`, foco visível, skip-link, temas claro/escuro e responsividade `320px–1920px`).

## 2. Prontidão editorial (dependente do autor)

- [ ] Revisar os rascunhos em `docs/editorial/primeiras-publicacoes.md` e remover todos os marcadores `[PENDENTE]`.
- [ ] Conferir fatos, datas e créditos das obras em `src/content/works/` e `src/content/creators/`.
- [ ] Importar imagens próprias ou autorizadas via `npm run media:import` com `rightsStatus` `own` ou `authorized`.
- [ ] Decidir explicitamente sobre notas opcionais (`rating`) e vereditos (`verdict`).
- [ ] Promover as fichas de catálogo (`status: "published"`) e publicações (`npm run content:publish -- --slug=<slug> --confirm-publish`).

## 3. Prontidão operacional e publicação controlada

> **Atenção**: o workflow `.github/workflows/pages.yml` dispara deploy automático para o GitHub Pages em cada `push` na branch `main`. Nunca faça `push` para `main` antes de rodar a cadeia de validação local abaixo.

### Passos para publicar uma nova edição

1. Validar tudo localmente:
   ```bash
   npm run content:doctor
   npm run format:check
   npm run lint
   npm run check
   npm run test
   npm run build
   npm run test:e2e
   ```
2. Conferir `git status` e `git diff` para garantir que nenhum arquivo privado ou temporário será versionado.
3. Criar commit seguindo Conventional Commits (ex.: `feat(content): publicar review de Yotsuba&! vol. 1`).
4. Realizar `git push origin main` deliberadamente e acompanhar a execução do workflow **Deploy GitHub Pages** no GitHub Actions.
5. Smoke test pós-deploy: abrir a URL publicada (`/blog/`), testar navegação, tema, busca, RSS (`/blog/rss.xml`), sitemap (`/blog/sitemap-index.xml`) e página 404.

### Agendamento e rollback

- **Agendamento**: por ser um site 100% estático, conteúdos com `publishedAt` futuro só entram no ar após um novo build/deploy executado na data ou após ela (via `workflow_dispatch` ou novo commit).
- **Rollback**: para reverter uma publicação, ajuste `status: archived` (ou `draft`) ou reverta o commit (`git revert <hash>`) e faça push para disparar novo deploy. Caches de navegador/CDN e histórico Git público não são apagados retroativamente por um novo deploy.
