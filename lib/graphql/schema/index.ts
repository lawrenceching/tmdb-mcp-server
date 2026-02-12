import { createSchema } from 'graphql-yoga';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { movieResolvers } from '../resolvers/movie';
import { tvResolvers } from '../resolvers/tv';
import { searchResolvers } from '../resolvers/search';

const typeDefs = loadSchemaSync('./lib/graphql/schema/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});

export const schema = createSchema({
  typeDefs,
  resolvers: [
    movieResolvers, 
    tvResolvers, 
    searchResolvers,
    {
      // Union type resolver for MediaResult
      MediaResult: {
        __resolveType(obj: Record<string, unknown>): string | null {
          // TMDB returns media_type field that indicates the type
          if (obj.media_type === 'movie' || obj.title) {
            return 'Movie';
          }
          if (obj.media_type === 'tv' || obj.name) {
            return 'TVShow';
          }
          // Fallback based on field presence
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
