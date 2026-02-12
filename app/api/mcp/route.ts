import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { GraphQLClient } from 'graphql-request';
import logger from '@/lib/logger';

// GraphQL Client
// Note: NEXT_PUBLIC_GRAPHQL_URL must be configured in environment variables
// Do NOT use localhost fallback as it will fail in production
const graphqlClientUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;

// Error code for missing GraphQL URL configuration
const ERROR_CODE_MISSING_GRAPHQL_URL = 30001;
const ERROR_MESSAGE_MISSING_GRAPHQL_URL = 'MCP Server 配置错误, 错误代码 30001, 请联系管理员';

// Validate GraphQL URL is configured
function validateGraphQLConfig(): void {
  if (!graphqlClientUrl) {
    logger.error({
      errorCode: ERROR_CODE_MISSING_GRAPHQL_URL,
      message: 'NEXT_PUBLIC_GRAPHQL_URL environment variable is not configured'
    }, 'MCP Server Configuration Error');
    throw new Error(ERROR_MESSAGE_MISSING_GRAPHQL_URL);
  }
}

// GraphQL Client - only create if URL is validated
let graphqlClient: GraphQLClient | null = null;

function getGraphQLClient(): GraphQLClient {
  validateGraphQLConfig();
  if (!graphqlClient) {
    graphqlClient = new GraphQLClient(graphqlClientUrl!);
  }
  return graphqlClient;
}

// Valid fields for movie search results
const MOVIE_VALID_FIELDS = [
  'id',
  'title',
  'original_title',
  'overview',
  'poster_path',
  'backdrop_path',
  'release_date',
  'vote_average',
  'vote_count',
  'popularity',
  'adult',
  'genre_ids',
] as const;

// Valid fields for TV search results
const TV_VALID_FIELDS = [
  'id',
  'name',
  'original_name',
  'overview',
  'poster_path',
  'backdrop_path',
  'first_air_date',
  'vote_average',
  'vote_count',
  'popularity',
  'genre_ids',
] as const;

// Default fields returned when none specified
const DEFAULT_FIELDS: string[] = ['id', 'name', 'overview'];

// Build a dynamic GraphQL query for movie search with specified fields
function buildMovieSearchQuery(fields: string[]): string {
  const validFields = fields.filter((f) =>
    MOVIE_VALID_FIELDS.includes(f as (typeof MOVIE_VALID_FIELDS)[number])
  );
  const fieldStrings = validFields.map((f) => `        ${f}`).join('\n');

  return `
  query SearchMovie($query: String!, $page: Int, $language: String) {
    searchMovie(query: $query, page: $page, language: $language) {
      page
      total_pages
      total_results
      results {
${fieldStrings}
      }
    }
  }
` as const;
}

// Build a dynamic GraphQL query for TV search with specified fields
function buildTVSearchQuery(fields: string[]): string {
  const validFields = fields.filter((f) =>
    TV_VALID_FIELDS.includes(f as (typeof TV_VALID_FIELDS)[number])
  );
  const fieldStrings = validFields.map((f) => `        ${f}`).join('\n');

  return `
  query SearchTV($query: String!, $page: Int, $language: String) {
    searchTV(query: $query, page: $page, language: $language) {
      page
      total_pages
      total_results
      results {
${fieldStrings}
      }
    }
  }
` as const;
}

// Valid fields for single movie retrieval
const MOVIE_DETAIL_VALID_FIELDS = [
  'id',
  'title',
  'original_title',
  'overview',
  'poster_path',
  'backdrop_path',
  'release_date',
  'vote_average',
  'vote_count',
  'popularity',
  'adult',
  'genre_ids',
  'runtime',
  'status',
  'tagline',
  'genres',
  'credits',
  'videos',
  'images',
  'release_dates',
  'recommendations',
  'similar',
] as const;

// Build a dynamic GraphQL query for single movie retrieval with specified fields
function buildMovieQuery(fields: string[]): string {
  const validFields = fields.filter((f) =>
    MOVIE_DETAIL_VALID_FIELDS.includes(f as (typeof MOVIE_DETAIL_VALID_FIELDS)[number])
  );
  const fieldStrings = validFields.map((f) => {
    // Handle nested object fields differently
    if (['genres', 'credits', 'videos', 'images', 'release_dates', 'recommendations', 'similar'].includes(f)) {
      return `        ${f} { ${getNestedFields(f)} }`;
    }
    return `        ${f}`;
  }).join('\n');

  return `
  query GetMovie($id: ID!, $language: String) {
    movie(id: $id, language: $language) {
${fieldStrings}
    }
  }
` as const;
}

// Get nested fields for complex movie fields
function getNestedFields(field: string): string {
  switch (field) {
    case 'genres':
      return 'id\n        name';
    case 'credits':
      return 'cast {\n          id\n          name\n          character\n        }\n        crew {\n          id\n          name\n          job\n        }';
    case 'videos':
    case 'images':
    case 'release_dates':
    case 'recommendations':
    case 'similar':
      return ''; // Return empty for now, these will use default fields from resolver
    default:
      return '';
  }
}

// Valid fields for single TV show retrieval
const TV_DETAIL_VALID_FIELDS = [
  'id',
  'name',
  'original_name',
  'overview',
  'poster_path',
  'backdrop_path',
  'first_air_date',
  'last_air_date',
  'vote_average',
  'vote_count',
  'popularity',
  'genre_ids',
  'seasons',
  'genres',
  'credits',
  'videos',
  'images',
  'recommendations',
  'similar',
  'content_ratings',
] as const;

// Build a dynamic GraphQL query for single TV show retrieval with specified fields
function buildTVQuery(fields: string[]): string {
  const validFields = fields.filter((f) =>
    TV_DETAIL_VALID_FIELDS.includes(f as (typeof TV_DETAIL_VALID_FIELDS)[number])
  );
  const fieldStrings = validFields.map((f) => {
    // Handle nested object fields differently
    if (['genres', 'credits', 'videos', 'images', 'recommendations', 'similar', 'content_ratings', 'seasons'].includes(f)) {
      return `        ${f} { ${getTVNestedFields(f)} }`;
    }
    return `        ${f}`;
  }).join('\n');

  return `
  query GetTV($id: ID!, $language: String) {
    tv(id: $id, language: $language) {
${fieldStrings}
    }
  }
` as const;
}

// Get nested fields for complex TV show fields
function getTVNestedFields(field: string): string {
  switch (field) {
    case 'genres':
      return 'id\n        name';
    case 'credits':
      return 'cast {\n          id\n          name\n          character\n        }\n        crew {\n          id\n          name\n          job\n        }';
    case 'seasons':
      return 'id\n        name\n        overview\n        episode_count\n        poster_path\n        air_date\n        season_number';
    case 'videos':
    case 'images':
    case 'recommendations':
    case 'similar':
    case 'content_ratings':
      return ''; // Return empty for now, these will use default fields from resolver
    default:
      return '';
  }
}

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
      description: 'Search movices in TMDB',
      inputSchema: {
        query: z.string().max(50, 'Query must be 50 characters or less'),
        page: z.number().min(1).max(10).optional(),
        language: z.string().optional().describe('Language code for TMDB query (e.g., en-US, zh-CN, ja-JP)'),
        fields: z
          .array(z.string())
          .optional()
          .describe('List of fields to return in results. Valid fields: id, title, original_title, overview, poster_path, backdrop_path, release_date, vote_average, vote_count, popularity, adult, genre_ids'),
      },
    },
    async ({ query, page, language, fields }) => {
      try {
        const selectedFields = fields ?? DEFAULT_FIELDS;
        logger.info({ query, page, language, fields: selectedFields }, 'Searching movies');
        const queryString = buildMovieSearchQuery(selectedFields);
        const data = await getGraphQLClient().request(queryString, {
          query,
          page: page ?? 1,
          language: language ?? null,
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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : undefined;
        logger.error({
          error: {
            message: errorMessage,
            stack: errorStack,
            name: error instanceof Error ? error.name : 'Unknown'
          },
          query
        }, 'Error searching movies');
        return {
          content: [
            {
              type: 'text',
              text: `Error searching movies: ${errorMessage}`,
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
      description: 'Search TV shows or Anime in TMDB',
      inputSchema: {
        query: z.string().max(50, 'Query must be 50 characters or less'),
        page: z.number().min(1).max(10).optional(),
        language: z.string().optional().describe('Language code for TMDB query (e.g., en-US, zh-CN, ja-JP)'),
        fields: z
          .array(z.string())
          .optional()
          .describe('List of fields to return in results. Valid fields: id, name, original_name, overview, poster_path, backdrop_path, first_air_date, vote_average, vote_count, popularity, genre_ids'),
      },
    },
    async ({ query, page, language, fields }) => {
      try {
        const selectedFields = fields ?? DEFAULT_FIELDS;
        logger.info({ query, page, language, fields: selectedFields }, 'Searching TV shows');
        const queryString = buildTVSearchQuery(selectedFields);
        const data = await getGraphQLClient().request(queryString, {
          query,
          page: page ?? 1,
          language: language ?? null,
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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : undefined;
        logger.error({
          error: {
            message: errorMessage,
            stack: errorStack,
            name: error instanceof Error ? error.name : 'Unknown'
          },
          query
        }, 'Error searching TV shows');
        return {
          content: [
            {
              type: 'text',
              text: `Error searching TV shows: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Get Movie Tool
  server.registerTool(
    'getMovie',
    {
      description: 'Get movie details from TMDB by movie ID',
      inputSchema: {
        id: z.string().describe('The TMDB movie ID'),
        language: z.string().optional().describe('Language code for TMDB query (e.g., en-US, zh-CN, ja-JP)'),
        fields: z
          .array(z.string())
          .optional()
          .describe('List of fields to return. Valid fields: id, title, original_title, overview, poster_path, backdrop_path, release_date, vote_average, vote_count, popularity, adult, genre_ids, runtime, status, tagline, genres, credits, videos, images, release_dates, recommendations, similar'),
      },
    },
    async ({ id, language, fields }) => {
      try {
        const selectedFields = fields ?? ['id', 'title', 'overview', 'poster_path', 'backdrop_path', 'release_date', 'vote_average', 'runtime', 'genres'];
        logger.info({ id, language, fields: selectedFields }, 'Getting movie details');
        const queryString = buildMovieQuery(selectedFields);
        const data = await getGraphQLClient().request(queryString, {
          id,
          language: language ?? null,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.movie, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : undefined;
        logger.error({
          error: {
            message: errorMessage,
            stack: errorStack,
            name: error instanceof Error ? error.name : 'Unknown'
          },
          id
        }, 'Error getting movie details');
        return {
          content: [
            {
              type: 'text',
              text: `Error getting movie details: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Get TV Show Tool
  server.registerTool(
    'getTV',
    {
      description: 'Get TV show details from TMDB by TV show ID',
      inputSchema: {
        id: z.string().describe('The TMDB TV show ID'),
        language: z.string().optional().describe('Language code for TMDB query (e.g., en-US, zh-CN, ja-JP)'),
        fields: z
          .array(z.string())
          .optional()
          .describe('List of fields to return. Valid fields: id, name, original_name, overview, poster_path, backdrop_path, first_air_date, last_air_date, vote_average, vote_count, popularity, genre_ids, seasons, genres, credits, videos, images, recommendations, similar, content_ratings'),
      },
    },
    async ({ id, language, fields }) => {
      try {
        const selectedFields = fields ?? ['id', 'name', 'overview', 'poster_path', 'backdrop_path', 'first_air_date', 'last_air_date', 'vote_average', 'genres', 'seasons'];
        logger.info({ id, language, fields: selectedFields }, 'Getting TV show details');
        const queryString = buildTVQuery(selectedFields);
        const data = await getGraphQLClient().request(queryString, {
          id,
          language: language ?? null,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.tv, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : undefined;
        logger.error({
          error: {
            message: errorMessage,
            stack: errorStack,
            name: error instanceof Error ? error.name : 'Unknown'
          },
          id
        }, 'Error getting TV show details');
        return {
          content: [
            {
              type: 'text',
              text: `Error getting TV show details: ${errorMessage}`,
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
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error({ 
      error: { 
        message: errorMessage, 
        stack: errorStack,
        name: error instanceof Error ? error.name : 'Unknown'
      } 
    }, 'MCP Error');

    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: errorMessage,
          data: errorStack,
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
