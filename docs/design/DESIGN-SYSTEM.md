# Design System — Mangá Atlas

- **Fase**: 04
- **Data**: 2026-11-23

## 1. Identidade visual

Blog pessoal editorial moderno, calmo e focado em leitura:

- **Grafite**: `#151518` (texto no claro / fundo no escuro)
- **Fundo claro**: `#F7F7F8`
- **Vermelho editorial**: `#C82333` (claro, contraste >= 4.5:1) / `#F0525E` (escuro)
- **Roxo discreto**: `#6D3FD6` (claro) / `#A78BFA` (escuro) para foco e detalhes secundários.
- **Wordmark**: tipográfico provisório `Mangá Atlas` com destaque editorial em vermelho, sem fingir ser logo definitiva.

## 2. Tipografia e ritmo

- Stack de sistema (`--ma-font-sans`, `--ma-font-serif`, `--ma-font-mono`).
- Largura de leitura controlada (`--ma-measure: 68ch`).
- Respeito automático a `prefers-reduced-motion`.

## 3. Componentes primitivos (`src/shared/ui/`)

- `ThemeToggle.astro`: alternador acessível Claro / Escuro / Sistema.
- `SectionHeading.astro`: cabeçalho semântico de seção com link opcional.
- `TagChip.astro`: etiqueta discreta para tags, gêneros e metadados.
- `Button.astro`: botão/link de ação com foco visível.
- `EmptyState.astro`: estado vazio claro e acolhedor.
- `SpoilerBlock.astro`: bloco de spoiler baseado em `<details>` (acessível por teclado e funcional sem JS).
- `MediaFigure.astro`: figura com proporção intrínseca, `width`/`height`, `alt` e crédito editorial.
