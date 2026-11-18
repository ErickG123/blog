# Prontidão para release — fase 11

Data: 2026-11-17 (revisão incremental)

## Decisão: NO-GO para release público

As verificações locais de código passaram: typecheck, lint, unitários, build, links estáticos/base path, smoke visual com axe, E2E. A tentativa de `npm ci` feita nesta revisão falhou localmente com `EPERM` ao limpar o binding nativo; a instalação foi restaurada com `npm install` e o typecheck confirmou que o aviso de `tsconfig.json` era consequência dessa instalação incompleta. O workflow público disparado pelo push `b3cba29` falhou na instalação de dependências; os demais passos foram pulados. Logs detalhados requerem autenticação e a causa remota exata não foi confirmada. A validação de dependências encontrou 9 achados altos transitivos associados a `picomatch`/Astro/Vite; o [advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) não declara versão corrigida e `npm audit fix` sugere downgrade major do Astro, que não foi aplicado. O workflow foi endurecido para parar em falha de auditoria de produção.

O release não está pronto porque não há obras, autores ou artigos temáticos verificados e aprovados; o único artigo atual é um tutorial técnico legado cuja permanência precisa de decisão editorial. Além disso, a execução remota falhou na instalação de dependências e existe alerta alto sem correção publicada para uma dependência de build. O job de deploy foi pulado por dependência do job de build; não houve deploy efetivo neste run nem criação de release.

## Condições para mudar para GO

1. Produzir e aprovar conteúdo de lançamento, fontes externas, autoria e proveniência/licença das imagens; decidir sobre o artigo legado.
2. Diagnosticar e corrigir a falha de `npm ci` do run #5; confirmar todos os checks remotos com as actions atualizadas.
3. Aguardar correção upstream para picomatch ou decisão explícita de risco; reexecutar auditoria de dependências.
4. Auditar as rotas de detalhe quando houver obras e temporadas cadastradas; completar revisão manual de teclado e leitor de tela, incluindo Giscus.
5. Fazer uma verificação final do domínio publicado e dos recursos sob `/blog/` após a decisão de release.

Consulte `docs/reports/REPORT-PHASE-11.md` e `docs/audits/AUDIT-PHASE-11.md` para evidências e limitações.
