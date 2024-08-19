import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/feed`,
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@entities',
        replacement: '/src/entities',
      },
      {
        find: '@services',
        replacement: resolve(__dirname, './src/services'),
      },
      {
        find: '@feed',
        replacement: resolve(__dirname, './src/modules/Feed'),
      },
      {
        find: '@root',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080',
  },
});
