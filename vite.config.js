import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/petCare': {
        target: 'https://petcare-api-r9b6.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
