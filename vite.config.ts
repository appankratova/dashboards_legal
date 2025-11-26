import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This ensures assets are linked relatively, making it work on any GitHub Pages path (e.g. username.github.io/repo-name)
  base: './', 
});
