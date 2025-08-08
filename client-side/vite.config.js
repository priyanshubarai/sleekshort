import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/shorten': 'http://localhost:7000',
      '/:shortId': 'http://localhost:7000',
      '/checkalias':'http://localhost:7000',
      '/shorten/withalias':'http://localhost:7000'
    },
  },
})
