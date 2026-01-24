import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './src',
  base: './',
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://service.bank.tomodachi.biz.id/',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    target: 'es2020',
  },
});
