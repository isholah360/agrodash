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
     "/api": {
        target: "https://allied-lake.vercel.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
})