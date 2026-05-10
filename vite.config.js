import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Change 'ai-governance-compass' to your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/ai-governance-compass/',
})
