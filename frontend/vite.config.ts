import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  
  // // Явно указываем корневую директорию
  // root: path.resolve(__dirname),
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:3200',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'public/img'),
      '@toolkit': path.resolve(__dirname, 'redux_tollkit'),
      '@reduxApi': path.resolve(__dirname, 'redux_tollkit/api'),
      '@reduxSlice': path.resolve(__dirname, 'redux_tollkit/slices'),
      '@svgShared': path.resolve(__dirname, 'src/shared/assets/svg'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@funcCp': path.resolve(__dirname, 'src/funcCp'),
      '@api': path.resolve(__dirname, 'src/api')
    },
  },
  // build: {
  //   outDir: 'dist',
  //   rollupOptions: {
  //     input: {
  //       main: path.resolve(__dirname, 'index.html')
  //     },
  //     // Дополнительные настройки для лучшей совместимости
  //     preserveEntrySignatures: 'strict',
  //   }
  // },
  // Оптимизация для production
  esbuild: {
    drop: ['console', 'debugger'],
  },
});