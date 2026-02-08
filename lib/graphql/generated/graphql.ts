export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
