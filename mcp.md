# TMDB MCP Server Documentation

This document describes the Model Context Protocol (MCP) server tools provided by the TMDB MCP Server project.

## Overview

The TMDB MCP Server provides a standardized interface for AI assistants to interact with The Movie Database (TMDB) through the Model Context Protocol. The server exposes 5 main tools for searching and retrieving movie, TV show, and trending content data.

## Server Information

| Property | Value |
|----------|-------|
| **Name** | `tmdb-mcp-server` |
| **Version** | `1.0.0` |
| **Endpoint** | `/api/mcp` |
| **Protocol** | Model Context Protocol (MCP) |
| **Transport** | Stateless HTTP (JSON-RPC 2.0) |

## Supported HTTP Methods

| Method | Description |
|--------|-------------|
| `POST` | Execute MCP tools |
| `OPTIONS` | CORS preflight requests |

Note: `GET` and `DELETE` methods are not supported in this stateless implementation.

---

# Available Tools

## 1. searchMovies

Search for movies in TMDB database.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search query (max 50 characters) |
| `page` | `number` | No | Page number (1-10, default: 1) |
| `language` | `string` | No | Language code (e.g., "en-US", "zh-CN", "ja-JP") |
| `fields` | `string[]` | No | List of fields to return (see below) |

### Valid Fields for Movie Search

- `id` - Movie ID
- `title` - Movie title
- `original_title` - Original title
- `overview` - Plot overview
- `poster_path` - Poster image path
- `backdrop_path` - Backdrop image path
- `release_date` - Release date
- `vote_average` - Average rating
- `vote_count` - Number of votes
- `popularity` - Popularity score
- `adult` - Adult content flag
- `genre_ids` - Genre IDs

**Default fields:** `['id', 'name', 'overview']`

### Example Request

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "searchMovies",
    "arguments": {
      "query": "Inception",
      "page": 1,
      "language": "en-US",
      "fields": ["id", "title", "overview", "release_date", "vote_average"]
    }
  },
  "id": 1
}
```

### Example Response

```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"page\": 1,\n  \"total_pages\": 1,\n  \"total_results\": 1,\n  \"results\": [\n    {\n      \"id\": \"27205\",\n      \"title\": \"Inception\",\n      \"overview\": \"Cobb, a skilled thief...\",\n      \"release_date\": \"2010-07-16\",\n      \"vote_average\": 8.4\n    }\n  ]\n}"
      }
    ]
  },
  "id": 1
}
```

---

## 2. searchTVShowsOrAnimes

Search for TV shows and anime in TMDB database.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | Yes | Search query (max 50 characters) |
| `page` | `number` | No | Page number (1-10, default: 1) |
| `language` | `string` | No | Language code (e.g., "en-US", "zh-CN", "ja-JP") |
| `fields` | `string[]` | No | List of fields to return (see below) |

### Valid Fields for TV Search

- `id` - TV show ID
- `name` - Show name
- `original_name` - Original name
- `overview` - Plot overview
- `poster_path` - Poster image path
- `backdrop_path` - Backdrop image path
- `first_air_date` - First air date
- `vote_average` - Average rating
- `vote_count` - Number of votes
- `popularity` - Popularity score
- `genre_ids` - Genre IDs

**Default fields:** `['id', 'name', 'overview']`

### Example Request

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "searchTVShowsOrAnimes",
    "arguments": {
      "query": "Breaking Bad",
      "page": 1,
      "fields": ["id", "name", "overview", "first_air_date", "vote_average"]
    }
  },
  "id": 1
}
```

---

## 3. getMovieDetails

Get detailed information about a specific movie by its TMDB ID.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The TMDB movie ID |
| `language` | `string` | No | Language code (e.g., "en-US", "zh-CN", "ja-JP") |
| `fields` | `string[]` | No | List of fields to return (see below) |

### Valid Fields for Movie Details

**Basic Fields:**
- `id` - Movie ID
- `title` - Movie title
- `original_title` - Original title
- `overview` - Plot overview
- `poster_path` - Poster image path
- `backdrop_path` - Backdrop image path
- `release_date` - Release date
- `vote_average` - Average rating
- `vote_count` - Number of votes
- `popularity` - Popularity score
- `adult` - Adult content flag
- `genre_ids` - Genre IDs
- `runtime` - Runtime in minutes
- `status` - Release status
- `tagline` - Tagline

**Nested Fields:**
- `genres` - Genre objects (id, name)
- `credits` - Cast and crew information
  - `cast` (id, name, character)
  - `crew` (id, name, job)
- `videos` - Trailers and videos
- `images` - Images collection
- `release_dates` - Release dates by country
- `recommendations` - Recommended movies
- `similar` - Similar movies

**Default fields:** `['id', 'title', 'overview', 'poster_path', 'backdrop_path', 'release_date', 'vote_average', 'runtime', 'genres']`

### Example Request

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "getMovieDetails",
    "arguments": {
      "id": "550",
      "language": "en-US",
      "fields": ["id", "title", "overview", "runtime", "genres", "credits"]
    }
  },
  "id": 1
}
```

---

## 4. getTVShowDetails

Get detailed information about a specific TV show by its TMDB ID.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The TMDB TV show ID |
| `language` | `string` | No | Language code (e.g., "en-US", "zh-CN", "ja-JP") |
| `fields` | `string[]` | No | List of fields to return (see below) |

### Valid Fields for TV Show Details

**Basic Fields:**
- `id` - TV show ID
- `name` - Show name
- `original_name` - Original name
- `overview` - Plot overview
- `poster_path` - Poster image path
- `backdrop_path` - Backdrop image path
- `first_air_date` - First air date
- `last_air_date` - Last air date
- `vote_average` - Average rating
- `vote_count` - Number of votes
- `popularity` - Popularity score
- `genre_ids` - Genre IDs

**Nested Fields:**
- `seasons` - Season information (id, name, overview, episode_count, poster_path, air_date, season_number)
- `genres` - Genre objects (id, name)
- `credits` - Cast and crew information
  - `cast` (id, name, character)
  - `crew` (id, name, job)
- `videos` - Trailers and videos
- `images` - Images collection
- `recommendations` - Recommended shows
- `similar` - Similar shows
- `content_ratings` - Content ratings by country

**Default fields:** `['id', 'name', 'overview', 'poster_path', 'backdrop_path', 'first_air_date', 'last_air_date', 'vote_average', 'genres', 'seasons']`

### Example Request

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "getTVShowDetails",
    "arguments": {
      "id": "1396",
      "fields": ["id", "name", "overview", "seasons", "genres"]
    }
  },
  "id": 1
}
```

---

## 5. getTrending

Get trending movies, TV shows, or people from TMDB.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mediaType` | `string` | No | Type of media: "all", "movie", "tv", or "person" (default: "all") |
| `timeWindow` | `string` | No | Time window: "day" or "week" (default: "day") |
| `language` | `string` | No | Language code for localized results |
| `fields` | `string[]` | No | List of fields to return (see below) |

### Valid Fields for Trending

- `id` - Content ID
- `media_type` - Media type ("movie" or "tv")
- `title` - Movie title
- `name` - TV show name
- `original_title` - Original movie title
- `original_name` - Original TV show name
- `overview` - Plot overview
- `poster_path` - Poster image path
- `backdrop_path` - Backdrop image path
- `release_date` - Movie release date
- `first_air_date` - TV show first air date
- `vote_average` - Average rating
- `vote_count` - Number of votes
- `popularity` - Popularity score
- `adult` - Adult content flag
- `genre_ids` - Genre IDs

**Default fields:** `['id', 'name', 'overview']`

### Example Request

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "getTrending",
    "arguments": {
      "mediaType": "all",
      "timeWindow": "week",
      "fields": ["id", "media_type", "title", "name", "vote_average", "poster_path"]
    }
  },
  "id": 1
}
```

---

# Response Format

All tools return responses in the following format:

## Success Response

```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "<JSON string of data>"
      }
    ]
  },
  "id": "<request_id>"
}
```

## Error Response

```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Error searching movies: <error message>"
      }
    ],
    "isError": true
  },
  "id": "<request_id>"
}
```

## HTTP Error Response

For server-level errors:

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32603,
    "message": "<error message>",
    "data": "<stack trace>"
  },
  "id": null
}
```

---

# Error Codes

| Error Code | Description |
|------------|-------------|
| `30001` | Missing GraphQL URL configuration (NEXT_PUBLIC_GRAPHQL_URL not set) |
| `-32603` | Internal server error |
| `-32000` | Method not allowed (for GET/DELETE requests) |

---

# Language Codes

The `language` parameter accepts ISO 639-1 language codes with optional region:

| Language | Code |
|----------|------|
| English (US) | `en-US` |
| Chinese (Simplified) | `zh-CN` |
| Japanese | `ja-JP` |
| Korean | `ko-KR` |
| Spanish | `es-ES` |
| French | `fr-FR` |
| German | `de-DE` |
| Italian | `it-IT` |
| Portuguese (Brazil) | `pt-BR` |

---

# Image URL Construction

Image paths returned by the tools are relative. Construct full URLs using:

```
https://image.tmdb.org/t/p/<size>/<file_path>
```

Common sizes:
- Posters: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`
- Backdrops: `w300`, `w780`, `w1280`, `original`

---

# Configuration

The MCP server requires the following environment variable:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GRAPHQL_URL` | The GraphQL API endpoint URL |

---

# Integration Example

## Using with MCP Client SDK

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const client = new Client({
  name: "my-app",
  version: "1.0.0"
}, {
  capabilities: {}
});

const transport = new StdioClientTransport({
  command: "node",
  args: ["path/to/server.js"]
});

await client.connect(transport);

// Search for movies
const result = await client.callTool({
  name: "searchMovies",
  arguments: {
    query: "Inception",
    page: 1,
    fields: ["id", "title", "overview", "vote_average"]
  }
});

console.log(result);
```

## Direct HTTP Request

```bash
curl -X POST https://tmdb-mcp-server.imlc.me/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "searchMovies",
      "arguments": {
        "query": "Inception",
        "page": 1
      }
    },
    "id": 1
  }'
```

---

# Source Code

- MCP Server Implementation: `app/api/mcp/route.ts`
