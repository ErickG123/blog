# Validação visual e acessibilidade — Fase 12

Data: 17/11/2026

## Matriz automatizada

Executado com `npm run audit:ui:phase12` sobre o build estático servido em `/blog/`. Todas as páginas HTML atualmente geradas foram incluídas, inclusive as três tags. RSS é XML e ficou coberto pelos testes estáticos/E2E.

| Item | Resultado |
|---|---:|
| Páginas públicas amostradas | 13 (inclui todas as tags geradas) |
| Viewports | 360, 375, 390, 768, 1440 e 1920 px |
| Temas | Claro e escuro |
| Combinações verificadas | 156 |
| Violações axe | 0 |
| Overflow horizontal | 0 |
| Capturas finais | 48 PNGs |

O scanner também verifica uma região `main`, exatamente um `h1`, ausência de saltos de nível nos headings, nomes/labels/alt dos controles visíveis, foco de pelo menos 2,5 px, preferência por movimento reduzido e contraste dos tokens. Menores razões apuradas: texto 14,04:1; texto secundário 5,70:1; acento 5,64:1; borda 3,36:1.

## Inspeção manual

Inspecionadas as capturas finais em:

- `test-results/phase12-visual/after/mobile-360-light-home.png` — header de duas linhas sem corte, hero, categorias em duas colunas e texto sem overflow.
- `test-results/phase12-visual/after/desktop-1440-light-home.png` — hierarquia do hero, superfície editorial, categorias e acervo.
- `test-results/phase12-visual/after/desktop-1440-light--posts-ola-mundo-.png` — artigo legado, TOC, metadados, tags, conteúdo e compartilhar.
- `test-results/phase12-visual/after/tablet-768-dark--obras-.png` — catálogo sem dados, estado vazio e tema escuro.
- Há capturas equivalentes em ambos os temas e demais larguras, mais 404 e as rotas principais geradas.

As capturas finais foram observadas sem foco artificial de teclado sobreposto; a checagem de foco roda separadamente com Tab. Capturas da baseline mencionadas na auditoria não estão no checkout atual, então não foi arquivado um par antes/depois. O estado inicial foi registrado descritivamente e havia passado no smoke anterior de 66 combinações.

## Limites da validação

- As coleções de obras/autores/taxonomias estão vazias. Rotas de detalhe de obra e temporada não são geradas; suas telas foram tipadas e compiladas, porém ainda não foram comparadas visualmente com fichas reais aprovadas.
- Axe exclui `#giscus-container`; o iframe é remoto. Não houve teste manual com leitor de tela nem em navegador/dispositivo móvel real.
- O smoke valida landmarks, headings, nomes, tokens e axe, mas não mede CLS com Web Vitals nem execução no GitHub Pages remoto.
