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
  resolvers: [movieResolvers, tvResolvers, searchResolvers],
});
