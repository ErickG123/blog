# ADR-0001 — Stack tecnológica e arquitetura static-first

- **Status**: Aceito
- **Data**: 2026-11-23
- **Fase**: 00

## Contexto

O **Mangá Atlas** é um blog editorial pessoal em `pt-BR` dedicado a reviews, artigos, recomendações, biblioteca de obras e colecionismo de mangás. O projeto exige foco em leitura, desempenho, acessibilidade WCAG 2.2 AA, baixo custo operacional e zero dependência de banco de dados, backend dinâmico, autenticação ou CMS externo.

## Decisão

Adotar uma arquitetura **static-first** com a seguinte stack base:

- **Framework**: Astro (`^7.4.13`) configurado explicitamente com `output: 'static'`.
- **Linguagem**: TypeScript (`^6.0.3`, com `@types/node ^26.6.6`) em modo `strict` (`extends: "astro/tsconfigs/strict"`). Mantido na série 6.x por compatibilidade com `@astrojs/check` e `typescript-eslint`.
- **Estilos**: SCSS via `sass` (`^1.108.2`), sem framework CSS utilitário ou runtime cliente adicional.
- **Runtime e pacotes**: Node.js LTS (`v24.18.0`, `.nvmrc` = `24`, `engines.node >= 22.12.0`) com `npm` (`11.5.2`) como único gerenciador de pacotes e lockfile único (`package-lock.json`).
- **Qualidade de código**: ESLint (`^10.15.0`, flat config com `typescript-eslint` e `eslint-plugin-astro`), Prettier (`^3.10.1` com `prettier-plugin-astro`), `@astrojs/check`, Husky (`^9.1.7`) e Commitlint (`^21.2.4` com `@commitlint/config-conventional`).
- **Testes**: Vitest (`^5.1.1`) para testes unitários/integração e Playwright (`^1.65.1`) para testes E2E e validações visuais em navegador.

Dependências de fases futuras (como MDX, Pagefind e Lucide) não são instaladas na Fase 00 e serão introduzidas apenas nas fases pertinentes.

## Alternativas consideradas

- **Frameworks SPA/SSR com runtime cliente pesado (ex.: Next.js / Nuxt)**: rejeitados por introduzirem complexidade de servidor e JavaScript desnecessário no cliente para um blog puramente editorial e estático.
- **Gerenciador alternativo (pnpm/yarn)**: rejeitado para manter padronização nativa com Node/npm sem exigir ferramenta extra em ambientes Windows e Linux.

## Consequências

- **Positivas**: HTML estático rápido, zero custo de backend, tipagem forte ponta a ponta, instalação reprodutível via `npm ci` e governança automatizada via hooks.
- **Negativas / trade-offs**: Interatividade cliente deve ser mínima e progressiva (HTML/CSS + JS vanilla tipado quando necessário), salvo ADR posterior justificado.
- **Riscos e mitigações**: Testes E2E dependem de binários de navegador do Playwright instalados no ambiente; quando ausentes, o plano de testes registra a limitação explicitamente.
