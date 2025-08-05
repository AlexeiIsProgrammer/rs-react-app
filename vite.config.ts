/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/rs-react-app',
  plugins: [
    react(),
    eslint({
      fix: true,
    }),
    svgr(),
  ],
  resolve: {
    alias: [
      {
        find: '#app',
        replacement: fileURLToPath(new URL('./src/app', import.meta.url)),
      },
      {
        find: '#assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '#components',
        replacement: fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
      },
      {
        find: '#constants',
        replacement: fileURLToPath(new URL('./src/constants', import.meta.url)),
      },
      {
        find: '#context',
        replacement: fileURLToPath(new URL('./src/context', import.meta.url)),
      },
      {
        find: '#hooks',
        replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
      },
      {
        find: '#mocks',
        replacement: fileURLToPath(new URL('./src/mocks', import.meta.url)),
      },
      {
        find: '#pages',
        replacement: fileURLToPath(new URL('./src/pages', import.meta.url)),
      },
      {
        find: '#router',
        replacement: fileURLToPath(new URL('./src/router', import.meta.url)),
      },
      {
        find: '#store',
        replacement: fileURLToPath(new URL('./src/store', import.meta.url)),
      },
      {
        find: '#types',
        replacement: fileURLToPath(new URL('./src/types', import.meta.url)),
      },
      {
        find: '#utils',
        replacement: fileURLToPath(new URL('./src/utils', import.meta.url)),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
        'src/**/types.ts',
        'src/**/*.stories.{js,jsx,ts,tsx}',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
