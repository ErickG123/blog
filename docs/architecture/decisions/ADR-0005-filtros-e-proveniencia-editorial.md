# ADR-0005: filtros combináveis e proveniência editorial

- Estado: aceito na fase 11
- Contexto: o catálogo precisa combinar filtros sem duplicar a lógica, e artigos/obras precisam registrar referências e proveniência de mídia antes de receber conteúdo editorial real.
- Decisão: manter um helper TypeScript puro para filtro por texto, tipo, gênero, ano e estação; usar referências canônicas da collection `taxonomies`; registrar fontes editoriais e exigir crédito e URL de origem quando há capa.
- Consequências: combinações são testáveis sem conteúdo publicado; coleções podem continuar vazias; avaliações editoriais, licenças e fatos continuam sujeitos a revisão humana.
