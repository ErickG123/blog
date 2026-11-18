# Auditoria visual e de UX — Fase 12.1

**Data:** 17/11/2026  
**Escopo:** revisão da direção visual existente e verificação do ajuste em home, navegação, artigo, catálogo, temporadas, listagens, tags e 404.  
**Resultado:** correção local implementada e validada; prontidão de release continua **NO-GO** pelas pendências técnicas/editoriais registradas abaixo.

## Método e estado inicial

Antes das alterações, foram lidas as regras de conteúdo em `.agents/rules/content-and-routes.md`, os relatórios/auditorias das Fases 03, 11 e 12, ADR-0004, SPEC-0001, o roadmap e os componentes/páginas afetados. A auditoria da Fase 12 já identificava a direção de revista, grandes elementos abstratos e falta de evidência baseline recuperável.

O estado anterior foi capturado com Playwright em 13 rotas, seis larguras (360, 390, 768, 1280, 1440 e 1920 px) e temas claro/escuro: **156 screenshots** em `artifacts/phase12-1-visual/before/`. A captura `desktop-1440-light-home.png` confirma hero ilustrado dominante, chamada institucional grande, sete cartões estreitos com iniciais/numeração, conteúdo recente abaixo da navegação por categorias e textos editoriais artificiais. O catálogo vazio era acompanhado por uma chamada promocional; o rodapé exibia texto de política no fluxo principal.

## Problemas confirmados antes da correção

- A home priorizava slogan e arte geométrica em vez de publicação real.
- Sete cartões de editoria comprimiam o nome e a descrição em colunas estreitas, com letras e índices decorativos.
- A hierarquia e os rótulos (“Explore por editoria”, “Textos publicados”, “Assuntos no arquivo”) tinham tom genérico/editorial abstrato.
- A única publicação existente é um artigo técnico de exemplo, não conteúdo de anime/mangá; exibi-la como conteúdo temático seria enganoso.
- A ausência de obras ocupava uma faixa promocional, embora não haja registros editoriais verificados.
- Header, rodapé e artigo tinham elementos decorativos ou textos internos que competiam com o conteúdo.

## Ajustes observados no estado final

- Home com cabeçalho compacto e introdução curta; o componente de destaque só aparece para publicação real marcada como destaque.
- Seções de animes, mangás, reviews e guias aparecem apenas quando há registros públicos.
- Categorias em cinco links legíveis, nome completo, descrições objetivas, ícones discretos e grade de até três colunas no desktop; mobile usa uma coluna.
- Artigo legado continua disponível no mesmo URL, RSS, tags e página própria, mas aparece em “Arquivo geral” separado do feed temático. Nenhum conteúdo/frontmatter foi reescrito.
- Cards de artigos simplificados, com capa opcional e tags configuráveis; estados vazios menores e contextuais.
- Catálogo vazio sem apresentação publicitária; fallback de capa simples, explicitamente identificado.
- Paleta, tipografia, espaçamento, header e footer simplificados; menu, busca global, RSS e alternância de tema mantidos.
- Páginas de artigo mantêm índice, barra de leitura, compartilhamento, Giscus e navegação existente.

## Evidências e validações

- Screenshots “antes”: `artifacts/phase12-1-visual/before/` — 156 PNGs.
- Screenshots “depois”: `artifacts/phase12-1-visual/after/` — 156 PNGs.
- `npm run audit:ui:phase12-1`: passou para **156 combinações rota × viewport × tema**, sem overflow horizontal, sem violações axe reportadas e sem falhas de foco/semântica detectadas pelo script.
- Revisão visual manual das capturas desktop 1440 e mobile 360/390 em ambos os temas, além de artigo, catálogo vazio e 404: hierarquia legível, composição simples, navegação sem corte. O site não tem capas reais para avaliar.
- `npm run test:e2e`: 5 testes passaram após sincronizar os rótulos esperados. Inclui rotas base `/blog/`, busca, estado vazio, tema, 404 e navegação por teclado.
- `npm run lint`, `npm run typecheck`, `npm test` (10 testes), `npm run build` (13 páginas) e `npm run check:static`: passaram.
- `npm audit --omit=dev`: **falhou**, mantendo 9 vulnerabilidades altas transitivas ligadas a `picomatch`; a sugestão automática requer downgrade potencialmente incompatível para Astro 5.3.0 e não foi aplicada.

## Limites e pendências

- Não há obras, autores, taxonomias ou posts editoriais de anime/mangá publicados; portanto, cards com capas, filtros preenchidos e detalhes de obra/temporada não podem ser validados com conteúdo real.
- Axe é automatizado e exclui o iframe remoto do Giscus. Leitor de tela e revisão manual completa de teclado/contraste seguem pendentes.
- CI remoto não foi consultado nesta fase. A última evidência documental é o workflow #5 falhando em `Install dependencies`, sem diagnóstico detalhado; exige nova verificação no GitHub.
- Não foi executado deploy. Compatibilidade estática local com prefixo `/blog/` foi verificada.
- O diretório `artifacts/phase12-1-visual/` é ignorado pelo Git; as capturas estão disponíveis localmente no workspace e não fazem parte do diff rastreado.

## Conclusão

A correção atende à mudança de direção visual e à preservação funcional no estado local observado. **Fase 12.1: implementação visual concluída localmente; release: NO-GO** até resolver/avaliar a dependência vulnerável, obter CI remoto verde, concluir revisão assistiva/manual e produzir conteúdo editorial verificado.
