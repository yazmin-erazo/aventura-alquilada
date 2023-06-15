import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import htmlMinifier from 'html-minifier';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000 * 1024, // 1 MB
    minify: htmlMinifier.minify,
  },
});