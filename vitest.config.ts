import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['test/**', '**/node_modules/**'],
    testTimeout: 30000,
  },
});
