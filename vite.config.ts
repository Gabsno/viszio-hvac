import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project from /viszio-hvac/
export default defineConfig({
  base: '/viszio-hvac/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Markdown rendering pulls in highlight.js — keep it in its own chunk.
          markdown: [
            'react-markdown',
            'remark-gfm',
            'rehype-highlight',
            'rehype-raw',
            'rehype-slug',
          ],
          search: ['flexsearch'],
        },
      },
    },
  },
});
