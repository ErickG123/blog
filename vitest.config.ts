import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/blog/',
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
