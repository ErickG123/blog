import type { ImageAsset } from '@features/catalog/domain/catalog.model';

export type EditorialStatus = 'draft' | 'published' | 'archived';
export type SpoilerLevel = 'none' | 'light' | 'heavy';
export type ReviewScope = 'work' | 'volume' | 'arc' | 'season' | 'movie';

export interface BlogAuthor {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly bio: string;
  readonly socialLinks?: readonly { readonly label: string; readonly url: string }[];
}

export interface Tag {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description?: string;
}

export interface BaseEditorialEntry {
  readonly id: string;
  readonly slug: string;
  readonly previousSlugs?: readonly string[];
  readonly title: string;
  readonly summary: string;
  readonly authorId: string;
  readonly status: EditorialStatus;
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly spoilerLevel: SpoilerLevel;
  readonly tagIds: readonly string[];
  readonly cover?: ImageAsset;
  readonly isFixture?: boolean;
}

export interface Review extends BaseEditorialEntry {
  readonly workId: string;
  readonly scope: ReviewScope;
  readonly scopeLabel?: string;
  readonly rating?: number;
  readonly verdict?: string;
  readonly criteria?: readonly { readonly label: string; readonly note: string }[];
}

export interface Article extends BaseEditorialEntry {
  readonly category: 'analise' | 'ensaio' | 'industria' | 'opiniao';
  readonly relatedWorkIds?: readonly string[];
}

export interface RecommendationItem {
  readonly workId: string;
  readonly order: number;
  readonly pitch: string;
}

export interface Recommendation extends BaseEditorialEntry {
  readonly items: readonly RecommendationItem[];
}

export interface CollectingPost extends BaseEditorialEntry {
  readonly workIds: readonly string[];
  readonly editionIds: readonly string[];
  readonly highlight?: string;
}
