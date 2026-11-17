# Relatório — fase 08: SEO, feed e smoke

## Resultado

Layout gera canonical e Open Graph, artigos geram JSON-LD, 404 é `noindex`, RSS respeita `/blog/`, sitemap e robots existem. `scripts/check-static-output.mjs` verifica rotas essenciais, prefixo base e destinos de links internos.

## Evidências e limites

Build produziu 13 páginas e sitemap. O smoke passou. Não foram adicionadas imagens, fontes ou hotlinks. Auditoria visual de CLS/performance e auditoria WCAG completa permanecem fora do que os checks automatizados mediram; por isso esta fase é parcial.
