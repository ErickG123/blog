# AGENTS.md — Governança do Mangá Atlas

Este arquivo define as regras de engenharia, governança SDD (Specification-Driven Development) e padrões obrigatórios para agentes e colaboradores no repositório **Mangá Atlas**.

## 1. Ordem de precedência

Em caso de conflito entre artefatos, siga estritamente esta ordem (do mais forte para o mais fraco):

1. Instrução explícita do usuário na sessão atual.
2. `AGENTS.md` (este documento) e regras em `.agents/rules/`.
3. ADRs aceitos em `docs/adr/`.
4. Especificações aprovadas em `docs/specifications/`.
5. `docs/testing/TEST-PLAN.md` e `docs/roadmap/implementation-status.md`.
6. Código e testes existentes no repositório.

Se houver conflito material entre requisitos ou bloqueio relevante, registre-o explicitamente no relatório da fase e não avance silenciosamente.

## 2. Arquitetura e organização (feature-based pragmático)

- **Stack**: Astro com saída estática (`output: 'static'`), TypeScript `strict`, SCSS e npm como único gerenciador de pacotes (`package-lock.json`). Sem framework cliente adicional salvo ADR justificado.
- **Estrutura de pastas**:
  - `src/pages/`: rotas e composição de página.
  - `src/features/<area>/`: comportamento, modelos, schemas, serviços e UI específicos de cada domínio.
  - `src/shared/`: apenas utilitários, estilos base, tipos e componentes genuinamente reutilizados por múltiplas features.
- **Convenções de arquivos**:
  - Modelos de domínio em `*.model.ts`; schemas em `*.schema.ts` quando útil, sem duplicar tipos inferíveis.
  - Componentes `.astro` reúnem markup e frontmatter de composição nativos; lógica significativa deve ser extraída para `.ts` e estilos para `.scss` separados.
  - Evitar abstrações prematuras, pastas vazias e bibliotecas desnecessárias.

## 3. Conteúdo e integridade

- Conteúdo em Markdown/MDX e coleções de dados tipadas (a partir da fase pertinente).
- IDs estáveis e slugs independentes; consultas públicas centralizadas, sem vazamento de rascunhos, agendados, fixtures ou registros inválidos.
- MDX é conteúdo de autores confiáveis e versionado — nunca código vindo de visitantes.
- Nunca inventar fatos sobre obras, datas, notas, fontes, autores ou edições. Fixtures sintéticas devem ser claramente marcadas e isoladas do build real.
- Imagens próprias, autorizadas ou com licença compatível e crédito; proibido hotlink não autorizado, remoção de marcas ou scraping.

## 4. Diretrizes de UI, acessibilidade e idioma

- Idioma: **pt-BR**, URLs estáveis, datas ISO com convenção explícita.
- Design de blog pessoal moderno (não portal de notícias ou dashboard): identidade grafite/vermelho com roxo discreto; capas e fotografia como protagonistas; sem emojis como ícones, sem gradientes excessivos, sem cards para tudo.
- Temas claro/escuro/sistema, navegação por teclado, foco visível, semântica HTML, contraste WCAG 2.2 AA, redução de movimento (`prefers-reduced-motion`) e responsividade a partir de `320px`.
- Ícones via Lucide quando úteis (na fase pertinente). Não forçar proporções de imagens; fornecer dimensões e textos alternativos acessíveis.

## 5. Fora de escopo

Proibido implementar ou criar scaffolding para: monetização (anúncios, afiliados, assinatura, patrocínios), banco de dados, backend, autenticação, comentários, CMS/painel administrativo, integrações automáticas com catálogos, IA, rede social e scripts de rastreamento de terceiros.

## 6. Testes, validação e SDD

- Toda fase exige validação proporcional com evidências reais: instalação reprodutível (`npm ci`), `format:check`, `lint`, `check`, `test`, `build` e `test:e2e` quando aplicável.
- Fases com alteração de UI exigem evidências visuais reais (desktop `1440x900` e mobile `390x844`, ambos os temas, mais checagem `320px`) em `docs/reports/evidence/phase-NN/`.
- Atualize `docs/testing/TEST-PLAN.md`, `docs/roadmap/implementation-status.md` e gere `docs/reports/REPORT-PHASE-NN.md` ao encerrar cada fase.
- Nunca desative regras de lint/TS ou testes para forçar aprovação.

## 7. Git e commits

- Commits seguem **Conventional Commits** validados por Commitlint e Husky.
- Preserve alterações locais do usuário; proibido `git reset --hard`, `git clean -fd`, force push ou reescrita de histórico.
- Nunca faça push, deploy ou crie remotes sem autorização explícita.
