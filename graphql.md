# TMDB GraphQL API Documentation

This document provides developer documentation for integrating with the TMDB GraphQL Server. The GraphQL server provides a unified interface to query The Movie Database (TMDB) API.

The API is seved at "https://tmdb-mcp-server.imlc.me/api/graphql"

## Overview

The GraphQL server is built using `graphql-yoga` and provides:
- Movie details, credits, videos, images, release dates, recommendations, and similar movies
- TV show details, seasons, credits, videos, images, recommendations, and similar shows
- Search functionality for movies, TV shows, and multi-media search
- Trending media across different time windows

## Base URL

The GraphQL endpoint is available at:
```
/graphql
```

## Authentication

The server uses a bearer token for TMDB API authentication, which is configured via the `TMDB_READ_ACCESS_TOKEN` environment variable.

---

# Query Reference

## Movie Queries

### `movie(id: ID!, language: String): Movie`

Fetches detailed information about a specific movie, including nested data like genres, credits, videos, images, etc.

**Parameters:**
- `id` (required): The TMDB movie ID
- `language` (optional): ISO 639-1 language code (e.g., "en-US", "zh-CN")

**Example:**
```graphql
query {
  movie(id: "550", language: "en-US") {
    id
    title
    overview
    release_date
    runtime
    genres {
      id
      name
    }
    credits {
      cast {
        name
        character
      }
    }
    videos {
      results {
        key
        name
        type
      }
    }
  }
}
```

### `movieBasic(id: ID!): MovieBasic`

Fetches basic movie information without nested fields.

**Parameters:**
- `id` (required): The TMDB movie ID

---

## TV Show Queries

### `tv(id: ID!, language: String): TVShow`

Fetches detailed information about a TV show, including nested data like genres, seasons, credits, videos, images, etc.

**Parameters:**
- `id` (required): The TMDB TV show ID
- `language` (optional): ISO 639-1 language code

**Example:**
```graphql
query {
  tv(id: "1396", language: "en-US") {
    id
    name
    overview
    first_air_date
    last_air_date
    seasons {
      season_number
      name
      episode_count
    }
    genres {
      id
      name
    }
  }
}
```

### `tvBasic(id: ID!): TVShowBasic`

Fetches basic TV show information without nested fields.

**Parameters:**
- `id` (required): The TMDB TV show ID

---

## Search Queries

### `searchMovie(query: String!, page: Int, language: String): SearchResult!`

Searches for movies by query string.

**Parameters:**
- `query` (required): Search query string
- `page` (optional): Page number (default: 1)
- `language` (optional): ISO 639-1 language code

**Example:**
```graphql
query {
  searchMovie(query: "Inception", page: 1) {
    page
    total_results
    total_pages
    results {
      id
      title
      release_date
      vote_average
      poster_path
    }
  }
}
```

### `searchTV(query: String!, page: Int, language: String): SearchResult!`

Searches for TV shows by query string.

**Parameters:**
- `query` (required): Search query string
- `page` (optional): Page number (default: 1)
- `language` (optional): ISO 639-1 language code

**Example:**
```graphql
query {
  searchTV(query: "Breaking Bad", page: 1) {
    page
    total_results
    total_pages
    results {
      id
      name
      first_air_date
      vote_average
      poster_path
    }
  }
}
```

### `searchMulti(query: String!, page: Int): [MediaResult!]!`

Searches for both movies and TV shows simultaneously.

**Parameters:**
- `query` (required): Search query string
- `page` (optional): Page number (default: 1)

**Note:** Returns a union type of `Movie` or `TVShow`. Use `... on Movie` and `... on TVShow` fragments to access type-specific fields.

**Example:**
```graphql
query {
  searchMulti(query: "Batman", page: 1) {
    ... on Movie {
      id
      title
      release_date
    }
    ... on TVShow {
      id
      name
      first_air_date
    }
  }
}
```

---

## Trending Queries

### `trending(mediaType: String, timeWindow: String): TrendingResult!`

Fetches trending movies and TV shows.

**Parameters:**
- `mediaType` (optional): Media type filter - `"all"`, `"movie"`, or `"tv"` (default: "all")
- `timeWindow` (optional): Time window - `"day"` or `"week"` (default: "day")

**Example:**
```graphql
query {
  trending(mediaType: "all", timeWindow: "week") {
    page
    total_results
    results {
      media_type
      ... on Movie {
        title
        release_date
      }
      ... on TVShow {
        name
        first_air_date
      }
      vote_average
      poster_path
    }
  }
}
```

---

# Type Reference

## Movie Types

### `Movie`

Complete movie information with nested fields.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Movie ID |
| `title` | `String!` | Movie title |
| `original_title` | `String` | Original title |
| `overview` | `String` | Movie overview |
| `poster_path` | `String` | Poster image path |
| `backdrop_path` | `String` | Backdrop image path |
| `release_date` | `String` | Release date |
| `vote_average` | `Float` | Average vote rating |
| `vote_count` | `Int` | Number of votes |
| `popularity` | `Float` | Popularity score |
| `adult` | `Boolean` | Adult content flag |
| `genre_ids` | `[Int!]` | Genre IDs |
| `media_type` | `String` | Media type |
| `runtime` | `Int` | Runtime in minutes |
| `status` | `String` | Release status |
| `tagline` | `String` | Tagline |
| `genres` | `[Genre!]` | Genre objects |
| `credits` | `Credits` | Cast and crew |
| `videos` | `VideoResult` | Trailers and videos |
| `images` | `ImageResult` | Images |
| `release_dates` | `ReleaseDateResult` | Release dates by country |
| `recommendations` | `MovieRecommendationResult` | Recommended movies |
| `similar` | `MovieSimilarResult` | Similar movies |

### `MovieBasic`

Basic movie information (no nested fields).

| Field | Type |
|-------|------|
| `id` | `ID!` |
| `title` | `String!` |
| `original_title` | `String` |
| `overview` | `String` |
| `poster_path` | `String` |
| `backdrop_path` | `String` |
| `release_date` | `String` |
| `vote_average` | `Float` |
| `vote_count` | `Int` |
| `popularity` | `Float` |
| `adult` | `Boolean` |
| `genre_ids` | `[Int!]` |

### `MovieRecommendationResult` / `MovieSimilarResult`

| Field | Type |
|-------|------|
| `page` | `Int!` |
| `total_results` | `Int!` |
| `total_pages` | `Int!` |
| `results` | `[Movie!]!` |

---

## TV Show Types

### `TVShow`

Complete TV show information with nested fields.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | TV show ID |
| `name` | `String!` | Show name |
| `original_name` | `String` | Original name |
| `overview` | `String` | Show overview |
| `poster_path` | `String` | Poster image path |
| `backdrop_path` | `String` | Backdrop image path |
| `first_air_date` | `String` | First air date |
| `last_air_date` | `String` | Last air date |
| `vote_average` | `Float` | Average vote rating |
| `vote_count` | `Int` | Number of votes |
| `popularity` | `Float` | Popularity score |
| `genre_ids` | `[Int!]` | Genre IDs |
| `media_type` | `String` | Media type |
| `genres` | `[Genre!]` | Genre objects |
| `seasons` | `[Season!]` | Seasons |
| `credits` | `Credits` | Cast and crew |
| `videos` | `VideoResult` | Trailers and videos |
| `images` | `ImageResult` | Images |
| `recommendations` | `TVRecommendationResult` | Recommended shows |
| `similar` | `TVSimilarResult` | Similar shows |
| `content_ratings` | `ContentRatingResult` | Content ratings by country |

### `TVShowBasic`

Basic TV show information (no nested fields).

| Field | Type |
|-------|------|
| `id` | `ID!` |
| `name` | `String!` |
| `original_name` | `String` |
| `overview` | `String` |
| `poster_path` | `String` |
| `backdrop_path` | `String` |
| `first_air_date` | `String` |
| `last_air_date` | `String` |
| `vote_average` | `Float` |
| `vote_count` | `Int` |
| `popularity` | `Float` |
| `genre_ids` | `[Int!]` |

### `Season`

| Field | Type |
|-------|------|
| `id` | `ID!` |
| `season_number` | `Int!` |
| `name` | `String` |
| `overview` | `String` |
| `episode_count` | `Int` |
| `poster_path` | `String` |
| `air_date` | `String` |

### `TVRecommendationResult` / `TVSimilarResult`

| Field | Type |
|-------|------|
| `page` | `Int!` |
| `total_results` | `Int!` |
| `total_pages` | `Int!` |
| `results` | `[TVShow!]!` |

---

## Shared Types

### `Genre`

| Field | Type |
|-------|------|
| `id` | `Int!` |
| `name` | `String!` |

### `Credits`

| Field | Type |
|-------|------|
| `cast` | `[CastMember!]!` |
| `crew` | `[CrewMember!]!` |

### `CastMember`

| Field | Type |
|-------|------|
| `id` | `ID!` |
| `name` | `String!` |
| `original_name` | `String` |
| `character` | `String` |
| `profile_path` | `String` |
| `order` | `Int` |
| `known_for_department` | `String` |

### `CrewMember`

| Field | Type |
|-------|------|
| `id` | `ID!` |
| `name` | `String!` |
| `original_name` | `String` |
| `job` | `String` |
| `department` | `String` |
| `profile_path` | `String` |

### `VideoResult`

| Field | Type |
|-------|------|
| `results` | `[Video!]!` |

### `Video`

| Field | Type |
|-------|------|
| `id` | `String!` |
| `key` | `String!` |
| `name` | `String!` |
| `site` | `String!` |
| `type` | `String!` |
| `official` | `Boolean` |

### `ImageResult`

| Field | Type |
|-------|------|
| `backdrops` | `[Image!]!` |
| `posters` | `[Image!]!` |
| `logos` | `[Image!]!` |

### `Image`

| Field | Type |
|-------|------|
| `file_path` | `String!` |
| `width` | `Int` |
| `height` | `Int` |
| `aspect_ratio` | `Float` |
| `vote_average` | `Float` |
| `vote_count` | `Int` |

### `ReleaseDateResult` (Movie only)

| Field | Type |
|-------|------|
| `results` | `[ReleaseDate!]!` |

### `ReleaseDate`

| Field | Type |
|-------|------|
| `iso_3166_1` | `String!` |
| `release_dates` | `[ReleaseDateDetail!]!` |

### `ReleaseDateDetail`

| Field | Type |
|-------|------|
| `certification` | `String` |
| `release_date` | `String` |
| `type` | `Int` |
| `notes` | `String` |

### `ContentRatingResult` (TV only)

| Field | Type |
|-------|------|
| `results` | `[ContentRating!]!` |

### `ContentRating`

| Field | Type |
|-------|------|
| `iso_3166_1` | `String!` |
| `rating` | `String!` |

---

## Search Result Types

### `SearchResult`

| Field | Type |
|-------|------|
| `page` | `Int!` |
| `total_results` | `Int!` |
| `total_pages` | `Int!` |
| `results` | `[MovieResult!]!` |

### `MovieResult`

Basic result type returned by search queries (contains both movie and TV fields).

| Field | Type |
|-------|------|
| `id` | `ID!` |
| `media_type` | `String` |
| `title` | `String` |
| `name` | `String` |
| `original_title` | `String` |
| `original_name` | `String` |
| `overview` | `String` |
| `poster_path` | `String` |
| `backdrop_path` | `String` |
| `vote_average` | `Float` |
| `vote_count` | `Int` |
| `popularity` | `Float` |
| `adult` | `Boolean` |
| `genre_ids` | `[Int!]` |
| `release_date` | `String` |
| `first_air_date` | `String` |

---

## Trending Result Types

### `TrendingResult`

| Field | Type |
|-------|------|
| `page` | `Int!` |
| `total_results` | `Int!` |
| `total_pages` | `Int!` |
| `results` | `[TrendingItem!]!` |

### `TrendingItem`

| Field | Type |
|-------|------|
| `id` | `ID!` |
| `media_type` | `String` |
| `title` | `String` |
| `name` | `String` |
| `original_title` | `String` |
| `original_name` | `String` |
| `overview` | `String` |
| `poster_path` | `String` |
| `backdrop_path` | `String` |
| `release_date` | `String` |
| `first_air_date` | `String` |
| `vote_average` | `Float` |
| `vote_count` | `Int` |
| `popularity` | `Float` |
| `adult` | `Boolean` |
| `genre_ids` | `[Int!]` |

---

## Union Types

### `MediaResult`

Union type that can be either `Movie` or `TVShow`. Used by `searchMulti` query.

When querying `searchMulti`, use inline fragments to access type-specific fields:

```graphql
query {
  searchMulti(query: "test") {
    ... on Movie {
      title
      release_date
    }
    ... on TVShow {
      name
      first_air_date
    }
  }
}
```

---

# Image URL Construction

Image paths returned by the API are relative paths. Construct full URLs using TMDB's base URL:

```
https://image.tmdb.org/t/p/<size>/<file_path>
```

Common sizes:
- `w92`, `w154`, `w185`, `w342`, `w500`, `w780` - Poster sizes
- `w300`, `w780`, `w1280`, `original` - Backdrop sizes
- `w45`, `w92`, `w154`, `w185`, `w300`, `h632` - Profile sizes

---

# Error Handling

The GraphQL server may return errors in the following cases:

1. **Invalid ID**: If a movie or TV show ID doesn't exist, the resolver will return an error
2. **Network issues**: If the TMDB API is unreachable, requests will fail with a network error
3. **Invalid parameters**: Missing or invalid parameters will return GraphQL validation errors

Always handle errors gracefully in your client application.

---

# Source Code

- GraphQL Schema: `lib/graphql/schema/schema.graphql`
- Resolvers: `lib/graphql/resolvers/`
  - `movie.ts` - Movie-related resolvers
  - `tv.ts` - TV show-related resolvers
  - `search.ts` - Search-related resolvers
  - `trending.ts` - Trending-related resolvers
