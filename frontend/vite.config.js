import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // กำหนดให้ frontend ใช้พอร์ต 3000
    proxy: {
      '/api': {
        target: 'http://localhost:8085/', // backend ใช้พอร์ต 8085
        changeOrigin: true,
      },
    },
  },
});