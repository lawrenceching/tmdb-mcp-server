/**
 * Next.js Instrumentation
 * This file runs once when the Next.js server starts
 *
 * Reference: https://nextjs.org/docs/app/building-your-application/configuring/instrumentation
 */

export async function register() {
  // Only run on server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const logger = (await import('@/lib/logger')).default;

    logger.info({
      env: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN ? '***SET***' : '***NOT SET***',
        TMDB_API_KEY: process.env.TMDB_API_KEY ? '***SET***' : '***NOT SET***',
        MCP_API_KEY: process.env.MCP_API_KEY ? '***SET***' : '***NOT SET***',
        LOG_LEVEL: process.env.LOG_LEVEL,
        NEXT_RUNTIME: process.env.NEXT_RUNTIME,
      },
    }, 'Application starting up - Environment variables loaded');

    logger.info(`GraphQL API URL: ${process.env.NEXT_PUBLIC_GRAPHQL_URL}`);
  }
}
