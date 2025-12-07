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
      '/api/v1': {
        target: 'https://oyoagro-api.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
     "/api": {
        target: "https://allied-lake.vercel.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
})