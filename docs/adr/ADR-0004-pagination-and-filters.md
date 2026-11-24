# ADR-0004 — Estratégia de Paginação, Filtros e Ordenação em Astro Estático

- **Status**: Aceito
- **Data**: 2026-11-23
- **Fase**: 40

## Contexto

O Mangá Atlas é 100% estático (`output: 'static'`), sem backend ou SSR. Precisamos combinar paginação real (12 itens em listagens editoriais, 24 na biblioteca), filtros múltiplos e ordenação sem gerar explosão combinatória de rotas estáticas e garantindo que filtros atuem sobre **todo** o conjunto elegível (nunca apenas sobre a página atual).

## Decisão

1. **Limites centralizados** em `src/shared/config/pagination.ts` (`reviews: 12`, `articles: 12`, `guides: 12`, `collecting: 12`, `works: 24`).
2. **Modelo puro determinístico** em `src/shared/utils/pagination.ts` (`paginateCollection`, `buildPageWindow`, `sortEntries`).
3. **Renderização estática + aprimoramento progressivo sobre o conjunto completo**:
   - O HTML estático entrega todos os cartões públicos elegíveis ordenados deterministicamente (garantindo acesso total sem JS).
   - O controlador leve no cliente (`ListControls.astro`) aplica filtros, ordenação e paginação sobre o conjunto completo em memória, sincroniza `?pagina=`, `?filtro=` e `?ordem=` na URL (`history.replaceState` / `popstate`), volta à página 1 ao alterar filtro/ordenação e exibe o resumo `Mostrando X–Y de Z`.
   - Páginas inexistentes (`?pagina=999` ou `?pagina=abc`) retornam aviso seguro e voltam para a página 1.

## Consequências

- Zero backend, zero explosão de rotas estáticas, URLs compartilháveis e filtros sempre consistentes com a paginação.
