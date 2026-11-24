export type WorkKind = 'manga' | 'anime' | 'manhwa';
export type WorkFormat = 'series' | 'oneshot' | 'movie' | 'ova';
export type WorkPublicationStatus = 'ongoing' | 'completed' | 'hiatus' | 'cancelled' | 'unknown';

export type MediaRightsStatus = 'own' | 'authorized' | 'pending' | 'demo';

export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly credit: string;
  readonly license?: string;
  readonly sourceUrl?: string;
  readonly rightsStatus?: MediaRightsStatus;
  readonly decorative?: boolean;
}

export interface OfficialLink {
  readonly label: string;
  readonly url: string;
}

export interface WorkCreatorCredit {
  readonly creatorId: string;
  readonly role: 'author' | 'artist' | 'director' | 'script' | 'character_design' | 'other';
}

export type WorkRelationshipType = 'adaptation' | 'sequel' | 'prequel' | 'spin_off' | 'related';

export interface WorkRelationship {
  readonly fromWorkId: string;
  readonly toWorkId: string;
  readonly type: WorkRelationshipType;
  readonly note?: string;
}

export interface Work {
  readonly id: string;
  readonly slug: string;
  readonly previousSlugs?: readonly string[];
  readonly title: string;
  readonly originalTitle?: string;
  readonly alternativeTitles?: readonly string[];
  readonly kind: WorkKind;
  readonly format: WorkFormat;
  readonly country?: string;
  readonly originalLanguage?: string;
  readonly releaseYear?: number;
  readonly publicationStatus: WorkPublicationStatus;
  readonly synopsis: string;
  readonly cover?: ImageAsset;
  readonly credits: readonly WorkCreatorCredit[];
  readonly publisherIds?: readonly string[];
  readonly studioIds?: readonly string[];
  readonly genreIds: readonly string[];
  readonly officialLinks?: readonly OfficialLink[];
  readonly isFixture?: boolean;
}

export interface Edition {
  readonly id: string;
  readonly slug: string;
  readonly workId: string;
  readonly publisherId: string;
  readonly title: string;
  readonly language: string;
  readonly formatLabel?: string;
  readonly paperType?: string;
  readonly binding?: string;
  readonly isbn?: string;
  readonly releaseYear?: number;
  readonly volumesCount?: number;
  readonly notes?: string;
  readonly cover?: ImageAsset;
  readonly isFixture?: boolean;
}

export interface Creator {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly originalName?: string;
  readonly bio?: string;
  readonly officialLinks?: readonly OfficialLink[];
  readonly isFixture?: boolean;
}

export interface Publisher {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly country?: string;
  readonly description?: string;
  readonly officialLinks?: readonly OfficialLink[];
  readonly isFixture?: boolean;
}

export interface Studio {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly country?: string;
  readonly description?: string;
  readonly officialLinks?: readonly OfficialLink[];
  readonly isFixture?: boolean;
}

export interface Genre {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description?: string;
}
