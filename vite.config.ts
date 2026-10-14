import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this project below /<repository-name>/.
  // Keep root-relative URLs while using the project path in production.
  base: command === 'build' ? '/Redsigen-Town-builder/' : '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  define: {
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
  },
}));
