# ADR-0003 — Sistema de temas e tokens semânticos

- **Status**: Aceito
- **Data**: 2026-11-23
- **Fase**: 04

## Contexto

O Mangá Atlas exige temas claro, escuro e sistema sem flash visual no carregamento, com contraste WCAG 2.2 AA, respeito a `prefers-reduced-motion` e funcionamento seguro mesmo se `localStorage` estiver bloqueado.

## Decisão

1. Definir tokens semânticos CSS Custom Properties em `src/shared/styles/tokens.scss` com variante clara padrão em `:root` e variante escura em `:root[data-theme='dark']`.
2. Injetar um script inline mínimo no `<head>` que lê `localStorage.getItem('ma-theme')` dentro de `try/catch`, aplica `data-theme="dark"` ou `data-theme="light"` (ou segue `matchMedia('(prefers-color-scheme: dark)')` quando `'system'` ou ausente) antes da primeira pintura.
3. Fornecer o componente acessível `ThemeToggle.astro` com ciclo `Sistema -> Claro -> Escuro` usando ícones estáticos `lucide-astro` e `aria-live="polite"`.
4. Utilizar stack tipográfica nativa de sistema para evitar dependência de fontes remotas e CLS por troca de fonte.

## Consequências

- Zero flash de tema em navegação estática, zero dependência de rede para fontes e contraste garantido em ambos os temas.
