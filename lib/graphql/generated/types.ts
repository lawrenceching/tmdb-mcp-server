import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CastMember = {
  __typename?: 'CastMember';
  character?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  known_for_department?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  original_name?: Maybe<Scalars['String']['output']>;
  profile_path?: Maybe<Scalars['String']['output']>;
};

export type ContentRating = {
  __typename?: 'ContentRating';
  iso_3166_1: Scalars['String']['output'];
  rating: Scalars['String']['output'];
};

export type ContentRatingResult = {
  __typename?: 'ContentRatingResult';
  results: Array<ContentRating>;
};

export type Credits = {
  __typename?: 'Credits';
  cast: Array<CastMember>;
  crew: Array<CrewMember>;
};

export type CrewMember = {
  __typename?: 'CrewMember';
  department?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  job?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  original_name?: Maybe<Scalars['String']['output']>;
  profile_path?: Maybe<Scalars['String']['output']>;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Image = {
  __typename?: 'Image';
  aspect_ratio?: Maybe<Scalars['Float']['output']>;
  file_path: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  vote_average?: Maybe<Scalars['Float']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type ImageResult = {
  __typename?: 'ImageResult';
  backdrops: Array<Image>;
  logos: Array<Image>;
  posters: Array<Image>;
};

export type MediaResult = Movie | TvShow;

export type Movie = {
  __typename?: 'Movie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdrop_path?: Maybe<Scalars['String']['output']>;
  credits?: Maybe<Credits>;
  genre_ids?: Maybe<Array<Scalars['Int']['output']>>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  images?: Maybe<ImageResult>;
  original_title?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  recommendations?: Maybe<MovieRecommendationResult>;
  release_date?: Maybe<Scalars['String']['output']>;
  release_dates?: Maybe<ReleaseDateResult>;
  runtime?: Maybe<Scalars['Int']['output']>;
  similar?: Maybe<MovieSimilarResult>;
  status?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  videos?: Maybe<VideoResult>;
  vote_average?: Maybe<Scalars['Float']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};

export type MovieBasic = {
  __typename?: 'MovieBasic';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdrop_path?: Maybe<Scalars['String']['output']>;
  genre_ids?: Maybe<Array<Scalars['Int']['output']>>;
  id: Scalars['ID']['output'];
  original_title?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  release_date?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  vote_average?: Maybe<Scalars['Float']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};

export type MovieRecommendationResult = {
  __typename?: 'MovieRecommendationResult';
  page: Scalars['Int']['output'];
  results: Array<Movie>;
  total_pages: Scalars['Int']['output'];
  total_results: Scalars['Int']['output'];
};

export type MovieResult = {
  __typename?: 'MovieResult';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdrop_path?: Maybe<Scalars['String']['output']>;
  first_air_date?: Maybe<Scalars['String']['output']>;
  genre_ids?: Maybe<Array<Scalars['Int']['output']>>;
  id: Scalars['ID']['output'];
  media_type: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  original_name?: Maybe<Scalars['String']['output']>;
  original_title?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  release_date?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  vote_average?: Maybe<Scalars['Float']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};

export type MovieSimilarResult = {
  __typename?: 'MovieSimilarResult';
  page: Scalars['Int']['output'];
  results: Array<Movie>;
  total_pages: Scalars['Int']['output'];
  total_results: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  movie?: Maybe<Movie>;
  movieBasic?: Maybe<MovieBasic>;
  searchMovie: SearchResult;
  searchMulti: Array<MediaResult>;
  searchTV: SearchResult;
  tv?: Maybe<TvShow>;
  tvBasic?: Maybe<TvShowBasic>;
};


export type QueryMovieArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMovieBasicArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchMovieArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchMultiArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchTvArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryTvArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTvBasicArgs = {
  id: Scalars['ID']['input'];
};

export type ReleaseDate = {
  __typename?: 'ReleaseDate';
  iso_3166_1: Scalars['String']['output'];
  release_dates: Array<ReleaseDateDetail>;
};

export type ReleaseDateDetail = {
  __typename?: 'ReleaseDateDetail';
  certification?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  release_date?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
};

export type ReleaseDateResult = {
  __typename?: 'ReleaseDateResult';
  results: Array<ReleaseDate>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  page: Scalars['Int']['output'];
  results: Array<MovieResult>;
  total_pages: Scalars['Int']['output'];
  total_results: Scalars['Int']['output'];
};

export type Season = {
  __typename?: 'Season';
  air_date?: Maybe<Scalars['String']['output']>;
  episode_count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  season_number: Scalars['Int']['output'];
};

export type TvRecommendationResult = {
  __typename?: 'TVRecommendationResult';
  page: Scalars['Int']['output'];
  results: Array<TvShow>;
  total_pages: Scalars['Int']['output'];
  total_results: Scalars['Int']['output'];
};

export type TvShow = {
  __typename?: 'TVShow';
  backdrop_path?: Maybe<Scalars['String']['output']>;
  content_ratings?: Maybe<ContentRatingResult>;
  credits?: Maybe<Credits>;
  first_air_date?: Maybe<Scalars['String']['output']>;
  genre_ids?: Maybe<Array<Scalars['Int']['output']>>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  images?: Maybe<ImageResult>;
  last_air_date?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  original_name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  recommendations?: Maybe<TvRecommendationResult>;
  seasons?: Maybe<Array<Season>>;
  similar?: Maybe<TvSimilarResult>;
  videos?: Maybe<VideoResult>;
  vote_average?: Maybe<Scalars['Float']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};

export type TvShowBasic = {
  __typename?: 'TVShowBasic';
  backdrop_path?: Maybe<Scalars['String']['output']>;
  first_air_date?: Maybe<Scalars['String']['output']>;
  genre_ids?: Maybe<Array<Scalars['Int']['output']>>;
  id: Scalars['ID']['output'];
  last_air_date?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  original_name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  vote_average?: Maybe<Scalars['Float']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};

export type TvSimilarResult = {
  __typename?: 'TVSimilarResult';
  page: Scalars['Int']['output'];
  results: Array<TvShow>;
  total_pages: Scalars['Int']['output'];
  total_results: Scalars['Int']['output'];
};

export type Video = {
  __typename?: 'Video';
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  official?: Maybe<Scalars['Boolean']['output']>;
  site: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type VideoResult = {
  __typename?: 'VideoResult';
  results: Array<Video>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  MediaResult:
    | ( Movie )
    | ( TvShow )
  ;
}>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CastMember: ResolverTypeWrapper<CastMember>;
  ContentRating: ResolverTypeWrapper<ContentRating>;
  ContentRatingResult: ResolverTypeWrapper<ContentRatingResult>;
  Credits: ResolverTypeWrapper<Credits>;
  CrewMember: ResolverTypeWrapper<CrewMember>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Genre: ResolverTypeWrapper<Genre>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Image>;
  ImageResult: ResolverTypeWrapper<ImageResult>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MediaResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MediaResult']>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieBasic: ResolverTypeWrapper<MovieBasic>;
  MovieRecommendationResult: ResolverTypeWrapper<MovieRecommendationResult>;
  MovieResult: ResolverTypeWrapper<MovieResult>;
  MovieSimilarResult: ResolverTypeWrapper<MovieSimilarResult>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  ReleaseDate: ResolverTypeWrapper<ReleaseDate>;
  ReleaseDateDetail: ResolverTypeWrapper<ReleaseDateDetail>;
  ReleaseDateResult: ResolverTypeWrapper<ReleaseDateResult>;
  SearchResult: ResolverTypeWrapper<SearchResult>;
  Season: ResolverTypeWrapper<Season>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TVRecommendationResult: ResolverTypeWrapper<TvRecommendationResult>;
  TVShow: ResolverTypeWrapper<TvShow>;
  TVShowBasic: ResolverTypeWrapper<TvShowBasic>;
  TVSimilarResult: ResolverTypeWrapper<TvSimilarResult>;
  Video: ResolverTypeWrapper<Video>;
  VideoResult: ResolverTypeWrapper<VideoResult>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CastMember: CastMember;
  ContentRating: ContentRating;
  ContentRatingResult: ContentRatingResult;
  Credits: Credits;
  CrewMember: CrewMember;
  Float: Scalars['Float']['output'];
  Genre: Genre;
  ID: Scalars['ID']['output'];
  Image: Image;
  ImageResult: ImageResult;
  Int: Scalars['Int']['output'];
  MediaResult: ResolversUnionTypes<ResolversParentTypes>['MediaResult'];
  Movie: Movie;
  MovieBasic: MovieBasic;
  MovieRecommendationResult: MovieRecommendationResult;
  MovieResult: MovieResult;
  MovieSimilarResult: MovieSimilarResult;
  Query: Record<PropertyKey, never>;
  ReleaseDate: ReleaseDate;
  ReleaseDateDetail: ReleaseDateDetail;
  ReleaseDateResult: ReleaseDateResult;
  SearchResult: SearchResult;
  Season: Season;
  String: Scalars['String']['output'];
  TVRecommendationResult: TvRecommendationResult;
  TVShow: TvShow;
  TVShowBasic: TvShowBasic;
  TVSimilarResult: TvSimilarResult;
  Video: Video;
  VideoResult: VideoResult;
}>;

export type CastMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastMember'] = ResolversParentTypes['CastMember']> = ResolversObject<{
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  known_for_department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ContentRatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentRating'] = ResolversParentTypes['ContentRating']> = ResolversObject<{
  iso_3166_1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type ContentRatingResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentRatingResult'] = ResolversParentTypes['ContentRatingResult']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['ContentRating']>, ParentType, ContextType>;
}>;

export type CreditsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Credits'] = ResolversParentTypes['Credits']> = ResolversObject<{
  cast?: Resolver<Array<ResolversTypes['CastMember']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['CrewMember']>, ParentType, ContextType>;
}>;

export type CrewMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrewMember'] = ResolversParentTypes['CrewMember']> = ResolversObject<{
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type GenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  file_path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ImageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageResult'] = ResolversParentTypes['ImageResult']> = ResolversObject<{
  backdrops?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  logos?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  posters?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
}>;

export type MediaResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaResult'] = ResolversParentTypes['MediaResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Movie' | 'TVShow', ParentType, ContextType>;
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credits?: Resolver<Maybe<ResolversTypes['Credits']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<ResolversTypes['Genre']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<ResolversTypes['ImageResult']>, ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recommendations?: Resolver<Maybe<ResolversTypes['MovieRecommendationResult']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_dates?: Resolver<Maybe<ResolversTypes['ReleaseDateResult']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  similar?: Resolver<Maybe<ResolversTypes['MovieSimilarResult']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['VideoResult']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieBasicResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieBasic'] = ResolversParentTypes['MovieBasic']> = ResolversObject<{
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type MovieRecommendationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieRecommendationResult'] = ResolversParentTypes['MovieRecommendationResult']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type MovieResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieResult'] = ResolversParentTypes['MovieResult']> = ResolversObject<{
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type MovieSimilarResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieSimilarResult'] = ResolversParentTypes['MovieSimilarResult']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>;
  movieBasic?: Resolver<Maybe<ResolversTypes['MovieBasic']>, ParentType, ContextType, RequireFields<QueryMovieBasicArgs, 'id'>>;
  searchMovie?: Resolver<ResolversTypes['SearchResult'], ParentType, ContextType, RequireFields<QuerySearchMovieArgs, 'page' | 'query'>>;
  searchMulti?: Resolver<Array<ResolversTypes['MediaResult']>, ParentType, ContextType, RequireFields<QuerySearchMultiArgs, 'page' | 'query'>>;
  searchTV?: Resolver<ResolversTypes['SearchResult'], ParentType, ContextType, RequireFields<QuerySearchTvArgs, 'page' | 'query'>>;
  tv?: Resolver<Maybe<ResolversTypes['TVShow']>, ParentType, ContextType, RequireFields<QueryTvArgs, 'id'>>;
  tvBasic?: Resolver<Maybe<ResolversTypes['TVShowBasic']>, ParentType, ContextType, RequireFields<QueryTvBasicArgs, 'id'>>;
}>;

export type ReleaseDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReleaseDate'] = ResolversParentTypes['ReleaseDate']> = ResolversObject<{
  iso_3166_1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_dates?: Resolver<Array<ResolversTypes['ReleaseDateDetail']>, ParentType, ContextType>;
}>;

export type ReleaseDateDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReleaseDateDetail'] = ResolversParentTypes['ReleaseDateDetail']> = ResolversObject<{
  certification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type ReleaseDateResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReleaseDateResult'] = ResolversParentTypes['ReleaseDateResult']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['ReleaseDate']>, ParentType, ContextType>;
}>;

export type SearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['MovieResult']>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type SeasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = ResolversObject<{
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type TvRecommendationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVRecommendationResult'] = ResolversParentTypes['TVRecommendationResult']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['TVShow']>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type TvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShow'] = ResolversParentTypes['TVShow']> = ResolversObject<{
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content_ratings?: Resolver<Maybe<ResolversTypes['ContentRatingResult']>, ParentType, ContextType>;
  credits?: Resolver<Maybe<ResolversTypes['Credits']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<ResolversTypes['Genre']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<ResolversTypes['ImageResult']>, ParentType, ContextType>;
  last_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recommendations?: Resolver<Maybe<ResolversTypes['TVRecommendationResult']>, ParentType, ContextType>;
  seasons?: Resolver<Maybe<Array<ResolversTypes['Season']>>, ParentType, ContextType>;
  similar?: Resolver<Maybe<ResolversTypes['TVSimilarResult']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['VideoResult']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TvShowBasicResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShowBasic'] = ResolversParentTypes['TVShowBasic']> = ResolversObject<{
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type TvSimilarResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVSimilarResult'] = ResolversParentTypes['TVSimilarResult']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['TVShow']>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  official?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  site?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type VideoResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoResult'] = ResolversParentTypes['VideoResult']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['Video']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CastMember?: CastMemberResolvers<ContextType>;
  ContentRating?: ContentRatingResolvers<ContextType>;
  ContentRatingResult?: ContentRatingResultResolvers<ContextType>;
  Credits?: CreditsResolvers<ContextType>;
  CrewMember?: CrewMemberResolvers<ContextType>;
  Genre?: GenreResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  ImageResult?: ImageResultResolvers<ContextType>;
  MediaResult?: MediaResultResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieBasic?: MovieBasicResolvers<ContextType>;
  MovieRecommendationResult?: MovieRecommendationResultResolvers<ContextType>;
  MovieResult?: MovieResultResolvers<ContextType>;
  MovieSimilarResult?: MovieSimilarResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReleaseDate?: ReleaseDateResolvers<ContextType>;
  ReleaseDateDetail?: ReleaseDateDetailResolvers<ContextType>;
  ReleaseDateResult?: ReleaseDateResultResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  Season?: SeasonResolvers<ContextType>;
  TVRecommendationResult?: TvRecommendationResultResolvers<ContextType>;
  TVShow?: TvShowResolvers<ContextType>;
  TVShowBasic?: TvShowBasicResolvers<ContextType>;
  TVSimilarResult?: TvSimilarResultResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoResult?: VideoResultResolvers<ContextType>;
}>;

