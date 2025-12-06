import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Shuqstay/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/RegisterForm.test.jsx',
  },
})
