import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Деплой в корень (Vercel). Для подпапки: VITE_BASE_PATH=/path/ npm run build
const basePath = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
})
