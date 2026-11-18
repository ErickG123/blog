# Roadmap SDD — blog de anime e mangá

| Fase | Estado | Requisitos principais |
|---|---|---|
| 00 — Baseline | concluída | Auditoria e preservação de URLs |
| 01 — Governança e contratos | concluída | RF/RNF, aceite, política, ADRs |
| 02 — Collections | concluída | schemas compatíveis e referências tipadas; coleções sem dados reais permanecem vazias |
| 03 — Design e layout | parcial | matriz visual responsiva e tema automatizada; revisão manual completa e páginas sem conteúdo ainda pendentes |
| 04 — Home e listagens | concluída | home, busca e cinco listas editoriais com estado vazio |
| 05 — Artigo | concluída | recursos legados, metadados, autor/obra/spoiler e fallback de comentários |
| 06 — Catálogo | concluída | catálogo e páginas individuais; sem obras fictícias |
| 07 — Temporadas | parcial | catálogo combina tipo/gênero/ano/estação/busca; rotas de detalhe aguardam obras reais |
| 08 — SEO e acessibilidade | parcial | metadados/base path validados e axe automatizado; leitor de tela e revisão manual pendentes |
| 09 — Testes e CI | parcial / bloqueio remoto | checks locais passam; run #5 falhou em `Install dependencies`, sem diagnóstico detalhado disponível |
| 10 — Auditoria final | parcial / NO-GO para release | conteúdo editorial ausente, CI remoto falhou e dependência transitiva tem alerta alto sem correção publicada |
| 11 — Consolidação técnica, visual e editorial | implementação local consolidada / NO-GO para publicação | filtros, proveniência editorial, axe e SEO/base path cobertos; release depende de conteúdo, CI e atualização de dependência vulnerável |
| 12 — Redesign da experiência Anime & Mangá | parcial / NO-GO para publicação | design system e templates implementados; matriz visual local passou; a Fase 12.1 recuperou baseline visual comparável; faltam teste com leitor de tela, detalhes renderizados com obras reais, CI remoto verde e revisão dos 9 alertas altos transitivos |
| 12.1 — Correção de direção visual e UX | implementação visual concluída localmente / NO-GO para publicação | hero abstrato e cards de iniciais removidos; conteúdo legado separado; 156 capturas antes e depois; matriz axe/overflow, E2E e checks locais passaram; release ainda depende de dependência vulnerável, CI remoto, conteúdo verificado e revisão assistiva manual |
| 12.2 — Reconstrução visual orientada por conteúdo | concluída localmente / NO-GO para publicação | header compacto, cards visuais 16:9 e 3:4, TOC condicional no artigo, fixtures isoladas de desenvolvimento (`PUBLIC_USE_FIXTURES=true`), auditoria visual com (120) e sem fixtures (78), testes unitários (11) e E2E (5) aprovados; release aguarda conteúdo editorial real e CI remoto |
| 12.3 — Refinamento visual e correção de navegação | concluída localmente / NO-GO para publicação | removida linha coral inferior do menu ativo, texto centralizado e dimensões estáveis nas abas, estado vazio redundante removido da Home, rota secundária `/arquivo/` criada para conteúdo legado, 84 capturas em 390/768/1440px e 6 testes E2E aprovados |
| 12.4 — Unificação e refinamento da experiência de pesquisa | concluída localmente / NO-GO para publicação | busca unificada em `<dialog>` nativo acessível em todas as rotas, campo redundante da Home removido, conflito `ERESOLVE` de `eslint` corrigido para o CI (`eslint@^9.39.5`), 12 testes unitários, 7 testes E2E e 84 combinações visuais (+24 com modal aberto) aprovados |

Baseline estático inicial e evidências de execução estão em `docs/reports/`. A Fase 12.1 restaura capturas comparáveis em `artifacts/phase12-1-visual/` (ignoradas pelo Git). O site ainda não tem autores/obras verificados cadastrados. O workflow deve confirmar sucesso em GitHub Actions antes de criar uma release.
