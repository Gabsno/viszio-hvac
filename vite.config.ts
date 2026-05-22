import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages serves this project from /viszio-hvac/
export default defineConfig({
  base: '/viszio-hvac/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Viszio HVAC — Engineering Library',
        short_name: 'Viszio HVAC',
        description:
          'A searchable HVAC engineering library, calculators and course — works offline.',
        theme_color: '#0e7490',
        background_color: '#0e7490',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/viszio-hvac/',
        scope: '/viszio-hvac/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the app shell + bundled content for full offline use.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // version.json must always come from the network so the
        // auto-update banner can detect new deploys.
        globIgnores: ['**/version.json'],
        navigateFallbackDenylist: [/version\.json$/],
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
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
