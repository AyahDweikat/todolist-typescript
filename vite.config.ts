// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      provider: 'c8', // or 'c8'
      reporter: ['text', 'json', 'html'],
    },
  },
})
