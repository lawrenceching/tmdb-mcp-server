import { createYoga } from 'graphql-yoga';
import { schema } from '@/lib/graphql/schema';

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  // 在开发环境启用 GraphiQL
  graphiql: process.env.NODE_ENV === 'development',
});

export { yoga as GET, yoga as POST };
