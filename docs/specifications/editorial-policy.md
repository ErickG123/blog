# Política Editorial Inicial — Mangá Atlas

- **Fase**: 01
- **Data**: 2026-11-23

## 1. Veracidade e fontes

- Dados factuais sobre obras (ano, editora, autoria, número de volumes, status) devem ser verificados em fontes oficiais ou edições físicas em mãos.
- Nunca inventar fatos, datas, créditos ou notas. Quando um dado não for conhecido com segurança, deixá-lo ausente em vez de preencher com suposição.
- Fixtures usadas em desenvolvimento ou demonstração devem ser explicitamente marcadas (`isFixture: true`) e isoladas do build editorial real.

## 2. Separação entre fatos e crítica

- Fichas de obra apresentam metadados objetivos.
- Reviews, artigos, guias e textos de colecionismo representam a perspectiva autoral do blog, com data de publicação e data de última atualização visíveis quando revisados.

## 3. Imagens e direitos autorais

- Utilizar apenas fotografias próprias, imagens autorizadas ou com licença compatível, sempre com crédito/proveniência registrada.
- Proibido hotlink não autorizado, remoção de marcas d'água ou scraping de capas.
- Toda imagem deve possuir texto alternativo (`alt`) descritivo e dimensões explícitas.

## 4. Notas e critérios

- A nota é opcional (`0` a `5`, em incrementos de `0,5`, ou sem nota).
- O veredito textual é opcional e tem primazia editorial sobre o número.
- Não há cálculo automático de média de notas nem agregação de avaliações externas.

## 5. Política de spoilers

- Todo texto editorial declara seu nível de spoiler:
  - `none`: livre de spoilers (seguro para quem não leu/assistiu).
  - `light`: comentários leves de premissa ou primeiros capítulos/episódios.
  - `heavy`: discussão aberta de viradas, arcos avançados ou finais.
- Trechos específicos com spoilers dentro de um texto devem ser envolvidos em blocos expansíveis fechados por padrão.
