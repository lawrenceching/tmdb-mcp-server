export const metadata = {
  title: 'TMDB REST API - AI Agent Documentation',
  description: 'REST API documentation for AI agents to interact with TMDB data',
};

const markdownContent = `
# TMDB REST API Documentation

This document describes the REST API endpoints provided by the TMDB MCP Server for AI Agent integration.

## Overview

The TMDB REST API provides direct access to The Movie Database (TMDB) API through a simple REST interface. It acts as a proxy, passing requests directly to TMDB's v3 API while handling authentication.

## Endpoint Information

| Property | Value |
|----------|-------|
| **Base URL** | \`/api/3\` |
| **HTTP Methods** | GET |
| **Response Format** | JSON |
| **Authentication** | Bearer token (configured server-side) |

---

## Available Endpoints

### 1. Get Movie Details

\`\`\`
GET /api/3/movie/{tmdbid}
\`\`\`

Get detailed information about a specific movie by its TMDB ID.

**Path Parameters:**
- \`tmdbid\` (required): The TMDB movie ID (positive integer)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| \`language\` | string | Language code (e.g., "en-US", "zh-CN") |
| \`append_to_response\` | string | Append additional responses (comma-separated) |

**Example Request:**
\`\`\`
GET /api/3/movie/550?language=en-US
\`\`\`

**Example Response:**
\`\`\`json
{
  "adult": false,
  "backdrop_path": "/s2T3JLd7hgg5L4xL6QZ5c2QWFam.jpg",
  "belongs_to_collection": null,
  "budget": 63000000,
  "genres": [
    { "id": 18, "name": "Drama" },
    { "id": 53, "name": "Thriller" },
    { "id": 35, "name": "Comedy" }
  ],
  "homepage": "",
  "id": 550,
  "imdb_id": "tt0137523",
  "original_language": "en",
  "original_title": "Fight Club",
  "overview": "A ticking-Loss...",
  "popularity": 178.853,
  "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "production_companies": [...],
  "production_countries": [...],
  "release_date": "1999-10-15",
  "revenue": 101182011,
  "runtime": 139,
  "spoken_languages": [...],
  "status": "Released",
  "tagline": "Mischief. Mayhem. Soap.",
  "title": "Fight Club",
  "video": false,
  "vote_average": 8.4,
  "vote_count": 26000
}
\`\`\`

---

### 2. Get TV Show Details

\`\`\`
GET /api/3/tv/{tmdbid}
\`\`\`

Get detailed information about a specific TV show by its TMDB ID.

**Path Parameters:**
- \`tmdbid\` (required): The TMDB TV show ID (positive integer)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| \`language\` | string | Language code |
| \`append_to_response\` | string | Append additional responses |

**Example Request:**
\`\`\`
GET /api/3/tv/1396?language=en-US
\`\`\`

---

### 3. Search Movies

\`\`\`
GET /api/3/search/movie?query={query}
\`\`\`

Search for movies by keywords.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`query\` | string | Yes | Search keywords |
| \`page\` | number | No | Page number (default: 1) |
| \`language\` | string | No | Language code |
| \`include_adult\` | boolean | No | Include adult content (default: false) |
| \`year\` | number | No | Filter by release year |
| \`primary_release_year\` | number | No | Primary release year |

**Example Request:**
\`\`\`
GET /api/3/search/movie?query=Inception&page=1&language=en-US
\`\`\`

**Example Response:**
\`\`\`json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/s3T3JLd7hgg5L4xL6QZ5c2QWFam.jpg",
      "id": 27205,
      "title": "Inception",
      "original_language": "en",
      "original_title": "Inception",
      "overview": "Cobb, a skilled thief...",
      "poster_path": "/9gk7adHYeDvHkCSEqAvQNLV5Ber.jpg",
      "media_type": "movie",
      "genre_ids": [28, 878, 12],
      "popularity": 334.94,
      "release_date": "2010-07-16",
      "video": false,
      "vote_average": 8.4,
      "vote_count": 33000
    }
  ],
  "total_pages": 1,
  "total_results": 1
}
\`\`\`

---

### 4. Search TV Shows

\`\`\`
GET /api/3/search/tv?query={query}
\`\`\`

Search for TV shows by keywords.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`query\` | string | Yes | Search keywords |
| \`page\` | number | No | Page number (default: 1) |
| \`language\` | string | No | Language code |
| \`include_adult\` | boolean | No | Include adult content |
| \`first_air_date_year\` | number | No | First air date year |

**Example Request:**
\`\`\`
GET /api/3/search/tv?query=Breaking%20Bad&page=1
\`\`\`

---

## Common TMDB Endpoints

Since this API proxies to TMDB, you can also access these TMDB endpoints directly:

### Trending

\`\`\`
GET /trending/{media_type}/{time_window}
\`\`\`

- \`media_type\`: "all", "movie", "tv", "person"
- \`time_window\`: "day", "week"

**Example:**
\`\`\`
GET /api/3/trending/movie/week
\`\`\`

### Discover

\`\`\`
GET /discover/movie?sort_by=popularity.desc
GET /discover/tv?sort_by=popularity.desc
\`\`\`

### Genres

\`\`\`
GET /genre/movie/list
GET /genre/tv/list
\`\`\`

### Credits

\`\`\`
GET /movie/{id}/credits
GET /tv/{id}/credits
\`\`\`

### Videos

\`\`\`
GET /movie/{id}/videos
GET /tv/{id}/videos
\`\`\`

### Images

\`\`\`
GET /movie/{id}/images
GET /tv/{id}/images
\`\`\`

### Recommendations

\`\`\`
GET /movie/{id}/recommendations
GET /tv/{id}/recommendations
\`\`\`

### Similar

\`\`\`
GET /movie/{id}/similar
GET /tv/{id}/similar
\`\`\`

---

## Using with Query Parameters

### Append Additional Responses

Use \`append_to_response\` to get multiple data in one request:

\`\`\`
GET /api/3/movie/550?append_to_response=credits,videos,images
\`\`\`

This returns the movie details along with:
- \`credits\`: Cast and crew
- \`videos\`: Trailers and videos
- \`images\`: Backdrops, posters, and logos

### Language Parameter

Get localized results:

\`\`\`
GET /api/3/movie/550?language=zh-CN
GET /api/3/search/movie?query=复仇者&language=zh-CN
\`\`\`

---

## Language Codes

Supported language codes (ISO 639-1 with region):

| Language | Code |
|----------|------|
| English (US) | \`en-US\` |
| Chinese (Simplified) | \`zh-CN\` |
| Chinese (Traditional) | \`zh-TW\` |
| Japanese | \`ja-JP\` |
| Korean | \`ko-KR\` |
| Spanish | \`es-ES\` |
| French | \`fr-FR\` |
| German | \`de-DE\` |
| Italian | \`it-IT\` |
| Portuguese (Brazil) | \`pt-BR\` |
| Russian | \`ru-RU\` |

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
| Logos | \`w45\`, \`w92\`, \`w154\`, \`w185\`, \`w300\`, \`w500\`, \`original\` |

**Example:**
\`\`\`
https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Ber.jpg
\`\`\`

---

## Error Responses

### 400 Bad Request

\`\`\`json
{
  "error": "Invalid type. Must be either \\"movie\\" or \\"tv\\""
}
\`\`\`

### 404 Not Found

\`\`\`json
{
  "status_code": 34,
  "status_message": "The resource you requested could not be found."
}
\`\`\`

### 500 Internal Server Error

\`\`\`json
{
  "error": "Internal server error"
}
\`\`\`

---

## Common Use Cases for AI Agents

### 1. Find Movie by Title
\`\`\`
GET /api/3/search/movie?query=Inception&page=1
\`\`\`

### 2. Get Movie with Full Details
\`\`\`
GET /api/3/movie/27205?append_to_response=credits,videos,images
\`\`\`

### 3. Get TV Show Cast
\`\`\`
GET /api/3/tv/1396/credits
\`\`\`

### 4. Get Movie Trailers
\`\`\`
GET /api/3/movie/27205/videos
\`\`\`

### 5. Search with Filters
\`\`\`
GET /api/3/search/movie?query=action&year=2023&sort_by=popularity.desc
\`\`\`

### 6. Get Trending This Week
\`\`\`
GET /api/3/trending/movie/week
\`\`\`

### 7. Get Similar Movies
\`\`\`
GET /api/3/movie/27205/similar
\`\`\`

---

## Rate Limiting

TMDB API has rate limits. The proxy does not implement additional rate limiting, but AI agents should implement appropriate caching and request batching to avoid hitting limits.
`;

export default function TMDbDocsPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <article className="prose prose-slate max-w-4xl mx-auto dark:prose-invert">
        <pre className="whitespace-pre-wrap font-sans text-sm">{markdownContent}</pre>
      </article>
    </main>
  );
}
