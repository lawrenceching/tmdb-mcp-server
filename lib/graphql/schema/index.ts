import { createSchema } from 'graphql-yoga';
import { movieResolvers } from '../resolvers/movie';
import { tvResolvers } from '../resolvers/tv';
import { searchResolvers } from '../resolvers/search';

// Inline GraphQL schema definition to avoid Vercel filesystem issues
const typeDefs = `
  # Movie queries
  type Query {
    # Movie queries
    movie(id: ID!): Movie
    movieBasic(id: ID!): MovieBasic
    
    # TV queries
    tv(id: ID!): TVShow
    tvBasic(id: ID!): TVShowBasic
    
    # Search queries
    searchMovie(query: String!, page: Int = 1, language: String): SearchResult!
    searchTV(query: String!, page: Int = 1, language: String): SearchResult!
    searchMulti(query: String!, page: Int = 1): [MediaResult!]!
  }

  # Movie types
  type Movie {
    id: ID!
    title: String!
    original_title: String
    overview: String
    poster_path: String
    backdrop_path: String
    release_date: String
    vote_average: Float
    vote_count: Int
    popularity: Float
    adult: Boolean
    genre_ids: [Int!]
    media_type: String
    runtime: Int
    status: String
    tagline: String
    genres: [Genre!]
    credits: Credits
    videos: VideoResult
    images: ImageResult
    release_dates: ReleaseDateResult
    recommendations: MovieRecommendationResult
    similar: MovieSimilarResult
  }

  type MovieBasic {
    id: ID!
    title: String!
    original_title: String
    overview: String
    poster_path: String
    backdrop_path: String
    release_date: String
    vote_average: Float
    vote_count: Int
    popularity: Float
    adult: Boolean
    genre_ids: [Int!]
  }

  type MovieRecommendationResult {
    page: Int!
    total_results: Int!
    total_pages: Int!
    results: [Movie!]!
  }

  type MovieSimilarResult {
    page: Int!
    total_results: Int!
    total_pages: Int!
    results: [Movie!]!
  }

  # TV Show types
  type TVShow {
    id: ID!
    name: String!
    original_name: String
    overview: String
    poster_path: String
    backdrop_path: String
    first_air_date: String
    last_air_date: String
    vote_average: Float
    vote_count: Int
    popularity: Float
    genre_ids: [Int!]
    media_type: String
    genres: [Genre!]
    seasons: [Season!]
    credits: Credits
    videos: VideoResult
    images: ImageResult
    recommendations: TVRecommendationResult
    similar: TVSimilarResult
    content_ratings: ContentRatingResult
  }

  type TVShowBasic {
    id: ID!
    name: String!
    original_name: String
    overview: String
    poster_path: String
    backdrop_path: String
    first_air_date: String
    last_air_date: String
    vote_average: Float
    vote_count: Int
    popularity: Float
    genre_ids: [Int!]
  }

  type TVRecommendationResult {
    page: Int!
    total_results: Int!
    total_pages: Int!
    results: [TVShow!]!
  }

  type TVSimilarResult {
    page: Int!
    total_results: Int!
    total_pages: Int!
    results: [TVShow!]!
  }

  type Season {
    id: ID!
    season_number: Int!
    name: String
    overview: String
    episode_count: Int
    poster_path: String
    air_date: String
  }

  type ContentRatingResult {
    results: [ContentRating!]!
  }

  type ContentRating {
    iso_3166_1: String!
    rating: String!
  }

  # Shared types
  type Genre {
    id: Int!
    name: String!
  }

  type Credits {
    cast: [CastMember!]!
    crew: [CrewMember!]!
  }

  type CastMember {
    id: ID!
    name: String!
    original_name: String
    character: String
    profile_path: String
    order: Int
    known_for_department: String
  }

  type CrewMember {
    id: ID!
    name: String!
    original_name: String
    job: String
    department: String
    profile_path: String
  }

  type VideoResult {
    results: [Video!]!
  }

  type Video {
    id: String!
    key: String!
    name: String!
    site: String!
    type: String!
    official: Boolean
  }

  type ImageResult {
    backdrops: [Image!]!
    posters: [Image!]!
    logos: [Image!]!
  }

  type Image {
    file_path: String!
    width: Int
    height: Int
    aspect_ratio: Float
    vote_average: Float
    vote_count: Int
  }

  type ReleaseDateResult {
    results: [ReleaseDate!]!
  }

  type ReleaseDate {
    iso_3166_1: String!
    release_dates: [ReleaseDateDetail!]!
  }

  type ReleaseDateDetail {
    certification: String
    release_date: String
    type: Int
    notes: String
  }

  # Search types
  type SearchResult {
    page: Int!
    total_results: Int!
    total_pages: Int!
    results: [MovieResult!]!
  }

  type MovieResult {
    id: ID!
    media_type: String
    title: String
    name: String
    original_title: String
    original_name: String
    overview: String
    poster_path: String
    backdrop_path: String
    vote_average: Float
    vote_count: Int
    popularity: Float
    adult: Boolean
    genre_ids: [Int!]
    release_date: String
    first_air_date: String
  }

  union MediaResult = Movie | TVShow
`;

export const schema = createSchema({
  typeDefs,
  resolvers: [
    movieResolvers, 
    tvResolvers, 
    searchResolvers,
    {
      // Union type resolver for MediaResult
      MediaResult: {
        __resolveType(obj: Record<string, unknown>): string | null {
          // TMDB returns media_type field that indicates the type
          if (obj.media_type === 'movie' || obj.title) {
            return 'Movie';
          }
          if (obj.media_type === 'tv' || obj.name) {
            return 'TVShow';
          }
          // Fallback based on field presence
          if ('title' in obj) {
            return 'Movie';
          }
          if ('name' in obj) {
            return 'TVShow';
          }
          return null;
        },
      },
    },
  ],
});
