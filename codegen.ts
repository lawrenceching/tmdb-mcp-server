import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'lib/graphql/schema/schema.graphql',
  documents: ['app/**/*.tsx', 'app/**/*.ts'],
  generates: {
    'lib/graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        defaultResolverFn: false,
        federation: false,
      },
    },
    'lib/graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        withHooks: false,
        withComponent: false,
        withHOC: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
