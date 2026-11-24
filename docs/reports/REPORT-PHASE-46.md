# Relatório da Fase 46 — Auditoria Final de Produção e Prontidão para Lançamento

- **Data**: 2026-11-24
- **Status da fase**: **CONCLUÍDA**
- **Prontidão Técnica**: **APTO**
- **Prontidão Editorial**: **AGUARDANDO REVISÃO E INSUMOS DO AUTOR** (5 rascunhos e 4 fichas em `draft`, 0 publicações reais promovidas)

## 1. Baseline auditado

- **Branch**: `main` (sem push ou deploy remoto executado)
- **Runtime**: Node.js `v24.16.0` (`.nvmrc` = `24`), npm lockfile único (`package-lock.json`)
- **Stack**: Astro `7.4.13` (`output: 'static'`), TypeScript `strict`, SCSS, Sharp `0.35.5`, Pagefind `1.6.0`, Vitest `5.1.1`, Playwright `1.65.1`
- **Dependências de produção**: `npm audit --omit=dev` -> **0 vulnerabilidades**

## 2. Matriz de achados da auditoria

| ID         | Severidade  | Descrição e reprodução                                                                                                 | Correção aplicada                                                                                  | Evidência / Status                                                               |
| ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `MA-46-01` | Média       | Card `.ma-featured` na Home sem capa mantinha coluna fixa `14rem` à esquerda no desktop, comprimindo o texto.          | Adicionado modificador `.ma-featured--no-cover` em `editorial.scss` e `src/pages/index.astro`.     | `docs/reports/evidence/phase-46/preview-featured-fixed-dark.png` — **RESOLVIDO** |
| `MA-46-02` | Baixa       | Pipeline `.github/workflows/ci.yml` não executava `npm run media:validate` antes do build.                             | Adicionado passo `npm run media:validate` no `ci.yml`.                                             | `.github/workflows/ci.yml` — **RESOLVIDO**                                       |
| `MA-46-03` | Baixa       | Evidências JSON das fases 43/44 incluíam cabeçalho stdout do `npm run` quando redirecionadas.                          | Regeneradas com `node scripts/... --json` e validadas pelo `prettier --check .`.                   | `format:check` PASS — **RESOLVIDO**                                              |
| `MA-46-04` | Informativo | Push direto na branch `main` dispara deploy automático no GitHub Pages (`.github/workflows/pages.yml`).                | Documentado explicitamente em `docs/editorial/launch-checklist.md` com rotina pré-push e rollback. | **MITIGADO / DOCUMENTADO**                                                       |
| `MA-46-05` | Editorial   | 5 rascunhos iniciais e 4 fichas de catálogo aguardam revisão textual, decisões de nota e imagens próprias/autorizadas. | Mantidos isolados em `status: draft` e rastreados em `docs/editorial/primeiras-publicacoes.md`.    | **PENDÊNCIA DO AUTOR**                                                           |

## 3. GitHub Pages, isolamento e CI/CD

- **Workflow de deploy (`.github/workflows/pages.yml`)**: `ASTRO_BASE_PATH=/blog/`, `SITE_URL=https://${{ github.repository_owner }}.github.io`, permissões mínimas (`contents: read`, `pages: write`, `id-token: write`).
- **Build reproduzido localmente sob `/blog/`**: 0 erros HTTP, canonical `https://usuario.github.io/blog/`, favicon `/blog/favicon.svg`, `robots.txt` dinâmico com sitemap `/blog/sitemap-index.xml`, Pagefind funcional sob `/blog/busca/`, RSS e Sitemap HTTP 200.
- **Limitações do GitHub Pages documentadas**: `_headers` e `_redirects` em `public/` são ignorados pelo GitHub Pages (mantidos apenas por compatibilidade caso haja migração futura); agendamento de posts exige novo build/deploy; rollback exige commit corretivo e redeploy.
- **Sequência de isolamento comprovada**: `build:demo` (`dist-demo/`) -> `content:preview -- --build-only` (`dist-preview/`, 51 páginas) -> `npm run build` (`dist/`, 42 páginas) validado por `scripts/check-isolation.mjs` com **0 vazamentos** de fixtures, `demo-assets`, rascunhos ou `[PENDENTE]`.

## 4. Validações executadas

| Verificação                                        | Resultado | Detalhe                                                                                      |
| -------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------- |
| `npm run format:check`                             | **PASS**  | Todos os arquivos conformes com Prettier                                                     |
| `npm run lint`                                     | **PASS**  | 0 erros, 0 avisos                                                                            |
| `npm run check`                                    | **PASS**  | `astro check` (75 arquivos: 0 erros, 0 avisos) + `tsc --noEmit`                              |
| `npm run content:doctor`                           | **PASS**  | Schemas, integridade, mídia local e inventário verificados                                   |
| `npm run test`                                     | **PASS**  | 8 suítes Vitest, **29/29 testes aprovados**                                                  |
| `npm run build:demo` + `content:preview` + `build` | **PASS**  | `dist/` com 42 páginas e isolamento verificado em 51 arquivos                                |
| `npm run test:e2e`                                 | **PASS**  | **11/11 testes Playwright** (contraste WCAG AA, rotas, 320–1920px, tema, busca, RSS/sitemap) |
| `npm audit --omit=dev`                             | **PASS**  | 0 vulnerabilidades em dependências de produção                                               |

## 5. Entregáveis e evidências

- Checklist operacional e de lançamento: `docs/editorial/launch-checklist.md`.
- Evidências visuais inspecionadas em `docs/reports/evidence/phase-46/`: `prod-home-dark.png`, `prod-home-light.png`, `preview-featured-fixed-dark.png`.

## 6. Conclusão independente por eixo

- **Eixo Técnico — APTO**: o blog está tecnicamente sólido, acessível (WCAG 2.2 AA verificado), responsivo (`320px–1920px`), 100% estático, isolado contra vazamento de rascunhos/fixtures e compatível com GitHub Pages (`/blog/`).
- **Eixo Editorial — AGUARDANDO REVISÃO/INSUMOS DO AUTOR**: os 5 rascunhos e 4 fichas factuais estão prontos para preenchimento autoral e importação de mídia própria/autorizada via `media:import`, sem nenhuma publicação automática ou não autorizada.
