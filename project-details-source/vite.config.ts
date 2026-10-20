import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import safariCompatBuild from './safari-compat-build.mjs'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/Portfolio/projects/',
  publicDir: false,
  build: { target: 'safari13', cssTarget: 'safari13', outDir: '../docs/projects', emptyOutDir: false },
  plugins: [react(), tailwindcss(), safariCompatBuild()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
})
