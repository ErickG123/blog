# Roadmap SDD — blog de anime e mangá

| Fase | Estado | Requisitos principais |
|---|---|---|
| 00 — Baseline | concluída | Auditoria e preservação de URLs |
| 01 — Governança e contratos | concluída | RF/RNF, aceite, política, ADRs |
| 02 — Collections | concluída | schemas compatíveis e referências tipadas; coleções sem dados reais permanecem vazias |
| 03 — Design e layout | parcial | tokens, header/footer, tema e mobile; auditoria visual completa pendente |
| 04 — Home e listagens | concluída | home, busca e cinco listas editoriais com estado vazio |
| 05 — Artigo | concluída | recursos legados, metadados, autor/obra/spoiler e fallback de comentários |
| 06 — Catálogo | concluída | catálogo e páginas individuais; sem obras fictícias |
| 07 — Temporadas | parcial | rotas e filtros por tipo/gênero implementados; taxonomias não estão ligadas a filtros combinados |
| 08 — SEO e acessibilidade | parcial | metas, JSON-LD, RSS, sitemap e smoke; auditorias visuais/a11y completas pendentes |
| 09 — Testes e CI | concluída localmente | 5 unitários, 4 E2E, link check, CI atualizado; execução remota pendente |
| 10 — Auditoria final | parcial / NO-GO para release | build limpo; conclusão editorial e execução remota ainda pendentes |
| 11 — Consolidação técnica, visual e editorial | em consolidação / NO-GO para publicação editorial | filtros combinados, origem de mídia, checks locais e matriz visual; conteúdo aprovado e CI remoto permanecem pendentes |

Baseline estático inicial e evidências de execução estão em `docs/reports/`. O site ainda não tem autores/obras verificados cadastrados. O workflow deve confirmar sucesso em GitHub Actions antes de criar uma release.
