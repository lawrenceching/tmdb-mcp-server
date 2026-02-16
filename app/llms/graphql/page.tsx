export const metadata = {
  title: 'TMDB GraphQL API - AI Agent Documentation',
  description: 'GraphQL API documentation for AI agents to interact with TMDB data',
};

const markdownContent = `
# TMDB GraphQL API Documentation

This document describes the GraphQL API provided by the TMDB MCP Server for AI Agent integration.

## Overview

The TMDB GraphQL API provides a flexible query interface to access The Movie Database (TMDB) data including movies, TV shows, search results, and trending content.

## Endpoint Information

| Property | Value |
|----------|-------|
| **Endpoint** | \`/api/graphql\` |
| **HTTP Methods** | GET, POST |
| **Response Format** | JSON |
| **Schema** | GraphQL |

---

## Queries

### 1. Movie Queries

#### \`movie(id: ID!, language: String): Movie\`

Get detailed information about a specific movie.

**Parameters:**
- \`id\` (required): TMDB movie ID
- \`language\` (optional): Language code (e.g., "en-US", "zh-CN")

**Returns:** Full \`Movie\` object including credits, videos, images, recommendations, and similar movies.

#### \`movieBasic(id: ID!): MovieBasic\`

Get basic information about a movie without nested data.

**Parameters:**
- \`id\` (required): TMDB movie ID

**Returns:** \`MovieBasic\` object with basic fields only.

---

### 2. TV Show Queries

#### \`tv(id: ID!, language: String): TVShow\`

Get detailed information about a specific TV show.

**Parameters:**
- \`id\` (required): TMDB TV show ID
- \`language\` (optional): Language code

**Returns:** Full \`TVShow\` object including credits, videos, images, recommendations, similar shows, and content ratings.

#### \`tvBasic(id: ID!): TVShowBasic\`

Get basic information about a TV show.

**Parameters:**
- \`id\` (required): TMDB TV show ID

**Returns:** \`TVShowBasic\` object with basic fields only.

---

### 3. Search Queries

#### \`searchMovie(query: String!, page: Int): SearchResult!\`

Search for movies by query string.

**Parameters:**
- \`query\` (required): Search keywords
- \`page\` (optional, default: 1): Page number (1-1000)

**Returns:** \`SearchResult\` with paginated movie results.

#### \`searchTV(query: String!, page: Int): SearchResult!\`

Search for TV shows by query string.

**Parameters:**
- \`query\` (required): Search keywords
- \`page\` (optional, default: 1): Page number

**Returns:** \`SearchResult\` with paginated TV show results.

#### \`searchMulti(query: String!, page: Int): [MediaResult!]!\`

Search for both movies and TV shows simultaneously.

**Parameters:**
- \`query\` (required): Search keywords
- \`page\` (optional, default: 1): Page number

**Returns:** Array of \`MediaResult\` (union of Movie and TVShow).

---

### 4. Trending Queries

#### \`trending(mediaType: String, timeWindow: String): TrendingResult!\`

Get trending content (movies, TV shows, or all media).

**Parameters:**
- \`mediaType\` (optional, default: "all"): "all", "movie", or "tv"
- \`timeWindow\` (optional, default: "day"): "day" or "week"

**Returns:** \`TrendingResult\` with paginated trending items.

---

## Type Definitions

### Movie

\`\`\`graphql
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
\`\`\`

### TVShow

\`\`\`graphql
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
\`\`\`

### Credits

\`\`\`graphql
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
\`\`\`

### Video

\`\`\`graphql
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
\`\`\`

---

## Example Queries

### Search for Movies

\`\`\`graphql
query {
  searchMovie(query: "Inception", page: 1) {
    page
    total_results
    total_pages
    results {
      id
      title
      overview
      release_date
      vote_average
      poster_path
    }
  }
}
\`\`\`

### Get Movie Details with Credits

\`\`\`graphql
query {
  movie(id: "27205", language: "en-US") {
    id
    title
    overview
    runtime
    genres {
      id
      name
    }
    credits {
      cast {
        name
        character
        profile_path
      }
      crew {
        name
        job
      }
    }
    videos {
      results {
        key
        name
        site
        type
      }
    }
  }
}
\`\`\`

### Get Trending Movies

\`\`\`graphql
query {
  trending(mediaType: "movie", timeWindow: "week") {
    page
    results {
      id
      title
      vote_average
      poster_path
    }
  }
}
\`\`\`

### Search TV Shows

\`\`\`graphql
query {
  searchTV(query: "Breaking Bad", page: 1) {
    results {
      id
      name
      first_air_date
      vote_average
    }
  }
}
\`\`\`

### Get TV Show Details with Seasons

\`\`\`graphql
query {
  tv(id: "1396") {
    id
    name
    overview
    seasons {
      id
      name
      season_number
      episode_count
      air_date
      poster_path
    }
    content_ratings {
      results {
        iso_3166_1
        rating
      }
    }
  }
}
\`\`\`

---

## Making Requests

### Using curl

\`\`\`bash
curl -X POST https://your-server.com/api/graphql \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "{ searchMovie(query: \\"Inception\\") { results { id title vote_average } } }"
  }'
\`\`\`

### Using fetch

\`\`\`javascript
const response = await fetch('/api/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: \`
      query {
        searchMovie(query: "Inception") {
          results {
            id
            title
            overview
            vote_average
            poster_path
          }
        }
      }
    \`,
  }),
});

const data = await response.json();
\`\`\`

---

## Language Codes

Supported language codes (ISO 639-1 with region):

| Language | Code |
|----------|------|
| English (US) | \`en-US\` |
| Chinese (Simplified) | \`zh-CN\` |
| Japanese | \`ja-JP\` |
| Korean | \`ko-KR\` |
| Spanish | \`es-ES\` |
| French | \`fr-FR\` |
| German | \`de-DE\` |
| Italian | \`it-IT\` |
| Portuguese (Brazil) | \`pt-BR\` |

---

## Image URLs

Image paths returned by the API are relative. Construct full URLs using:

\`\`\`
https://image.tmdb.org/t/p/<size>/<file_path>
\`\`\`

**Available sizes:**

| Type | Sizes |
|------|-------|
| Posters | \`w92\`, \`w154\`, \`w185\`, \`w342\`, \`w500\`, \`w780\` |
| Backdrops | \`w300\`, \`w780\`, \`w1280\`, \`original\` |
| Profiles | \`w45\`, \`w185\`, \`h632\`, \`original\` |

**Example:**
\`\`\`
https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Ber.jpg
\`\`\`

---

## Error Handling

GraphQL returns errors in the following format:

\`\`\`json
{
  "errors": [
    {
      "message": "Error description",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["query", "movie"]
    }
  ]
}
\`\`\`

---

## Common Use Cases for AI Agents

### 1. Find Movie by Title
\`\`\`graphql
query {
  searchMovie(query: "<movie_title>") {
    results {
      id
      title
      release_date
      vote_average
    }
  }
}
\`\`\`

### 2. Get Movie Cast and Crew
\`\`\`graphql
query {
  movie(id: "<movie_id>") {
    title
    credits {
      cast { name character }
      crew { name job }
    }
  }
}
\`\`\`

### 3. Get Similar Movie Recommendations
\`\`\`graphql
query {
  movie(id: "<movie_id>") {
    title
    similar {
      results {
        id
        title
        vote_average
      }
    }
  }
}
\`\`\`

### 4. Get TV Show Season Details
\`\`\`graphql
query {
  tv(id: "<tv_id>") {
    name
    seasons(season_number: 1) {
      episodes {
        name
        air_date
        overview
      }
    }
  }
}
\`\`\`

### 5. Get Trending This Week
\`\`\`graphql
query {
  trending(mediaType: "all", timeWindow: "week") {
    results {
      id
      media_type
      title
      name
      vote_average
    }
  }
}
\`\`\`
`;

export default function GraphQLDocsPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <article className="prose prose-slate max-w-4xl mx-auto dark:prose-invert">
        <pre className="whitespace-pre-wrap font-sans text-sm">{markdownContent}</pre>
      </article>
    </main>
  );
}
