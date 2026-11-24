# Design System — Mangá Atlas

- **Atualizado na Fase**: 42
- **Data**: 2026-11-24

## 1. Identidade visual

Blog pessoal editorial moderno, calmo e focado em leitura:

- **Fundo claro**: `#F3F3F6` com superfícies `#FFFFFF` / `#ECECF2` e texto `#141418`.
- **Fundo escuro**: `#121216` com superfícies em camadas `#1C1C23` / `#25252E` / `#2C2C38` e texto `#F3F3F7`.
- **Vermelho editorial**: `#C82333` (claro e superfície de botão primário em ambos os temas, contraste `5.61:1` com `#FFFFFF`) / `#E53946` (links e acentos textuais no escuro).
- **Roxo discreto**: `#6D3FD6` (claro) / `#A78BFA` (escuro) para anel de foco (`:focus-visible`) e detalhes secundários.
- **Wordmark**: tipográfico `Mangá Atlas` com destaque editorial em vermelho (`public/favicon.svg` como ícone de aba).

## 2. Tipografia e ritmo

- Stack de sistema (`--ma-font-sans`, `--ma-font-serif`, `--ma-font-mono`).
- Largura de leitura controlada (`--ma-measure: 68ch`) e container global (`--ma-container: 80rem`).
- Escala de espaçamento `--ma-space-1` (`4px`) a `--ma-space-16` (`64px`).
- Respeito automático a `prefers-reduced-motion`.

## 3. Componentes interativos — Botões (`Button.astro` e `.ma-btn`)

Preserva semântica HTML: `<a>` para navegação (`href` definido) e `<button>` para ações.
Links em blocos de prosa (`.ma-prose a:not(.ma-btn):not(.ma-tag)`) não interferem em botões ou tags.

### Variantes semânticas

- **`primary` (`.ma-btn--primary`)**: fundo `--ma-btn-primary-bg` (`#C82333`), texto e ícones `--ma-btn-primary-text` (`#FFFFFF`), contraste >= `4.5:1` em `default`, `hover` e `active` nos temas claro e escuro.
- **`secondary` (`.ma-btn--secondary`, padrão)**: superfície secundária (`--ma-btn-secondary-bg`), borda `--ma-btn-secondary-border`, texto neutro de alto contraste (`--ma-btn-secondary-text`).
- **`outline` (`.ma-btn--outline`)**: fundo transparente, borda `--ma-border-strong`, texto neutro.
- **`ghost` (`.ma-btn--ghost`)**: fundo e borda transparentes com realce suave de superfície no hover/active.
- **`link` (`.ma-btn--link`)**: aparência textual sublinhada para ações inline navegáveis.

### Dimensões e agrupamento

- Altura padrão: `--ma-btn-height: 2.625rem` (`42px`).
- Padding horizontal: `--ma-btn-px: 1.125rem` (`18px`).
- Border radius: `--ma-btn-radius: 8px`.
- Espaçamento interno ícone/texto: `--ma-btn-gap: 8px`; ícones SVG `16px` (`1rem`) com `color: currentColor`.
- Grupo de botões (`.ma-btn-group`): espaçamento `12px` (`--ma-space-3`), empilhamento vertical com largura total abaixo de `480px`.

## 4. Demais componentes primitivos (`src/shared/ui/`)

- `ThemeToggle.astro`: alternador acessível Claro / Escuro / Sistema.
- `SectionHeading.astro`: cabeçalho semântico de seção com link opcional.
- `TagChip.astro`: etiqueta discreta para tags, gêneros e metadados.
- `CopyLinkButton.astro`: cópia acessível de URL com retorno `aria-live`.
- `ListControls.astro`: filtros, ordenação e paginação sincronizados com a URL.
- `EmptyState.astro`: estado vazio claro e acolhedor.
- `SpoilerBlock.astro`: bloco de spoiler baseado em `<details>` (acessível por teclado e sem JS).
- `MediaFigure.astro`: figura com proporção intrínseca, `width`/`height`, `alt`, crédito e `resolveAssetUrl`.
