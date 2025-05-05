import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8001,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // The backend server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Set to true if your backend is served over HTTPS
      },
    },
  },
})
