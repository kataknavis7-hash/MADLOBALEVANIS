import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Code splitting: vendor chunk + ავტომატური chunk-ები lazy გვერდებისთვის
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
