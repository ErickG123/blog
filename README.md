# Mangá Atlas

Blog estático em português brasileiro (`pt-BR`) dedicado a reviews, artigos, recomendações, biblioteca de obras e colecionismo de mangás, construído com **Astro** (`output: 'static'`), **TypeScript strict** e **SCSS**.

## Requisitos de ambiente

- **Node.js**: LTS `24.x` (compatível com `>= 22.12.0`; veja `.nvmrc`)
- **npm**: `>= 10.0.0` (gerenciador oficial único; lockfile em `package-lock.json`)
- **Git**: `>= 2.40`

## Instalação (Windows e Linux)

Clone ou abra o repositório na raiz e execute uma instalação limpa reprodutível:

```bash
npm ci
```

Para instalar os binários de navegador do Playwright (necessários para `npm run test:e2e`):

```bash
npx playwright install chromium
```

## Scripts disponíveis

| Comando                | Descrição                                                             |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento Astro (`http://localhost:4321`). |
| `npm run build`        | Gera o build estático em `dist/`.                                     |
| `npm run preview`      | Serve localmente o build estático gerado em `dist/`.                  |
| `npm run check`        | Executa `astro check` e `tsc --noEmit` (verificação de tipos).        |
| `npm run lint`         | Executa ESLint em todo o projeto.                                     |
| `npm run lint:fix`     | Executa ESLint corrigindo problemas automaticamente quando possível.  |
| `npm run format`       | Formata os arquivos suportados com Prettier.                          |
| `npm run format:check` | Verifica a formatação com Prettier sem alterar arquivos.              |
| `npm run test`         | Executa os testes unitários com Vitest (`tests/unit/`).               |
| `npm run test:watch`   | Executa o Vitest em modo watch.                                       |
| `npm run test:e2e`     | Executa os testes E2E com Playwright (`tests/e2e/`).                  |

## Política de commits e hooks

O projeto utiliza **Conventional Commits** validados automaticamente pelo **Commitlint** via **Husky**:

- `commit-msg`: valida a mensagem de commit (ex.: `feat(core): adicionar fundação do projeto`, `chore: atualizar dependências`).
- `pre-commit`: executa `npm run format:check` e `npm run lint`.

## Estrutura e governança SDD

Toda a documentação do projeto está centralizada em `docs/`:

- `docs/governance/AGENTS.md` e `.agents/`: governança, regras de engenharia e skills SDD.
- `docs/vision.md`: visão do produto.
- `docs/specifications/`: especificações (`SPEC-*`), mapa de navegação, política editorial e matriz de rastreabilidade.
- `docs/architecture/`: arquitetura e modelo de domínio (`domain.md`).
- `docs/design/`: design system (`DESIGN-SYSTEM.md`).
- `docs/adr/`: registros de decisões arquiteturais (ADRs).
- `docs/templates/`: templates padrão para SPEC, ADR, auditoria e relatório de fase.
- `docs/roadmap/implementation-status.md`: acompanhamento oficial das 24 fases (00–23).
- `docs/testing/TEST-PLAN.md`: plano único de testes e matriz de verificação.
- `docs/reports/`: relatórios de execução por fase (`REPORT-PHASE-NN.md`) e evidências visuais.
- `docs/CHANGELOG.md`: histórico de versões do projeto.
- `docs/sdd/`: pacote original de prompts SDD (`prompts/`, `ROADMAP.md`, `REGRAS-COMUNS.md`, `PROMPT-ORQUESTRADOR.md`).
