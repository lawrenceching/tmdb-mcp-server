import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { GraphQLClient } from 'graphql-request';
import logger from '@/lib/logger';

// GraphQL Client
const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/api/graphql'
);

// GraphQL Queries
const SEARCH_MOVIE_QUERY = `
  query SearchMovie($query: String!, $page: Int) {
    searchMovie(query: $query, page: $page) {
      page
      total_pages
      total_results
      results {
        id
        title
        original_title
        overview
        poster_path
        backdrop_path
        release_date
        vote_average
        vote_count
        popularity
        adult
        genre_ids
      }
    }
  }
` as const;

const SEARCH_TV_QUERY = `
  query SearchTV($query: String!, $page: Int) {
    searchTV(query: $query, page: $page) {
      page
      total_pages
      total_results
      results {
        id
        name
        original_name
        overview
        poster_path
        backdrop_path
        first_air_date
        vote_average
        vote_count
        popularity
        genre_ids
      }
    }
  }
` as const;

function createMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: 'tmdb-mcp-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
        prompts: {},
      },
    }
  );

  // Search Movies Tool
  server.registerTool(
    'searchMovies',
    {
      description: 'Search for movies by title using GraphQL',
      inputSchema: {
        query: z.string(),
        page: z.number().optional(),
      },
    },
    async ({ query, page }) => {
      try {
        logger.info({ query, page }, 'Searching movies');
        const data = await graphqlClient.request(SEARCH_MOVIE_QUERY, {
          query,
          page: page ?? 1,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.searchMovie, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error({ error, query }, 'Error searching movies');
        return {
          content: [
            {
              type: 'text',
              text: `Error searching movies: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Search TV Shows Tool
  server.registerTool(
    'searchTV',
    {
      description: 'Search for TV shows by title using GraphQL',
      inputSchema: {
        query: z.string(),
        page: z.number().optional(),
      },
    },
    async ({ query, page }) => {
      try {
        logger.info({ query, page }, 'Searching TV shows');
        const data = await graphqlClient.request(SEARCH_TV_QUERY, {
          query,
          page: page ?? 1,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.searchTV, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error({ error, query }, 'Error searching TV shows');
        return {
          content: [
            {
              type: 'text',
              text: `Error searching TV shows: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  return server;
}

/**
 * POST handler for MCP requests (stateless)
 */
export async function POST(request: NextRequest) {
  try {
    logger.info('MCP Request received');

    // Create a new server instance for each request (stateless)
    const server = createMcpServer();

    // Create a new transport for each request (stateless)
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // Stateless mode
      enableJsonResponse: true, // Return JSON responses instead of SSE streams
    });

    // Connect server to transport
    await server.connect(transport);

    // Handle the request using the raw Web Standard Request
    const response = await transport.handleRequest(request);

    // Clean up
    await transport.close();
    await server.close();

    // Return the response
    return response;
  } catch (error) {
    logger.error('MCP Error:', error);

    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : 'Internal server error',
          data: error instanceof Error ? error.stack : undefined,
        },
        id: null,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * GET handler - Return method not allowed for stateless implementation
 */
export async function GET() {
  return new Response(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed in stateless mode',
      },
      id: null,
    }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * DELETE handler - Return method not allowed for stateless implementation
 */
export async function DELETE() {
  return new Response(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed in stateless mode',
      },
      id: null,
    }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * OPTIONS handler for CORS support
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
