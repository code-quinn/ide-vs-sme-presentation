import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages deployment, set base to repo name
  // For local dev or custom domain, use '/'
  base: process.env.GITHUB_ACTIONS ? '/ide-vs-sme-presentation/' : '/',
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
