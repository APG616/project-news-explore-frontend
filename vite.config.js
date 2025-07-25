import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'pages': path.resolve(__dirname, './src/pages'),
      'assets': path.resolve(__dirname, './src/assets'),
      '@images': path.resolve(__dirname, './src/images'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      
    }
  },
  server: {
    port: 3000,
    open: true,
  },
})
