import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 设置一个别名，例如将 '@' 设置为 'src' 目录
      '@': path.resolve(__dirname, 'src'),
    }
  },
});