# Visão do Produto — Mangá Atlas

- **Data**: 2026-11-23
- **Fase**: 01
- **Idioma**: `pt-BR`

## 1. Visão

O **Mangá Atlas** é um blog editorial pessoal, autoral e estático em português brasileiro dedicado a **reviews**, **artigos e análises**, **guias e recomendações**, **colecionismo de edições físicas** e uma **biblioteca curada de obras** (mangás, animes e manhwas).

Seu foco é oferecer uma experiência de leitura calma, legível e memorável — com identidade visual própria (grafite, vermelho editorial e roxo discreto), capas e fotografia como protagonistas, zero ruído de portal de notícias e zero monetização invasiva.

## 2. Público-alvo

- **Leitores de mangás e espectadores de anime em pt-BR** que buscam críticas aprofundadas, curadoria confiável, recomendações contextualizadas e leitura livre de spoilers acidentais.
- **Colecionadores de edições físicas** interessados em acabamento, papel, tradução, sobrecapas, formatos de publicação e comparação entre edições.
- **Autor editorial (proprietário do blog)** que escreve em Markdown/MDX versionado em Git, com validação automatizada antes de publicar.

## 3. Problema que resolve

- Portais genéricos priorizam volume, cliques, anúncios e listas superficiais, prejudicando a leitura.
- Redes sociais (Instagram, YouTube) são ótimas para descoberta e conversa rápida, mas efêmeras e ruins para consulta estruturada de reviews, obras relacionadas e comparações de edições.
- **Canais complementares**: Instagram e YouTube podem ser referenciados como canais complementares do autor, nunca como feeds obrigatórios ou dependências de runtime do site.

## 4. Objetivos

1. Centralizar textos autorais (reviews, artigos, guias e colecionismo) conectados a uma biblioteca estruturada de obras, criadores, editoras e estúdios.
2. Garantir integridade editorial: dados factuais separados de opinião crítica, datas explícitas, fontes verificáveis, imagens autorizadas e controle rigoroso de spoilers.
3. Entregar desempenho alto, acessibilidade WCAG 2.2 AA, suporte a temas claro/escuro/sistema, leitura funcional sem JavaScript e custo operacional mínimo via saída estática.

## 5. Não objetivos (fora de escopo)

- Monetização de qualquer tipo (AdSense, links de afiliados, paywall, assinaturas, patrocínios).
- Backend dinâmico, banco de dados, autenticação, comentários, CMS/painel administrativo.
- Integrações automáticas ou scraping de catálogos externos (MAL, AniList, etc.).
- Recursos de IA generativa, rede social ou scripts de rastreamento de terceiros.

## 6. Jornadas principais

- **Leitor — Descobrir obra por review**: lê uma review → navega para a ficha da obra na biblioteca → descobre criadores, edições físicas e outras publicações relacionadas.
- **Leitor — Ler sem spoilers**: identifica claramente o nível de spoiler antes de ler e expande blocos protegidos apenas por ação explícita.
- **Leitor — Buscar e filtrar**: encontra obras ou textos por pesquisa global, categoria, tag, formato ou demografia.
- **Leitor — Comparar edições**: consulta posts de colecionismo e fichas de edições físicas ligadas à mesma obra.
- **Autor — Criar e validar conteúdo**: cria ou edita arquivos Markdown/MDX e dados tipados → executa validação local (`check`, `lint`, `test`, `build`) → publica com garantia de zero rascunhos ou referências quebradas.
