import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Важно: имя репозитория со слэшами с обеих сторон
  base: '/dashboards_legal/', 
});
