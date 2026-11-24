import type {
  WorkFormat,
  WorkKind,
  WorkPublicationStatus,
} from '@features/catalog/domain/catalog.model';
import type { Article, ReviewScope } from '@features/editorial/domain/editorial.model';

export function formatWorkKind(kind: WorkKind): string {
  switch (kind) {
    case 'manga':
      return 'Mangá';
    case 'anime':
      return 'Anime';
    case 'manhwa':
      return 'Manhwa';
  }
}

export function formatWorkFormat(format: WorkFormat): string {
  switch (format) {
    case 'series':
      return 'Série';
    case 'oneshot':
      return 'Volume único';
    case 'movie':
      return 'Filme';
    case 'ova':
      return 'OVA';
  }
}

export function formatPublicationStatus(status: WorkPublicationStatus): string {
  switch (status) {
    case 'ongoing':
      return 'Em andamento';
    case 'completed':
      return 'Concluído';
    case 'hiatus':
      return 'Em hiato';
    case 'cancelled':
      return 'Cancelado';
    case 'unknown':
      return 'Não informado';
  }
}

export function formatArticleCategory(category: Article['category']): string {
  switch (category) {
    case 'analise':
      return 'Análise';
    case 'ensaio':
      return 'Ensaio';
    case 'industria':
      return 'Indústria';
    case 'opiniao':
      return 'Opinião';
  }
}

export function formatReviewScope(scope: ReviewScope): string {
  switch (scope) {
    case 'work':
      return 'Obra completa';
    case 'volume':
      return 'Volume';
    case 'arc':
      return 'Arco';
    case 'season':
      return 'Temporada';
    case 'movie':
      return 'Filme';
  }
}

export function formatRatingPtBr(rating: number): string {
  return `${rating.toFixed(1).replace('.', ',')} / 5`;
}

export function formatCountPtBr(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function formatCountryPtBr(code: string): string {
  switch (code.toUpperCase()) {
    case 'JP':
      return 'Japão';
    case 'BR':
      return 'Brasil';
    case 'KR':
      return 'Coreia do Sul';
    case 'US':
      return 'Estados Unidos';
    default:
      return code;
  }
}
