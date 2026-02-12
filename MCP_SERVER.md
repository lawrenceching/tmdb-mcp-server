# TMDB MCP Server

A stateless Model Context Protocol (MCP) server for querying TMDB (The Movie Database) using the Streamable HTTP protocol.

## Features

- **Stateless**: No session management required
- **No Authentication**: Open access for easy integration
- **Streamable HTTP**: Uses MCP SDK's StreamableHTTPServerTransport
- **TMDB Integration**: Tools for searching movies, TV shows, trending content, and more

## Quick Start

### 1. Configure TMDB API Key

Add your TMDB API key to `.env.local`:

```bash
TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
```

### 2. Start the Development Server

```bash
bun run dev
```

The MCP server will be available at: `http://localhost:3000/api/mcp`

## API Endpoints

### POST /api/mcp

Main endpoint for all MCP requests. Supports all MCP protocol methods including:

- `initialize` - Initialize the MCP connection
- `tools/list` - List available tools
- `tools/call` - Execute a tool
- Any other standard MCP methods

**Headers:**
```
Content-Type: application/json
```

### GET /api/mcp & DELETE /api/mcp

Not supported in stateless mode (returns 405)

### OPTIONS /api/mcp

CORS preflight support

## Available Tools

### searchMovies
Search for movies by title.

**Parameters:**
- `query` (string, required): Search query for movie titles
- `language` (string, optional): ISO 639-1 language code (default: "en-US")

**Example:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "searchMovies",
    "arguments": {
      "query": "Inception",
      "language": "en-US"
    }
  }
}
```

### getMovieDetails
Get detailed information about a specific movie.

**Parameters:**
- `movieId` (number, required): TMDB movie ID
- `language` (string, optional): ISO 639-1 language code (default: "en-US")

**Example:**
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "getMovieDetails",
    "arguments": {
      "movieId": 27205,
      "language": "en-US"
    }
  }
}
```

### getTrending
Get trending movies, TV shows, or people.

**Parameters:**
- `mediaType` (string, optional): Type of media - "all", "movie", "tv", or "person" (default: "all")
- `timeWindow` (string, optional): Time window - "day" or "week" (default: "day")

**Example:**
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "getTrending",
    "arguments": {
      "mediaType": "movie",
      "timeWindow": "week"
    }
  }
}
```

### discoverMovies
Discover movies by various filters.

**Parameters:**
- `genre` (string, optional): Genre ID or name to filter by
- `year` (number, optional): Year to filter by
- `language` (string, optional): ISO 639-1 language code (default: "en-US")
- `sortBy` (string, optional): Sort order - "popularity.asc", "popularity.desc", "release_date.asc", "release_date.desc", etc. (default: "popularity.desc")

**Example:**
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "discoverMovies",
    "arguments": {
      "genre": "28",
      "year": 2020,
      "sortBy": "popularity.desc"
    }
  }
}
```

### searchTVShows
Search for TV shows by title.

**Parameters:**
- `query` (string, required): Search query for TV show titles
- `language` (string, optional): ISO 639-1 language code (default: "en-US")

**Example:**
```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "searchTVShows",
    "arguments": {
      "query": "Breaking Bad",
      "language": "en-US"
    }
  }
}
```

### getTVShowDetails
Get detailed information about a specific TV show.

**Parameters:**
- `seriesId` (number, required): TMDB TV series ID
- `language` (string, optional): ISO 639-1 language code (default: "en-US")

**Example:**
```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "getTVShowDetails",
    "arguments": {
      "seriesId": 1396,
      "language": "en-US"
    }
  }
}
```

## Usage Examples

### Initialize Connection

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": {
        "name": "test-client",
        "version": "1.0.0"
      }
    }
  }'
```

### List Available Tools

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list"
  }'
```

### Search for Movies

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "searchMovies",
      "arguments": {
        "query": "The Dark Knight"
      }
    }
  }'
```

### Get Trending Movies

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "tools/call",
    "params": {
      "name": "getTrending",
      "arguments": {
        "mediaType": "movie",
        "timeWindow": "week"
      }
    }
  }'
```

## MCP Client Configuration

To connect to this MCP server from an MCP client:

```json
{
  "mcpServers": {
    "tmdb": {
      "transport": {
        "type": "http",
        "url": "http://localhost:3000/api/mcp"
      }
    }
  }
}
```

## Implementation Details

### Stateless Architecture

- Each request creates a new server and transport instance
- No session management or persistent storage required
- Server and transport are closed immediately after each request
- Suitable for serverless deployments and load-balanced environments

### StreamableHTTPTransport

- Uses `StreamableHTTPServerTransport` from MCP SDK
- `sessionIdGenerator` set to `undefined` for stateless mode
- Only POST endpoint is supported
- No SSE (Server-Sent Events) in stateless mode

### Tool Registration

Tools are registered on every server creation using the `registerTool` method. Each tool:
- Has a name, description, and input schema
- Is an async function that receives parsed arguments
- Returns MCP-compliant response format with content array

## Adding New Tools

To add a new TMDB tool, modify the `createMcpServer` function in `app/api/mcp/route.ts`:

```typescript
server.registerTool(
  'yourToolName',
  {
    description: 'Description of what your tool does',
    inputSchema: {
      type: 'object',
      properties: {
        param1: {
          type: 'string',
          description: 'Parameter description',
        },
      },
      required: ['param1'],
    },
  },
  async ({ param1 }) => {
    // Call TMDB API or perform logic
    const result = await callTmdbAPI(param1);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);
```

## Error Handling

The server returns standard JSON-RPC 2.0 error responses:

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32603,
    "message": "Error message",
    "data": "Stack trace"
  },
  "id": null
}
```

Common error codes:
- `-32700`: Parse error
- `-32600`: Invalid Request
- `-32601`: Method not found
- `-32602`: Invalid params
- `-32603`: Internal error
- `-32000`: Method not allowed (for GET/DELETE in stateless mode)

## Related Documentation

- [Troubleshooting Guide](../docs/issue_graphql_error_in_prd.md) - Known issues and solutions

## Next Steps

To complete the implementation:

1. **Implement TMDB API calls**: Replace the placeholder responses with actual TMDB API calls using the existing `TMDB_ACCESS_TOKEN`
2. **Add error handling**: Add proper error handling for TMDB API failures
3. **Add caching**: Consider adding response caching for better performance
4. **Add rate limiting**: Implement rate limiting to respect TMDB API limits

---

## Troubleshooting

### Issue: GraphQL API Returns 500 Error in Production (Vercel)

**Date**: 2026-02-12
**Status**: Resolved

#### Symptom

The GraphQL API endpoint (`/api/graphql`) was returning HTTP 500 errors in Vercel production environment:

```
GraphQL Error (Code: 405): {"response":{"status":405,"headers":{...},"body":""},...}
```

The actual error was HTTP 500 (Internal Server Error), but graphql-request interpreted it as 405 due to Vercel's error page response.

#### Root Cause

The GraphQL schema was loaded dynamically using `@graphql-tools/load` with `loadSchemaSync`:

```typescript
// lib/graphql/schema/index.ts (before fix)
const typeDefs = loadSchemaSync('./lib/graphql/schema/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});
```

Vercel's serverless/Lambda environment has filesystem limitations that prevent dynamic file loading at runtime. The `loadSchemaSync` function failed silently during server initialization, causing all GraphQL requests to fail with 500 errors.

#### Verification Steps

1. **Local development worked correctly**:
   ```bash
   bun run dev
   bun test/graphql-client.ts --host http://localhost:3000/api/graphql
   ```

2. **TMDB API was accessible**:
   - Verified `TMDB_ACCESS_TOKEN` was properly configured in Vercel environment
   - Debug page confirmed TMDB API connectivity

3. **Vercel function logs showed**:
   - Schema loading failures (in runtime initialization)
   - Silent errors that weren't properly propagated

#### Solution

Inline the GraphQL schema definition directly in the code instead of loading from external file:

```typescript
// lib/graphql/schema/index.ts (after fix)
const typeDefs = `
  # Movie queries
  type Query {
    movie(id: ID!): Movie
    # ... complete schema definition
  }
  # ... all types
`;

export const schema = createSchema({
  typeDefs,
  resolvers: [...],
});
```

#### Changes Made

1. **Modified**: `lib/graphql/schema/index.ts`
   - Removed `@graphql-tools/load` and `@graphql-tools/graphql-file-loader` imports
   - Replaced `loadSchemaSync()` with inline string literal
   - Deleted external `schema.graphql` file reference

2. **Optional Cleanup** (not yet performed):
   ```bash
   bun remove @graphql-tools/load @graphql-tools/graphql-file-loader
   ```

#### Lessons Learned

1. **Vercel Serverless Limitations**: Dynamic file loading at runtime is unreliable in serverless environments
2. **Inline Definitions**: For serverless deployments, prefer inline definitions over file-based configurations
3. **Error Propagation**: Ensure errors during server initialization are properly logged and surfaced
4. **Testing Strategy**: Test in production-like environment to catch serverless-specific issues early

#### Prevention

When deploying GraphQL services to Vercel or other serverless platforms:

- Use inline type definitions instead of loading from `.graphql` files
- If external schema files are required, bundle them at build time using webpack/rollup plugins
- Consider using code-generation tools that output TypeScript definitions
- Test serverless function cold starts to ensure initialization succeeds
