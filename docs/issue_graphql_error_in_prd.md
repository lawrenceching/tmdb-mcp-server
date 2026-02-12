# Issue: GraphQL API Returns 500 Error in Production (Vercel)

**Date**: 2026-02-12
**Status**: Resolved

## Symptom

The GraphQL API endpoint (`/api/graphql`) was returning HTTP 500 errors in Vercel production environment:

```
GraphQL Error (Code: 405): {"response":{"status":405,"headers":{...},"body":""},...}
```

The actual error was HTTP 500 (Internal Server Error), but graphql-request interpreted it as 405 due to Vercel's error page response.

## Root Cause

The GraphQL schema was loaded dynamically using `@graphql-tools/load` with `loadSchemaSync`:

```typescript
// lib/graphql/schema/index.ts (before fix)
const typeDefs = loadSchemaSync('./lib/graphql/schema/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});
```

Vercel's serverless/Lambda environment has filesystem limitations that prevent dynamic file loading at runtime. The `loadSchemaSync` function failed silently during server initialization, causing all GraphQL requests to fail with 500 errors.

## Environment Information

```
- Vercel production environment
- Node.js runtime (NEXT_RUNTIME=nodejs)
- TMDB_ACCESS_TOKEN: SET
- TMDB_API_KEY: NOT SET
- MCP_API_KEY: NOT SET
```

## Verification Steps

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

## Solution

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

## Changes Made

### Modified: `lib/graphql/schema/index.ts`

**Before:**
```typescript
import { createSchema } from 'graphql-yoga';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { movieResolvers } from '../resolvers/movie';
import { tvResolvers } from '../resolvers/tv';
import { searchResolvers } from '../resolvers/search';

const typeDefs = loadSchemaSync('./lib/graphql/schema/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});
```

**After:**
```typescript
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
    searchMovie(query: String!, page: Int = 1): SearchResult!
    searchTV(query: String!, page: Int = 1): SearchResult!
    searchMulti(query: String!, page: Int = 1): [MediaResult!]!
  }

  # ... (complete schema definition)
`;

export const schema = createSchema({
  typeDefs,
  resolvers: [
    movieResolvers, 
    tvResolvers, 
    searchResolvers,
    {
      MediaResult: {
        __resolveType(obj: Record<string, unknown>): string | null {
          if (obj.media_type === 'movie' || obj.title) {
            return 'Movie';
          }
          if (obj.media_type === 'tv' || obj.name) {
            return 'TVShow';
          }
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
```

### Optional Cleanup (Not Yet Performed)

The following dependencies are no longer needed:

```bash
bun remove @graphql-tools/load @graphql-tools/graphql-file-loader
```

## Lessons Learned

1. **Vercel Serverless Limitations**: Dynamic file loading at runtime is unreliable in serverless environments. Filesystem access is limited and may fail silently.

2. **Inline Definitions**: For serverless deployments, prefer inline definitions over file-based configurations. This ensures the code works correctly in all deployment environments.

3. **Error Propagation**: Ensure errors during server initialization are properly logged and surfaced. Silent failures can lead to confusing downstream errors.

4. **Testing Strategy**: Test in production-like environment to catch serverless-specific issues early. Local development may not expose runtime-specific problems.

5. **Schema Loading**: GraphQL schema loading strategies should be chosen based on deployment target. Build-time schema generation is preferred for serverless.

## Prevention

When deploying GraphQL services to Vercel or other serverless platforms:

- **Use inline type definitions** instead of loading from `.graphql` files
- **Bundle external files at build time** using webpack/rollup plugins if external files are required
- **Use code-generation tools** that output TypeScript definitions (e.g., `@graphql-codegen/cli`)
- **Test serverless function cold starts** to ensure initialization succeeds
- **Add error boundaries** during server initialization to catch and log startup errors
- **Monitor function initialization time** to detect slow startup caused by file operations

## Related Files

- `lib/graphql/schema/index.ts` - Schema definition (modified)
- `lib/graphql/schema/schema.graphql` - Original schema file (can be deleted)
- `test/graphql-client.ts` - Test client for verification
- `app/api/graphql/route.ts` - GraphQL endpoint handler
