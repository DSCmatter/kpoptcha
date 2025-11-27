import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Correct format: just the repository name between slashes
  base: '/kpoptcha/', 
})