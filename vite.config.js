import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // Proxy API requests to the Flask backend
      '^/api*': {
        target: 'http://localhost:8080',  // Flask backend running on localhost:8080
        changeOrigin: true,
        secure: false
      }
    }
  }
})
