// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      three: path.resolve('./node_modules/three'),
    },
  },
  server: {
    port: 5173,
    strictPort: true, // يمنع تغييرات على البورت لو مش فاضي
    hmr: {
      protocol: 'ws', // لو السيرفر http
      host: 'localhost',
      port: 5173,
    },
  },
});
