# Auditoria visual — fase 12

Data: 2026-11-17

## Escopo e fontes

Revisados `docs/README.md`, `docs/specifications/SPEC-0001-product-vision.md`, roadmap, arquitetura, ADRs 0001–0005, relatórios das fases 03–11, guias editoriais e `.agents/rules/content-and-routes.md`. Inspecionados os componentes Astro, layout global, páginas públicas e estado real das collections. Nenhum componente foi refatorado antes desta auditoria.

## Estado observado

- Saída Astro estática sob `/blog/`; existe somente um artigo de programação legado, sem obras, autores, taxonomias ou mídia editorial verificada.
- Componentes compartilhados: `Layout.astro` (shell, tema e navegação), `PostListing.astro` (cinco categorias), `PostCard.astro` (artigos) e `EmptyState.astro` (vazios). Home, artigo, catálogo, temporada/tag/404 ainda têm CSS e composição locais. Não há componente para card de obra, seção editorial, breadcrumb ou busca global.
- Home tem hero tipográfico alto seguido por busca, um único post genérico, arquivo mensal e dois painéis laterais. O primeiro conteúdo fica abaixo de bastante área vertical; a organização se parece com um blog técnico minimalista e não apresenta uma hierarquia de descoberta de anime/mangá.
- Header contém só Início, Anime, Mangá e Obras; Notícias, Reviews, Guias e Temporadas ficam escondidos na home. Não indica rota ativa, não tem busca global e a quebra mobile posiciona o alternador de tema numa linha separada.
- Listagens de Notícias, Anime, Mangá, Reviews e Guias usam o mesmo `PostListing`; o visual não sinaliza diferenças editoriais. Cards são texto dentro de caixas com borda e não têm variante compacta ou de destaque.
- Catálogo vazio é claro e não inventa obras, mas a página e temporadas carecem de orientações de descoberta integradas e elementos visuais próprios. Detalhe de obra/temporada depende de conteúdo e não foi gerado.
- Artigo preserva índice, progresso, share/copy, tags e comentários. O conteúdo é legível e possui TOC; navegação e metadados estão distribuídos em elementos simples e a apresentação não diferencia formatos curtos/longos nem traz uma capa sem conteúdo verificado.
- Tema claro/escuro usa acento coral/laranja, tipografia de sistema, bordas frequentes e raios de 10px. Contraste passou no smoke anterior; a paleta e os tokens dão pouca assinatura própria além do acento.

## Evidência da interface atual

O smoke disponível foi executado novamente antes da implementação: 66 combinações (11 rotas x 3 viewports x 2 temas), sem overflow e sem violações próprias do axe; o iframe externo Giscus continua excluído. A inspeção visual manual prévia cobriu home desktop claro/escuro, home mobile escuro, artigo desktop claro e catálogo tablet escuro. Os arquivos de captura daquela execução não estão presentes no checkout atual, então não foi possível manter comparação direta por imagem com a baseline; os resultados textuais e esta descrição registram o estado inicial.

Arquivos de evidência inicial descritos na execução: `home-desktop-light.png`, `home-desktop-dark.png`, `home-mobile-dark.png`, `article-desktop-light.png` e `catalog-tablet-dark.png`. As imagens não estão disponíveis agora para anexar ao diff visual.

## Problemas prioritários

1. A identidade de anime/mangá depende quase só do título e de um eyebrow; falta linguagem gráfica/editorial reconhecível.
2. A home não se adapta suficientemente ao acervo vazio: o artigo técnico legado ocupa o papel de conteúdo principal temático e a composição não explica claramente categorias e catálogo.
3. Header não expõe todos os destinos e não oferece busca global, estado ativo ou menu compacto utilizável em mobile.
4. Templates repetem a mesma lista para categorias com intenções diferentes; a hierarquia visual favorece caixas e divisores sem variedade de densidade.
5. Falta um conjunto explícito de tokens para tipografia, spacing, container, camadas/superfícies, estados e mídia; estilos repetem valores locais.
6. Não há imagens editoriais licenciadas; o design precisa manter proporção/fallback preparados sem placeholders que pareçam dados reais.

## Restrições e orientação

Preservar URLs, IDs, tema persistido, RSS, Giscus/fallback, links de compartilhamento, progresso, TOC, busca, filtros combinados e conteúdo legado. Não modificar nem despublicar o artigo de programação. Não adicionar títulos, obras, sinopses, autores, notas, datas ou imagens inventadas. Redesign deve resolver estrutura, navegação, ritmo tipográfico e identidade de superfície, sem framework ou backend.

## Critérios para auditoria após implementação

- Home útil com as collections vazias e adaptável quando entrarem itens reais, sem renderizar seções vazias.
- Header com acesso claro às rotas editoriais, busca acessível, ativo, tema e navegação mobile por teclado.
- Componentes compartilhados para seções/cards/listagens/empty state, sem templates editoriais duplicados desnecessariamente.
- Artigo e catálogo com composição apropriada sem perder os recursos existentes.
- Capturas antes/depois e verificações em 360, 375, 390, 768, 1440 e 1920px, nos dois temas; axe, teclado, movimento reduzido, contrastes e regressões E2E.
- Relatórios separados entre evidência automatizada, inspeção visual manual e limitações por ausência de conteúdo.

## Resultado da auditoria após implementação

O redesenho foi aplicado sobre Astro/CSS e mantém o conteúdo e as rotas existentes. O sistema visual agora usa superfícies de papel/tinta, acento coral, azul semântico, escala tipográfica fluida, tokens de espaço/container, raios, foco e regras de movimento reduzido. O header expõe as rotas editoriais, busca global, RSS, tema, menu agrupado e estado ativo; no mobile, os destinos quebram em linhas e permanecem alcançáveis por teclado.

A home contém áreas opcionais para anime, mangá, reviews e guias, renderizadas somente quando existirem entradas publicadas. As categorias e o catálogo seguem úteis com as collections vazias; o artigo legado aparece identificado como acervo, sem alteração de conteúdo. Listagens, tags, cards de artigo/obra, estados vazios, temporadas, fichas de obra, artigo e 404 foram compostos sobre padrões compartilhados. O detalhe da obra exibe o campo editorial de sinopse mesmo quando o corpo Markdown estiver vazio e agrega gêneros referenciados pelo schema.

### Evidências após as correções

- `npm run audit:ui:phase12`: 156 combinações (13 páginas públicas amostradas, incluindo todas as tags geradas × 6 larguras × 2 temas), sem overflow horizontal, violações axe ou falhas da verificação de estrutura/labels/foco/tokens. Larguras: 360, 375, 390, 768, 1440 e 1920 px. RSS é XML, não uma página visual, e foi validado por build/E2E/static check.
- Inspeção manual de capturas limpas: home em desktop claro/escuro e mobile claro/escuro; artigo legado em desktop; catálogo vazio em tablet; 404 em mobile. Capturas da versão final estão em `test-results/phase12-visual/after/` (ignoradas pelo Git); as capturas iniciais descritas acima não estão disponíveis no checkout para comparação lado a lado.
- O teste axe exclui `#giscus-container`, pois o conteúdo remoto do Giscus não é controlado pelo site. A validação não incluiu sessão com leitor de tela real.
- As rotas de detalhe de obra e temporada não foram geradas porque não existem obras reais cadastradas; os templates foram tipados/buildados, mas sua apresentação com fichas reais ainda requer validação editorial após entrada de conteúdo aprovado.

### Problemas encontrados e corrigidos durante a auditoria

- Nomes visíveis do logotipo não estavam inteiramente incluídos em seu nome acessível; o rótulo foi alinhado com a marca e o subtítulo.
- Tags e botão de cópia do artigo tinham contraste insuficiente sobre o fundo de bloco de código; os fundos foram trocados para superfícies semânticas.
- `hidden` era sobrescrito por estilos de exibição de cards, impedindo a busca de ocultar resultados; cards e destaques agora respeitam o estado oculto.
- O menu primário era cortado em telas estreitas; passou a quebrar em linhas.
- A rota 404 recebeu identidade visual própria e links compostos com `basePath`.
- O primeiro ciclo de E2E encontrou o seletor ambíguo entre busca global e local e expectativa antiga do 404; os testes foram atualizados e cobrem os dois fluxos de busca.

### Limitações restantes

- Não há conteúdo editorial verificado de anime/mangá, autoria ou capas; não foram incluídos exemplos de produção.
- Uma verificação manual com leitor de tela e páginas de detalhe renderizadas com dados aprovados continua pendente.
- As imagens de baseline não estão disponíveis; a auditoria final foi inspecionada diretamente, mas não há comparação visual por pares arquivada.
- `npm audit --omit=dev` informa 9 vulnerabilidades altas transitivas em `picomatch`; a correção automática indicada exigiria mudança breaking para Vite 6. Nenhuma alteração forçada de versão foi feita.
- O GitHub Actions remoto não foi consultado nesta fase; permanece válida a última evidência documentada na Fase 11: run #5 falhou em `Install dependencies`, sem diagnóstico detalhado disponível.
