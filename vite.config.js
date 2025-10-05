import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   build: {
    chunkSizeWarningLimit: 2000, 
  },
  server: {
    proxy: {
      '/v1': {
        // target: 'https://oyo-agri-backend-production.up.railway.app',
        target:"http://localhost:5000",
        changeOrigin: true,
        secure: false
        
      },
      '/api': {
        target: 'https://oyo-agri-backend-production.up.railway.app',
        // target:"http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    },
  },
})