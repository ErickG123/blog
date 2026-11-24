---
name: sdd-phase-execution
description: Fluxo padrão para executar uma fase SDD do Mangá Atlas com auditoria prévia, implementação mínima, validação com evidências e atualização de relatórios.
---

# Execução de Fase SDD — Mangá Atlas

1. **Auditoria inicial**: verifique raiz, árvore, `git status`, branch e leia `AGENTS.md`, `.agents/rules/`, `docs/roadmap/implementation-status.md`, `docs/testing/TEST-PLAN.md` e o relatório da fase anterior.
2. **Planejamento mínimo**: confirme pré-requisitos e escopo da fase sem antecipar fases futuras.
3. **Implementação**: aplique mudanças coerentes com `AGENTS.md` e ADRs aceitos.
4. **Validação**: execute os checks reais (`format:check`, `lint`, `check`, `test`, `build`, `test:e2e` e evidências visuais quando houver UI).
5. **Encerramento**: atualize `docs/testing/TEST-PLAN.md`, `docs/roadmap/implementation-status.md`, `CHANGELOG.md` (quando relevante) e gere `docs/reports/REPORT-PHASE-NN.md` usando `docs/templates/REPORT-TEMPLATE.md`.
