
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:3200', // Используем http и localhost //192.168.1.235//172.20.10.15//172.20.10.7
        changeOrigin: true, // Изменяем Origin для корректного запроса
        secure: false, // Отключаем проверку SSL, если это требуется
      },
    },
  },
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'public/img'),
      '@reduxApi': path.resolve(__dirname, 'redux_tollkit/api'),
      '@reduxSlice': path.resolve(__dirname, 'redux_tollkit/slices'),
      '@svgShared':path.resolve(__dirname, 'src/shared/assets/svg')
    },
  },
});
