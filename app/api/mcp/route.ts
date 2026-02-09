import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { NextRequest } from 'next/server';
import { z } from 'zod';

/**
 * Create and configure the MCP server instance with TMDB tools
 */
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

  // const enableMcpTool = process.env.ENABLE_MCP_TOOL === 'true';

  // if (enableMcpTool) {
  //   // Register TMDB search tool
  //   server.registerTool(
  //     'searchMovies',
  //     {
  //       description: 'Search for movies by title',
  //       inputSchema: z.object({
  //         query: z.string().description('Search query for movie titles'),
  //         language: z.string().default('en-US').description('ISO 639-1 language code (e.g., en, zh-CN)'),
  //       }),
  //     },
  //     async ({ query, language = 'en-US' }) => {
  //       // In a real implementation, this would call the TMDB API
  //       return {
  //         content: [
  //           {
  //             type: 'text',
  //             text: `Searching for movies: "${query}" in ${language}\n\nThis would query the TMDB API for movie results.`,
  //           },
  //         ],
  //       };
  //     }
  //   );

  //   // Register TMDB movie details tool
  //   server.registerTool(
  //     'getMovieDetails',
  //     {
  //       description: 'Get detailed information about a specific movie',
  //       inputSchema: z.object({
  //         movieId: z.number().description('TMDB movie ID'),
  //         language: z.string().default('en-US').description('ISO 639-1 language code (e.g., en, zh-CN)'),
  //       }),
  //     },
  //     async ({ movieId, language = 'en-US' }) => {
  //       return {
  //         content: [
  //           {
  //             type: 'text',
  //             text: `Getting details for movie ID: ${movieId} in ${language}\n\nThis would fetch movie details from TMDB.`,
  //           },
  //         ],
  //       };
  //     }
  //   );

  //   // Register TMDB trending tool
  //   server.registerTool(
  //     'getTrending',
  //     {
  //       description: 'Get trending movies, TV shows, or people',
  //       inputSchema: z.object({
  //         mediaType: z.enum(['all', 'movie', 'tv', 'person']).default('all').description('Type of media to get trending for'),
  //         timeWindow: z.enum(['day', 'week']).default('day').description('Time window for trending'),
  //       }),
  //     },
  //     async ({ mediaType = 'all', timeWindow = 'day' }) => {
  //       return {
  //         content: [
  //           {
  //             type: 'text',
  //             text: `Getting trending ${mediaType} for ${timeWindow}\n\nThis would fetch trending content from TMDB.`,
  //           },
  //         ],
  //       };
  //     }
  //   );

  //   // Register TMDB discover tool
  //   server.registerTool(
  //     'discoverMovies',
  //     {
  //       description: 'Discover movies by various filters',
  //       inputSchema: z.object({
  //         genre: z.string().optional().description('Genre ID or name to filter by'),
  //         year: z.number().optional().description('Year to filter by'),
  //         language: z.string().default('en-US').description('ISO 639-1 language code (e.g., en, zh-CN)'),
  //         sortBy: z.enum(['popularity.asc', 'popularity.desc', 'release_date.asc', 'release_date.desc', 'revenue.asc', 'revenue.desc', 'vote_average.asc', 'vote_average.desc']).default('popularity.desc').description('Sort order'),
  //       }),
  //     },
  //     async ({ genre, year, language = 'en-US', sortBy = 'popularity.desc' }) => {
  //       const filters = [];
  //       if (genre) filters.push(`genre: ${genre}`);
  //       if (year) filters.push(`year: ${year}`);
  //       filters.push(`language: ${language}`);
  //       filters.push(`sort by: ${sortBy}`);

  //       return {
  //         content: [
  //           {
  //             type: 'text',
  //             text: `Discovering movies with filters: ${filters.join(', ')}\n\nThis would query the TMDB discover endpoint.`,
  //           },
  //         ],
  //       };
  //     }
  //   );

  //   // Register TMDB TV show search tool
  //   server.registerTool(
  //     'searchTVShows',
  //     {
  //       description: 'Search for TV shows by title',
  //       inputSchema: z.object({
  //         query: z.string().description('Search query for TV show titles'),
  //         language: z.string().default('en-US').description('ISO 639-1 language code (e.g., en, zh-CN)'),
  //       }),
  //     },
  //     async ({ query, language = 'en-US' }) => {
  //       return {
  //         content: [
  //           {
  //             type: 'text',
  //             text: `Searching for TV shows: "${query}" in ${language}\n\nThis would query the TMDB API for TV show results.`,
  //           },
  //         ],
  //       };
  //     }
  //   );

  //   // Register TMDB TV show details tool
  //   server.registerTool(
  //     'getTVShowDetails',
  //     {
  //       description: 'Get detailed information about a specific TV show',
  //       inputSchema: z.object({
  //         seriesId: z.number().description('TMDB TV series ID'),
  //         language: z.string().default('en-US').description('ISO 639-1 language code (e.g., en, zh-CN)'),
  //       }),
  //     },
  //     async ({ seriesId, language = 'en-US' }) => {
  //       return {
  //         content: [
  //           {
  //             type: 'text',
  //             text: `Getting details for TV series ID: ${seriesId} in ${language}\n\nThis would fetch TV show details from TMDB.`,
  //           },
  //         ],
  //       };
  //     }
  //   );
  // }

  return server;
}

/**
 * POST handler for MCP requests (stateless)
 */
export async function POST(request: NextRequest) {
  try {
    console.log('MCP Request received');

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
    console.error('MCP Error:', error);

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
