import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/FinFlow',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  plugins: [
    tailwindcss(),
  ],
});