import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import htmlMinifier from "html-minifier";
import { terser } from "rollup-plugin-terser";
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import purgeIcons from "vite-plugin-purge-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    optimizeCssModules(),
    purgeIcons(),
  ],
  build: {
    chunkSizeWarningLimit: 1000 * 1024, // 1 MB
    minify: htmlMinifier.minify,
    rollupOptions: {
      plugins: [terser()],
    },
  },
});