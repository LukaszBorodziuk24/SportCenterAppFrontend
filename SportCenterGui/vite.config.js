import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:{
      '@assets':'/src/assets'
    }
  },
  optimizeDeps:{
    exclude: ['@react-spring']
  },
  server: {
    host: true
  }
})
